import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { GoldCalculator } from "./pages/GoldCalculator";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { NotFound } from "./pages/NotFound";
import Lenis from "lenis";
import { useEffect } from "react";
import { useMetalRates } from "./context/MetalRateContext";


function App() {
const { rates, loading, error } = useMetalRates();
  // Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
  useEffect(() => {
  if (!loading) {
    console.log("Context Data:", rates);
  }
}, [loading, rates]);

  // Gold API Test
  

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        <Route
          path="/store"
          element={
            <MainLayout>
              <Store />
            </MainLayout>
          }
        />

        <Route
          path="/about"
          element={
            <MainLayout>
              <About />
            </MainLayout>
          }
        />

        <Route
          path="/contact"
          element={
            <MainLayout>
              <Contact />
            </MainLayout>
          }
        />

        <Route
          path="/gold-calculator"
          element={
            <MainLayout>
              <GoldCalculator />
            </MainLayout>
          }
        />

        <Route
          path="/privacy"
          element={
            <MainLayout>
              <Privacy />
            </MainLayout>
          }
        />

        <Route
          path="/terms"
          element={
            <MainLayout>
              <Terms />
            </MainLayout>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;