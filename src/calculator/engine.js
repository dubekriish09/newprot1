import { ASSUMPTIONS as A, LIMITS } from "./assumptions.js";

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

function requireNumber(value, name) {
  const n = Number(value);
  if (value === "" || value === null || value === undefined || !Number.isFinite(n)) {
    throw new RangeError(`${name} must be a number.`);
  }
  return n;
}

/**
 * Illustrative rooftop-solar estimate. Pure function: same inputs, same output.
 *
 * Savings are capped at the customer's current bill - solar cannot save more
 * than is being paid. (The previous implementation could, for small bills
 * where the 1 kW minimum system out-produces household usage.)
 */
export function estimateSolar({ monthlyBill, tariff, sunHours }) {
  const bill = clamp(requireNumber(monthlyBill, "Monthly bill"), LIMITS.bill.min, LIMITS.bill.max);
  const rate = clamp(requireNumber(tariff, "Tariff"), LIMITS.tariff.min, LIMITS.tariff.max);
  const sun = clamp(requireNumber(sunHours, "Sun hours"), LIMITS.sunHours.min, LIMITS.sunHours.max);

  const monthlyUnits = bill / rate;
  const idealKw = monthlyUnits / A.DAYS_PER_MONTH / sun / A.PERFORMANCE_RATIO;
  const recommendedKw = clamp(Math.round(idealKw * 10) / 10, A.MIN_KW, A.MAX_KW);

  const dailyGeneration = recommendedKw * sun * A.PERFORMANCE_RATIO;
  const annualGeneration = dailyGeneration * A.DAYS_PER_YEAR;
  const uncappedSavings = annualGeneration * rate * A.SELF_CONSUMPTION;
  const annualBill = bill * 12;
  const annualSavings = Math.min(uncappedSavings, annualBill);
  const installedCost = recommendedKw * A.COST_PER_KW_INR;
  const payback = annualSavings > 0 ? installedCost / annualSavings : null;

  return {
    monthlyUnits,
    recommendedKw,
    dailyGeneration,
    annualGeneration,
    annualSavings,
    installedCost,
    payback,
    savingsCapped: uncappedSavings > annualBill,
  };
}
