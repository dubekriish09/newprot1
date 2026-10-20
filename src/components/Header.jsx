import { useEffect, useState } from "react";
import { Arrow, Brand } from "./Brand.jsx";

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <aside className="topline" aria-label="Announcement">
        <span>
          <i className="status-dot" /> Solar solutions for homes, businesses & industry
        </span>
        <span>
          Designed for India's sunshine <b aria-hidden="true">✳</b>
        </span>
      </aside>
      <header className="site-header">
        <div className="container nav-wrap">
          <Brand />
          <button
            type="button"
            className="menu-toggle"
            aria-label="Toggle navigation"
            aria-expanded={open}
            aria-controls="main-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
          <nav id="main-nav" className={open ? "nav-links open" : "nav-links"} aria-label="Main navigation">
            <a href="#solutions" onClick={close}>Solutions</a>
            <a href="#calculator" onClick={close}>Savings calculator</a>
            <a href="#work" onClick={close}>Our approach</a>
            <a href="#coverage" onClick={close}>Coverage</a>
            <a className="nav-cta" href="#contact" onClick={close}>
              Get a consultation <Arrow diagonal />
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}
