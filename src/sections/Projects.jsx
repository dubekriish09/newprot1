import { useState } from "react";
import { Arrow } from "../components/Brand.jsx";
import { PHOTOS } from "../config/site.js";

// Illustrative planning examples, NOT completed installations. Replace with
// verified, permissioned projects (and real photos) as they become available.
const PROJECTS = [
  { type: "Residential", title: "Independent home rooftop", size: "Concept example · 3–5 kW", image: PHOTOS.home,
    text: "A rooftop system designed around household usage, roof orientation and available shadow-free space." },
  { type: "Commercial", title: "Commercial rooftop", size: "Concept example · 20–100 kW", image: PHOTOS.commercial,
    text: "A business-focused solar layout intended to offset daytime electricity demand." },
  { type: "Industrial", title: "Industrial roof assessment", size: "Concept example · 100 kW+", image: PHOTOS.panels,
    text: "A larger-site feasibility workflow that considers roof structure, load profile and electrical infrastructure." },
];
const FILTERS = ["All", "Residential", "Commercial", "Industrial"];

export default function Projects() {
  const [type, setType] = useState("All");
  const visible = type === "All" ? PROJECTS : PROJECTS.filter((p) => p.type === type);

  return (
    <section className="work-section section-pad" id="projects">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span /> PLANNING FOR DIFFERENT SITES</p>
            <h2>
              Built around the
              <br />
              <em>place it powers.</em>
            </h2>
          </div>
          <div className="work-heading-right">
            <p>
              Explore the kinds of properties we can assess. These are illustrative design examples, not claimed completed
              installations.
            </p>
            <div className="filter-tabs">
              {FILTERS.map((t) => (
                <button key={t} type="button" className={type === t ? "filter active" : "filter"} aria-pressed={type === t} onClick={() => setType(t)}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="project-grid">
          {visible.map((p, i) => (
            <article className="project-card" key={p.title}>
              <div className="project-image" style={{ backgroundImage: `url(${p.image})` }} role="presentation">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span className="project-arrow"><Arrow diagonal /></span>
              </div>
              <div className="project-info">
                <span className="project-type">{p.type} · {p.size}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <a href="#contact" className="text-link">Discuss a similar site <Arrow diagonal /></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
