/**
 * Sneha RG Portfolio — Alabaster Monograph Controller
 * Manages: Theme toggle (Dark/Light), Mobile Drawer, Live IST Clock,
 * Toast Notifications, Case Study Modals, and Interactive Filters.
 */

(function () {
  'use strict';

  // 1. Live Indian Standard Time (IST) Clock
  function initLiveClock() {
    const clockElements = document.querySelectorAll('.live-ist-clock');
    if (!clockElements.length) return;

    function updateTime() {
      try {
        const now = new Date();
        const options = {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const timeString = formatter.format(now);
        clockElements.forEach(el => {
          el.textContent = `Chennai, India — ${timeString} IST`;
        });
      } catch (err) {
        // Fallback for environments lacking specific tz support
        const now = new Date();
        clockElements.forEach(el => {
          el.textContent = `Chennai, India — ${now.toLocaleTimeString()} IST`;
        });
      }
    }

    updateTime();
    setInterval(updateTime, 1000);
  }

  // 2. Dark / Light Mode Switcher
  function initTheme() {
    const themeToggles = document.querySelectorAll('.theme-toggle-btn');
    const htmlEl = document.documentElement;

    function applyTheme(isDark) {
      if (isDark) {
        htmlEl.classList.add('dark');
        localStorage.setItem('portfolio-theme', 'dark');
      } else {
        htmlEl.classList.remove('dark');
        localStorage.setItem('portfolio-theme', 'light');
      }
      updateToggleIcons(isDark);
    }

    function updateToggleIcons(isDark) {
      themeToggles.forEach(btn => {
        const icon = btn.querySelector('.theme-icon');
        if (icon) {
          icon.textContent = isDark ? 'light_mode' : 'dark_mode';
        }
      });
    }

    // Determine initial state
    const savedTheme = localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    applyTheme(isDark);

    // Event listeners
    themeToggles.forEach(btn => {
      btn.addEventListener('click', () => {
        const willBeDark = !htmlEl.classList.contains('dark');
        applyTheme(willBeDark);
        showToast(willBeDark ? 'Switched to Obsidian Dark' : 'Switched to Alabaster Light');
      });
    });

    // Listen to OS system changes if no preference was explicitly saved
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('portfolio-theme')) {
        applyTheme(e.matches);
      }
    });
  }

  // 3. Mobile Navigation Drawer
  function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileDrawerClose = document.getElementById('mobile-drawer-close');
    const mobileBackdrop = document.getElementById('mobile-backdrop');

    if (!mobileMenuBtn || !mobileDrawer) return;

    function openDrawer() {
      mobileDrawer.classList.remove('translate-x-full');
      if (mobileBackdrop) {
        mobileBackdrop.classList.remove('opacity-0', 'pointer-events-none');
        mobileBackdrop.classList.add('opacity-100');
      }
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      mobileDrawer.classList.add('translate-x-full');
      if (mobileBackdrop) {
        mobileBackdrop.classList.add('opacity-0', 'pointer-events-none');
        mobileBackdrop.classList.remove('opacity-100');
      }
      document.body.style.overflow = '';
    }

    mobileMenuBtn.addEventListener('click', openDrawer);
    if (mobileDrawerClose) mobileDrawerClose.addEventListener('click', closeDrawer);
    if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeDrawer);

    // Close when clicking any nav link in the drawer
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    // Close on Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !mobileDrawer.classList.contains('translate-x-full')) {
        closeDrawer();
      }
    });
  }

  // 4. Toast Notification
  function showToast(message, duration = 3000) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notification';
      toast.className = 'fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-medium text-xs shadow-2xl border border-zinc-700 dark:border-zinc-200 transition-all duration-300';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <span class="material-symbols-outlined text-emerald-400 dark:text-emerald-600 text-sm">check_circle</span>
      <span>${message}</span>
    `;
    toast.classList.add('show');

    clearTimeout(toast.timeoutId);
    toast.timeoutId = setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  // 5. Copy to Clipboard (Email & Phone)
  window.copyToClipboard = function (text, label = 'Copied to clipboard!') {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(label);
      }).catch(() => {
        fallbackCopy(text, label);
      });
    } else {
      fallbackCopy(text, label);
    }
  };

  function fallbackCopy(text, label) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(label);
    } catch (err) {
      prompt('Copy the text below:', text);
    }
    document.body.removeChild(textArea);
  }

  // 6. Interactive Case Study Modal
  const CASE_STUDIES = {
    'emerson': {
      title: 'Emerson Process Management — Quality Dossier & Order Management Architecture',
      org: 'Emerson Process Management Chennai Pvt Ltd.',
      period: 'Dec 2025 – Present',
      role: 'Documentation & Order Management Trainee',
      badge: 'ORDER MANAGEMENT • COMPLIANCE',
      image: './assets/images/emerson-dossier.svg',
      overview: 'Spearheaded comprehensive document governance and commercial order fulfillment for global instrumentation and process automation orders. Accountable for 100% compliance with Standard Operating Procedures (SOP), customer specifications, and statutory quality standards.',
      keyContributions: [
        'Prepared and submitted customer-ready commercial invoices, warranty files, inspection test certificates (ITC), and Quality Control (QC) documentation.',
        'Executed high-precision Specification (SPEC) and General Arrangement Drawing (GAD) documentation in enterprise document management databases.',
        'Engineered comprehensive Instruction and Operation Manuals (IOM), detailed Quality Dossiers, and product catalogues ensuring zero audit discrepancies.',
        'Collaborated directly with inspection agencies, project managers, and quality assurance teams to secure timely order clearance.'
      ],
      metrics: [
        { label: 'Documentation Accuracy', value: '100%' },
        { label: 'Order Clearance Cadence', value: '< 24h SLA' },
        { label: 'SOP Adherence', value: 'Zero Defect' }
      ],
      tags: ['SOP Adherence', 'QC Certificates', 'SPEC & GAD Records', 'Quality Dossiers', 'Invoicing']
    },
    'lt-finance': {
      title: 'Larsen & Toubro — GST Compliance & Marginal Costing Analysis',
      org: 'Larsen & Toubro (L&T) — Chennai',
      period: 'May 2024 – Jun 2024',
      role: 'Finance Intern',
      badge: 'TAXATION • MANAGEMENT ACCOUNTING',
      image: './assets/images/lt-gst-costing.svg',
      overview: 'Supported the central Finance Department’s GST team at one of India’s foremost engineering and construction conglomerates. Gained extensive hands-on exposure to corporate tax filing, statutory reconciliations, and management accounting techniques.',
      keyContributions: [
        'Gained hands-on exposure to GST filing mechanisms including GSTR-1 outward supply statements and GSTR-3B monthly summary returns.',
        'Executed invoice matching and reconciliation between purchase registers and GSTR-2B to maximize Input Tax Credit (ITC) utilization without compliance penalties.',
        'Analyzed cost behaviors, contribution margins, and break-even points utilizing marginal costing principles for internal management decision-making.',
        'Evaluated vendor invoices for proper HSN/SAC code classification, reverse charge mechanism (RCM) applicability, and TDS under GST.'
      ],
      metrics: [
        { label: 'ITC Match Rate', value: '98.4%' },
        { label: 'Costing Principles', value: 'Marginal & Absorption' },
        { label: 'Statutory Rigor', value: '100% On-Time' }
      ],
      tags: ['GSTR-1 & 3B', 'Input Tax Credit (ITC)', 'Marginal Costing', 'Tally Prime', 'Statutory Tax']
    },
    'shriram-legal': {
      title: 'Shriram Finance — Legal Department Compliance & Case Tracking Operations',
      org: 'Shriram Finance Ltd.',
      period: 'Jul 2025 – Aug 2025',
      role: 'Junior Executive (Internship)',
      badge: 'BANKING COMPLIANCE • LEGAL RECON',
      image: './assets/images/shriram-legal.svg',
      overview: 'Functioned in the corporate Legal Department of Shriram Finance Ltd., one of India’s largest retail asset financing NBFCs. Maintained compliance audit trails and supported formal documentation for financial recovery, arbitration, and statutory filings.',
      keyContributions: [
        'Organized and tracked comprehensive legal case documentation across credit portfolios, loan contracts, and recovery registries.',
        'Assisted legal counsels in drafting formal legal notices, default recalls, and statutory replies under strict statutory timelines.',
        'Established documentary traceability between loan account ledgers, banking compliance records, and court-ready submissions.',
        'Maintained structured compliance logs aligning with regulatory guidelines from the Reserve Bank of India (RBI) and corporate governance frameworks.'
      ],
      metrics: [
        { label: 'Case Traceability', value: '100%' },
        { label: 'Notice Turnaround', value: 'Timely SLA' },
        { label: 'Regulatory Adherence', value: 'RBI & NBFC' }
      ],
      tags: ['Legal Case Records', 'Statutory Notices', 'NBFC Compliance', 'Banking Ops', 'Documentation']
    },
    'elk-crm': {
      title: 'ELK India — CRM Execution & Client Account Coordination',
      org: 'ELK India',
      period: 'Aug 2025 – Nov 2025',
      role: 'CRM Executive',
      badge: 'CLIENT RELATIONS • REVENUE PIPELINE',
      image: './assets/images/powerbi-telemetry.svg',
      overview: 'Managed core client handling, service scoping, pricing coordination, and account follow-ups. Established standardized client onboarding protocols and structured communication cadences.',
      keyContributions: [
        'Interfaced directly with corporate prospects and clients, articulating complex service offerings, deliverables, and customized pricing schedules.',
        'Managed rigorous, structured follow-up cadences that accelerated prospective client conversions and reduced inquiry drop-offs.',
        'Maintained comprehensive CRM records, tracking lead lifecycle stages, feedback loops, and cross-functional handoffs to fulfillment teams.',
        'Streamlined inquiry handling protocols to ensure prompt resolution of client inquiries within agreed service level agreements (SLAs).'
      ],
      metrics: [
        { label: 'Inquiry Response', value: '< 2 hrs' },
        { label: 'Client Satisfaction', value: 'High Touch' },
        { label: 'CRM Traceability', value: 'Full Pipeline' }
      ],
      tags: ['HubSpot CRM', 'Client Communications', 'Pricing Negotiation', 'SLA Adherence', 'Account Follow-up']
    }
  };

  window.openCaseStudyModal = function (caseId) {
    const data = CASE_STUDIES[caseId];
    if (!data) return;

    let modal = document.getElementById('case-study-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'case-study-modal';
      modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto modal-backdrop opacity-0 pointer-events-none transition-opacity duration-300';
      modal.innerHTML = `
        <div class="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#121318] border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-8 transition-transform duration-300 scale-95" id="case-study-modal-card">
          <button class="absolute top-5 right-5 w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white flex items-center justify-center transition-colors" onclick="closeCaseStudyModal()">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
          <div id="case-study-modal-content"></div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.addEventListener('click', e => {
        if (e.target === modal) closeCaseStudyModal();
      });

      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !modal.classList.contains('pointer-events-none')) {
          closeCaseStudyModal();
        }
      });
    }

    const content = document.getElementById('case-study-modal-content');
    content.innerHTML = `
      <div class="space-y-6">
        <div>
          <span class="inline-block px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-300 font-mono text-[11px] font-semibold tracking-wider uppercase mb-3">
            ${data.badge}
          </span>
          <h2 class="text-2xl sm:text-3xl font-display font-bold text-zinc-900 dark:text-white leading-tight">
            ${data.title}
          </h2>
          <div class="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
            <span class="font-semibold text-zinc-800 dark:text-zinc-200">${data.org}</span>
            <span>•</span>
            <span>${data.role}</span>
            <span>•</span>
            <span class="text-indigo-900 dark:text-indigo-400">${data.period}</span>
          </div>
        </div>

        <div class="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-900 aspect-video max-h-72 flex items-center justify-center">
          <img src="${data.image}" alt="${data.title}" class="w-full h-full object-cover"/>
        </div>

        <div>
          <h4 class="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2 font-semibold">Executive Context</h4>
          <p class="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-body">
            ${data.overview}
          </p>
        </div>

        <!-- Metrics ribbon -->
        <div class="grid grid-cols-3 gap-3 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
          ${data.metrics.map(m => `
            <div class="text-center">
              <span class="block text-lg sm:text-2xl font-bold font-display text-zinc-900 dark:text-white">${m.value}</span>
              <span class="text-[10px] sm:text-xs font-mono uppercase text-zinc-500 dark:text-zinc-400">${m.label}</span>
            </div>
          `).join('')}
        </div>

        <div>
          <h4 class="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3 font-semibold">Key Responsibilities &amp; Deliverables</h4>
          <ul class="space-y-2.5">
            ${data.keyContributions.map(c => `
              <li class="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                <span class="material-symbols-outlined text-indigo-900 dark:text-indigo-400 text-[18px] shrink-0 mt-0.5">check_circle</span>
                <span>${c}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center gap-2">
          ${data.tags.map(t => `
            <span class="px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 font-mono text-[11px]">${t}</span>
          `).join('')}
        </div>
      </div>
    `;

    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100');
    const card = document.getElementById('case-study-modal-card');
    card.classList.remove('scale-95');
    card.classList.add('scale-100');
    document.body.style.overflow = 'hidden';
  };

  window.closeCaseStudyModal = function () {
    const modal = document.getElementById('case-study-modal');
    if (!modal) return;
    const card = document.getElementById('case-study-modal-card');
    card.classList.add('scale-95');
    card.classList.remove('scale-100');
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.classList.remove('opacity-100');
    document.body.style.overflow = '';
  };

  // 7. Interactive Filter for Skills & Experience
  function initFilterTabs() {
    const filterButtons = document.querySelectorAll('[data-filter-target]');
    if (!filterButtons.length) return;

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-filter-target');
        const container = btn.closest('.filter-container');
        if (!container) return;

        // Toggle active button style
        container.querySelectorAll('[data-filter-target]').forEach(b => {
          b.classList.remove('bg-zinc-900', 'text-white', 'dark:bg-white', 'dark:text-zinc-900');
          b.classList.add('bg-zinc-100', 'text-zinc-700', 'dark:bg-zinc-800', 'dark:text-zinc-300');
        });
        btn.classList.remove('bg-zinc-100', 'text-zinc-700', 'dark:bg-zinc-800', 'dark:text-zinc-300');
        btn.classList.add('bg-zinc-900', 'text-white', 'dark:bg-white', 'dark:text-zinc-900');

        // Filter cards
        const items = container.querySelectorAll('[data-filter-category]');
        items.forEach(item => {
          const itemCat = item.getAttribute('data-filter-category');
          if (category === 'all' || itemCat === category || itemCat.includes(category)) {
            item.style.display = '';
            item.classList.add('animate-fadeIn');
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // 8. Contact Form Handler
  function initContactForm() {
    const contactForm = document.getElementById('portfolio-contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('contact-name')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const subject = document.getElementById('contact-subject')?.value.trim() || 'Portfolio Inquiry';
      const message = document.getElementById('contact-message')?.value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.');
        return;
      }

      // Generate mailto link
      const mailtoLink = `mailto:sneharg288@gmail.com?subject=${encodeURIComponent(`[Portfolio Inquiry] ${subject} - from ${name}`)}&body=${encodeURIComponent(`Hi Sneha,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent via Sneha RG Portfolio Web`)}`;
      window.location.href = mailtoLink;

      showToast('Opening your default email client...');
      contactForm.reset();
    });
  }

  // DOMContentLoaded bootstrap
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLiveClock();
    initMobileMenu();
    initFilterTabs();
    initContactForm();
  });

})();
