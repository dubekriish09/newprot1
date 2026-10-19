// src/services/adapters/mockAdapter.js
/**
 * Simple in‑memory / localStorage mock data store.
 * Used when VITE_DATA_MODE=mock.
 */

const LEADS_KEY = "mock_leads";

function _loadLeads() {
  const stored = localStorage.getItem(LEADS_KEY);
  return stored ? JSON.parse(stored) : [];
}

function _saveLeads(leads) {
  localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
}

export const mockAdapter = {
  // Lead operations
  submitLead(leadData) {
    const leads = _loadLeads();
    const newLead = { ...leadData, id: Date.now(), created_at: new Date().toISOString() };
    leads.push(newLead);
    _saveLeads(leads);
    console.log("[MockAdapter] Submitted lead:", newLead);
    return Promise.resolve(newLead);
  },
  // Project operations – return demo static data
  getProjects(filters = {}) {
    // simple demo projects – can be expanded later
    const demo = [
      {
        id: 1,
        title: "Sample Solar Project A",
        project_type: "Residential",
        locality_label: "Gwalior",
        approx_lat: 26.2183,
        approx_lng: 78.1828,
        capacity_kw: 5,
        completed_on: "2023-05-10",
        summary: "Sample project – to be verified",
        photos: [],
        is_published: true,
      },
    ];
    console.log("[MockAdapter] getProjects called with", filters);
    return Promise.resolve(demo);
  },
};
