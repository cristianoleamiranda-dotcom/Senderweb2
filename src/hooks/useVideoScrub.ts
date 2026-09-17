import { useEffect, useRef, type RefObject } from "react";

// ---------------------------------------------------------------------------
// useVideoScrub — controla el video hero mediante wheel / touch / keyboard
// El scroll NO mueve el documento mientras está armado; controla el video.
// ---------------------------------------------------------------------------

export type TransportState = "armed" | "released";

export interface VideoScrubState {
  transportState: RefObject<TransportState>;
  progress: RefObject<number>;
  currentTime: RefObject<number>;
  navigateToSection: (id: string) => void;
  rearm: () => void;
}

export function useVideoScrub(
  videoRef: RefObject<HTMLVideoElement | null>,
  reducedMotion: boolean
): VideoScrubState {
  const transportStateRef = useRef<TransportState>("armed");
  const transportProgressRef = useRef(0);
  const currentTimeRef = useRef(0);
  const targetTimeRef = useRef(0);
  const navigationInProgressRef = useRef(false);
  const playbackRateRef = useRef(1);
  const lastReverseSeekRef = useRef(0);
  const rafRef = useRef(0);
  const lastFrameRef = useRef(0);
  const armedLockRef = useRef(false);
  const releasePendingRef = useRef(false);

  let wheelHandler: ((e: WheelEvent) => void) | null = null;
  let keyHandler: ((e: KeyboardEvent) => void) | null = null;
  const touchElements: HTMLElement[] = [];

  function releaseTransport() {
    if (releasePendingRef.current) return;
    releasePendingRef.current = true;
    transportProgressRef.current = 1;
    targetTimeRef.current = videoRef.current?.duration ?? 0;
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
      try { video.playbackRate = 3; } catch {}
    }
    const doRelease = () => {
      transportStateRef.current = "released";
      releasePendingRef.current = false;
      armedLockRef.current = true;
      setTimeout(() => {
        armedLockRef.current = false;
        if (transportStateRef.current === "released" && window.scrollY <= 2) {
          rearmTransport();
        }
      }, 4000);
    };
    requestAnimationFrame(() => requestAnimationFrame(doRelease));
  }

  function rearmTransport() {
    transportStateRef.current = "armed";
    transportProgressRef.current = 0;
    targetTimeRef.current = 0;
    currentTimeRef.current = 0;
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
      try { video.playbackRate = 1; } catch {}
      video.play().catch(() => {});
    }
    playbackRateRef.current = 1;
  }

  function navigateToSection(id: string) {
    if (transportStateRef.current !== "armed") return;
    navigationInProgressRef.current = true;
    transportStateRef.current = "released";
    history.replaceState(null, "", `#${id}`);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    const timer = setTimeout(() => {
      navigationInProgressRef.current = false;
    }, 1000);
    const onEnd = () => {
      clearTimeout(timer);
      navigationInProgressRef.current = false;
    };
    el?.addEventListener("scrollend", onEnd, { once: true });
  }

  function handleWheel(e: WheelEvent) {
    if (
      transportStateRef.current !== "armed" ||
      navigationInProgressRef.current ||
      armedLockRef.current
    )
      return;
    e.preventDefault();
    window.scrollTo(0, 0);
    const delta = Math.abs(e.deltaY) * 0.00045;
    if (e.deltaY > 0) {
      transportProgressRef.current = Math.min(1, transportProgressRef.current + delta);
      const video = videoRef.current;
      if (video && !video.paused) {
        playbackRateRef.current = Math.min(
          3,
          playbackRateRef.current + Math.min(0.5, Math.abs(e.deltaY) * 0.006)
        );
        try { video.playbackRate = playbackRateRef.current; } catch {}
      }
    } else {
      transportProgressRef.current = Math.max(0, transportProgressRef.current - delta);
    }
    if (transportProgressRef.current >= 0.999) releaseTransport();
  }

  function handleTouchStart(e: TouchEvent) {
    if (
      transportStateRef.current !== "armed" ||
      navigationInProgressRef.current ||
      armedLockRef.current
    )
      return;
    touchStartRef.current = e.touches[0].clientY;
  }

  function handleTouchMove(e: TouchEvent) {
    if (transportStateRef.current !== "armed") return;
    const deltaY = touchStartRef.current - e.touches[0].clientY;
    const delta = Math.abs(deltaY) * 0.00045;
    if (deltaY > 0) {
      transportProgressRef.current = Math.min(1, transportProgressRef.current + delta);
    } else {
      transportProgressRef.current = Math.max(0, transportProgressRef.current - delta);
    }
    touchStartRef.current = e.touches[0].clientY;
    if (transportProgressRef.current >= 0.999) releaseTransport();
  }

  const touchStartRef = useRef(0);

  function handleKey(e: KeyboardEvent) {
    if (e.key === "Tab") return;
    if (
      transportStateRef.current !== "armed" ||
      navigationInProgressRef.current ||
      armedLockRef.current
    )
      return;
    if (e.key === "ArrowDown") {
      transportProgressRef.current = Math.min(1, transportProgressRef.current + 0.025);
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      transportProgressRef.current = Math.max(0, transportProgressRef.current - 0.025);
      e.preventDefault();
    } else if (e.key === "PageDown") {
      transportProgressRef.current = Math.min(1, transportProgressRef.current + 0.12);
      e.preventDefault();
    } else if (e.key === "PageUp") {
      transportProgressRef.current = Math.max(0, transportProgressRef.current - 0.12);
      e.preventDefault();
    } else if (e.key === " " || e.code === "Space") {
      transportProgressRef.current = Math.min(1, transportProgressRef.current + 0.12);
      e.preventDefault();
    }
    if (transportProgressRef.current >= 0.999) releaseTransport();
  }

  function forwardSeek(dt: number, video: HTMLVideoElement) {
    if (transportProgressRef.current >= 1) {
      if (video.currentTime < video.duration - 0.05) {
        video.currentTime = Math.min(video.duration, video.currentTime + dt * playbackRateRef.current * 0.5);
        video.play().catch(() => {});
      } else {
        releaseTransport();
      }
      return;
    }
    const target = transportProgressRef.current * (video.duration || 0);
    const diff = target - currentTimeRef.current;
    const lerpFactor = 1 - Math.exp(-dt * 8);
    currentTimeRef.current += diff * lerpFactor;
    video.currentTime = currentTimeRef.current;
    video.play().catch(() => {});
    try { video.playbackRate = playbackRateRef.current; } catch {}
    playbackRateRef.current = Math.max(1, playbackRateRef.current - 0.12);
  }

  function reverseSeek(now: number, video: HTMLVideoElement) {
    if (video.seeking) return; // CRÍTICO: nunca múltiples seeks simultáneos
    const elapsed = now - lastReverseSeekRef.current;
    if (elapsed < 1000 / 12) return;
    lastReverseSeekRef.current = now;
    const step = 0.08 * Math.max(1, playbackRateRef.current);
    const newTime = Math.max(0, video.currentTime - step);
    video.currentTime = newTime;
    currentTimeRef.current = newTime;
  }

  useEffect(() => {
    if (reducedMotion) return;
    let disposed = false;
    const video = videoRef.current;
    if (!video) return;

    window.addEventListener("wheel", handleWheel, { passive: false });
    wheelHandler = handleWheel;

    const wrap = document.getElementById("hero") ?? document.body;
    wrap.addEventListener("touchstart", handleTouchStart, { passive: true });
    wrap.addEventListener("touchmove", handleTouchMove, { passive: false });
    touchElements.push(wrap);

    window.addEventListener("keydown", handleKey);
    keyHandler = handleKey;

    video.play().catch(() => {});
    try { video.currentTime = 0; } catch {}

    const loop = (now: number) => {
      if (disposed) return;
      const dt = Math.min(0.1, (now - lastFrameRef.current) / 1000);
      lastFrameRef.current = now;

      if (transportStateRef.current === "armed") {
        if (transportProgressRef.current >= 0.999) {
          releaseTransport();
          rafRef.current = requestAnimationFrame(loop);
          return;
        }
        if (transportProgressRef.current > (currentTimeRef.current / (video.duration || 1))) {
          forwardSeek(dt, video);
        } else {
          reverseSeek(now, video);
        }
      } else {
        const videoNow = video.currentTime;
        const target = video.duration ? transportProgressRef.current * video.duration : 0;
        const diff = target - videoNow;
        if (Math.abs(diff) > 0.05) {
          video.currentTime += diff * (1 - Math.exp(-dt * 8));
          currentTimeRef.current = video.currentTime;
        }
        if (video.currentTime >= video.duration - 0.01) {
          video.pause();
          video.currentTime = video.duration;
        }
        if (window.scrollY <= 2 && !navigationInProgressRef.current && !armedLockRef.current) {
          rearmTransport();
        }
      }
      if (!disposed) rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafRef.current);
      if (wheelHandler) window.removeEventListener("wheel", wheelHandler);
      touchElements.forEach((el) => {
        el.removeEventListener("touchstart", handleTouchStart);
        el.removeEventListener("touchmove", handleTouchMove);
      });
      if (keyHandler) window.removeEventListener("keydown", keyHandler);
      video.pause();
      touchElements.length = 0;
    };
  }, [videoRef, reducedMotion]);

  return {
    transportState: transportStateRef,
    progress: transportProgressRef,
    currentTime: currentTimeRef,
    navigateToSection,
    rearm: rearmTransport,
  };
}
