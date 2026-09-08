/* ==========================================================================
   CodeThrive Infotech - Native Interactive Components (Ultra-Fast Edition)
   0 External Dependencies • Instant 0ms Load & Execution
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Native Enterprise Estimator Component ---
  const estimatorRoot = document.getElementById('react-estimator-root');
  if (estimatorRoot) {
    estimatorRoot.innerHTML = `
      <div class="glass-card box-bg-image box-bg-tech" style="padding: 36px; border-color: var(--border-color-hover);">
        <div class="badge" style="margin-bottom: 16px;">
          <span class="badge-dot"></span>
          <span>Interactive Estimator • CodeThrive Engine</span>
        </div>

        <h3 style="font-size: 1.6rem; font-weight: 800; color: #161d23; margin-bottom: 8px;">
          Instant <span class="text-gradient">Project Cost & Timeline Estimator</span>
        </h3>
        <p style="color: #045D5D; font-size: 0.95rem; margin-bottom: 24px;">
          Select your project parameters to generate a transparent corporate development baseline.
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 20px;">
          <div>
            <label class="form-label" style="color: #161d23;">Project Domain</label>
            <select id="estProjectType" class="form-control">
              <option value="web">Web Application / Storefront</option>
              <option value="mobile">Mobile App Ecosystem (iOS & Android)</option>
              <option value="erp">Healthcare / Logistics Enterprise ERP</option>
              <option value="fintech">FinTech & Payment Gateway Core</option>
            </select>
          </div>

          <div>
            <label class="form-label" style="color: #161d23;">Delivery Timeline</label>
            <select id="estTimeline" class="form-control">
              <option value="standard">Standard Execution (4-6 Weeks)</option>
              <option value="express">Express Priority SLA (2-3 Weeks)</option>
            </select>
          </div>
        </div>

        <div style="display: flex; gap: 24px; margin-bottom: 28px; flex-wrap: wrap;">
          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: #161d23; font-size: 0.95rem; font-weight: 600;">
            <input type="checkbox" id="estIncludeAI" style="accent-color: #045D5D; width: 18px; height: 18px;" />
            <span>Include AI Automation Engine (+$1,200)</span>
          </label>

          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: #161d23; font-size: 0.95rem; font-weight: 600;">
            <input type="checkbox" id="estIncludeCloud" checked style="accent-color: #045D5D; width: 18px; height: 18px;" />
            <span>Multi-Region Cloud Deployment (+$800)</span>
          </label>
        </div>

        <div style="background: #F6F9F5; border: 1px solid rgba(17, 69, 56, 0.35); padding: 20px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
          <div>
            <div style="font-size: 0.85rem; color: #045D5D; text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">
              Estimated Investment
            </div>
            <div style="font-size: 2.2rem; font-weight: 800; color: #161d23;">
              $<span id="estTotalDisplay">2,300</span> <span style="font-size: 1rem; color: #045D5D; font-weight: 500;">USD</span>
            </div>
          </div>

          <a href="contact.html#contact-form" class="btn btn-primary">
            Get Formal Scope Quote
          </a>
        </div>
      </div>
    `;

    const projectTypeEl = document.getElementById('estProjectType');
    const timelineEl = document.getElementById('estTimeline');
    const includeAIEl = document.getElementById('estIncludeAI');
    const includeCloudEl = document.getElementById('estIncludeCloud');
    const totalDisplayEl = document.getElementById('estTotalDisplay');

    const basePrices = { web: 1500, mobile: 2500, erp: 4500, fintech: 6000 };

    function calculateEstimate() {
      let total = basePrices[projectTypeEl.value] || 1500;
      if (includeAIEl.checked) total += 1200;
      if (includeCloudEl.checked) total += 800;
      if (timelineEl.value === 'express') total *= 1.25;
      totalDisplayEl.textContent = Math.round(total).toLocaleString();
    }

    projectTypeEl.addEventListener('change', calculateEstimate);
    timelineEl.addEventListener('change', calculateEstimate);
    includeAIEl.addEventListener('change', calculateEstimate);
    includeCloudEl.addEventListener('change', calculateEstimate);
    calculateEstimate();
  }

  // --- 2. Native System Telemetry Widget Component ---
  const telemetryRoot = document.getElementById('react-telemetry-root');
  if (telemetryRoot) {
    telemetryRoot.innerHTML = `
      <div style="display: flex; gap: 24px; flex-wrap: wrap; justify-content: center;">
        <div style="background: #FFFFFF; border: 1px solid rgba(17, 69, 56, 0.35); padding: 16px 24px; border-radius: var(--radius-md); text-align: center; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);">
          <div style="font-size: 0.8rem; color: #045D5D; text-transform: uppercase; font-weight: 700;">
            System Availability
          </div>
          <div style="font-size: 1.5rem; font-weight: 800; color: #161d23;">
            99.99% Uptime
          </div>
        </div>

        <div style="background: #FFFFFF; border: 1px solid rgba(17, 69, 56, 0.35); padding: 16px 24px; border-radius: var(--radius-md); text-align: center; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);">
          <div style="font-size: 0.8rem; color: #045D5D; text-transform: uppercase; font-weight: 700;">
            Avg API Latency
          </div>
          <div style="font-size: 1.5rem; font-weight: 800; color: #161d23;">
            <span id="telemetryLatency">12</span>ms SLA
          </div>
        </div>

        <div style="background: #FFFFFF; border: 1px solid rgba(17, 69, 56, 0.35); padding: 16px 24px; border-radius: var(--radius-md); text-align: center; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);">
          <div style="font-size: 0.8rem; color: #045D5D; text-transform: uppercase; font-weight: 700;">
            Active Cloud Nodes
          </div>
          <div style="font-size: 1.5rem; font-weight: 800; color: #161d23;">
            <span id="telemetryNodes">48</span> Nodes
          </div>
        </div>
      </div>
    `;

    const latencyEl = document.getElementById('telemetryLatency');
    const nodesEl = document.getElementById('telemetryNodes');

    setInterval(() => {
      if (latencyEl) latencyEl.textContent = Math.floor(10 + Math.random() * 5);
      if (nodesEl) nodesEl.textContent = 48 + Math.floor(Math.random() * 3);
    }, 3000);
  }
});
