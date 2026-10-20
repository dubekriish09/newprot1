export const PROPERTY_TYPES = Object.freeze(["Home", "Commercial", "Industrial", "Other"]);
export const BILL_RANGES = Object.freeze([
  "Under ₹2,000",
  "₹2,000–₹4,500",
  "₹4,500–₹7,500",
  "₹7,500–₹15,000",
  "₹15,000–₹50,000",
  "Above ₹50,000",
  "Not sure",
]);

/** Map a numeric monthly bill to the matching form option. */
export function billToRange(bill) {
  if (bill < 2000) return BILL_RANGES[0];
  if (bill < 4500) return BILL_RANGES[1];
  if (bill < 7500) return BILL_RANGES[2];
  if (bill < 15000) return BILL_RANGES[3];
  if (bill <= 50000) return BILL_RANGES[4];
  return BILL_RANGES[5];
}

/**
 * Normalise a phone number. Indian mobiles (with optional +91 / 91 / 0 prefix)
 * become "+91XXXXXXXXXX"; other international numbers must start with "+".
 * Returns null when the number is not plausible.
 */
export function normalizePhone(raw) {
  const cleaned = String(raw ?? "").replace(/[\s().-]/g, "");
  const india = cleaned.match(/^(?:\+?91|0)?([6-9]\d{9})$/);
  if (india) return `+91${india[1]}`;
  if (/^\+\d{8,15}$/.test(cleaned)) return cleaned;
  return null;
}

export const LIMITS_TEXT = Object.freeze({ name: 80, city: 80, message: 1000 });

/** Returns { valid, errors, values } where values are trimmed/normalised. */
export function validateLead(input) {
  const errors = {};
  const name = String(input.name ?? "").trim();
  const city = String(input.city ?? "").trim();
  const message = String(input.message ?? "").trim();
  const phone = normalizePhone(input.phone);

  if (name.length < 2) errors.name = "Please enter your full name.";
  else if (name.length > LIMITS_TEXT.name) errors.name = "Please shorten your name.";

  if (!phone) errors.phone = "Enter a valid 10-digit Indian mobile number (or +country code for others).";

  if (city.length < 2) errors.city = "Please tell us the city or PIN code of the property.";
  else if (city.length > LIMITS_TEXT.city) errors.city = "Please shorten this field.";

  if (!PROPERTY_TYPES.includes(input.customerType)) errors.customerType = "Choose a property type.";
  if (!BILL_RANGES.includes(input.monthlyBill)) errors.monthlyBill = "Choose a bill range.";
  if (message.length > LIMITS_TEXT.message) errors.message = `Please keep this under ${LIMITS_TEXT.message} characters.`;
  if (input.consent !== true) errors.consent = "Please confirm your consent so we can contact you.";

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    values: { name, phone: phone ?? "", city, customerType: input.customerType, monthlyBill: input.monthlyBill, message },
  };
}
