import React from "react";
import CalculatorForm from "../components/sections/CalculatorForm.jsx";
import InfoPage from "../components/sections/InfoPage.jsx";

export default function Calculator() {
  return <InfoPage title="Estimate your solar savings" intro="Enter your monthly electricity bill and a few optional details to get an initial system-size and savings estimate." cta={false}>
    <CalculatorForm />
  </InfoPage>;
}
