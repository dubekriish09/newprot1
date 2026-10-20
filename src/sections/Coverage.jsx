import { useState } from "react";
import { Arrow } from "../components/Brand.jsx";

const MAP_SRC = "https://www.openstreetmap.org/export/embed.html?bbox=68.1%2C6.4%2C97.5%2C35.8&layer=mapnik";

export default function Coverage() {
  // The map is third-party content: load it only when the visitor asks, which
  // keeps the page fast and avoids sending their IP to OpenStreetMap unprompted.
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <section className="coverage section-pad" id="coverage">
      <div className="container coverage-layout">
        <div className="coverage-copy">
          <p className="eyebrow"><span /> LOCAL KNOWLEDGE MATTERS</p>
          <h2>
            Solar starts
            <br />
            with <em>your location.</em>
          </h2>
          <p>
            Sunlight, local utility rules, roof conditions and installation logistics vary by region. Share your city or PIN
            code and we'll use it as the starting point for a serviceability discussion.
          </p>
          <div className="coverage-points">
            <span><b>01</b> Location-first assessment</span>
            <span><b>02</b> Site and roof suitability</span>
            <span><b>03</b> Local rules checked during proposal</span>
          </div>
          <a className="button button-dark" href="#contact">Check my location <Arrow diagonal /></a>
        </div>
        <div className="map-card">
          <div className="map-top">
            <div>
              <span className="map-overline">LOCATION EXPLORER</span>
              <h3>Start with your area</h3>
            </div>
            <span className="map-pin" aria-hidden="true">⌖</span>
          </div>
          <div className="map-frame">
            {mapLoaded ? (
              <iframe title="OpenStreetMap overview of India" src={MAP_SRC} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />
            ) : (
              <button type="button" className="map-placeholder" onClick={() => setMapLoaded(true)}>
                <span aria-hidden="true">⌖</span>
                Load interactive map
                <small>Loads content from OpenStreetMap</small>
              </button>
            )}
          </div>
          <div className="map-bottom">
            <span><i className="map-dot" /> India overview · illustrative only</span>
            <a href="https://www.openstreetmap.org/#map=5/22.5/79.0" target="_blank" rel="noopener noreferrer">
              Explore map <Arrow diagonal />
            </a>
          </div>
          <p className="map-disclaimer">
            This map does not show verified project locations or confirm service availability. Coverage must be confirmed with
            the Shriram team.
          </p>
        </div>
      </div>
    </section>
  );
}
