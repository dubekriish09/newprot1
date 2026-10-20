const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
const num = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 1 });

export const formatINR = (n) => inr.format(Number.isFinite(n) ? n : 0);
export const formatNumber = (n) => num.format(Number.isFinite(n) ? n : 0);
