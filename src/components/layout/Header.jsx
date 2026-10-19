import React from "react";
import { Link, NavLink } from "react-router-dom";
import { SITE_CONFIG } from "../../config/site.js";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/residential", label: "Residential" },
  { to: "/commercial", label: "Commercial & Industrial" },
  { to: "/calculator", label: "Calculator" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand-lockup" aria-label="Shriram Solar Solutions home" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark" aria-hidden="true">S</span>
          <span><strong>{SITE_CONFIG.businessName}</strong><small>POWERING A BRIGHTER TOMORROW</small></span>
        </Link>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Close" : "Menu"}</button>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
          {navItems.map((item) => <NavLink key={item.to} to={item.to} end={item.to === "/"} onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>{item.label}</NavLink>)}
          <Link to="/contact" className="button button--primary nav-quote" onClick={() => setMenuOpen(false)}>Get a quote</Link>
        </nav>
      </div>
    </header>
  );
}
