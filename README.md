# Automist Labs — Portfolio Website

> A professional, mobile-first portfolio for **Automist Labs** — n8n workflow automation & GoHighLevel (GHL) specialist.

**Live site →** `https://automistlabs.github.io/testing-website/`

---

## 🚀 Quick Start (Local Dev)

No build tools needed. It's plain HTML/CSS/JS.

```bash
# 1. Clone the repo
git clone https://github.com/Automistlabs/testing-website.git
cd testing-website

# 2. Open in browser  (pick one)
open index.html                    # macOS
xdg-open index.html               # Linux
start index.html                   # Windows

# — OR use a local server for accurate font/asset loading —
npx serve .                        # requires Node.js
# then visit http://localhost:3000
```

---

## 📁 File Structure

```
testing-website/
├── index.html          ← Single-page site (edit content here)
├── assets/
│   ├── css/
│   │   └── style.css   ← All styles, design system, responsive rules
│   ├── js/
│   │   └── main.js     ← Animations, mobile nav, scroll spy
│   └── img/            ← Place your images/og-image here
├── .nojekyll           ← Tells GitHub Pages to skip Jekyll processing
└── README.md
```

---

## ✏️ How to Edit Content

### Hero section
In `index.html`, find the `<section id="hero">` block.

- **Title** — edit the `<h1 id="hero-title">` text.
- **Subtitle** — edit the `<p class="hero__subtitle">` paragraph.
- **Stats** — change the `data-target` attribute values on `.hero__stat-value` spans.

### Services
Find the `<section id="services">` block. Each `<article class="service-card">` is one service tile. Edit the `<h3>`, `<p>`, and `<li>` items freely.

### Case Studies / Work
Find `<section id="work">`. Each `<article class="case-card">` is one project. Replace the emoji in `.case-card__placeholder`, update titles, descriptions, and `.case-result__value` numbers.

### Skills
Find `<section id="skills">`. Add or remove `<span class="skill-tag">` elements. Use the `learning` class for skills you're still developing.

### About
Find `<section id="about">`. Edit the `<p>` paragraphs inside `.about__text`.

### Contact
Find `<section id="contact">`. Update:
- **Email** — change `href="mailto:hello@automistlabs.com"` to your real email.
- **Calendar link** — replace the `href="#contact"` on the "Book a Discovery Call" button with your Calendly/Cal.com URL.
- **Social links** — update the `href="#"` values for Twitter, LinkedIn, Upwork, YouTube.

### Footer social icons
Same `href="#"` placeholders — update with your real profile URLs.

### Brand colours
Open `assets/css/style.css` and edit the `:root` custom properties at the top (lines 6–21).

---

## 🌐 Deploy to GitHub Pages

1. Push your changes to the `main` branch.
2. In your repository, go to **Settings → Pages**.
3. Under **Build and deployment**, set:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` / `(root)`
4. Click **Save**.
5. GitHub will build and publish the site. A green banner shows the live URL (usually `https://automistlabs.github.io/testing-website/`).

> ℹ️ The `.nojekyll` file is already included so GitHub Pages serves the CSS/JS correctly.

---

## 🖼️ Adding a Real OG Image

1. Create a `1200×630 px` image.
2. Save it as `assets/img/og-image.png`.
3. Commit and push.

The `<meta property="og:image">` tag in `index.html` already points to that path.

---

## 🎨 Customising the Design

| What | Where |
|------|-------|
| Colours & gradients | `:root` block in `style.css` |
| Fonts | `<link>` tag in `<head>` + `--font-sans` variable |
| Section spacing | `--sp-*` variables in `:root` |
| Animations | `.fade-in` CSS + `IntersectionObserver` in `main.js` |
| Nav height | `--nav-h` variable |

---

## 📄 Licence

MIT — feel free to adapt this for your own brand.