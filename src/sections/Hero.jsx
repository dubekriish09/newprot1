import { Arrow } from "../components/Brand.jsx";
import { PHOTOS } from "../config/site.js";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <img
        className="hero-image"
        src={PHOTOS.hero.src}
        srcSet={PHOTOS.hero.srcSet}
        sizes="100vw"
        alt="Solar panels catching sunlight on a rooftop"
        fetchPriority="high"
        decoding="async"
        width="1800"
        height="1200"
      />
      <div className="hero-shade" />
      <div className="container hero-content">
        <p className="eyebrow light"><span /> SOLAR, MADE MORE PRACTICAL</p>
        <h1>
          Make your roof
          <br />
          work <em>for you.</em>
        </h1>
        <p className="hero-copy">
          Thoughtfully planned solar for Indian homes and businesses. Understand your potential savings, explore the right
          system, and take the next step with confidence.
        </p>
        <div className="hero-actions">
          <a className="button button-lime" href="#calculator">Estimate my savings <Arrow diagonal /></a>
          <a className="button button-glass" href="#solutions">Explore solutions <Arrow /></a>
        </div>
        <div className="hero-foot">
          <span>01 / 03</span>
          <span className="hero-line" />
          <span>Residential · Commercial · Industrial</span>
        </div>
      </div>
      <div className="hero-stamp" aria-hidden="true">
        <span>POWERED BY</span>
        <strong>THE SUN</strong>
        <span className="stamp-sun">☼</span>
      </div>
    </section>
  );
}
