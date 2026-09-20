import { useEffect, useRef, type RefObject } from "react";

export type TransportState = "armed" | "released";

export interface VideoScrubOptions {
  videoRef: RefObject<HTMLVideoElement | null>;
  containerRef?: RefObject<HTMLElement | null>;
  reducedMotion?: boolean;
  onUiUpdate?: (progress: number, currentTime: number, k: number) => void;
  onStateChange?: (state: TransportState) => void;
}

export function useVideoScrub({
  videoRef,
  containerRef,
  reducedMotion = false,
  onUiUpdate,
  onStateChange,
}: VideoScrubOptions) {
  const transportStateRef = useRef<TransportState>("armed");
  const transportProgressRef = useRef(0);
  const currentTimeRef = useRef(0);
  const targetTimeRef = useRef(0);
  const navigationInProgressRef = useRef(false);
  const playbackRateRef = useRef(1);
  const lastReverseSeekRef = useRef(0);
  const armedLockRef = useRef(false);
  const releasePendingRef = useRef(false);
  const rafIdRef = useRef<number>(0);

  const easeCubic = (x: number) => x * x * (3 - 2 * x);

  const releaseTransport = () => {
    if (releasePendingRef.current) return;
    releasePendingRef.current = true;
    transportProgressRef.current = 1;
    targetTimeRef.current = videoRef.current?.duration || 0;

    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
      try {
        video.playbackRate = 2.5;
      } catch {}
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        transportStateRef.current = "released";
        releasePendingRef.current = false;
        armedLockRef.current = true;
        onStateChange?.("released");

        // Lock re-arm briefly to let scroll release naturally
        setTimeout(() => {
          armedLockRef.current = false;
        }, 1200);
      });
    });
  };

  const rearmTransport = () => {
    transportStateRef.current = "armed";
    transportProgressRef.current = 0;
    targetTimeRef.current = 0;
    currentTimeRef.current = 0;
    playbackRateRef.current = 1;

    const video = videoRef.current;
    if (video) {
      video.pause();
      try {
        video.currentTime = 0;
        video.playbackRate = 1;
      } catch {}
    }
    onStateChange?.("armed");
    onUiUpdate?.(0, 0, 0);
  };

  const navigateToSection = (id: string) => {
    navigationInProgressRef.current = true;
    transportStateRef.current = "released";
    onStateChange?.("released");
    history.replaceState(null, "", `#${id}`);

    const targetEl = document.getElementById(id);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setTimeout(() => {
      navigationInProgressRef.current = false;
    }, 1000);
  };

  // Main RAF loop
  useEffect(() => {
    if (reducedMotion) return;

    let disposed = false;
    let lastTime = performance.now();

    const loop = (now: number) => {
      if (disposed) return;
      const dt = Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;

      const video = videoRef.current;
      const duration = video?.duration || 12;

      if (transportStateRef.current === "armed" && video) {
        // Calculate target time based on user progress
        targetTimeRef.current = transportProgressRef.current * duration;
        const diff = targetTimeRef.current - currentTimeRef.current;

        if (diff > 0.005) {
          // Forward movement
          const lerpFactor = 1 - Math.exp(-dt * 8);
          currentTimeRef.current += diff * lerpFactor;
          video.currentTime = currentTimeRef.current;
          video.play().catch(() => {});

          // Decay playback rate toward 1
          if (playbackRateRef.current > 1) {
            playbackRateRef.current = Math.max(1, playbackRateRef.current - 0.12);
          }
          try {
            video.playbackRate = playbackRateRef.current;
          } catch {}
        } else if (diff < -0.005) {
          // Reverse movement with 12fps guard
          const elapsed = now - lastReverseSeekRef.current;
          if (!video.seeking && elapsed >= 1000 / 12) {
            lastReverseSeekRef.current = now;
            const step = Math.min(0.15, Math.abs(diff));
            const newTime = Math.max(0, video.currentTime - step);
            video.currentTime = newTime;
            currentTimeRef.current = newTime;
          }
        }

        // Compute UI displacement factor k (0 -> 1)
        const k = easeCubic(
          Math.min(1, Math.max(0, (currentTimeRef.current - 0.2) / 2.4))
        );
        onUiUpdate?.(transportProgressRef.current, currentTimeRef.current, k);

        // Check release condition
        if (transportProgressRef.current >= 0.999) {
          releaseTransport();
        }
      } else {
        // Released state: check for re-arm when user scrolls back to the very top
        if (
          window.scrollY <= 2 &&
          !navigationInProgressRef.current &&
          !armedLockRef.current &&
          transportStateRef.current === "released"
        ) {
          rearmTransport();
        }
      }

      if (!disposed) {
        rafIdRef.current = requestAnimationFrame(loop);
      }
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafIdRef.current);
    };
  }, [reducedMotion, onUiUpdate, onStateChange]);

  // Wheel listener
  useEffect(() => {
    if (reducedMotion) return;

    const handleWheel = (e: WheelEvent) => {
      if (
        transportStateRef.current !== "armed" ||
        navigationInProgressRef.current ||
        armedLockRef.current
      ) {
        return;
      }

      e.preventDefault();
      window.scrollTo(0, 0);

      const delta = Math.abs(e.deltaY) * 0.00045;
      if (e.deltaY > 0) {
        transportProgressRef.current = Math.min(
          1,
          transportProgressRef.current + delta
        );
        playbackRateRef.current = Math.min(
          3,
          playbackRateRef.current + Math.min(0.5, Math.abs(e.deltaY) * 0.006)
        );
      } else {
        transportProgressRef.current = Math.max(
          0,
          transportProgressRef.current - delta
        );
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [reducedMotion]);

  // Touch listener
  useEffect(() => {
    if (reducedMotion) return;
    const targetElement = containerRef?.current || document.body;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (
        transportStateRef.current !== "armed" ||
        navigationInProgressRef.current ||
        armedLockRef.current
      ) {
        return;
      }
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (
        transportStateRef.current !== "armed" ||
        navigationInProgressRef.current ||
        armedLockRef.current
      ) {
        return;
      }
      const deltaY = touchStartY - e.touches[0].clientY;
      const delta = Math.abs(deltaY) * 0.00045;
      e.preventDefault();

      if (deltaY > 0) {
        transportProgressRef.current = Math.min(
          1,
          transportProgressRef.current + delta
        );
      } else {
        transportProgressRef.current = Math.max(
          0,
          transportProgressRef.current - delta
        );
      }
      touchStartY = e.touches[0].clientY;
    };

    targetElement.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    targetElement.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    return () => {
      targetElement.removeEventListener("touchstart", handleTouchStart);
      targetElement.removeEventListener("touchmove", handleTouchMove);
    };
  }, [containerRef, reducedMotion]);

  // Keyboard listener
  useEffect(() => {
    if (reducedMotion) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") return;
      if (
        transportStateRef.current !== "armed" ||
        navigationInProgressRef.current ||
        armedLockRef.current
      ) {
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        transportProgressRef.current = Math.min(
          1,
          transportProgressRef.current + 0.025
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        transportProgressRef.current = Math.max(
          0,
          transportProgressRef.current - 0.025
        );
      } else if (e.key === "PageDown" || e.key === " " || e.code === "Space") {
        e.preventDefault();
        transportProgressRef.current = Math.min(
          1,
          transportProgressRef.current + 0.12
        );
      } else if (e.key === "PageUp") {
        e.preventDefault();
        transportProgressRef.current = Math.max(
          0,
          transportProgressRef.current - 0.12
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [reducedMotion]);

  return {
    transportStateRef,
    transportProgressRef,
    currentTimeRef,
    navigateToSection,
    rearmTransport,
    releaseTransport,
  };
}
