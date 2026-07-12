import { useEffect, useRef, useState } from "react";

// Envuelve contenido para revelarlo al entrar en viewport (una sola vez).
// Usa IntersectionObserver + CSS (ver .reveal en index.css). Sin dependencias externas.
// variant: "up" (default) | "left" | "right" | "scale" | "blur"
export function Reveal({ children, delay = 0, variant = "up", as: Tag = "div", className = "", style, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el); // revelar una sola vez
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const variantClass = variant === "up" ? "" : `reveal-${variant}`;

  return (
    <Tag
      ref={ref}
      className={`reveal ${variantClass} ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, animationDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
