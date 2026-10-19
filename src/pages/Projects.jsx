import React from "react";
import InfoPage from "../components/sections/InfoPage.jsx";
import { mockAdapter } from "../services/adapters/mockAdapter.js";

export default function Projects() {
  const [projects, setProjects] = React.useState([]);
  React.useEffect(() => { mockAdapter.getProjects().then(setProjects); }, []);
  return <InfoPage title="Solar project portfolio" intro="Explore project examples and the kinds of details we consider when planning rooftop solar.">
    <div className="feature-grid">
      {projects.map((project) => <article className="feature-card" key={project.id}>
        <span>{project.project_type} · {project.capacity_kw} kW</span><h2>{project.title}</h2>
        <p>{project.locality_label}</p><p>{project.summary}</p>
        <small>Demo content — replace with a verified customer project before publishing.</small>
      </article>)}
      {!projects.length && <p>Project examples will appear here soon.</p>}
    </div>
    <p className="notice">No customer address or exact installation pin is shown. Project details should be published only with permission and after verification.</p>
  </InfoPage>;
}
