/**
 * Every number the estimator relies on lives here, in one place.
 *
 * These are PLANNING PLACEHOLDERS, not quotations. The client must confirm
 * COST_PER_KW_INR (and review the others) before launch - customers will
 * read the resulting figures as the company's pricing.
 */
export const ASSUMPTIONS = Object.freeze({
  COST_PER_KW_INR: 52000, // VERIFY: installed cost per kW, before any subsidy
  PERFORMANCE_RATIO: 0.78, // share of ideal output actually delivered
  SELF_CONSUMPTION: 0.82, // share of generation that offsets the bill
  MIN_KW: 1,
  MAX_KW: 500,
  DAYS_PER_MONTH: 30,
  DAYS_PER_YEAR: 365,
});

/** Slider bounds, shared by the UI and the engine so they can never drift apart. */
export const LIMITS = Object.freeze({
  bill: Object.freeze({ min: 1000, max: 100000, step: 500, default: 4500 }),
  tariff: Object.freeze({ min: 4, max: 16, step: 0.5, default: 8 }),
  sunHours: Object.freeze({ min: 3, max: 6.5, step: 0.5, default: 4.5 }),
});
