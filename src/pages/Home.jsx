// src/pages/Home.jsx
import React from "react";
import Hero from "../components/sections/Hero.jsx";
import CalculatorForm from "../components/sections/CalculatorForm.jsx";

function Home() {
  return (
    <>
      <Hero />
      {/* Calculator is embedded directly below the hero as required */}
      <CalculatorForm />
    </>
  );
}

export default Home;
