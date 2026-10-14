import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router";
import Home from "./pages/Home";
import ArtistsPage from "./pages/ArtistsPage";
import ReleasesPage from "./pages/ReleasesPage";
import MerchPage from "./pages/MerchPage";
import ManifestoPage from "./pages/ManifestoPage";
import ContactPage from "./pages/ContactPage";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";
import { initSmoothScroll } from "./lib/motion";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    initSmoothScroll();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/artists" element={<ArtistsPage />} />
      <Route path="/releases" element={<ReleasesPage />} />
      <Route path="/merch" element={<MerchPage />} />
      <Route path="/manifesto" element={<ManifestoPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/:slug" element={<Legal />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
