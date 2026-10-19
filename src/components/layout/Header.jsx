// src/components/layout/Header.jsx
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

function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__logo">
          <img src={SITE_CONFIG.logoPath} alt={`${SITE_CONFIG.businessName} logo`} />
        </Link>
        <nav className="header__nav" aria-label="Main navigation">
          <ul className="nav__list">
            {navItems.map((item) => (
              <li key={item.to} className="nav__item">
                <NavLink
                  to={item.to}
                  className={({ isActive }) => (isActive ? "nav__link active" : "nav__link")}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header__actions">
          <a href={`tel:${SITE_CONFIG.phone}`} className="button button--primary">
            Call
          </a>
          <Link to="/contact" className="button button--accent">
            Get Free Quote
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
