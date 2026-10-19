// src/lib/schemas.js
/**
 * Single source of truth for lead data shape.
 * Used by the calculator, contact form and services.
 * All fields are strings (except numbers where appropriate).
 */
export const LeadSchema = {
  name: "",
  phone: "",
  email: "",
  propertyType: "",
  city: "",
  monthlyBill: "",
  message: "",
  // snapshot of calculator results (optional)
  calculatorSnapshot: null, // will hold the object returned from calculator engine
};
