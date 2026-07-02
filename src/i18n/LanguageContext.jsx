import { createContext, useContext, useEffect, useState } from "react";
import { TRANSLATIONS } from "./translations";

const LanguageContext = createContext(null);

const STORAGE_KEY = "semiel-lang";

function initialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "es" || saved === "en") return saved;
  } catch {
    // localStorage no disponible (p. ej. SSR / modo privado) — usamos el default
  }
  return "es"; // español por defecto
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignoramos errores de almacenamiento
    }
    document.documentElement.lang = lang;
  }, [lang]);

  const value = { lang, setLang, t: TRANSLATIONS[lang] };
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// Hook para consumir idioma activo y textos: const { lang, setLang, t } = useLang();
export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang debe usarse dentro de <LanguageProvider>");
  return ctx;
}
