import { COLORS } from "../theme/colors";

// Botón basado en <a> con tres variantes: primary, secondary y whatsapp.
// Soporta un ícono opcional y un subtexto pequeño bajo la etiqueta.
const VARIANTS = {
  primary: {
    bg: COLORS.emberCore,
    bgHover: COLORS.emberCoreHover,
    color: COLORS.void,
    border: "transparent",
  },
  secondary: {
    bg: "transparent",
    bgHover: "rgba(246,236,224,0.06)",
    color: COLORS.linen,
    border: COLORS.borderStrong,
  },
  whatsapp: {
    bg: COLORS.whatsapp,
    bgHover: COLORS.whatsappHover,
    color: COLORS.void,
    border: "transparent",
  },
};

export function Button({
  href = "#",
  variant = "primary",
  icon: Icon,
  children,
  subtext,
  size = "md",
  className = "",
  ...rest
}) {
  const v = VARIANTS[variant] ?? VARIANTS.primary;
  const pad = size === "lg" ? "px-8 py-4" : "px-6 py-3";

  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold transition-all duration-200 hover:-translate-y-0.5 ${pad} ${className}`}
      style={{ backgroundColor: v.bg, color: v.color, border: `1px solid ${v.border}` }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = v.bgHover; }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = v.bg; }}
      {...rest}
    >
      {Icon && <Icon size={size === "lg" ? 20 : 18} />}
      {subtext ? (
        <span className="flex flex-col items-start leading-tight text-left">
          <span className={size === "lg" ? "text-base" : "text-sm"}>{children}</span>
          <span className="text-[11px] font-normal opacity-75">{subtext}</span>
        </span>
      ) : (
        <span className={size === "lg" ? "text-base" : "text-sm"}>{children}</span>
      )}
    </a>
  );
}
