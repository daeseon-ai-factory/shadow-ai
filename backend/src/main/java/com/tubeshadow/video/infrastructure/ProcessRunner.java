package com.tubeshadow.video.infrastructure;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

final class ProcessRunner {

    private static final long OUTPUT_DRAIN_TIMEOUT_MILLIS = 1_000;

    private ProcessRunner() {
    }

    static Result run(ProcessBuilder pb, long timeoutSeconds) throws IOException, InterruptedException {
        Process process = pb.start();
        CompletableFuture<String> stdout = readAsync(process.getInputStream());
        CompletableFuture<String> stderr = readAsync(process.getErrorStream());

        boolean finished;
        try {
            finished = process.waitFor(timeoutSeconds, TimeUnit.SECONDS);
        } catch (InterruptedException ex) {
            process.destroyForcibly();
            throw ex;
        }

        if (!finished) {
            process.destroyForcibly();
            process.waitFor(5, TimeUnit.SECONDS);
            return new Result(-1, true, getOutput(stdout), getOutput(stderr));
        }

        return new Result(process.exitValue(), false, getOutput(stdout), getOutput(stderr));
    }

    private static CompletableFuture<String> readAsync(InputStream stream) {
        return CompletableFuture.supplyAsync(() -> {
            try (InputStream input = stream) {
                return new String(input.readAllBytes(), StandardCharsets.UTF_8);
            } catch (IOException ex) {
                return "";
            }
        });
    }

    private static String getOutput(CompletableFuture<String> output) throws InterruptedException {
        try {
            return output.get(OUTPUT_DRAIN_TIMEOUT_MILLIS, TimeUnit.MILLISECONDS);
        } catch (ExecutionException | TimeoutException ex) {
            output.cancel(true);
            return "";
        }
    }

    record Result(int exitCode, boolean timedOut, String stdout, String stderr) {
        String combinedOutput() {
            if (stdout.isBlank()) return stderr;
            if (stderr.isBlank()) return stdout;
            return stdout + "\n" + stderr;
        }
    }
}
