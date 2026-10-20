import { describe, expect, it } from "vitest";
import { BILL_RANGES, billToRange, normalizePhone, validateLead } from "./validation.js";

const good = { name: "Asha Verma", phone: "98765 43210", city: "Gwalior", customerType: "Home", monthlyBill: BILL_RANGES[2], message: "", consent: true };

describe("normalizePhone", () => {
  it.each([
    ["9876543210", "+919876543210"],
    ["98765 43210", "+919876543210"],
    ["+91 98765-43210", "+919876543210"],
    ["919876543210", "+919876543210"],
    ["09876543210", "+919876543210"],
    ["+14155552671", "+14155552671"],
  ])("accepts %p", (input, expected) => expect(normalizePhone(input)).toBe(expected));

  it.each(["", "12345", "5876543210", "98765432", "abcdefghij", "+12", null, undefined])("rejects %p", (input) =>
    expect(normalizePhone(input)).toBeNull());
});

describe("billToRange", () => {
  it.each([[500, 0], [1999, 0], [2000, 1], [4499, 1], [4500, 2], [7499, 2], [7500, 3], [14999, 3], [15000, 4], [50000, 4], [50001, 5]])(
    "bill %p -> option %p", (bill, idx) => expect(billToRange(bill)).toBe(BILL_RANGES[idx]));

  it("always returns a selectable option", () => {
    for (let b = 1000; b <= 100000; b += 500) expect(BILL_RANGES).toContain(billToRange(b));
  });
});

describe("validateLead", () => {
  it("accepts a complete lead and normalises it", () => {
    const r = validateLead({ ...good, name: "  Asha Verma ", city: " Gwalior " });
    expect(r.valid).toBe(true);
    expect(r.values).toMatchObject({ name: "Asha Verma", phone: "+919876543210", city: "Gwalior" });
  });

  it("requires consent", () => expect(validateLead({ ...good, consent: false }).errors.consent).toBeTruthy());
  it("rejects short names, bad phones and empty cities", () => {
    const { errors } = validateLead({ ...good, name: "A", phone: "123", city: " " });
    expect(Object.keys(errors).sort()).toEqual(["city", "name", "phone"]);
  });
  it("rejects values outside the allowed option lists", () => {
    const { errors } = validateLead({ ...good, customerType: "Hacker", monthlyBill: "free" });
    expect(errors.customerType).toBeTruthy();
    expect(errors.monthlyBill).toBeTruthy();
  });
  it("caps message length", () => expect(validateLead({ ...good, message: "x".repeat(1001) }).errors.message).toBeTruthy());
});
