import { useEffect, useRef } from "react";

// Escribe en el elemento la variable CSS --parallax (0 → 1) según cuánto de la
// sección ha salido del viewport por arriba. Sin re-renders de React: un solo
// style.setProperty por frame (scroll pasivo + requestAnimationFrame).
// Con prefers-reduced-motion no hace nada (la variable conserva su valor inicial).
export function useScrollParallax() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / rect.height));
      el.style.setProperty("--parallax", progress.toFixed(4));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}
