import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import { useShortcuts } from "@/lib/use-shortcuts";

function press(key: string, target: Element | Window | Document = document.body) {
  fireEvent.keyDown(target, { key });
}

describe("useShortcuts", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("calls the action when its key is pressed", () => {
    const action = vi.fn();
    renderHook(() => useShortcuts([{ key: "r", description: "rewind", action }]));

    press("r");

    expect(action).toHaveBeenCalledTimes(1);
  });

  it("matches case-insensitively", () => {
    const action = vi.fn();
    renderHook(() => useShortcuts([{ key: "R", description: "rewind", action }]));

    press("r");

    expect(action).toHaveBeenCalledTimes(1);
  });

  it("translates spaces to the 'Space' alias", () => {
    const action = vi.fn();
    renderHook(() => useShortcuts([{ key: "Space", description: "play", action }]));

    press(" ");

    expect(action).toHaveBeenCalledTimes(1);
  });

  it("does not fire while focus is in an input", () => {
    const action = vi.fn();
    const input = document.createElement("input");
    document.body.appendChild(input);
    renderHook(() => useShortcuts([{ key: "r", description: "rewind", action }]));

    press("r", input);

    expect(action).not.toHaveBeenCalled();
  });

  it("respects when() predicate", () => {
    const action = vi.fn();
    renderHook(() =>
      useShortcuts([{ key: "r", description: "rewind", action, when: () => false }]),
    );

    press("r");

    expect(action).not.toHaveBeenCalled();
  });
});
