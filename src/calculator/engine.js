// src/calculator/engine.js
/**
 * Pure calculator functions – they never touch the DOM or browser APIs.
 * All numeric assumptions come from src/calculator/assumptions.js.
 * Input is an object matching the shape defined in src/lib/schemas.js (leadData).
 */
import { ASSUMPTIONS } from "./assumptions.js";

/**
 * Helper – estimate daily solar generation (kWh) for a given capacity.
 */
function dailyGenerationKw(capacityKw) {
  return capacityKw * ASSUMPTIONS.UNITS_PER_KW_PER_DAY;
}

/**
 * Estimate recommended capacity based on monthly electricity consumption.
 * Simple rule of thumb: 1 kW covers ~30 kWh per month.
 */
export function recommendCapacity({ monthlyBill, tariff = ASSUMPTIONS.DEFAULT_TARIFF }) {
  // Convert monthly bill to monthly consumption (kWh) = bill / tariff
  const monthlyConsumption = monthlyBill / tariff;
  const capacityKw = Math.max(1, Math.round(monthlyConsumption / 30));
  return capacityKw;
}

/**
 * Calculate cost, savings and payback.
 * Returns an object with all numbers rounded to two decimals.
 */
export function calculateQuote({ monthlyBill, tariff = ASSUMPTIONS.DEFAULT_TARIFF, propertyType, city, roofArea }) {
  const capacityKw = recommendCapacity({ monthlyBill, tariff });
  const installationCost = capacityKw * ASSUMPTIONS.COST_PER_KW;

  // Monthly generation (kWh) → monetary saving = generation * tariff
  const monthlyGen = dailyGenerationKw(capacityKw) * 30; // approx per month
  const monthlySaving = monthlyGen * tariff;
  const annualSaving = monthlySaving * 12;

  // Simple payback period (years)
  const paybackYears = installationCost / annualSaving;

  // Long‑term scenario – apply degradation and escalation over 25 years
  const years = 25;
  let totalSaving = 0;
  let currentTariff = tariff;
  for (let y = 1; y <= years; y++) {
    const gen = monthlyGen * Math.pow(1 - ASSUMPTIONS.DEGRADATION_RATE, y - 1);
    totalSaving += gen * currentTariff * 12;
    currentTariff *= 1 + ASSUMPTIONS.ESCALATION_RATE;
  }

  return {
    capacityKw,
    installationCost,
    monthlySaving,
    annualSaving,
    paybackYears: Number(paybackYears.toFixed(2)),
    longTermSaving: Number(totalSaving.toFixed(2)),
  };
}
