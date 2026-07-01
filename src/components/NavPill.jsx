import { COLORS } from "../theme/colors";

export function NavPill({ href, children, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="font-body text-sm px-4 py-2 rounded-full transition-colors duration-200"
      style={{ color: COLORS.linenDim }}
      onMouseEnter={(e) => { e.currentTarget.style.color = COLORS.linen; e.currentTarget.style.backgroundColor = "rgba(246,236,224,0.06)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = COLORS.linenDim; e.currentTarget.style.backgroundColor = "transparent"; }}
    >
      {children}
    </a>
  );
}
