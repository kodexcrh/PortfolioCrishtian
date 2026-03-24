import { useState } from "react";

// Estilos globales
import GlobalStyles from "./components/GlobalStyles";

// Layout
import BackgroundOrbs from "./components/BackgroundOrbs";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import ScrollToTop from "./components/ScrollToTop";
import SplashScreen from "./components/SplashScreen";
import CustomCursor from "./components/CustomCursor";
import WhatsAppButton from "./components/WhatsAppButton";

// Secciones
import Hero from "./components/Hero";
import SobreMi from "./components/SobreMi";
import Servicios from "./components/Servicios";
import Proyectos from "./components/Proyectos";
import Stack from "./components/Stack";
import Precios from "./components/Precios";
import Testimonials from "./components/Testimonials";
import Contacto from "./components/Contacto";

export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [themeAnim, setThemeAnim] = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  const T = {
    bg:        dark ? "#07070f"                                        : "#f7f4ff",
    bgCard:    dark ? "linear-gradient(135deg,#0f0f1e,#12121f)"       : "linear-gradient(135deg,#ffffff,#faf5ff)",
    bgCard2:   dark ? "#0f0f1e"                                        : "#ffffff",
    text:      dark ? "#e8e8f0"                                        : "#1a0033",
    textMid:   dark ? "#8888a8"                                        : "#5a4070",
    textSub:   dark ? "#66668a"                                        : "#7a5a99",
    textFaint: dark ? "#44445e"                                        : "#b8a0cc",
    navBg:     dark ? "rgba(7,7,15,0.94)"                             : "rgba(247,244,255,0.94)",
    mMenuBg:   dark ? "rgba(7,7,15,0.97)"                             : "rgba(247,244,255,0.97)",
  };

  const toggleTheme = () => {
    setThemeAnim(true);
    setTimeout(() => setThemeAnim(false), 500);
    setDark((v) => !v);
  };

  return (
    <div style={{
      fontFamily: "'Syne',sans-serif",
      background: T.bg,
      color: T.text,
      minHeight: "100vh",
      overflowX: "hidden",
      transition: "background .4s, color .4s",
    }}>
      <GlobalStyles />

      {/* Splash screen */}
      {!splashDone && <SplashScreen onFinish={() => setSplashDone(true)} />}

      <ScrollProgress />
      <ScrollToTop />
      <WhatsAppButton />
      <CustomCursor />

      {/* Flash de transición de tema */}
      {themeAnim && (
        <div className="flash" style={{ background: dark ? "#8F00FF" : "#fff" }} />
      )}

      <BackgroundOrbs dark={dark} />
      <Navbar dark={dark} toggleTheme={toggleTheme} T={T} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <Hero         dark={dark} T={T} />
        <SobreMi      dark={dark} T={T} />
        <Servicios                T={T} />
        <Proyectos    dark={dark} T={T} />
        <Stack        dark={dark} T={T} />
        <Precios      dark={dark} T={T} />
        <Testimonials dark={dark} T={T} />
        <Contacto     dark={dark} T={T} />
      </div>

      <Footer T={T} />
    </div>
  );
}
