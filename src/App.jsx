import { COLORS } from "./theme/colors";
import { Grain } from "./components/Grain";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="font-body min-h-screen w-full" style={{ backgroundColor: COLORS.void, color: COLORS.linen }}>
      {/* Grano ambiental sobre toda la página */}
      <div className="fixed inset-0 z-0"><Grain /></div>

      <Header />
      <Hero />
      <Services />
      <Footer />
    </div>
  );
}
