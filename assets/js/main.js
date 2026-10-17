/**
 * Sneha RG Portfolio — Alabaster Monograph Controller
 * Features: Pure Light Mode, Mobile Drawer, Live IST Clock,
 * Toast Notifications, Authentic Experience Modals, Dynamic Filters,
 * and Clear Contact Actions.
 */

(function () {
  'use strict';

  // 1. Force Pure Light Mode (User Preference: Light Mode Only)
  function initTheme() {
    document.documentElement.classList.remove('dark');
    try {
      localStorage.setItem('portfolio-theme', 'light');
    } catch (e) {}
  }

  // 2. Live Indian Standard Time (IST) Clock
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
        const now = new Date();
        clockElements.forEach(el => {
          el.textContent = `Chennai, India — ${now.toLocaleTimeString()} IST`;
        });
      }
    }

    updateTime();
    setInterval(updateTime, 1000);
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

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !mobileDrawer.classList.contains('translate-x-full')) {
        closeDrawer();
      }
    });
  }

  // 4. Toast Notification
  function showToast(message, duration = 3200) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notification';
      toast.className = 'fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl bg-zinc-900 text-white font-medium text-xs shadow-2xl border border-zinc-700 transition-all duration-300';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <span class="material-symbols-outlined text-emerald-400 text-sm">check_circle</span>
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

  // 6. Experience Detail Modals (100% Resume Accurate — Zero Hallucinated Numbers)
  const CASE_STUDIES = {
    'emerson': {
      title: 'Documentation & Order Management Trainee',
      org: 'Emerson Process Management Chennai Pvt Ltd.',
      period: 'Dec 2025 – Present',
      role: 'Documentation & Order Management Trainee',
      badge: 'CURRENT ROLE • ORDER MANAGEMENT & COMPLIANCE',
      image: '/assets/images/emerson-dossier.svg',
      overview: 'Handling commercial documentation, customer-ready invoicing, warranty files, and Quality Control certificates adhering to Standard Operating Procedures (SOP) and order requirements.',
      keyContributions: [
        'Prepared and submitted customer-ready invoices, warranty files, and QC certificates.',
        'Performed Specification (SPEC) and GAD documentation activities in the document management database.',
        'Skilled in preparing Instruction and Operation Manuals, Quality Dossiers, and Catalogues for final documentation, with a focus on accuracy, SOP adherence, and timely order closure.'
      ],
      tags: ['Customer Invoices', 'Warranty Files', 'QC Certificates', 'SPEC & GAD', 'Quality Dossiers', 'Instruction & Operation Manuals', 'SOP Adherence']
    },
    'elk-crm': {
      title: 'CRM Executive',
      org: 'ELK India',
      period: 'Aug 2025 – Nov 2025',
      role: 'CRM Executive',
      badge: 'CLIENT OPERATIONS • CRM COORDINATION',
      image: '/assets/images/powerbi-telemetry.svg',
      overview: 'Managed direct client communication, customer enquiries, pricing explanation, and inter-departmental service coordination through disciplined follow-ups.',
      keyContributions: [
        'Managed direct client communication and explained services and pricing clearly.',
        'Supported timely client communication and service coordination through structured follow-ups.',
        'Helped maintain consistent customer enquiry handling and internal coordination.'
      ],
      tags: ['Client Communication', 'Pricing Clarification', 'Structured Follow-ups', 'Customer Enquiries', 'Internal Coordination']
    },
    'shriram-legal': {
      title: 'Junior Executive — Legal Department',
      org: 'Shriram Finance Ltd.',
      period: 'Jul 2025 – Aug 2025',
      role: 'Junior Executive (Internship)',
      badge: 'INTERNSHIP • LEGAL COMPLIANCE',
      image: '/assets/images/shriram-legal.svg',
      overview: 'Contributed to legal case documentation and regulatory compliance tracking inside the corporate legal department of Shriram Finance Ltd.',
      keyContributions: [
        'Supported legal case documentation and compliance tracking, assisted in drafting legal notices and responses.',
        'Contributed to organized documentation and compliance tracking within the finance company’s legal function.'
      ],
      tags: ['Legal Case Documentation', 'Compliance Tracking', 'Drafting Legal Notices', 'Institutional Responses']
    },
    'lt-finance': {
      title: 'Finance Intern — GST & Management Accounting',
      org: 'Larsen & Toubro — Chennai',
      period: 'May 2024 – Jun 2024',
      role: 'Finance Intern',
      badge: 'INTERNSHIP • FINANCE & GST',
      image: '/assets/images/lt-gst-costing.svg',
      overview: 'Supported the Finance Department’s GST Team, gaining practical exposure to corporate tax filing, departmental ledgers, and management accounting techniques.',
      keyContributions: [
        'Supported the Finance Department’s GST Team, gained practical exposure to finance operations and departmental processes.',
        'Assisted with management accounting activities using marginal costing principles.'
      ],
      tags: ['GST Team Operations', 'Departmental Processes', 'Marginal Costing', 'Management Accounting']
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
        <div class="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white border border-zinc-200 rounded-2xl shadow-2xl p-6 sm:p-8 transition-transform duration-300 scale-95" id="case-study-modal-card">
          <button class="absolute top-5 right-5 w-9 h-9 rounded-full bg-zinc-100 text-zinc-600 hover:text-zinc-950 flex items-center justify-center transition-colors" onclick="closeCaseStudyModal()">
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
          <span class="inline-block px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-900 font-mono text-[11px] font-semibold tracking-wider uppercase mb-3">
            ${data.badge}
          </span>
          <h2 class="text-2xl sm:text-3xl font-display font-bold text-zinc-900 leading-tight">
            ${data.title}
          </h2>
          <div class="flex flex-wrap items-center gap-2 pt-2 text-xs font-mono text-zinc-500">
            <span class="font-semibold text-zinc-800">${data.org}</span>
            <span>•</span>
            <span class="text-indigo-900 font-medium">${data.period}</span>
          </div>
        </div>

        <div>
          <h4 class="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2 font-semibold">Role Summary</h4>
          <p class="text-sm text-zinc-700 leading-relaxed font-body">
            ${data.overview}
          </p>
        </div>

        <div>
          <h4 class="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3 font-semibold">Resume Responsibilities &amp; Highlights</h4>
          <ul class="space-y-2.5">
            ${data.keyContributions.map(c => `
              <li class="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 leading-relaxed">
                <span class="material-symbols-outlined text-indigo-900 text-[18px] shrink-0 mt-0.5">check_circle</span>
                <span>${c}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="pt-4 border-t border-zinc-100 flex flex-wrap items-center gap-2">
          ${data.tags.map(t => `
            <span class="px-2.5 py-1 rounded bg-zinc-100 text-zinc-700 font-mono text-[11px] border border-zinc-200">${t}</span>
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

  // 7. Interactive Filter for Experience Page
  function initFilterTabs() {
    const filterButtons = document.querySelectorAll('[data-filter-target]');
    if (!filterButtons.length) return;

    const items = document.querySelectorAll('[data-filter-category]');
    const countIndicator = document.getElementById('filter-status-indicator');

    function applyFilter(targetCategory, activeBtn) {
      // 1. Update button styling
      filterButtons.forEach(b => {
        b.classList.remove('bg-indigo-900', 'text-white', 'shadow-sm', 'ring-2', 'ring-indigo-900/20');
        b.classList.add('bg-zinc-100', 'text-zinc-700', 'hover:bg-zinc-200', 'border', 'border-zinc-200');
      });

      if (activeBtn) {
        activeBtn.classList.remove('bg-zinc-100', 'text-zinc-700', 'hover:bg-zinc-200', 'border-zinc-200');
        activeBtn.classList.add('bg-indigo-900', 'text-white', 'shadow-sm', 'ring-2', 'ring-indigo-900/20');
      }

      // 2. Filter items with both display and HTML hidden attribute
      let visibleCount = 0;
      items.forEach(item => {
        const rawCategory = (item.getAttribute('data-filter-category') || '').toLowerCase();
        const itemCategories = rawCategory.split(/\s+/).filter(Boolean);
        const isMatch = targetCategory === 'all' || itemCategories.includes(targetCategory.toLowerCase());

        if (isMatch) {
          visibleCount++;
          item.hidden = false;
          item.style.display = '';
          item.style.opacity = '1';
        } else {
          item.hidden = true;
          item.style.display = 'none';
        }
      });

      // 3. Update counter text if element exists
      if (countIndicator) {
        if (targetCategory === 'all') {
          countIndicator.innerHTML = `Showing all <strong>${visibleCount}</strong> professional roles`;
        } else {
          const label = activeBtn ? activeBtn.getAttribute('data-filter-label') || activeBtn.textContent.trim() : targetCategory;
          countIndicator.innerHTML = `Showing <strong>${visibleCount}</strong> role matching <em>${label}</em> — <button type="button" class="text-indigo-900 underline font-semibold hover:text-indigo-700 ml-1" onclick="document.querySelector('[data-filter-target=all]').click()">View All</button>`;
        }
      }
    }

    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetCategory = btn.getAttribute('data-filter-target');
        applyFilter(targetCategory, btn);
      });
    });

    // Default to 'all'
    const defaultBtn = document.querySelector('[data-filter-target="all"]') || filterButtons[0];
    if (defaultBtn) {
      applyFilter('all', defaultBtn);
    }
  }

  // 8. Contact Form Handler (Direct Mailto with clear user explanation)
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
      
      showToast('Opening your email client to send message to sneharg288@gmail.com...');
      window.location.href = mailtoLink;
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
