import { describe, expect, it } from "vitest";
import { ASSUMPTIONS, LIMITS } from "./assumptions.js";
import { estimateSolar } from "./engine.js";

const base = { monthlyBill: 4500, tariff: 8, sunHours: 4.5 };

describe("estimateSolar", () => {
  it("matches the figures the live site showed for the default inputs", () => {
    const r = estimateSolar(base);
    expect(r.recommendedKw).toBe(5.3);
    expect(Math.round(r.annualGeneration)).toBe(6790);
    expect(Math.round(r.annualSavings)).toBe(44543);
    expect(r.installedCost).toBeCloseTo(5.3 * ASSUMPTIONS.COST_PER_KW_INR);
    expect(r.payback).toBeCloseTo(6.19, 2);
    expect(r.savingsCapped).toBe(false);
  });

  it("never claims more annual savings than the customer's annual bill", () => {
    // 1 kW minimum system out-produces a very small household's usage.
    const r = estimateSolar({ monthlyBill: 1000, tariff: 16, sunHours: 6.5 });
    expect(r.annualSavings).toBe(12000);
    expect(r.savingsCapped).toBe(true);
  });

  it("enforces the minimum and maximum system size", () => {
    expect(estimateSolar({ monthlyBill: 1000, tariff: 16, sunHours: 6.5 }).recommendedKw).toBe(ASSUMPTIONS.MIN_KW);
    const big = estimateSolar({ monthlyBill: LIMITS.bill.max, tariff: LIMITS.tariff.min, sunHours: LIMITS.sunHours.min });
    expect(big.recommendedKw).toBeLessThanOrEqual(ASSUMPTIONS.MAX_KW);
  });

  it("clamps out-of-range inputs instead of producing nonsense", () => {
    const r = estimateSolar({ monthlyBill: 10_000_000, tariff: 0, sunHours: 99 });
    expect(Number.isFinite(r.annualSavings)).toBe(true);
    expect(r.recommendedKw).toBeLessThanOrEqual(ASSUMPTIONS.MAX_KW);
  });

  it.each([["", "bill"], [undefined, "bill"], ["abc", "bill"], [NaN, "bill"]])("rejects non-numeric bill %p", (bad) => {
    expect(() => estimateSolar({ ...base, monthlyBill: bad })).toThrow(RangeError);
  });

  it("is monotonic: a larger bill never suggests a smaller system", () => {
    let prev = 0;
    for (let bill = LIMITS.bill.min; bill <= LIMITS.bill.max; bill += 2500) {
      const kw = estimateSolar({ ...base, monthlyBill: bill }).recommendedKw;
      expect(kw).toBeGreaterThanOrEqual(prev);
      prev = kw;
    }
  });
});
