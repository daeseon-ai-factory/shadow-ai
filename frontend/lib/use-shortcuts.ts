"use client";

import { useEffect } from "react";

export interface Shortcut {
  key: string;       // e.g. "Space", "r", "1"
  action: () => void;
  description: string;
  when?: () => boolean;
}

/**
 * Lightweight keyboard shortcut registrar. Skips when focus is inside an editable
 * element so typing in inputs doesn't trigger actions.
 */
export function useShortcuts(shortcuts: Shortcut[]) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && isEditable(target)) return;

      const key = e.key === " " ? "Space" : e.key;
      const match = shortcuts.find(
        (s) =>
          (s.key === key || s.key.toLowerCase() === key.toLowerCase()) &&
          (s.when ? s.when() : true),
      );
      if (match) {
        e.preventDefault();
        match.action();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [shortcuts]);
}

function isEditable(el: HTMLElement): boolean {
  const tag = el.tagName.toLowerCase();
  if (tag === "input" || tag === "textarea" || tag === "select") return true;
  if (el.isContentEditable) return true;
  return false;
}
