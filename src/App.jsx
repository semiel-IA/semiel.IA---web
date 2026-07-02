import { COLORS } from "./theme/colors";
import { Grain } from "./components/Grain";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ParaNegociosSection } from "./components/ParaNegociosSection";
import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="font-body min-h-screen w-full" style={{ backgroundColor: COLORS.void, color: COLORS.linen }}>
      {/* Grano ambiental sobre toda la página */}
      <div className="fixed inset-0 z-0"><Grain /></div>

      <Header />
      <main>
        <Hero />
        <ParaNegociosSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
