// src/calculator/assumptions.js
/**
 * Cost & performance assumptions used by the calculator engine.
 * All values are marked as placeholders – replace before launch.
 */

export const ASSUMPTIONS = {
  // ASSUMPTION - VERIFY BEFORE LAUNCH
  COST_PER_KW: 80000, // INR per kW of installed capacity
  // ASSUMPTION - VERIFY BEFORE LAUNCH
  UNITS_PER_KW_PER_DAY: 4, // average solar output (kWh) per kW per day
  // ASSUMPTION - VERIFY BEFORE LAUNCH
  DEFAULT_TARIFF: 8, // INR per unit (kWh) used if user does not provide tariff
  // ASSUMPTION - VERIFY BEFORE LAUNCH
  DEGRADATION_RATE: 0.005, // 0.5% loss per year
  // ASSUMPTION - VERIFY BEFORE LAUNCH
  ESCALATION_RATE: 0.04, // 4% yearly electricity price increase
  // ASSUMPTION - VERIFY BEFORE LAUNCH
  PAYBACK_YEARS: 5, // expected payback period for rough estimate
};
