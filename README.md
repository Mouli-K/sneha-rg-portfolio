# Sneha RG — Executive Web Portfolio

Museum-grade, editorial-minimalist web portfolio for **Sneha RG** (Finance, Statutory Compliance & Operations Specialist). Built following the **Alabaster Monograph** design system with full Light & Dark mode support, 100% responsive layouts (Mobile & Desktop), and seamless zero-config deployment to **GitHub ➔ Cloudflare Pages ➔ Custom Link**.

---

## 🌟 Key Features

- **Executive Monograph Aesthetic**: Clean typography with `Plus Jakarta Sans`, `Inter`, and `JetBrains Mono`, subtle hairline borders, and warm alabaster / obsidian contrast.
- **Light & Obsidian Dark Modes**: Smooth switch with automatic OS preference detection and `localStorage` persistence (zero flash on reload).
- **Responsive Architecture**: Fully optimized for mobile screens, tablets, and high-DPI desktop displays with a responsive slide-out drawer menu.
- **Dynamic Live IST Clock**: Displays the current time in Chennai, India (IST / UTC+5:30) with real-time second updates.
- **Full Page Ecosystem**:
  - `index.html`: Flagship Overview Dashboard with executive bio, availability indicator, metrics ribbon, ecosystem marquee, and track record.
  - `experience.html`: Detailed career chronology covering **Emerson Process Management**, **ELK India**, **Shriram Finance Ltd.**, and **Larsen & Toubro**.
  - `projects.html`: Interactive case study cards with modal inspection for quality dossiers, GST reconciliation, NBFC compliance, and Power BI dashboards.
  - `skills.html`: Categorized interactive matrix for Financial Systems, Taxation (GST/TDS), Operations (SPEC/GAD), and CRM tools.
  - `education.html`: Academic history (MBA Finance - Univ. of Madras, B.Com CS - Ethiraj College) and verified certifications (NISM, HubSpot, Business Analysis).
  - `contact.html`: Direct communication channels, instant copy buttons for email/phone, and an interactive message form.
  - `404.html`: Custom error page with theme support.
- **1-Click Copy & Direct Resume Download**: Pre-packaged with Sneha RG's actual resume PDF (`assets/Sneha-RG-Resume.pdf`).

---

## 🚀 Deployment Pipeline: GitHub ➔ Cloudflare Pages ➔ Custom Link

Deploying this portfolio to Cloudflare Pages is completely seamless and requires **zero build server setup**.

### Step 1: Push to GitHub

1. Open your terminal in this project folder:
   ```bash
   git init
   git add .
   git commit -m "feat: complete responsive portfolio for Sneha RG"
   git branch -M main
   ```
2. Create a new repository on your GitHub account (e.g., `sneha-rg-portfolio`).
3. Link your local repo to GitHub and push:
   ```bash
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<REPO_NAME>.git
   git push -u origin main
   ```

---

### Step 2: Connect to Cloudflare Pages

1. Log into your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. In the left navigation, navigate to **Compute (Workers & Pages)** ➔ **Create application**.
3. Select the **Pages** tab and click **Connect to Git**.
4. Authorize Cloudflare to access your GitHub account and select your repository (`sneha-rg-portfolio`).
5. Configure the deployment settings:
   - **Project name**: `sneha-rg-portfolio` (or your preferred name)
   - **Production branch**: `main`
   - **Framework preset**: `None`
   - **Build command**: *(Leave empty)*
   - **Build output directory**: `.` *(Root directory)*
6. Click **Save and Deploy**.
7. In **under 15 seconds**, Cloudflare will deploy your site to a live URL like:
   `https://sneha-rg-portfolio.pages.dev`

---

### Step 3: Add Your Custom Domain / Link

1. In your Cloudflare Pages project, click on the **Custom domains** tab.
2. Click **Set up a custom domain**.
3. Enter your domain (e.g., `sneharg.com` or `portfolio.yourdomain.com`).
4. Cloudflare automatically generates SSL/TLS certificates and configures DNS routing.

---

## 💻 Local Testing & Development

To test locally on your computer:

```bash
# Option A: Run directly in browser
# Simply double-click `index.html` to open it in any browser!

# Option B: Run via standard local server
npx serve .
```

---

## 📁 Repository Structure

```
├── assets/
│   ├── css/
│   │   └── style.css              # Monograph theme & dark mode tokens
│   ├── js/
│   │   └── main.js                # Theme switcher, live clock, modals, clipboard
│   ├── images/
│   │   ├── avatar.svg             # Sneha RG monogram vector
│   │   ├── emerson-dossier.svg    # Emerson order management graphic
│   │   ├── lt-gst-costing.svg     # L&T GST & costing graphic
│   │   ├── shriram-legal.svg      # Shriram Finance legal compliance graphic
│   │   └── powerbi-telemetry.svg  # Power BI financial telemetry graphic
│   └── Sneha-RG-Resume.pdf        # Downloadable resume PDF
├── index.html                     # Flagship Overview Dashboard
├── experience.html                # Professional experience timeline
├── projects.html                  # Case studies & featured work
├── skills.html                    # Interactive skills & tech stack
├── education.html                 # Degrees & certifications
├── contact.html                   # Contact form & communication channels
├── 404.html                       # Fallback page
├── _headers                       # Cloudflare Pages security & caching headers
├── _redirects                     # Cloudflare Pages clean URL routing
├── package.json                   # Scripts configuration
└── README.md                      # Documentation & deployment guide
```
