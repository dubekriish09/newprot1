import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { estimateSolar } from "./calculator/engine.js";
import { LIMITS } from "./calculator/assumptions.js";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import { SITE } from "./config/site.js";
import { useRoute } from "./hooks/useRoute.js";
import { billToRange } from "./lib/validation.js";
import Privacy from "./pages/Privacy.jsx";
import Approach from "./sections/Approach.jsx";
import Calculator from "./sections/Calculator.jsx";
import Contact from "./sections/Contact.jsx";
import Coverage from "./sections/Coverage.jsx";
import Faq from "./sections/Faq.jsx";
import Hero from "./sections/Hero.jsx";
import Intro from "./sections/Intro.jsx";
import Projects from "./sections/Projects.jsx";
import Solutions from "./sections/Solutions.jsx";

export default function App() {
  const route = useRoute();
  const mainRef = useRef(null);
  const baseTitle = useRef(document.title);
  const [inputs, setInputs] = useState({ bill: LIMITS.bill.default, tariff: LIMITS.tariff.default, sunHours: LIMITS.sunHours.default });
  const [touched, setTouched] = useState(false); // attach the estimate to a lead only if it was used
  const [prefill, setPrefill] = useState(null);
  const estimate = useMemo(() => estimateSolar({ monthlyBill: inputs.bill, tariff: inputs.tariff, sunHours: inputs.sunHours }), [inputs]);

  // Keep scroll position, focus and title right when switching hash routes.
  useEffect(() => {
    if (route === "privacy") {
      document.title = `Privacy notice | ${SITE.name}`;
      window.scrollTo(0, 0);
      mainRef.current?.focus({ preventScroll: true });
      return;
    }
    document.title = baseTitle.current;
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = id && document.getElementById(id);
    // Jump (not glide) after a page switch; in-page anchor clicks keep the smooth CSS scroll.
    if (target) target.scrollIntoView({ behavior: "instant" });
    else window.scrollTo(0, 0);
  }, [route]);

  const skipToContent = (e) => {
    e.preventDefault();
    mainRef.current?.focus();
  };

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main" onClick={skipToContent}>Skip to main content</a>
      <Header />
      <main id="main" tabIndex={-1} ref={mainRef}>
        {route === "privacy" ? (
          <Privacy />
        ) : (
          <>
            <Hero />
            <Intro />
            <Solutions />
            <Calculator
              inputs={inputs}
              estimate={estimate}
              onChange={(field, value) => { setInputs((p) => ({ ...p, [field]: value })); setTouched(true); }}
              onDiscuss={() => { setTouched(true); setPrefill({ range: billToRange(inputs.bill) }); }}
            />
            <Approach />
            <Projects />
            <Coverage />
            <Faq />
            <Contact estimate={touched ? estimate : null} prefill={prefill} />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
