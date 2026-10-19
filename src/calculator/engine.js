import { ASSUMPTIONS } from "./assumptions.js";

function dailyGeneration(capacityKw) {
  return capacityKw * ASSUMPTIONS.UNITS_PER_KW_PER_DAY;
}

/** Estimate capacity from bill and tariff. This is a planning estimate, not system design. */
export function recommendCapacity({ monthlyBill, tariff = ASSUMPTIONS.DEFAULT_TARIFF, roofArea }) {
  const bill = Number(monthlyBill);
  const rate = Number(tariff);
  if (!Number.isFinite(bill) || bill <= 0) throw new Error("Monthly bill must be greater than zero.");
  if (!Number.isFinite(rate) || rate <= 0) throw new Error("Tariff must be greater than zero.");
  const monthlyConsumption = bill / rate;
  // At 4 kWh/kW/day, 1 kW generates about 120 kWh in a 30-day month.
  let capacityKw = Math.max(1, Math.ceil(monthlyConsumption / (ASSUMPTIONS.UNITS_PER_KW_PER_DAY * 30)));
  if (Number.isFinite(Number(roofArea)) && Number(roofArea) > 0) {
    const roughRoofLimit = Math.max(1, Math.floor(Number(roofArea) / 8));
    capacityKw = Math.min(capacityKw, roughRoofLimit);
  }
  return capacityKw;
}

export function calculateQuote({ monthlyBill, tariff = ASSUMPTIONS.DEFAULT_TARIFF, propertyType, city, roofArea }) {
  const bill = Number(monthlyBill);
  const rate = Number(tariff);
  const capacityKw = recommendCapacity({ monthlyBill: bill, tariff: rate, roofArea });
  const installationCost = capacityKw * ASSUMPTIONS.COST_PER_KW;
  const monthlyGeneration = dailyGeneration(capacityKw) * 30;
  // Conservative placeholder; real savings depend on self-consumption and export rules.
  const selfConsumptionRatio = 0.8;
  const monthlySaving = Math.min(bill, monthlyGeneration * rate * selfConsumptionRatio);
  const annualSaving = monthlySaving * 12;
  const paybackYears = annualSaving > 0 ? installationCost / annualSaving : null;

  let totalGrossSavings = 0;
  let currentTariff = rate;
  for (let year = 1; year <= 25; year++) {
    const generation = monthlyGeneration * Math.pow(1 - ASSUMPTIONS.DEGRADATION_RATE, year - 1);
    totalGrossSavings += Math.min(bill * 12, generation * currentTariff * 12 * selfConsumptionRatio);
    currentTariff *= 1 + ASSUMPTIONS.ESCALATION_RATE;
  }
  return {
    capacityKw,
    installationCost: Math.round(installationCost),
    monthlySaving: Math.round(monthlySaving),
    annualSaving: Math.round(annualSaving),
    paybackYears: paybackYears === null ? null : Number(paybackYears.toFixed(1)),
    // Net of estimated initial installation cost; not a guaranteed financial forecast.
    longTermSaving: Math.round(Math.max(0, totalGrossSavings - installationCost)),
    estimateNote: "Illustrative only: assumes 4 kWh per kW per day, 80% self-consumption, the entered tariff, and simplified 25-year escalation/degradation. Actual savings require a site survey and tariff review.",
    propertyType, city, roofArea
  };
}
