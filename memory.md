# Project Memory — Sneha RG Portfolio (Portfolio - 3)

## 1. Executive Summary
This document records the architectural decisions, code changes, problem resolutions, and deployment procedures executed for **Sneha RG's Executive Portfolio** (`Portfolio - 3`). The project was refined from an initial draft into a verified, museum-grade static web portfolio deployed to Cloudflare Pages and hosted on GitHub.

- **Live URL**: [https://sneha-rg-portfolio.pages.dev/](https://sneha-rg-portfolio.pages.dev/)
- **GitHub Repository**: [https://github.com/Mouli-K/sneha-rg-portfolio](https://github.com/Mouli-K/sneha-rg-portfolio)
- **Primary Source of Truth**: `Sneha RG.pdf` (Uploaded Resume)

---

## 2. Key Objectives & User Requirements Addressed

| # | User Requirement | Root Cause / Challenge | Implemented Solution |
|---|------------------|------------------------|----------------------|
| 1 | **Light Mode Only** | Dark mode was overwhelming and toggles caused theme switches. | Permanently enforced Pure Alabaster Light theme (`#FBFBFA` background, `#FFFFFF` cards, `#18181B` typography, `#E4E4E7` borders). Stripped dark mode toggles and neutralized `html.dark` classes. |
| 2 | **Fixed Experience Filter** | Filtering on `experience.html` was stuck showing the full list due to missing individual categories and Tailwind `space-y` phantom margins. | Assigned distinct filter categories (`corporate`, `crm`, `legal`, `finance`), added standard HTML `hidden` attribute handling to eliminate Tailwind gaps, and added live filter counters with active button styling. |
| 3 | **Front Page Career Journey (Left-to-Right with Arrows)** | The original company marquee had no chronological order or clear progression. | Built a dedicated **Career Journey Timeline** on `index.html` flowing strictly **Left-to-Right** from oldest to latest (`L&T` $\rightarrow$ `Shriram Finance` $\rightarrow$ `ELK India` $\rightarrow$ `Emerson Process Management` as Current Role on the right). |
| 4 | **Purged Hallucinated Metrics & Fake Data** | Prior version invented SLAs (`<24h SLA`), fake percentages (`98.4% ITC`, `Zero Defect`), and synthetic case studies not in the resume. | Replaced all hallucinated metrics across `index.html`, `projects.html`, `experience.html`, and `main.js` with 100% verified facts and deliverables from `Sneha RG.pdf`. |
| 5 | **Simplified Skill Stack Flow** | Skills were overcomplicated with arbitrary percentage bars (`95%`, `90%`) and unnecessary grouping/filters. | Redesigned `skills.html` into a continuous, aesthetic **Skill Stack Flow**. Removed all percentage numbers and progress bars; eliminated filter tabs in favor of a cohesive flow of authentic tools. |
| 6 | **Clean Education Page Preserved** | User praised the clean layout of `education.html`. | Preserved the clean academic cards while standardizing the page to pure light mode and verifying academic distinctions (71.12% B.Com CS Ethiraj College, MBA Finance Madras University, NISM/CRM certifications). |
| 7 | **Clarified Contact Action ("Transit Message")** | User was confused by what "Transmit Message" did. | Relabeled the action button to **"Send via Email Client (Opens Your Email App)"**, added an informative explanation box explaining the `mailto:` workflow to `sneharg288@gmail.com`, and added a 1-click **"Copy Email Address"** fallback button. |
| 8 | **Resolved Cloudflare "Page Isn't Working" Loop** | Cloudflare Pages Pretty URLs (308 redirect from `*.html` to clean URL) conflicted with `_redirects` (`/page /page.html 200`), causing `ERR_TOO_MANY_REDIRECTS`. | Deleted the conflicting `_redirects` file, created subfolder index files (`/experience/index.html`, etc.), and updated all internal links to clean root-relative paths (`/experience`, etc.). |
| 9 | **Resolved Tailwind CDN Console Warning** | `cdn.tailwindcss.com` displayed production warning in developer console. | Installed Tailwind CSS locally, compiled an optimized production stylesheet (`assets/css/tailwind.css`, ~33 KB), and configured automated compilation in `build.js`. |

---

## 3. Technical Implementation Details

### A. Routing & Cloudflare Pages Architecture
To ensure compatibility across both direct file browsing (`file://`), static servers (`serve .`), and Cloudflare Pages edge routing:
- **Root-Relative Links**: All navigation anchors point directly to clean URLs (`/`, `/experience`, `/projects`, `/skills`, `/education`, `/contact`).
- **Dual Folder Indexing**:
  - `experience.html` AND `experience/index.html`
  - `projects.html` AND `projects/index.html`
  - `skills.html` AND `skills/index.html`
  - `education.html` AND `education/index.html`
  - `contact.html` AND `contact/index.html`
- **Zero Redirect Loop Guarantee**: With conflicting `_redirects` removed, Cloudflare Pages resolves requests directly with `HTTP 200 OK`.

### B. Production Build Automation (`build.js`)
Configured `npm run build` via `build.js` to automate:
1. Compiling Tailwind CSS: `npx tailwindcss -i src/input.css -o assets/css/tailwind.css --minify`
2. Mirroring root HTML files to subfolder `index.html` equivalents.
3. Populating `dist/` with all static assets, documents, and images for hosting flexibility.

### C. Git & Deployment Pipeline
1. Git repository created and committed with structured semantic messages.
2. Remote repository created under GitHub: `https://github.com/Mouli-K/sneha-rg-portfolio.git`
3. Connected and deployed to Cloudflare Pages: `https://sneha-rg-portfolio.pages.dev`

---

## 4. File Structure
```
Portfolio - 3/
├── index.html                 # Overview & Left-to-Right Career Journey
├── experience.html            # Role Chronology with working interactive filter
├── projects.html              # Authentic Resume Deliverables & Work Highlights
├── skills.html                # Simplified Skill Stack Flow (Zero Percentages)
├── education.html             # Academic Qualifications & Certifications
├── contact.html               # Direct Contact Coordinates & Mail Client Action
├── 404.html                   # Clean 404 Not Found Page
├── Sneha RG.pdf               # Original Resume PDF
├── package.json               # Project manifest & build scripts
├── build.js                   # Production compilation & directory sync script
├── tailwind.config.js         # Production Tailwind configuration
├── memory.md                  # Project memory, decisions & changelog
├── _headers                   # Cloudflare Pages security & caching headers
├── src/
│   └── input.css              # Tailwind base input stylesheet
├── assets/
│   ├── Sneha-RG-Resume.pdf    # Downloadable resume copy
│   ├── css/
│   │   ├── style.css          # Design system, light theme tokens, animations
│   │   └── tailwind.css       # Compiled production Tailwind CSS (~33 KB)
│   ├── js/
│   │   └── main.js            # Light theme enforcer, live IST clock, filters, modal
│   └── images/
│       ├── avatar.svg         # Monogram avatar
│       ├── emerson-dossier.svg
│       ├── lt-gst-costing.svg
│       ├── powerbi-telemetry.svg
│       └── shriram-legal.svg
└── [experience|projects|skills|education|contact]/
    └── index.html             # Dual directory indices for zero-redirect hosting
```

---

## 5. Verification Checklist Completed
- [x] All 5 subpages load with `HTTP 200 OK` on Cloudflare Pages without redirect loops.
- [x] Pure light mode active across entire site; dark toggle removed.
- [x] Left-to-right career progression with arrows on front page.
- [x] 100% data alignment with `Sneha RG.pdf`.
- [x] Interactive filter on `experience.html` functions correctly.
- [x] Skills page rendered as clean flow stack without percentages.
- [x] Contact form clarified with explicit mail client explanation.
- [x] Tailwind CSS compiled for production (no CDN warnings in console).
- [x] GitHub repository updated and synchronized.

*Document finalized on October 17, 2026.*
