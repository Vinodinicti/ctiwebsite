/* ==========================================================================
   CodeThrive Infotech - React.js Interactive Components
   Powered by React 18 & ReactDOM
   Theme: Emerald Sage & Deep Obsidian Palette (#161d23, #004B49, #045D5D, #5e8d83, #d2e1cc)
   ========================================================================== */

const { useState, useEffect } = React;

// --- 1. React Enterprise Project Estimator Component ---
function EnterpriseEstimator() {
  const [projectType, setProjectType] = useState('web');
  const [timeline, setTimeline] = useState('standard');
  const [includeAI, setIncludeAI] = useState(false);
  const [includeCloud, setIncludeCloud] = useState(true);

  // Pricing Logic
  const basePrices = {
    web: 1500,
    mobile: 2500,
    erp: 4500,
    fintech: 6000
  };

  let total = basePrices[projectType] || 1500;
  if (includeAI) total += 1200;
  if (includeCloud) total += 800;
  if (timeline === 'express') total *= 1.25;

  return (
    <div className="glass-card box-bg-image box-bg-tech" style={{ padding: '36px', borderColor: 'var(--border-color-hover)' }}>
      <div className="badge" style={{ marginBottom: '16px' }}>
        <span className="badge-dot"></span>
        <span>React 18 Powered • Interactive Estimator</span>
      </div>

      <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#161d23', marginBottom: '8px' }}>
        Instant <span className="text-gradient">Project Cost & Timeline Estimator</span>
      </h3>
      <p style={{ color: '#045D5D', fontSize: '0.95rem', marginBottom: '24px' }}>
        Select your project parameters to generate a transparent corporate development baseline.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div>
          <label className="form-label" style={{ color: '#161d23' }}>Project Domain</label>
          <select 
            value={projectType} 
            onChange={(e) => setProjectType(e.target.value)}
            className="form-control"
          >
            <option value="web">Web Application / Storefront</option>
            <option value="mobile">Mobile App Ecosystem (iOS & Android)</option>
            <option value="erp">Healthcare / Logistics Enterprise ERP</option>
            <option value="fintech">FinTech & Payment Gateway Core</option>
          </select>
        </div>

        <div>
          <label className="form-label" style={{ color: '#161d23' }}>Delivery Timeline</label>
          <select 
            value={timeline} 
            onChange={(e) => setTimeline(e.target.value)}
            className="form-control"
          >
            <option value="standard">Standard Execution (4-6 Weeks)</option>
            <option value="express">Express Priority SLA (2-3 Weeks)</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', marginBottom: '28px', flexWrap: 'wrap' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#161d23', fontSize: '0.95rem', fontWeight: 600 }}>
          <input 
            type="checkbox" 
            checked={includeAI} 
            onChange={(e) => setIncludeAI(e.target.checked)}
            style={{ accentColor: '#045D5D', width: '18px', height: '18px' }}
          />
          <span>Include AI Automation Engine (+$1,200)</span>
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#161d23', fontSize: '0.95rem', fontWeight: 600 }}>
          <input 
            type="checkbox" 
            checked={includeCloud} 
            onChange={(e) => setIncludeCloud(e.target.checked)}
            style={{ accentColor: '#045D5D', width: '18px', height: '18px' }}
          />
          <span>Multi-Region Cloud Deployment (+$800)</span>
        </label>
      </div>

      <div style={{ background: '#F6F9F5', border: '1px solid rgba(17, 69, 56, 0.35)', padding: '20px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '0.85rem', color: '#045D5D', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '1px' }}>
            Estimated Investment
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#161d23' }}>
            ${Math.round(total).toLocaleString()} <span style={{ fontSize: '1rem', color: '#045D5D', fontWeight: 500 }}>USD</span>
          </div>
        </div>

        <a href="contact.html#contact-form" className="btn btn-primary">
          Get Formal Scope Quote →
        </a>
      </div>
    </div>
  );
}

// --- 2. React Live System Telemetry Widget Component ---
function TechTelemetryWidget() {
  const [latency, setLatency] = useState(12);
  const [activeNodes, setActiveNodes] = useState(48);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(10 + Math.random() * 5));
      setActiveNodes(48 + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
      <div style={{ background: '#FFFFFF', border: '1px solid rgba(17, 69, 56, 0.35)', padding: '16px 24px', borderRadius: 'var(--radius-md)', textAlign: 'center', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)' }}>
        <div style={{ fontSize: '0.8rem', color: '#045D5D', textTransform: 'uppercase', fontWeight: 700 }}>
          System Availability
        </div>
        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#161d23' }}>
          99.99% Uptime
        </div>
      </div>

      <div style={{ background: '#FFFFFF', border: '1px solid rgba(17, 69, 56, 0.35)', padding: '16px 24px', borderRadius: 'var(--radius-md)', textAlign: 'center', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)' }}>
        <div style={{ fontSize: '0.8rem', color: '#045D5D', textTransform: 'uppercase', fontWeight: 700 }}>
          Avg API Latency
        </div>
        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#161d23' }}>
          {latency}ms SLA
        </div>
      </div>

      <div style={{ background: '#FFFFFF', border: '1px solid rgba(17, 69, 56, 0.35)', padding: '16px 24px', borderRadius: 'var(--radius-md)', textAlign: 'center', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)' }}>
        <div style={{ fontSize: '0.8rem', color: '#045D5D', textTransform: 'uppercase', fontWeight: 700 }}>
          Active Cloud Nodes
        </div>
        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#161d23' }}>
          {activeNodes} Nodes
        </div>
      </div>
    </div>
  );
}

// --- Render React Components into DOM Mount Points ---
document.addEventListener('DOMContentLoaded', () => {
  const estimatorMount = document.getElementById('react-estimator-root');
  if (estimatorMount && window.ReactDOM) {
    const root = ReactDOM.createRoot(estimatorMount);
    root.render(<EnterpriseEstimator />);
  }

  const telemetryMount = document.getElementById('react-telemetry-root');
  if (telemetryMount && window.ReactDOM) {
    const root = ReactDOM.createRoot(telemetryMount);
    root.render(<TechTelemetryWidget />);
  }
});
