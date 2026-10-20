import { describe, expect, it } from "vitest";
import { sanitizeEndpoint, sanitizeWhatsApp } from "./site.js";

describe("sanitizeEndpoint", () => {
  it("accepts https and localhost http", () => {
    expect(sanitizeEndpoint("https://formspree.io/f/abc")).toBe("https://formspree.io/f/abc");
    expect(sanitizeEndpoint("http://localhost:3000/lead")).toBe("http://localhost:3000/lead");
  });
  it.each(["", "http://evil.example/x", "javascript:alert(1)", "not a url", undefined])("rejects %p", (v) =>
    expect(sanitizeEndpoint(v)).toBe(""));
});

describe("sanitizeWhatsApp", () => {
  it("keeps digits only", () => expect(sanitizeWhatsApp("+91 98765-43210")).toBe("919876543210"));
  it.each(["", "98765", "9876543210", "1".repeat(16), undefined])("rejects %p", (v) => expect(sanitizeWhatsApp(v)).toBe(""));
});
