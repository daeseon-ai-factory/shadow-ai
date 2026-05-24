"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Props {
  onComplete: (blob: Blob, durationMs: number) => void;
  disabled?: boolean;
}

export function Recorder({ onComplete, disabled }: Props) {
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
      toast.error("이 브라우저는 녹음을 지원하지 않습니다");
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
      toast.error("마이크 권한이 필요합니다");
      console.error(err);
    }
  }, [onComplete]);

  const stop = useCallback(() => {
    recorderRef.current?.stop();
    setRecording(false);
  }, []);

  if (permissionDenied) {
    return (
      <p className="text-sm text-red-600">
        마이크 권한이 거부되었습니다. 브라우저 설정에서 권한을 허용해주세요.
      </p>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {!recording ? (
        <Button onClick={start} disabled={disabled} variant="destructive">
          ● 녹음 시작
        </Button>
      ) : (
        <Button onClick={stop} variant="outline">
          ■ 정지
        </Button>
      )}
      {recording && (
        <span className="flex items-center gap-2 text-sm text-red-600">
          <span className="inline-block size-2 animate-pulse rounded-full bg-red-600" />
          녹음 중…
        </span>
      )}
    </div>
  );
}
