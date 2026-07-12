import { useEffect, useRef } from "react";

// Liga el currentTime de un <video> al progreso de scroll de su sección
// (0 = sección arriba del todo, 1 = sección fuera del viewport por arriba).
// Devuelve { sectionRef, videoRef } para colgar en la sección y en el video.
//
// El mp4 se descarga completo como blob para que los saltos de currentTime
// sean instantáneos (sin re-buffering al saltar hacia atrás); si el fetch
// falla se cae al streaming normal. El bucle rAF interpola (lerp) hacia el
// progreso objetivo para suavizar los saltos entre keyframes del video.
// Con prefers-reduced-motion no hay scrubbing: queda el primer frame.
export function useScrollVideo(src) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    let objectUrl = null;
    let cancelled = false;

    fetch(src)
      .then((r) => (r.ok ? r.blob() : Promise.reject(new Error(r.status))))
      .then((blob) => {
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        video.src = objectUrl;
      })
      .catch(() => {
        if (!cancelled) video.src = src;
      });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => {
        cancelled = true;
        if (objectUrl) URL.revokeObjectURL(objectUrl);
      };
    }

    let rafId = 0;
    let current = 0; // progreso ya aplicado al video (0–1)

    const tick = () => {
      const rect = section.getBoundingClientRect();
      const target = Math.min(1, Math.max(0, -rect.top / rect.height));
      current += (target - current) * 0.14;
      // Solo escribir currentTime con deltas perceptibles: seeks constantes
      // de sub-milisegundo degradan el rendimiento sin cambiar el frame.
      if (video.duration && Math.abs(video.currentTime - current * video.duration) > 0.01) {
        video.currentTime = current * video.duration;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [src]);

  return { sectionRef, videoRef };
}
