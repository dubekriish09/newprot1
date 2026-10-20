import { Arrow } from "../components/Brand.jsx";
import { PHOTOS } from "../config/site.js";

const SOLUTIONS = [
  {
    key: "home",
    className: "solution-home",
    photo: PHOTOS.home,
    index: "01 / HOME",
    title: "Residential solar",
    text: "Turn available rooftop space into a practical way to manage household electricity costs.",
    points: ["Rooftop feasibility", "Usage-based system sizing", "Guidance on next steps and applicable schemes"],
    label: "Enquire about residential solar",
  },
  {
    key: "business",
    className: "solution-business",
    photo: PHOTOS.commercial,
    index: "02 / BUSINESS",
    title: "Commercial & industrial",
    text: "Explore solar for offices, shops, warehouses and facilities with daytime power demand.",
    points: ["Load-profile assessment", "Rooftop and site planning", "Cost and payback modelling"],
    label: "Enquire about commercial solar",
  },
];

export default function Solutions() {
  return (
    <section className="solutions section-pad" id="solutions">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span /> SOLUTIONS FOR YOUR SPACE</p>
            <h2>
              One sun. Different
              <br />
              <em>ways to use it.</em>
            </h2>
          </div>
          <p>From the family home to a high-consumption facility, the right system starts with the way you use power.</p>
        </div>
        <div className="solution-grid">
          {SOLUTIONS.map((s) => (
            <article key={s.key} className={`solution-card ${s.className}`}>
              <div className="solution-photo" style={{ backgroundImage: `url(${s.photo})` }} role="presentation" />
              <div className="solution-body">
                <span className="card-index">{s.index}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <ul>{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
                <a href="#contact" className="round-link" aria-label={s.label}><Arrow diagonal /></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
