"use client";

import { useEffect, useImperativeHandle, useRef, useState, forwardRef } from "react";

type YT_PlayerState = -1 | 0 | 1 | 2 | 3 | 5;

interface YT_Player {
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  setPlaybackRate(rate: number): void;
  getCurrentTime(): number;
  getDuration(): number;
  getPlayerState(): YT_PlayerState;
  destroy(): void;
}

interface YT_Namespace {
  Player: new (element: HTMLElement, config: {
    videoId: string;
    playerVars?: Record<string, string | number>;
    events?: {
      onReady?: (event: { target: YT_Player }) => void;
      onStateChange?: (event: { target: YT_Player; data: YT_PlayerState }) => void;
    };
  }) => YT_Player;
}

declare global {
  interface Window {
    YT?: YT_Namespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiLoadPromise: Promise<YT_Namespace> | null = null;

function loadYoutubeApi(): Promise<YT_Namespace> {
  if (typeof window === "undefined") return Promise.reject(new Error("SSR"));
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
  if (apiLoadPromise) return apiLoadPromise;

  apiLoadPromise = new Promise<YT_Namespace>((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve(window.YT!);
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.head.appendChild(script);
  });
  return apiLoadPromise;
}

export interface YoutubePlayerHandle {
  play(): void;
  pause(): void;
  seekTo(seconds: number): void;
  setPlaybackRate(rate: number): void;
  getCurrentTime(): number;
  isReady(): boolean;
}

interface Props {
  videoId: string;
  onReady?: () => void;
  onStateChange?: (state: YT_PlayerState) => void;
  /** "PORTRAIT" → 9:16 with max-width cap. Anything else → 16:9. */
  orientation?: "PORTRAIT" | "LANDSCAPE" | "UNKNOWN";
  className?: string;
}

export const YoutubePlayer = forwardRef<YoutubePlayerHandle, Props>(function YoutubePlayer(
  { videoId, onReady, onStateChange, orientation, className },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YT_Player | null>(null);
  const [ready, setReady] = useState(false);

  useImperativeHandle(ref, () => ({
    play: () => playerRef.current?.playVideo(),
    pause: () => playerRef.current?.pauseVideo(),
    seekTo: (s) => playerRef.current?.seekTo(s, true),
    setPlaybackRate: (r) => playerRef.current?.setPlaybackRate(r),
    getCurrentTime: () => playerRef.current?.getCurrentTime() ?? 0,
    isReady: () => ready,
  }), [ready]);

  useEffect(() => {
    let cancelled = false;
    let player: YT_Player | null = null;

    loadYoutubeApi().then((YT) => {
      if (cancelled || !containerRef.current) return;
      player = new YT.Player(containerRef.current, {
        videoId,
        playerVars: { rel: 0, modestbranding: 1, playsinline: 1 },
        events: {
          onReady: () => {
            playerRef.current = player;
            setReady(true);
            onReady?.();
          },
          onStateChange: (e) => onStateChange?.(e.data),
        },
      });
    });

    return () => {
      cancelled = true;
      try {
        player?.destroy();
      } catch {
        // ignore: iframe might already be detached
      }
      playerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  // Portrait: cap to a sensible reading width so the iframe doesn't dominate the page.
  // Landscape (default): full width 16:9 like before.
  const wrapper = className ??
    (orientation === "PORTRAIT"
      ? "aspect-[9/16] mx-auto w-full max-w-sm overflow-hidden rounded-lg bg-black"
      : "aspect-video w-full overflow-hidden rounded-lg bg-black");

  return (
    <div className={wrapper}>
      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
});
