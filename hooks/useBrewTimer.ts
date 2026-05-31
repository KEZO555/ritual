import { useCallback, useEffect, useRef, useState } from "react";
import type { Step } from "@/data/recipes";

function activeStepIndex(steps: Step[], elapsed: number): number {
  let active = -1;
  for (let i = 0; i < steps.length; i++) {
    const at = steps[i].at;
    if (at !== undefined && at <= elapsed) {
      active = i;
    }
  }
  return active;
}

export function useBrewTimer(steps: Step[], totalSeconds = 0) {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);

  // Anchor to the wall clock so the displayed time tracks real seconds
  // instead of drifting with setInterval lag. `base` is the elapsed time
  // captured when we (re)started; `at` is the timestamp of that capture.
  const anchorRef = useRef<{ at: number; base: number } | null>(null);
  const elapsedRef = useRef(0);
  elapsedRef.current = elapsed;

  const lastAt = steps.reduce(
    (max, step) => (step.at !== undefined && step.at > max ? step.at : max),
    0
  );
  // Keep counting until the recipe's full time so a final timed step (e.g.
  // a slow press) plays out rather than stopping on its start mark.
  const end = Math.max(lastAt, totalSeconds);

  useEffect(() => {
    if (!running) {
      return;
    }
    const id = setInterval(() => {
      const anchor = anchorRef.current;
      if (!anchor) {
        return;
      }
      const next = anchor.base + (Date.now() - anchor.at) / 1000;
      if (next >= end) {
        setElapsed(end);
        setRunning(false);
        anchorRef.current = null;
        return;
      }
      setElapsed(next);
    }, 250);

    return () => clearInterval(id);
  }, [running, end]);

  const toggle = useCallback(() => {
    setRunning((value) => {
      const nowRunning = !value;
      anchorRef.current = nowRunning
        ? { at: Date.now(), base: elapsedRef.current }
        : null;
      return nowRunning;
    });
  }, []);

  const reset = useCallback(() => {
    setRunning(false);
    anchorRef.current = null;
    setElapsed(0);
  }, []);

  // Jump the timer to a specific mark (used by tapping a step), keeping the
  // running state and re-anchoring so it keeps counting from there.
  const seek = useCallback(
    (to: number) => {
      const clamped = Math.max(0, Math.min(to, end));
      setElapsed(clamped);
      if (anchorRef.current) {
        anchorRef.current = { at: Date.now(), base: clamped };
      }
    },
    [end]
  );

  const displayElapsed = Math.floor(elapsed);
  const activeIndex =
    running || elapsed > 0 ? activeStepIndex(steps, displayElapsed) : -1;

  return {
    activeIndex,
    elapsed: displayElapsed,
    reset,
    running,
    seek,
    toggle,
    total: end,
  };
}
