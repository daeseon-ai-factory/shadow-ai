"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Props {
  onComplete: (blob: Blob, durationMs: number) => void;
  disabled?: boolean;
}

export function Recorder({ onComplete, disabled }: Props) {
  const t = useTranslations("recording");
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const startTimeRef = useRef<number>(0);
  const [recording, setRecording] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => () => {
    if (recorderRef.current && recorderRef.current.state !== "inactive") {
      recorderRef.current.stop();
    }
    recorderRef.current?.stream.getTracks().forEach((t) => t.stop());
  }, []);

  const pickMimeType = (): string => {
    if (typeof MediaRecorder === "undefined") return "";
    const candidates = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg"];
    for (const c of candidates) {
      if (MediaRecorder.isTypeSupported(c)) return c;
    }
    return "";
  };

  const start = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices) {
      toast.error(t("unsupported"));
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mime = pickMimeType();
      const recorder = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const elapsed = performance.now() - startTimeRef.current;
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        // Release mic
        stream.getTracks().forEach((t) => t.stop());
        onComplete(blob, elapsed);
      };
      recorderRef.current = recorder;
      startTimeRef.current = performance.now();
      recorder.start();
      setRecording(true);
    } catch (err) {
      setPermissionDenied(true);
      toast.error(t("micRequired"));
      console.error(err);
    }
  }, [onComplete, t]);

  const stop = useCallback(() => {
    recorderRef.current?.stop();
    setRecording(false);
  }, []);

  if (permissionDenied) {
    return (
      <p className="text-sm text-red-600">
        {t("micDenied")}
      </p>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {!recording ? (
        <Button onClick={start} disabled={disabled} variant="destructive">
          ● {t("start")}
        </Button>
      ) : (
        <Button onClick={stop} variant="outline">
          ■ {t("stop")}
        </Button>
      )}
      {recording && (
        <span className="flex items-center gap-2 text-sm text-red-600">
          <span className="inline-block size-2 animate-pulse rounded-full bg-red-600" />
          {t("inProgress")}
        </span>
      )}
    </div>
  );
}
