/* ==========================================================================
   CodeThrive Infotech - Master JavaScript (Ultra-Professional Edition)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Theme Switcher ---
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  
  let savedTheme = localStorage.getItem('codethrive_theme_v2');
  if (!savedTheme) {
    savedTheme = 'light';
    localStorage.setItem('codethrive_theme_v2', 'light');
    localStorage.setItem('codethrive_theme', 'light');
  }
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('codethrive_theme_v2', newTheme);
      localStorage.setItem('codethrive_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      themeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />`;
    } else {
      themeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />`;
    }
  }

  // --- 2. Header Scroll Effect, Anchor Scroll & Mobile Nav ---
  const header = document.querySelector('.header');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  // Smooth Scroll for Internal Anchor Links (e.g. #industry-sectors)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
    
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  }, { passive: true });

  if (mobileToggle && navMenu) {
    let navOverlay = document.querySelector('.nav-drawer-overlay');
    if (!navOverlay) {
      navOverlay = document.createElement('div');
      navOverlay.className = 'nav-drawer-overlay';
      document.body.appendChild(navOverlay);
    }

    function toggleMobileMenu() {
      const isOpen = navMenu.classList.toggle('active');
      navOverlay.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    function closeMobileMenu() {
      navMenu.classList.remove('active');
      navOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    mobileToggle.addEventListener('click', toggleMobileMenu);
    navOverlay.addEventListener('click', closeMobileMenu);

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function(e) {
        const targetUrl = this.getAttribute('href');
        closeMobileMenu();
        if (targetUrl && !targetUrl.startsWith('#') && targetUrl !== '#') {
          e.preventDefault();
          window.location.href = targetUrl;
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMobileMenu();
      }
    });
  }

  // --- 3. Category Filter & Dynamic Sliding Pill Tracker ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cardWrappers = document.querySelectorAll('.solution-card-wrapper');
  const filterPillTracker = document.getElementById('filterPillTracker');

  function updateFilterPillTracker(activeBtn) {
    if (!filterPillTracker || !activeBtn) return;
    const parent = activeBtn.parentElement;
    const parentRect = parent.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();

    const leftOffset = btnRect.left - parentRect.left;
    filterPillTracker.style.width = `${btnRect.width}px`;
    filterPillTracker.style.transform = `translateX(${leftOffset - 6}px)`;
  }

  // Initialize tracker position on load and resize
  const initialActiveBtn = document.querySelector('.filter-btn.active');
  if (initialActiveBtn) {
    setTimeout(() => updateFilterPillTracker(initialActiveBtn), 50);
  }

  window.addEventListener('resize', () => {
    const currentActive = document.querySelector('.filter-btn.active');
    if (currentActive) updateFilterPillTracker(currentActive);
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      updateFilterPillTracker(btn);

      const filter = btn.getAttribute('data-filter').toLowerCase();

      cardWrappers.forEach((card) => {
        const category = card.getAttribute('data-category').toLowerCase();
        const matches = (filter === 'all' || filter === 'all categories' || category === filter);

        if (matches) {
          card.style.display = 'block';
          card.style.animation = 'none';
        } else {
          card.style.display = 'none';
          card.style.animation = 'none';
        }
      });

      requestAnimationFrame(() => {
        let visibleIndex = 0;
        cardWrappers.forEach((card) => {
          if (card.style.display !== 'none') {
            card.style.animation = `slideInFromLeft 0.45s cubic-bezier(0.16, 1, 0.3, 1) ${visibleIndex * 60}ms forwards`;
            visibleIndex++;
          }
        });
      });
    });
  });

  // --- 4. Interactive Modals & Pebble Card Click Animations ---
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  document.querySelectorAll('.pebble-card, .project-portfolio-card, .editorial-insight-card, .floating-insight-card').forEach(card => {
    card.addEventListener('click', (e) => {
      card.classList.remove('card-clicked', 'card-popped');
      void card.offsetWidth;
      card.classList.add('card-popped');

      const articleBtn = card.querySelector('[data-article-read]');
      if (articleBtn) {
        const title = articleBtn.getAttribute('data-article-read');
        const category = articleBtn.getAttribute('data-article-category');
        const text = articleBtn.getAttribute('data-article-text');
        setTimeout(() => openArticleModal(title, category, text), 200);
      }
    });
  });

  // Handle direct navigation on project card clicks without modal popup
  document.querySelectorAll('.creative-project-card, .solution-card-wrapper').forEach(card => {
    card.addEventListener('click', (e) => {
      // If user clicked inside an <a> tag directly, let default browser navigation occur
      if (e.target.closest('a')) return;

      const linkEl = card.querySelector('a.btn-creative-demo');
      if (linkEl) {
        const href = linkEl.getAttribute('href');
        const target = linkEl.getAttribute('target');
        if (href) {
          if (target === '_blank') {
            window.open(href, '_blank', 'noopener,noreferrer');
          } else {
            window.location.href = href;
          }
        }
      }
    });
  });

  document.querySelectorAll('[data-article-read]').forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-article-read');
      const category = btn.getAttribute('data-article-category');
      const text = btn.getAttribute('data-article-text');
      openArticleModal(title, category, text);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  function closeModal() {
    modalBackdrop?.classList.remove('active');
  }

  const projectDemoUrls = {
    "Restaurant Website": "https://chipper-narwhal-2b443d.netlify.app/",
    "Restaurant & Hospitality Portal": "https://chipper-narwhal-2b443d.netlify.app/",
    "Gym Website": "https://ornate-squirrel-175112.netlify.app/",
    "Fitness & Gym Management": "https://ornate-squirrel-175112.netlify.app/",
    "Bakery Store": "https://ephemeral-semolina-06c7fc.netlify.app/",
    "Bakery & Confectionery Store": "https://ephemeral-semolina-06c7fc.netlify.app/",
    "Medical Storefront": "https://sparkly-pixie-11db8a.netlify.app/",
    "Medical & Pharmacy Storefront": "https://sparkly-pixie-11db8a.netlify.app/",
    "Pet Shop & Veterinary Catalog": "https://joyful-gelato-a2cbd9.netlify.app/",
    "Groceries Store": "https://stalwart-froyo-a435ec.netlify.app/",
    "Groceries & Fresh Produce Store": "https://stalwart-froyo-a435ec.netlify.app/",
    "Clothing Store": "https://luminous-strudel-016c8f.netlify.app/",
    "Boutique Clothing & Apparel Store": "https://luminous-strudel-016c8f.netlify.app/",
    "Organics Store": "https://silly-syrniki-acc03b.netlify.app/",
    "Organic Farm & Eco-Products Store": "https://silly-syrniki-acc03b.netlify.app/"
  };

  function openDemoModal(projectName) {
    if (!modalTitle || !modalBody || !modalBackdrop) return;

    const demoUrl = projectDemoUrls[projectName] || "https://codethriveinfotech.in/";

    modalTitle.textContent = `${projectName} • Interactive Preview`;
    modalBody.innerHTML = `
      <div style="margin-bottom: 20px;">
        <div style="background: rgba(255, 255, 255, 0.08); border: 1px solid var(--border-color); padding: 20px; border-radius: var(--radius-md); margin-bottom: 20px;">
          <div style="font-weight: 800; color: var(--text-heading); font-size: 1.1rem; margin-bottom: 8px;">
            Architecture & SLA Highlights
          </div>
          <ul style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.8; margin-left: 20px; list-style-type: disc;">
            <li>100% Mobile & Tablet Responsive Layout</li>
            <li>Instant Cart & Dynamic Filtering Components</li>
            <li>Optimized Page Load Speed (&lt; 1.2s)</li>
            <li>SEO Schema Markup & Google Maps Integration</li>
          </ul>
        </div>

        <p style="color: var(--text-main); font-size: 0.95rem; margin-bottom: 20px;">
          Experience the full interactive demo for <strong>${projectName}</strong> live in your browser:
        </p>

        <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 16px;">
          <a href="${demoUrl}" target="_blank" rel="noopener" class="btn btn-primary" style="flex: 1; text-align: center; text-decoration: none;">
            🚀 Launch Live Interactive Demo
          </a>
          <a href="contact.html#contact-form" class="btn btn-secondary" style="flex: 1; text-align: center; text-decoration: none;" onclick="document.getElementById('modalBackdrop').classList.remove('active');">
            Request Customization Quote
          </a>
        </div>
      </div>
    `;

    modalBackdrop.classList.add('active');
  }

  function openArticleModal(title, category, text) {
    if (!modalTitle || !modalBody || !modalBackdrop) return;

    modalTitle.textContent = title;
    modalBody.innerHTML = `
      <div style="margin-bottom: 20px;">
        <div class="badge" style="margin-bottom: 16px;">${category}</div>
        <p style="color: var(--text-main); font-size: 1rem; line-height: 1.8; margin-bottom: 24px;">
          ${text}
        </p>
        <div style="background: rgba(255, 255, 255, 0.08); border: 1px solid var(--border-color); padding: 16px; border-radius: var(--radius-md); color: var(--text-muted); font-size: 0.85rem;">
          <strong>Key Takeaway:</strong> CodeThrive Infotech continuously integrates battle-tested architectural principles to scale software platforms from early adoption to enterprise readiness.
        </div>
      </div>
    `;

    modalBackdrop.classList.add('active');
  }

  // --- 5. Dual Dispatch Contact Form ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('formName')?.value || '';
      const email = document.getElementById('formEmail')?.value || '';
      const phone = document.getElementById('formPhone')?.value || 'Not provided';
      const company = document.getElementById('formCompany')?.value || 'Not provided';
      const subject = document.getElementById('formSubject')?.value || 'New Inquiry';
      const message = document.getElementById('formMessage')?.value || '';

      const formattedText = `Hello CodeThrive Infotech Team,\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company}\nSubject: ${subject}\n\nMessage:\n${message}`;

      const waUrl = `https://wa.me/919150781685?text=${encodeURIComponent(formattedText)}`;
      window.open(waUrl, '_blank');

      const mailtoUrl = `mailto:codethriveinfotech@gmail.com?subject=${encodeURIComponent('CodeThrive Inquiry: ' + subject)}&body=${encodeURIComponent(formattedText)}`;
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 500);

      contactForm.reset();
      showToast("Opening WhatsApp and Email windows to complete message dispatch to CodeThrive Infotech.");
    });
  }

  // --- 6. FAQ Accordion & "More FAQs" Toggle System ---
  initFaqAccordions();

  function initFaqAccordions() {
    // Event delegation so all initial and extra 10 FAQs toggle smoothly
    document.addEventListener('click', (e) => {
      const questionBtn = e.target.closest('.faq-question');
      if (!questionBtn) return;
      
      const item = questionBtn.closest('.faq-item');
      if (!item) return;

      const isActive = item.classList.contains('active');
      const allFaqItems = document.querySelectorAll('.faq-item');
      
      allFaqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherBtn = otherItem.querySelector('.faq-question');
        otherBtn?.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });

    // "More FAQs" Expand/Collapse Toggle Handler
    const moreFaqBtn = document.getElementById('moreFaqBtn');
    const faqExtraWrapper = document.getElementById('faqExtraWrapper');
    const moreFaqText = document.getElementById('moreFaqText');
    const moreFaqIcon = document.getElementById('moreFaqIcon');

    if (moreFaqBtn && faqExtraWrapper) {
      moreFaqBtn.addEventListener('click', () => {
        const isHidden = faqExtraWrapper.style.display === 'none' || faqExtraWrapper.style.display === '';
        
        if (isHidden) {
          faqExtraWrapper.style.display = 'block';
          faqExtraWrapper.style.opacity = '0';
          setTimeout(() => {
            faqExtraWrapper.style.transition = 'opacity 0.4s ease';
            faqExtraWrapper.style.opacity = '1';
          }, 20);
          if (moreFaqText) moreFaqText.textContent = 'Show Less FAQs';
          if (moreFaqIcon) moreFaqIcon.style.transform = 'rotate(180deg)';
        } else {
          faqExtraWrapper.style.opacity = '0';
          setTimeout(() => {
            faqExtraWrapper.style.display = 'none';
          }, 350);
          if (moreFaqText) moreFaqText.textContent = 'More FAQs';
          if (moreFaqIcon) moreFaqIcon.style.transform = 'rotate(0deg)';
        }
      });
    }
  }

  // --- 7. Stats Counter Animation ---
  initStatsCounters();

  function initStatsCounters() {
    const counters = document.querySelectorAll('.stat-count');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const suffix = counter.getAttribute('data-suffix') || '';
            const prefix = counter.getAttribute('data-prefix') || '';
            const decimals = parseInt(counter.getAttribute('data-decimals')) || 0;
            let current = 0;
            const increment = target / 50;

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              counter.textContent = prefix + current.toFixed(decimals) + suffix;
            }, 30);
          });
        }
      });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.trust-bar') || document.querySelector('.proven-excellence-section');
    if (statsSection) observer.observe(statsSection);
  }

  // --- 8. Toast Notification Helper ---
  function showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- 9. Industries & Projects Carousel Navigation Controls ---
  const carouselTrack = document.getElementById('projects-carousel-track');
  const carouselPrevBtn = document.getElementById('carousel-prev-btn');
  const carouselNextBtn = document.getElementById('carousel-next-btn');

  if (carouselTrack) {
    carouselPrevBtn?.addEventListener('click', () => {
      carouselTrack.scrollBy({ left: -380, behavior: 'smooth' });
    });

    carouselNextBtn?.addEventListener('click', () => {
      carouselTrack.scrollBy({ left: 380, behavior: 'smooth' });
    });
  }

  // --- 10. Industry Interactive Pop-Up Modal Box System ---
  const industryModalBackdrop = document.getElementById('industryModalBackdrop');
  const industryModalCloseBtn = document.getElementById('industryModalCloseBtn');
  const industryModalCloseSecBtn = document.getElementById('industryModalCloseSecBtn');
  const industryCards = document.querySelectorAll('.industry-interactive-card');

  const industryData = {
    healthcare: {
      category: 'Healthcare & Telemedicine',
      title: 'Healthcare & Telemedicine Systems',
      subtitle: 'HIPAA-Compliant Patient Portals & Clinical EHR Systems',
      desc: 'Centralized medical record management platforms, HIPAA-compliant video consultation portals, automated appointment scheduling queues, and real-time clinical laboratory data telemetry built for healthcare organizations.',
      graphic: `<svg class="industry-traced-svg" viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50 40L80 20L110 40L110 80L80 100L50 80Z" stroke="#5e8d83" stroke-width="1.5" opacity="0.4" stroke-dasharray="4 4"/><path d="M100 110L130 90L160 110L160 150L130 170L100 150Z" stroke="#5e8d83" stroke-width="1.5" opacity="0.4"/><path d="M30 120L55 105L80 120L80 150L55 165L30 150Z" stroke="#045D5D" stroke-width="1.5" opacity="0.3"/><path d="M72 50H88V58H96V74H88V82H72V74H64V58H72V50Z" fill="#045D5D" opacity="0.85"/><path d="M20 130H100L115 90L130 160L145 110L160 140L175 130H380" stroke="#5e8d83" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M220 70 C220 130, 300 130, 300 70 M260 130 V160 C260 185, 290 185, 290 160 C290 145, 275 145, 275 160" stroke="#045D5D" stroke-width="4" stroke-linecap="round"/><circle cx="220" cy="65" r="7" fill="#5e8d83"/><circle cx="300" cy="65" r="7" fill="#5e8d83"/><circle cx="275" cy="160" r="14" fill="#045D5D" stroke="#5e8d83" stroke-width="2"/><circle cx="275" cy="160" r="6" fill="#d2e1cc"/></svg>`,
      features: ['HIPAA Security Compliance', 'EHR & EMR System Sync', 'Telehealth Video Engine', 'Automated Appointment Queue', 'Encrypted Patient Records', 'Prescription Management'],
      impactTitle: 'Featured Client & Impact',
      impactText: 'The Therapy Universe Patient Management Portal'
    },
    fintech: {
      category: 'FinTech & Banking',
      title: 'FinTech & Financial Gateways',
      subtitle: 'High-Throughput Ledger Systems & Payment Gateways',
      desc: 'Ultra-secure double-entry ledgers, PCI-DSS tier-1 payment gateway integrations, intelligent AI fraud detection algorithms, and automated multi-bank ledger reconciliation engines.',
      graphic: `<svg class="industry-traced-svg" viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M120 70 L200 30 L280 70 Z" stroke="#045D5D" stroke-width="3" fill="none"/><rect x="130" y="70" width="140" height="12" fill="#045D5D" opacity="0.8"/><text x="200" y="60" font-family="sans-serif" font-weight="900" font-size="14" fill="#045D5D" text-anchor="middle" letter-spacing="3">BANK</text><rect x="142" y="82" width="16" height="75" fill="#5e8d83" opacity="0.85" rx="2"/><rect x="177" y="82" width="16" height="75" fill="#5e8d83" opacity="0.85" rx="2"/><rect x="212" y="82" width="16" height="75" fill="#5e8d83" opacity="0.85" rx="2"/><rect x="247" y="82" width="16" height="75" fill="#5e8d83" opacity="0.85" rx="2"/><rect x="130" y="157" width="140" height="10" fill="#045D5D"/><line x1="50" y1="130" x2="50" y2="180" stroke="#5e8d83" stroke-width="2"/><rect x="44" y="140" width="12" height="25" fill="#045D5D" rx="2"/><line x1="80" y1="100" x2="80" y2="170" stroke="#5e8d83" stroke-width="2"/><rect x="74" y="110" width="12" height="40" fill="#5e8d83" rx="2"/><line x1="310" y1="90" x2="310" y2="160" stroke="#5e8d83" stroke-width="2"/><rect x="304" y="100" width="12" height="45" fill="#045D5D" rx="2"/><line x1="345" y1="70" x2="345" y2="150" stroke="#5e8d83" stroke-width="2"/><rect x="339" y="80" width="12" height="50" fill="#5e8d83" rx="2"/><path d="M30 160 Q100 130 170 140 T350 60" stroke="#5e8d83" stroke-width="3" fill="none" stroke-dasharray="6 4"/></svg>`,
      features: ['PCI-DSS Tier 1 Security', 'Sub-15ms Payment Gateway SLA', 'AI Fraud Risk Engine', 'Automated Bank Ledgers', 'Double-Entry Accounting', 'Instant Multi-Currency Exchange'],
      impactTitle: 'Performance & Reliability Impact',
      impactText: 'Sub-15ms Payment Settlement SLA & Zero Transaction Losses'
    },
    travel: {
      category: 'Logistics & Travel',
      title: 'Travel, Fleet ERP & Logistics',
      subtitle: 'Automated Dispatch Engines & Fleet Tracking Infrastructure',
      desc: 'Scalable fleet dispatch platforms, real-time GPS taxi reservation engines, dynamic itinerary planners, multi-currency payment checkout channels, and automated driver payout ledgers.',
      graphic: `<svg class="industry-traced-svg" viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="200" cy="65" r="45" stroke="#045D5D" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.4"/><path d="M160 65 C170 45, 230 45, 240 65 C230 85, 170 85, 160 65 Z" stroke="#5e8d83" stroke-width="1.5" opacity="0.5"/><line x1="155" y1="65" x2="245" y2="65" stroke="#045D5D" stroke-width="1" opacity="0.4"/><rect x="100" y="105" width="140" height="65" rx="6" fill="#045D5D" opacity="0.9"/><path d="M240 120 L275 120 L290 145 L290 170 L240 170 Z" fill="#5e8d83"/><path d="M248 126 L270 126 L280 142 L248 142 Z" fill="#161d23"/><circle cx="135" cy="170" r="14" fill="#161d23" stroke="#5e8d83" stroke-width="3"/><circle cx="170" cy="170" r="14" fill="#161d23" stroke="#5e8d83" stroke-width="3"/><circle cx="265" cy="170" r="14" fill="#161d23" stroke="#5e8d83" stroke-width="3"/><line x1="20" y1="184" x2="380" y2="184" stroke="#045D5D" stroke-width="3"/><line x1="40" y1="184" x2="90" y2="184" stroke="#d2e1cc" stroke-width="3"/><line x1="140" y1="184" x2="190" y2="184" stroke="#d2e1cc" stroke-width="3"/><line x1="240" y1="184" x2="290" y2="184" stroke="#d2e1cc" stroke-width="3"/><line x1="340" y1="184" x2="380" y2="184" stroke="#d2e1cc" stroke-width="3"/></svg>`,
      features: ['Real-time GPS Tracking', 'Automated Fleet Dispatch', 'Dynamic Tour Itineraries', 'Multi-Currency Payment', 'Driver Mobile Portals', 'Automated Fuel & Maintenance Logs'],
      impactTitle: 'Client Partnership Spotlight',
      impactText: 'Samyuktha Tours, Madurai Tour Taxi & Madurai Best Tours'
    },
    ecommerce: {
      category: 'E-Commerce & Retail',
      title: 'E-Commerce & Digital Storefronts',
      subtitle: 'Omnichannel Retail Storefronts & Real-time Inventory Sync',
      desc: 'Custom high-conversion web storefronts, real-time multi-warehouse inventory synchronization, interactive 3D product configurators, and automated order fulfillment pipelines.',
      graphic: `<svg class="industry-traced-svg" viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="60" y1="40" x2="60" y2="160" stroke="#045D5D" stroke-width="2" opacity="0.3"/><line x1="340" y1="40" x2="340" y2="160" stroke="#045D5D" stroke-width="2" opacity="0.3"/><line x1="60" y1="70" x2="340" y2="70" stroke="#045D5D" stroke-width="2" opacity="0.3"/><line x1="60" y1="110" x2="340" y2="110" stroke="#045D5D" stroke-width="2" opacity="0.3"/><rect x="80" y="48" width="30" height="22" fill="#5e8d83" opacity="0.4" rx="2"/><rect x="120" y="45" width="40" height="25" fill="#045D5D" opacity="0.4" rx="2"/><rect x="250" y="48" width="35" height="22" fill="#5e8d83" opacity="0.4" rx="2"/><path d="M110 80 H140 L165 145 H275 L295 85 H135" stroke="#045D5D" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/><line x1="165" y1="105" x2="288" y2="105" stroke="#5e8d83" stroke-width="2"/><line x1="172" y1="125" x2="282" y2="125" stroke="#5e8d83" stroke-width="2"/><line x1="190" y1="85" x2="180" y2="145" stroke="#5e8d83" stroke-width="2"/><line x1="230" y1="85" x2="230" y2="145" stroke="#5e8d83" stroke-width="2"/><line x1="265" y1="85" x2="260" y2="145" stroke="#5e8d83" stroke-width="2"/><rect x="180" y="70" width="65" height="45" fill="#5e8d83" rx="3"/><line x1="212" y1="70" x2="212" y2="115" stroke="#045D5D" stroke-width="2"/><circle cx="185" cy="165" r="12" fill="#161d23" stroke="#045D5D" stroke-width="3"/><circle cx="260" cy="165" r="12" fill="#161d23" stroke="#045D5D" stroke-width="3"/></svg>`,
      features: ['Multi-Location Inventory Sync', '3D Product Configurators', 'Instant Checkout & Cart', 'Automated Order Dispatch', 'Personalized Product Recommendations', 'Omnichannel Payment APIs'],
      impactTitle: 'Measured Business Growth',
      impactText: '30% Increase in Customer Sales Conversions'
    },
    media: {
      category: 'Media & Production',
      title: 'Media Production & Creative Agencies',
      subtitle: 'High-Speed Digital Asset Storage & Client Proofing Portals',
      desc: 'High-speed cloud asset storage, interactive client video proofing dashboards, automated video encoding pipelines, and digital media studio management tools.',
      graphic: `<svg class="industry-traced-svg" viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="60" y="150" width="280" height="16" rx="8" fill="#045D5D" opacity="0.85"/><circle cx="80" cy="158" r="5" fill="#d2e1cc"/><circle cx="140" cy="158" r="5" fill="#d2e1cc"/><circle cx="200" cy="158" r="5" fill="#d2e1cc"/><circle cx="260" cy="158" r="5" fill="#d2e1cc"/><circle cx="320" cy="158" r="5" fill="#d2e1cc"/><rect x="90" y="115" width="40" height="35" fill="#5e8d83" rx="3"/><rect x="270" y="115" width="45" height="35" fill="#5e8d83" rx="3"/><rect x="185" y="40" width="30" height="20" rx="3" fill="#045D5D"/><circle cx="200" cy="60" r="10" fill="#5e8d83"/><line x1="200" y1="60" x2="230" y2="100" stroke="#045D5D" stroke-width="6" stroke-linecap="round"/><circle cx="230" cy="100" r="8" fill="#5e8d83"/><line x1="230" y1="100" x2="200" y2="130" stroke="#045D5D" stroke-width="5" stroke-linecap="round"/><path d="M190 130 L190 145 M210 130 L210 145" stroke="#045D5D" stroke-width="3"/><rect x="180" y="125" width="40" height="25" fill="#045D5D" opacity="0.9" rx="2"/></svg>`,
      features: ['High-Speed Cloud Storage', 'Client Proofing Dashboards', 'Automated Video Pipelines', 'Digital Asset Metadata', 'Granular Role Permissions', 'Real-time Review Annotations'],
      impactTitle: 'Client Spotlight',
      impactText: 'AMF Studio Digital Production Workflow Portal'
    },
    iot: {
      category: 'IoT & Industrial Automation',
      title: 'Enterprise IoT & Industrial Automation',
      subtitle: 'Real-time Equipment Telemetry & Predictive Maintenance',
      desc: 'Smart sensor telemetry dashboards, industrial automation platforms, real-time equipment diagnostics, and predictive maintenance engines powered by MQTT and WebSockets data streams.',
      graphic: `<svg class="industry-traced-svg" viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="120" y1="60" x2="120" y2="170" stroke="#045D5D" stroke-width="3"/><circle cx="120" cy="60" r="6" fill="#5e8d83"/><path d="M120 60 L100 25 M120 60 L145 75 M120 60 L110 90" stroke="#5e8d83" stroke-width="2.5" stroke-linecap="round"/><line x1="70" y1="90" x2="70" y2="170" stroke="#045D5D" stroke-width="2" opacity="0.6"/><circle cx="70" cy="90" r="4" fill="#5e8d83" opacity="0.6"/><path d="M70 90 L55 65 M70 90 L88 100 M70 90 L63 112" stroke="#5e8d83" stroke-width="2" stroke-linecap="round" opacity="0.6"/><path d="M210 120 L350 110 L370 170 L210 170 Z" fill="#045D5D" opacity="0.85"/><line x1="260" y1="116" x2="260" y2="170" stroke="#5e8d83" stroke-width="1.5"/><line x1="310" y1="113" x2="315" y2="170" stroke="#5e8d83" stroke-width="1.5"/><line x1="210" y1="140" x2="360" y2="135" stroke="#5e8d83" stroke-width="1.5"/><line x1="210" y1="155" x2="365" y2="152" stroke="#5e8d83" stroke-width="1.5"/><path d="M20 170 Q100 130 180 160 T380 150" stroke="#5e8d83" stroke-width="2" fill="none" stroke-dasharray="5 3"/></svg>`,
      features: ['Zero-Latency MQTT Mesh', 'Real-Time Sensor Telemetry', 'Predictive Maintenance Engine', 'Equipment Diagnostics', 'Edge Gateway Protocols', 'Interactive Analytics Dashboards'],
      impactTitle: 'Engineering Architecture Benchmark',
      impactText: 'Zero-Latency WebSockets & MQTT Industrial Data Mesh'
    }
  };

  if (industryCards.length > 0 && industryModalBackdrop) {
    industryCards.forEach(card => {
      card.addEventListener('click', () => {
        const key = card.getAttribute('data-industry-key');
        const data = industryData[key];
        if (!data) return;

        const cardHeader = card.querySelector('.industry-card-graphic-header');
        const modalGraphic = document.getElementById('industryModalGraphic');
        if (cardHeader && modalGraphic) {
          modalGraphic.innerHTML = cardHeader.innerHTML;
        } else if (modalGraphic) {
          modalGraphic.innerHTML = data.graphic;
        }

        document.getElementById('industryModalCategory').textContent = data.category;
        document.getElementById('industryModalTitle').textContent = data.title;
        document.getElementById('industryModalSubtitle').textContent = data.subtitle;
        document.getElementById('industryModalDesc').textContent = data.desc;
        document.getElementById('industryModalImpactTitle').textContent = data.impactTitle;
        document.getElementById('industryModalImpactText').textContent = data.impactText;

        const featuresList = document.getElementById('industryModalFeatures');
        if (featuresList) {
          featuresList.innerHTML = data.features.map(f => `
            <div class="industry-modal-feature-item">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
              <span>${f}</span>
            </div>
          `).join('');
        }

        industryModalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeIndustryModal = () => {
      industryModalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    };

    industryModalCloseBtn?.addEventListener('click', closeIndustryModal);
    industryModalCloseSecBtn?.addEventListener('click', closeIndustryModal);
    industryModalBackdrop.addEventListener('click', (e) => {
      if (e.target === industryModalBackdrop) closeIndustryModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && industryModalBackdrop.classList.contains('active')) {
        closeIndustryModal();
      }
    });
  }

  // --- 9. Dynamic Privacy Policy Modal System ---
  function getOrCreateModal() {
    let backdrop = document.getElementById('modalBackdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'modalBackdrop';
      backdrop.className = 'modal-backdrop';
      backdrop.innerHTML = `
        <div class="modal-container">
          <button class="modal-close" id="modalCloseBtn" aria-label="Close Modal">&times;</button>
          <h3 id="modalTitle" style="font-size: 1.6rem; font-weight: 800; color: #161d23; margin-bottom: 20px; border-bottom: 2px solid rgba(17, 69, 56, 0.15); padding-bottom: 12px;"></h3>
          <div id="modalBody"></div>
        </div>
      `;
      document.body.appendChild(backdrop);

      const closeBtn = backdrop.querySelector('#modalCloseBtn');
      closeBtn?.addEventListener('click', () => {
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
      });
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          backdrop.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          backdrop.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }
    return backdrop;
  }

  document.querySelectorAll('.footer-privacy-link, a[href*="privacy"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openPrivacyPolicyModal();
    });
  });

  function openPrivacyPolicyModal() {
    const backdrop = getOrCreateModal();
    const titleEl = backdrop.querySelector('#modalTitle');
    const bodyEl = backdrop.querySelector('#modalBody');

    if (titleEl) titleEl.textContent = 'Privacy Policy';
    if (bodyEl) {
      bodyEl.innerHTML = `
        <div class="privacy-modal-wrapper" style="padding: 4px 0;">
          <!-- Introduction -->
          <div style="background: #F0FDF4; border: 1.5px solid rgba(17, 69, 56, 0.2); padding: 18px 20px; border-radius: var(--radius-md); margin-bottom: 22px;">
            <h4 style="font-weight: 800; color: #045D5D; font-size: 1.1rem; margin-bottom: 8px;">Introduction</h4>
            <p style="color: #161d23; font-size: 0.95rem; line-height: 1.65; font-weight: 600; margin: 0;">
              Welcome to CodeThrive. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.
            </p>
          </div>

          <!-- 1. Data We Collect -->
          <div style="margin-bottom: 22px;">
            <h4 style="font-weight: 800; color: #045D5D; font-size: 1.08rem; margin-bottom: 10px;">1. Data We Collect</h4>
            <p style="color: #161d23; font-size: 0.94rem; line-height: 1.6; font-weight: 600; margin-bottom: 12px;">
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul style="display: flex; flex-direction: column; gap: 10px; padding-left: 0; list-style: none;">
              <li style="display: flex; align-items: flex-start; gap: 10px; font-weight: 600; font-size: 0.93rem; color: #161d23;">
                <span style="color: #045D5D; font-weight: 900; font-size: 1.1rem; line-height: 1;">✓</span>
                <div><strong style="color: #045D5D;">Identity Data:</strong> includes first name, last name, username or similar identifier.</div>
              </li>
              <li style="display: flex; align-items: flex-start; gap: 10px; font-weight: 600; font-size: 0.93rem; color: #161d23;">
                <span style="color: #045D5D; font-weight: 900; font-size: 1.1rem; line-height: 1;">✓</span>
                <div><strong style="color: #045D5D;">Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</div>
              </li>
              <li style="display: flex; align-items: flex-start; gap: 10px; font-weight: 600; font-size: 0.93rem; color: #161d23;">
                <span style="color: #045D5D; font-weight: 900; font-size: 1.1rem; line-height: 1;">✓</span>
                <div><strong style="color: #045D5D;">Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</div>
              </li>
              <li style="display: flex; align-items: flex-start; gap: 10px; font-weight: 600; font-size: 0.93rem; color: #161d23;">
                <span style="color: #045D5D; font-weight: 900; font-size: 1.1rem; line-height: 1;">✓</span>
                <div><strong style="color: #045D5D;">Transaction Data:</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</div>
              </li>
            </ul>
          </div>

          <!-- 2. How We Use Your Data -->
          <div style="margin-bottom: 22px;">
            <h4 style="font-weight: 800; color: #045D5D; font-size: 1.08rem; margin-bottom: 10px;">2. How We Use Your Data</h4>
            <p style="color: #161d23; font-size: 0.94rem; line-height: 1.6; font-weight: 600; margin-bottom: 12px;">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul style="display: flex; flex-direction: column; gap: 10px; padding-left: 0; list-style: none;">
              <li style="display: flex; align-items: flex-start; gap: 10px; font-weight: 600; font-size: 0.93rem; color: #161d23;">
                <span style="color: #045D5D; font-weight: 900; font-size: 1.1rem; line-height: 1;">✓</span>
                <div>Where we need to perform the contract we are about to enter into or have entered into with you.</div>
              </li>
              <li style="display: flex; align-items: flex-start; gap: 10px; font-weight: 600; font-size: 0.93rem; color: #161d23;">
                <span style="color: #045D5D; font-weight: 900; font-size: 1.1rem; line-height: 1;">✓</span>
                <div>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</div>
              </li>
              <li style="display: flex; align-items: flex-start; gap: 10px; font-weight: 600; font-size: 0.93rem; color: #161d23;">
                <span style="color: #045D5D; font-weight: 900; font-size: 1.1rem; line-height: 1;">✓</span>
                <div>Where we need to comply with a legal obligation.</div>
              </li>
            </ul>
          </div>

          <!-- 3. Data Security -->
          <div style="margin-bottom: 22px;">
            <h4 style="font-weight: 800; color: #045D5D; font-size: 1.08rem; margin-bottom: 8px;">3. Data Security</h4>
            <p style="color: #161d23; font-size: 0.94rem; line-height: 1.65; font-weight: 600; margin: 0;">
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.
            </p>
          </div>

          <!-- 4. Your Legal Rights -->
          <div style="margin-bottom: 22px;">
            <h4 style="font-weight: 800; color: #045D5D; font-size: 1.08rem; margin-bottom: 10px;">4. Your Legal Rights</h4>
            <p style="color: #161d23; font-size: 0.94rem; line-height: 1.6; font-weight: 600; margin-bottom: 12px;">
              Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
            </p>
            <ul style="display: flex; flex-direction: column; gap: 8px; padding-left: 0; list-style: none;">
              <li style="display: flex; align-items: center; gap: 10px; font-weight: 600; font-size: 0.92rem; color: #161d23;">
                <span style="color: #045D5D; font-weight: 900; font-size: 1.1rem; line-height: 1;">✓</span> Request access to your personal data.
              </li>
              <li style="display: flex; align-items: center; gap: 10px; font-weight: 600; font-size: 0.92rem; color: #161d23;">
                <span style="color: #045D5D; font-weight: 900; font-size: 1.1rem; line-height: 1;">✓</span> Request correction of your personal data.
              </li>
              <li style="display: flex; align-items: center; gap: 10px; font-weight: 600; font-size: 0.92rem; color: #161d23;">
                <span style="color: #045D5D; font-weight: 900; font-size: 1.1rem; line-height: 1;">✓</span> Request erasure of your personal data.
              </li>
              <li style="display: flex; align-items: center; gap: 10px; font-weight: 600; font-size: 0.92rem; color: #161d23;">
                <span style="color: #045D5D; font-weight: 900; font-size: 1.1rem; line-height: 1;">✓</span> Object to processing of your personal data.
              </li>
              <li style="display: flex; align-items: center; gap: 10px; font-weight: 600; font-size: 0.92rem; color: #161d23;">
                <span style="color: #045D5D; font-weight: 900; font-size: 1.1rem; line-height: 1;">✓</span> Request restriction of processing your personal data.
              </li>
              <li style="display: flex; align-items: center; gap: 10px; font-weight: 600; font-size: 0.92rem; color: #161d23;">
                <span style="color: #045D5D; font-weight: 900; font-size: 1.1rem; line-height: 1;">✓</span> Request transfer of your personal data.
              </li>
            </ul>
          </div>

          <!-- Contact Us -->
          <div style="background: #F6F9F5; border: 1.5px solid rgba(17, 69, 56, 0.2); padding: 16px 20px; border-radius: var(--radius-md); margin-bottom: 24px;">
            <h4 style="font-weight: 800; color: #045D5D; font-size: 1.05rem; margin-bottom: 6px;">Contact Us</h4>
            <p style="color: #161d23; font-size: 0.94rem; font-weight: 600; margin: 0;">
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
              <a href="mailto:codethriveinfotech@gmail.com" style="color: #045D5D; font-weight: 800; text-decoration: underline; margin-left: 4px;">codethriveinfotech@gmail.com</a>
            </p>
          </div>

          <!-- Close Action Button Below -->
          <button class="btn btn-primary" id="privacyModalCloseBtn" style="width: 100%; text-align: center; font-size: 1.02rem; padding: 14px 24px;">
            <span>I Understand & Close</span>
          </button>
        </div>
      `;

      const actionCloseBtn = bodyEl.querySelector('#privacyModalCloseBtn');
      actionCloseBtn?.addEventListener('click', () => {
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // --- 3D Stack Carousel Interactive Handler (Insights Page) ---
  const stackTrack = document.getElementById('stackCarouselTrack');
  if (stackTrack) {
    const stackCards = Array.from(stackTrack.querySelectorAll('.stack-carousel-card'));
    const prevBtn = document.getElementById('stackPrevBtn');
    const nextBtn = document.getElementById('stackNextBtn');
    const dotsContainer = document.getElementById('stackCarouselDots');
    let activeIndex = 0;

    function renderStackPositions() {
      const total = stackCards.length;
      stackCards.forEach((card, i) => {
        card.className = 'stack-carousel-card';
        const diff = (i - activeIndex + total) % total;

        if (diff === 0) {
          card.classList.add('active-card');
        } else if (diff === 1) {
          card.classList.add('next-card-1');
        } else if (diff === 2) {
          card.classList.add('next-card-2');
        } else if (diff === total - 1) {
          card.classList.add('prev-card-1');
        } else if (diff === total - 2) {
          card.classList.add('prev-card-2');
        } else {
          card.classList.add('far-card');
        }
      });

      // Update dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.stack-dot-item');
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === activeIndex);
        });
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        activeIndex = (activeIndex - 1 + stackCards.length) % stackCards.length;
        renderStackPositions();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        activeIndex = (activeIndex + 1) % stackCards.length;
        renderStackPositions();
      });
    }

    if (dotsContainer) {
      dotsContainer.addEventListener('click', (e) => {
        const dot = e.target.closest('.stack-dot-item');
        if (dot) {
          const idx = parseInt(dot.getAttribute('data-index'), 10);
          if (!isNaN(idx)) {
            activeIndex = idx;
            renderStackPositions();
          }
        }
      });
    }

    stackCards.forEach((card, idx) => {
      card.addEventListener('click', () => {
        if (activeIndex !== idx) {
          activeIndex = idx;
          renderStackPositions();
        }
      });
    });

    renderStackPositions();

    // --- Automatic Card Sliding Motion (Faster 1.4s on Mobile View, 2.5s on Desktop) ---
    function scheduleNextStackSlide() {
      const delay = (window.innerWidth <= 768) ? 1400 : 2500;
      setTimeout(() => {
        activeIndex = (activeIndex + 1) % stackCards.length;
        renderStackPositions();
        scheduleNextStackSlide();
      }, delay);
    }
    scheduleNextStackSlide();
  }

  // --- 11. Client Works Interactive Pop-up Modal System ---
  const clientWorksData = {
    'samyuktha': {
      themeClass: 'client-modal-blue',
      badge: 'TRAVEL & TOURISM PLATFORM',
      name: 'Samyuktha Tours & Travels',
      logo: 'images/samyuktha_logo.jpg',
      tagline: 'Digital travel reservations & custom itinerary booking management.',
      scopeTitle: 'Project Deliverables Overview',
      deliverables: [
        'Custom digital travel booking engine & interactive itinerary builder.',
        'Multi-vehicle reservation system with automated SMS & email confirmations.',
        'Live tour operator dispatch tools & customer enquiry routing.'
      ],
      techStack: ['React.js', 'Node.js', 'REST API', 'Cloudflare CDN']
    },
    'madurai-tour-taxi': {
      themeClass: 'client-modal-amber',
      badge: 'FLEET ERP & TAXI RESERVATIONS',
      name: 'Madurai Tour Taxi',
      logo: 'images/madurai_tour_taxi_logo.png',
      tagline: 'Real-time fleet management & automated taxi reservation system.',
      scopeTitle: 'Project Deliverables Overview',
      deliverables: [
        'Real-time online taxi booking & automated fleet dispatch platform.',
        'Automated distance fare calculation & WhatsApp booking sync.',
        'Driver telemetry portal & operational management dashboard.'
      ],
      techStack: ['Vue.js', 'Express.js', 'MongoDB', 'Google Maps API']
    },
    'madurai-best-tours': {
      themeClass: 'client-modal-rose',
      badge: 'REGIONAL TOURISM & HOLIDAY ENGINE',
      name: 'Madurai Best Tours & Travels',
      logo: 'images/madurai_best_tours_logo.jpeg',
      tagline: 'Regional tourism booking engine with multi-payment gateway.',
      scopeTitle: 'Project Deliverables Overview',
      deliverables: [
        'Temple tour & regional holiday package booking portal.',
        'Secure multi-payment gateway with instant deposit processing.',
        'Verified ratings, live itinerary downloads & instant WhatsApp support.'
      ],
      techStack: ['HTML5/CSS3', 'JavaScript ES6+', 'Razorpay API', 'AWS S3']
    },
    'therapy-universe': {
      themeClass: 'client-modal-mint',
      badge: 'HEALTHCARE & CLINIC MANAGEMENT ERP',
      name: 'The Therapy Universe',
      logo: 'images/therapy_universe_logo.png',
      tagline: 'Clinical management portal & patient appointment scheduling.',
      scopeTitle: 'Project Deliverables Overview',
      deliverables: [
        'Pediatric & multi-therapy clinical management portal.',
        'Online appointment scheduling with automated doctor calendar sync.',
        'Electronic Health Records (EHR) & billing invoice generation.'
      ],
      techStack: ['React', 'Python / FastAPI', 'PostgreSQL', 'HIPAA Security']
    },
    'amf-studio': {
      themeClass: 'client-modal-purple',
      badge: 'MEDIA & VIDEO PRODUCTION ENTERPRISE',
      name: 'AMF Studio',
      logo: 'images/amf_studio_logo.png',
      tagline: 'Enterprise video production & digital media workflow platform.',
      scopeTitle: 'Project Deliverables Overview',
      deliverables: [
        'Digital media production & video workflow management system.',
        'Client video proofing portal featuring frame-by-frame feedback.',
        'Portfolio showcase optimized for 4K video streaming CDN.'
      ],
      techStack: ['Next.js', 'TailwindCSS', 'Vimeo API', 'Cloudinary CDN']
    },
    'thulir-healthcare': {
      themeClass: 'client-modal-mint',
      badge: 'HEALTHCARE & MEDICAL DIAGNOSTICS',
      name: 'Thulir Healthcare',
      logo: 'images/thulir_healthcare_logo.jpg',
      tagline: 'Integrated healthcare & medical diagnostic management system.',
      scopeTitle: 'Project Deliverables Overview',
      deliverables: [
        'Digital patient registration & diagnostic lab records portal.',
        'Automated clinic inventory & prescription dispatch sync.',
        'Secured EHR telemetry with doctor consultation scheduler.'
      ],
      techStack: ['React.js', 'Node.js', 'PostgreSQL', 'HIPAA Security']
    },
    'fleet-management': {
      themeClass: 'client-modal-amber',
      badge: 'SMART FLEET & HEAVY LOGISTICS',
      name: 'Fleet Management',
      logo: 'images/fleet_management_logo.jpg',
      tagline: 'Smart fleet management platform for heavy machinery & operations.',
      scopeTitle: 'Project Deliverables Overview',
      deliverables: [
        'GPS fleet tracking & heavy machinery dispatch engine.',
        'Real-time driver telemetry, fuel consumption & maintenance logs.',
        'Automated equipment scheduling & route optimization.'
      ],
      techStack: ['Vue.js', 'Express.js', 'MQTT Mesh', 'Google Maps API']
    },
    'testguard': {
      themeClass: 'client-modal-blue',
      badge: 'AI SOFTWARE TESTING & QA',
      name: 'TestGuard',
      logo: 'images/testguard_logo.jpg',
      tagline: 'AI-powered automated software testing & security inspection suite.',
      scopeTitle: 'Project Deliverables Overview',
      deliverables: [
        'Autonomous AI test script generation & vulnerability scanner.',
        'Sub-second regression testing pipeline with instant bug reporting.',
        'Continuous CI/CD integration with automated SLA verification.'
      ],
      techStack: ['Python', 'AI/ML Engine', 'Docker', 'CI/CD Pipelines']
    },
    'vara-vastra': {
      themeClass: 'client-modal-rose',
      badge: 'BOUTIQUE & ETHNIC FASHION',
      name: 'Vara Vastra Boutique',
      logo: 'images/vara_vastra_logo.jpg',
      tagline: 'Omnichannel luxury boutique storefront & custom apparel catalog.',
      scopeTitle: 'Project Deliverables Overview',
      deliverables: [
        'High-conversion mobile e-commerce boutique storefront.',
        'Real-time designer fabric inventory & custom measurement portal.',
        'Multi-currency checkout with instant WhatsApp order dispatch.'
      ],
      techStack: ['Next.js', 'TailwindCSS', 'Stripe API', 'Cloudinary']
    }
  };

  const clientPods = document.querySelectorAll('.client-person-pod[data-client-key]');
  const clientWorksModalBackdrop = document.getElementById('clientWorksModalBackdrop');
  const clientWorksModalContainer = document.getElementById('clientWorksModalContainer');
  const clientWorksModalContent = document.getElementById('clientWorksModalContent');
  const clientWorksModalCloseBtn = document.getElementById('clientWorksModalCloseBtn');

  if (clientPods.length > 0 && clientWorksModalBackdrop && clientWorksModalContent) {
    clientPods.forEach(pod => {
      pod.addEventListener('click', (e) => {
        const key = pod.getAttribute('data-client-key');
        const data = clientWorksData[key];
        if (!data) return;

        // Reset theme classes
        clientWorksModalContainer.className = `modal-container client-works-modal-container ${data.themeClass}`;

        clientWorksModalContent.innerHTML = `
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
            <div style="width: 48px; height: 48px; min-width: 48px; border-radius: 50%; overflow: hidden; background: #ffffff; padding: 2px; box-shadow: 0 4px 14px rgba(0,0,0,0.12); border: 2px solid #FFFFFF;">
              <img src="${data.logo}" alt="${data.name} Logo" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%; display: block;" />
            </div>
            <div>
              <div class="client-modal-badge" style="display: inline-block; padding: 3px 10px; border-radius: 16px; font-size: 0.65rem; font-weight: 800; letter-spacing: 0.8px; text-transform: uppercase; margin-bottom: 2px;">${data.badge}</div>
              <h3 class="client-modal-title" style="font-size: 1.15rem; font-weight: 900; margin: 0; line-height: 1.2;">${data.name}</h3>
            </div>
          </div>

          <p style="font-size: 0.84rem; line-height: 1.45; color: #334155; font-weight: 600; margin-bottom: 12px; text-align: left;">
            ${data.tagline}
          </p>

          <div style="background: rgba(255, 255, 255, 0.65); border-radius: 14px; padding: 12px 14px; margin-bottom: 14px; border: 1px solid rgba(255, 255, 255, 0.8);">
            <h4 style="font-size: 0.76rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px; margin-top: 0; margin-bottom: 8px; color: #1E293B;">${data.scopeTitle}</h4>
            <div style="display: flex; flex-direction: column; gap: 6px;">
              ${data.deliverables.map(item => `
                <div style="display: flex; align-items: flex-start; gap: 8px; font-size: 0.82rem; line-height: 1.35; color: #334155; font-weight: 600;">
                  <span class="client-modal-bullet-dot" style="width: 6px; height: 6px; min-width: 6px; border-radius: 50%; margin-top: 5px; display: inline-block;"></span>
                  <span>${item}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
            <div style="display: flex; gap: 5px; flex-wrap: wrap;">
              ${data.techStack.map(tech => `
                <span style="font-size: 0.68rem; font-weight: 700; background: rgba(255,255,255,0.7); padding: 3px 8px; border-radius: 10px; color: #475569; border: 1px solid rgba(0,0,0,0.06);">${tech}</span>
              `).join('')}
            </div>
            <a href="contact.html#contact-form" class="btn client-modal-btn" style="padding: 8px 16px; font-size: 0.8rem; font-weight: 800; border-radius: 18px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
              Discuss Similar Project
            </a>
          </div>
        `;

        clientWorksModalBackdrop.classList.add('active');
      });
    });

    const closeClientWorksModal = () => {
      clientWorksModalBackdrop.classList.remove('active');
    };

    clientWorksModalCloseBtn?.addEventListener('click', closeClientWorksModal);
    clientWorksModalBackdrop.addEventListener('click', (e) => {
      if (e.target === clientWorksModalBackdrop) closeClientWorksModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && clientWorksModalBackdrop.classList.contains('active')) {
        closeClientWorksModal();
      }
    });
  }

  // --- Insights Newsletter Subscription Form Handler ---
  const insightsNewsletterForm = document.getElementById('insightsNewsletterForm');
  if (insightsNewsletterForm) {
    insightsNewsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletterEmailInput');
      const email = emailInput?.value || 'your email';
      showToast(`Thank you! ${email} has been subscribed to CodeThrive Infotech Tech Insights.`);
      insightsNewsletterForm.reset();
    });
  }

  // --- 7. Mobile Click/Touch Handler for Floating Call & WhatsApp Text Popups ---
  initFloatingPopupsMobile();

  function initFloatingPopupsMobile() {
    const floatBtns = document.querySelectorAll('.call-float-btn, .whatsapp-float-btn');
    if (!floatBtns.length) return;

    floatBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Apply special tap-to-reveal text logic on mobile view (width <= 768px)
        if (window.innerWidth <= 768) {
          const tooltip = btn.querySelector('.float-tooltip-pop');
          if (!tooltip) return;

          // If text pill is already active OR direct tap on the text pill itself: allow immediate navigation
          if (btn.classList.contains('active-mobile-pop') || e.target.closest('.float-tooltip-pop')) {
            return;
          }

          // First tap on mobile: reveal text pill, prevent instant redirect
          e.preventDefault();

          // Close any other active floating popup
          floatBtns.forEach(other => other.classList.remove('active-mobile-pop'));

          btn.classList.add('active-mobile-pop');

          // Auto-close text pill after 2.8 seconds if not clicked again
          clearTimeout(btn._popTimer);
          btn._popTimer = setTimeout(() => {
            btn.classList.remove('active-mobile-pop');
          }, 2800);
        }
      });
    });

    // Close mobile popups immediately when tapping outside
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 && !e.target.closest('.call-float-btn, .whatsapp-float-btn')) {
        floatBtns.forEach(btn => btn.classList.remove('active-mobile-pop'));
      }
    });
  }
});


