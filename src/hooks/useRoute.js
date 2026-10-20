import { useEffect, useState } from "react";

/**
 * Tiny hash router. "#/privacy" is the privacy page; anything else (including
 * in-page anchors like "#contact") is the home page. Hash routing means the
 * site works on any static host with no rewrite rules.
 */
const read = () => (window.location.hash === "#/privacy" ? "privacy" : "home");

export function useRoute() {
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const onChange = () => setRoute(read());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}
