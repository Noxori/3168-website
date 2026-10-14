import { useEffect, useState } from "react";
import Preloader from "@/components/Preloader";
import CookieConsent from "@/components/CookieConsent";
import Marquee from "@/components/Marquee";
import Nav from "@/sections/Nav";
import Hero from "@/sections/Hero";
import Connect from "@/sections/Connect";
import Footer from "@/sections/Footer";

export default function Home() {
  const [sceneReady, setSceneReady] = useState(false);
  const [started, setStarted] = useState(false);

  // safety: never hold the gate longer than 7s
  useEffect(() => {
    const t = setTimeout(() => setSceneReady(true), 7000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Preloader ready={sceneReady} onComplete={() => setStarted(true)} />

      <Nav />

      <main id="main">
        <Hero started={started} onSceneReady={() => setSceneReady(true)} />

        <Marquee
          tag="Ethos"
          items={["BUILT FROM CONCRETE", "FINISHED IN GOLD", "3168 WORLDWIDE"]}
          duration={32}
          variant="gold"
        />

        <Connect />
      </main>

      <Footer />
      <CookieConsent />
    </>
  );
}
