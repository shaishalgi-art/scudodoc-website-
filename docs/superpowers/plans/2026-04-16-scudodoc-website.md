# SCUDOdoc Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete Flask website for SCUDOdoc — a medical PPE startup — serving as both a product showcase and investor platform, matching the scudo-mind.health design language.

**Architecture:** Hybrid Flask app — rich scrolling homepage with 8 sections, plus 4 dedicated sub-pages (/technology, /esg, /market, /contact). Server-side rendered with Jinja2. TailwindCSS v3 via CDN (no build step), vanilla JS for counters/menu/animations.

**Tech Stack:** Python 3.x, Flask 3.x, Jinja2, TailwindCSS v3 CDN, Vanilla JS ES6+, pytest

---

## File Map

```
scudodoc/                              (project root = "Scudo Doc Website/")
├── app.py                             # Flask routes (6 routes)
├── requirements.txt                   # Flask only
├── tests/
│   └── test_routes.py                 # Smoke tests for all routes
├── static/
│   ├── css/
│   │   └── styles.css                 # Custom CSS: animations, counter, matrix
│   ├── js/
│   │   └── main.js                    # Counters, mobile menu, scroll animations
│   └── images/
│       ├── logo.png                   # copied from ../make-the-doc-much-smaller_...png
│       ├── hero-mask.jpeg             # already in project root (WhatsApp Image...)
│       ├── wear-shot-1.png            # copied from ../Picture1.png
│       ├── wear-shot-2.png            # copied from ../Picture2.png
│       ├── benny.png                  # copied from ../benny.png
│       ├── shai.png                   # copied from ../shai.png
│       └── product-video.mp4          # copied from "../scudo option 1 (1).mp4"
├── templates/
│   ├── base.html                      # Confidential banner, sticky nav, footer, meta
│   ├── index.html                     # Homepage (8 sections)
│   ├── technology.html                # Ion Plasma deep-dive + video
│   ├── esg.html                       # Full ESG impact page
│   ├── market.html                    # Market phases + revenue projections
│   └── contact.html                   # Contact + full team profiles
└── docs/
    └── superpowers/
        ├── specs/2026-04-16-scudodoc-website-design.md
        └── plans/2026-04-16-scudodoc-website.md
```

---

## Task 1: Scaffold — requirements, app.py, tests, directory structure

**Files:**
- Create: `requirements.txt`
- Create: `app.py`
- Create: `tests/__init__.py`
- Create: `tests/test_routes.py`

- [ ] **Step 1: Create requirements.txt**

```
Flask==3.1.0
pytest==8.3.0
```

- [ ] **Step 2: Create app.py**

```python
from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/technology')
def technology():
    return render_template('technology.html')


@app.route('/esg')
def esg():
    return render_template('esg.html')


@app.route('/market')
def market():
    return render_template('market.html')


@app.route('/contact')
def contact():
    return render_template('contact.html')


if __name__ == '__main__':
    app.run(debug=True)
```

- [ ] **Step 3: Create tests/__init__.py** (empty file)

- [ ] **Step 4: Create tests/test_routes.py**

```python
import pytest
from app import app as flask_app


@pytest.fixture
def client():
    flask_app.config['TESTING'] = True
    with flask_app.test_client() as client:
        yield client


def test_homepage_returns_200(client):
    r = client.get('/')
    assert r.status_code == 200


def test_technology_returns_200(client):
    r = client.get('/technology')
    assert r.status_code == 200


def test_esg_returns_200(client):
    r = client.get('/esg')
    assert r.status_code == 200


def test_market_returns_200(client):
    r = client.get('/market')
    assert r.status_code == 200


def test_contact_returns_200(client):
    r = client.get('/contact')
    assert r.status_code == 200


def test_404_on_unknown_route(client):
    r = client.get('/nonexistent')
    assert r.status_code == 404
```

- [ ] **Step 5: Install deps and run tests (expect 5 failures — templates don't exist yet)**

```bash
pip install -r requirements.txt
pytest tests/ -v
```

Expected: `TemplateNotFound` errors — that's correct, templates come next.

- [ ] **Step 6: Commit**

```bash
git init
git add requirements.txt app.py tests/
git commit -m "feat: scaffold Flask app with routes and smoke tests"
```

---

## Task 2: Copy Assets into static/images/

**Files:**
- Create: `static/images/` directory with all assets

- [ ] **Step 1: Create directories**

```bash
mkdir -p static/images static/css static/js templates
```

- [ ] **Step 2: Copy image and video assets**

Run each command from the project root (`Scudo Doc Website/`):

```bash
# Logo
cp "../make-the-doc-much-smaller_7F65LclJSum61pr3GKFo3w_iD_9uCH0SZCWjGWOfDXT3w_cover_hd.png" static/images/logo.png

# Hero mask render (already in project root)
cp "WhatsApp Image 2026-04-16 at 20.52.02.jpeg" static/images/hero-mask.jpeg

# Wear shots
cp "../Picture1.png" static/images/wear-shot-1.png
cp "../Picture2.png" static/images/wear-shot-2.png

# Team photos
cp "../benny.png" static/images/benny.png
cp "../shai.png" static/images/shai.png

# Product video
cp "../scudo option 1 (1).mp4" static/images/product-video.mp4
```

- [ ] **Step 3: Verify all 7 assets copied**

```bash
ls static/images/
```

Expected: `benny.png  hero-mask.jpeg  logo.png  product-video.mp4  shai.png  wear-shot-1.png  wear-shot-2.png`

- [ ] **Step 4: Commit**

```bash
git add static/images/
git commit -m "feat: add static assets (logo, product renders, team photos, video)"
```

---

## Task 3: base.html — confidential banner, sticky nav, footer, meta

**Files:**
- Create: `templates/base.html`

- [ ] **Step 1: Create templates/base.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{% block title %}SCUDOdoc — Ion Plasma Mask Filter Technology{% endblock %}</title>
  <meta name="description" content="{% block meta_description %}SCUDOdoc is replacing 100-year-old mechanical mask technology with Ion Plasma active-filter technology for healthcare professionals.{% endblock %}" />

  <!-- Open Graph -->
  <meta property="og:title" content="SCUDOdoc — Ion Plasma Mask Filter Technology" />
  <meta property="og:description" content="Replacing 100-year-old mechanical mask technology with Ion Plasma active-filter." />
  <meta property="og:type" content="website" />

  <!-- TailwindCSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary:     '#1ABC9C',
            'primary-dark': '#16a085',
            secondary:   '#2E86AB',
            scudo: {
              teal: '#1ABC9C',
              blue: '#2E86AB',
            }
          },
          fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif'],
          }
        }
      }
    }
  </script>

  <!-- Google Fonts: Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

  <!-- Custom CSS -->
  <link rel="stylesheet" href="{{ url_for('static', filename='css/styles.css') }}" />

  {% block extra_head %}{% endblock %}
</head>
<body class="font-sans text-gray-800 bg-white">

  <!-- Confidential Banner -->
  <div class="bg-amber-50 border-b border-amber-200 text-center py-1.5 px-4 text-xs text-amber-700 font-medium tracking-wide">
    Confidential — For qualified investors only
  </div>

  <!-- Sticky Navigation -->
  <nav id="navbar" class="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm transition-shadow duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">

        <!-- Logo -->
        <a href="{{ url_for('index') }}" class="flex items-center flex-shrink-0">
          <img src="{{ url_for('static', filename='images/logo.png') }}"
               alt="SCUDOdoc" class="h-10 w-auto" />
        </a>

        <!-- Desktop Nav Links -->
        <div class="hidden md:flex items-center gap-6">
          <a href="{{ url_for('technology') }}" class="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Technology</a>
          <a href="{{ url_for('esg') }}" class="text-sm font-medium text-gray-600 hover:text-primary transition-colors">ESG Impact</a>
          <a href="{{ url_for('market') }}" class="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Market</a>
          <a href="{{ url_for('index') }}#team" class="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Team</a>
          <a href="{{ url_for('contact') }}" class="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Contact</a>
          <a href="mailto:benny@scudodoc.com"
             class="ml-2 inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-dark transition-colors shadow-sm">
            Get in Touch &rarr;
          </a>
        </div>

        <!-- Mobile Hamburger -->
        <button id="menu-btn" class="md:hidden p-2 rounded-md text-gray-600 hover:text-primary focus:outline-none" aria-label="Toggle menu">
          <svg id="menu-icon-open" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg id="menu-icon-close" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
      <a href="{{ url_for('technology') }}" class="block text-sm font-medium text-gray-700 hover:text-primary py-1">Technology</a>
      <a href="{{ url_for('esg') }}" class="block text-sm font-medium text-gray-700 hover:text-primary py-1">ESG Impact</a>
      <a href="{{ url_for('market') }}" class="block text-sm font-medium text-gray-700 hover:text-primary py-1">Market</a>
      <a href="{{ url_for('index') }}#team" class="block text-sm font-medium text-gray-700 hover:text-primary py-1">Team</a>
      <a href="{{ url_for('contact') }}" class="block text-sm font-medium text-gray-700 hover:text-primary py-1">Contact</a>
      <a href="mailto:benny@scudodoc.com"
         class="block w-full text-center px-4 py-2 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-dark transition-colors mt-2">
        Get in Touch &rarr;
      </a>
    </div>
  </nav>

  <!-- Page Content -->
  <main>
    {% block content %}{% endblock %}
  </main>

  <!-- Footer -->
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-10">
        <p class="text-2xl font-light text-gray-300 leading-relaxed max-w-2xl mx-auto">
          Finally, after 100 Years...<br />
          <span class="text-white font-semibold">Our medical care givers can breathe — freely &amp; safely</span>
        </p>
        <div class="mt-4 space-y-1 text-gray-400 text-sm">
          <p>Will provide better service</p>
          <p>Will not add to global pollution</p>
          <p>Will not be impacted by geopolitical or pandemic crises</p>
        </div>
      </div>

      <div class="border-t border-gray-700 pt-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <img src="{{ url_for('static', filename='images/logo.png') }}" alt="SCUDOdoc" class="h-8 w-auto opacity-80" />
          <div class="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <a href="{{ url_for('index') }}" class="hover:text-primary transition-colors">Home</a>
            <a href="{{ url_for('technology') }}" class="hover:text-primary transition-colors">Technology</a>
            <a href="{{ url_for('esg') }}" class="hover:text-primary transition-colors">ESG Impact</a>
            <a href="{{ url_for('market') }}" class="hover:text-primary transition-colors">Market</a>
            <a href="{{ url_for('contact') }}" class="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
        <div class="mt-6 text-center text-xs text-gray-500 space-y-1">
          <p>&copy; 2026 SCUDO. All rights reserved.</p>
          <p>Confidential — For qualified investors only</p>
          <p>Contact: Benny Shoham, Founder &amp; CEO &mdash; <a href="mailto:benny@scudodoc.com" class="hover:text-primary transition-colors">benny@scudodoc.com</a></p>
        </div>
      </div>
    </div>
  </footer>

  <!-- JS -->
  <script src="{{ url_for('static', filename='js/main.js') }}"></script>
  {% block extra_scripts %}{% endblock %}
</body>
</html>
```

- [ ] **Step 2: Run tests (all 5 routes still fail — need minimal stub templates)**

Create a minimal stub for each template so tests pass:

```bash
for tmpl in index technology esg market contact; do
  echo "{% extends 'base.html' %}{% block content %}<p>${tmpl}</p>{% endblock %}" > "templates/${tmpl}.html"
done
```

- [ ] **Step 3: Run tests — expect all to pass now**

```bash
pytest tests/ -v
```

Expected: 6 PASSED

- [ ] **Step 4: Commit**

```bash
git add templates/base.html templates/index.html templates/technology.html templates/esg.html templates/market.html templates/contact.html
git commit -m "feat: add base template with nav, footer, confidential banner"
```

---

## Task 4: styles.css + main.js

**Files:**
- Create: `static/css/styles.css`
- Create: `static/js/main.js`

- [ ] **Step 1: Create static/css/styles.css**

```css
/* ── Scroll-triggered fade animations ── */
.fade-in {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── Counter number display ── */
.counter-value {
  display: inline-block;
  font-variant-numeric: tabular-nums;
}

/* ── 2×2 Competitive Matrix ── */
.matrix-container {
  position: relative;
  width: 100%;
  max-width: 480px;
  aspect-ratio: 1;
  border-left: 2px solid #e5e7eb;
  border-bottom: 2px solid #e5e7eb;
  margin: 0 auto;
}
.matrix-dot {
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  transform: translate(-50%, 50%);
}
.matrix-label-x-left  { position: absolute; bottom: -28px; left: 0;   font-size: 11px; color: #6b7280; }
.matrix-label-x-right { position: absolute; bottom: -28px; right: 0;  font-size: 11px; color: #6b7280; }
.matrix-label-y-top   { position: absolute; top: 0;    left: -8px;  font-size: 11px; color: #6b7280; writing-mode: vertical-rl; transform: rotate(180deg); }
.matrix-label-y-bot   { position: absolute; bottom: 0; left: -8px;  font-size: 11px; color: #6b7280; writing-mode: vertical-rl; transform: rotate(180deg); }

/* ── Mobile-responsive table → card fallback ── */
@media (max-width: 640px) {
  .responsive-table thead { display: none; }
  .responsive-table tr    { display: block; margin-bottom: 1rem; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
  .responsive-table td    { display: flex; justify-content: space-between; padding: 8px 12px; font-size: 13px; }
  .responsive-table td::before { content: attr(data-label); font-weight: 600; color: #374151; margin-right: 8px; flex-shrink: 0; }
}

/* ── Smooth scroll ── */
html { scroll-behavior: smooth; }

/* ── Nav shadow on scroll ── */
#navbar.scrolled { box-shadow: 0 4px 20px rgba(0,0,0,0.08); }

/* ── Scroll indicator ── */
.scroll-indicator {
  animation: bounce 2s infinite;
  transition: opacity 0.4s;
}
.scroll-indicator.hidden-indicator { opacity: 0; pointer-events: none; }
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(6px); }
}
```

- [ ] **Step 2: Create static/js/main.js**

```javascript
/* ── Mobile menu toggle ── */
const menuBtn    = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const iconOpen   = document.getElementById('menu-icon-open');
const iconClose  = document.getElementById('menu-icon-close');

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.toggle('hidden');
    iconOpen.classList.toggle('hidden', !isHidden);
    iconClose.classList.toggle('hidden', isHidden);
  });
}

/* ── Nav shadow on scroll ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar && navbar.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

/* ── Scroll indicator fade ── */
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
  window.addEventListener('scroll', () => {
    scrollIndicator.classList.toggle('hidden-indicator', window.scrollY > 80);
  }, { passive: true, once: false });
}

/* ── Animated counter ── */
function animateCounter(el) {
  const target   = parseFloat(el.dataset.target);
  const prefix   = el.dataset.prefix   || '';
  const suffix   = el.dataset.suffix   || '';
  const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
  const duration = 2000;
  const startTs  = performance.now();

  function update(now) {
    const progress = Math.min((now - startTs) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = '1';
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));

/* ── Fade-in on scroll ── */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));
```

- [ ] **Step 3: Run tests (still pass — JS/CSS don't affect route tests)**

```bash
pytest tests/ -v
```

Expected: 6 PASSED

- [ ] **Step 4: Commit**

```bash
git add static/css/styles.css static/js/main.js
git commit -m "feat: add custom CSS animations and JS counter/menu/scroll"
```

---

## Task 5: index.html — Hero + Problem sections

**Files:**
- Modify: `templates/index.html` (replace stub)

- [ ] **Step 1: Write templates/index.html with Hero and Problem sections**

```html
{% extends "base.html" %}

{% block title %}SCUDOdoc — A Paradigm Shift in Medical PPE{% endblock %}

{% block content %}

<!-- ══════════════════════════════════════════
     HERO SECTION
══════════════════════════════════════════ -->
<section class="relative overflow-hidden bg-gradient-to-br from-white to-teal-50 min-h-[90vh] flex items-center">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
    <div class="grid lg:grid-cols-2 gap-12 items-center">

      <!-- Left: Text -->
      <div class="fade-in">
        <div class="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-6 tracking-wide uppercase">
          Ion Plasma Technology &middot; ESG-Aligned
        </div>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          A Paradigm Shift in Medical<br />
          <span class="text-primary">Personal Protective Equipment</span>
        </h1>
        <p class="text-lg text-gray-600 leading-relaxed mb-8 max-w-xl">
          SCUDOdoc is replacing 100-year-old mechanical mask technology with a novel digitally controlled Ion Plasma active-filter. It eliminates fatigue, heat, moisture, and poor patient interaction — while delivering superior infection protection and eliminating millions of hazardous disposable masks trashed each year.
        </p>

        <!-- Stat counters -->
        <div class="grid grid-cols-3 gap-6 mb-10">
          <div class="text-center">
            <div class="text-3xl font-extrabold text-primary">
              <span class="counter-value" data-counter data-target="93.6" data-decimals="1" data-suffix="%">0%</span>
            </div>
            <div class="text-xs text-gray-500 mt-1 leading-tight">PM2.5 Filtration<br />Efficiency</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-extrabold text-primary">
              <span class="counter-value" data-counter data-target="10000" data-suffix="">0</span>
            </div>
            <div class="text-xs text-gray-500 mt-1 leading-tight">Masks Replaced<br />Per Device (5yr)</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-extrabold text-primary">
              <span class="counter-value" data-counter data-prefix="€" data-target="3" data-decimals="1" data-suffix="B">€0B</span>
            </div>
            <div class="text-xs text-gray-500 mt-1 leading-tight">Global Phase I<br />TAM</div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-3">
          <a href="mailto:benny@scudodoc.com"
             class="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors shadow-md">
            Connect with the Team &rarr;
          </a>
          <a href="{{ url_for('technology') }}"
             class="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-colors">
            Learn the Technology
          </a>
        </div>
      </div>

      <!-- Right: Product image -->
      <div class="fade-in flex justify-center lg:justify-end relative">
        <img src="{{ url_for('static', filename='images/hero-mask.jpeg') }}"
             alt="SCUDOdoc Ion Plasma Mask"
             class="w-full max-w-md rounded-2xl shadow-2xl object-cover" />
        <div class="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3 border border-gray-100">
          <div class="flex items-center gap-2">
            <div class="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div>
            <span class="text-xs font-semibold text-gray-700">NAI Protection Active</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-400 text-xs gap-1">
      <span>Scroll</span>
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </div>
  </div>
</section>


<!-- ══════════════════════════════════════════
     THE PROBLEM SECTION
══════════════════════════════════════════ -->
<section id="problem" class="py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16 fade-in">
      <div class="text-primary text-sm font-semibold uppercase tracking-widest mb-3">The Problem</div>
      <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900">Why 100-Year-Old Technology Still Dominates</h2>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

      <!-- Card 1 -->
      <div class="fade-in bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
        <div class="text-3xl mb-4">😮‍💨</div>
        <h3 class="text-lg font-bold text-gray-900 mb-2">Fatigue &amp; Discomfort</h3>
        <p class="text-gray-600 text-sm leading-relaxed">Heat and moisture buildup cause exhaustion, reducing clinical concentration and patient care quality.</p>
      </div>

      <!-- Card 2 -->
      <div class="fade-in bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
        <div class="text-3xl mb-4">🗣️</div>
        <h3 class="text-lg font-bold text-gray-900 mb-2">Poor Patient Interaction</h3>
        <p class="text-gray-600 text-sm leading-relaxed">Masks obstruct vocal clarity and facial visibility, degrading doctor-patient interaction quality.</p>
      </div>

      <!-- Card 3 -->
      <div class="fade-in bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
        <div class="text-3xl mb-4">⚠️</div>
        <h3 class="text-lg font-bold text-gray-900 mb-2">Mediocre Protection</h3>
        <p class="text-gray-600 text-sm leading-relaxed">
          N95: only <strong>60%</strong> actual on-face filtering. KN95: <strong>48.3%</strong>. Surgical: as low as <strong>10–15%</strong> — despite 95%+ lab certification.
        </p>
      </div>

      <!-- Card 4 -->
      <div class="fade-in bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
        <div class="text-3xl mb-4">💶</div>
        <h3 class="text-lg font-bold text-gray-900 mb-2">High Ongoing Costs</h3>
        <p class="text-gray-600 text-sm leading-relaxed">Private GP/dental clinics spend <strong>€500–€1,000/year</strong> on over 2,000 disposable masks per doctor-assistant pair.</p>
      </div>

      <!-- Card 5 -->
      <div class="fade-in bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
        <div class="text-3xl mb-4">🌍</div>
        <h3 class="text-lg font-bold text-gray-900 mb-2">Massive ESG Failure</h3>
        <p class="text-gray-600 text-sm leading-relaxed">~4 billion masks/year from GP &amp; dental clinics alone — 100% non-recyclable, classified hazardous (DASRI), persisting 450+ years as microplastics.</p>
      </div>

      <!-- Card 6 -->
      <div class="fade-in bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
        <div class="text-3xl mb-4">🚢</div>
        <h3 class="text-lg font-bold text-gray-900 mb-2">Supply Chain Vulnerability</h3>
        <p class="text-gray-600 text-sm leading-relaxed">EU imports 70%, USA 90% of medical masks from China. Geopolitical risk, tariffs (US 25–54%), and EU Reg. 2025/1197 make this dependency untenable.</p>
      </div>

    </div>
  </div>
</section>

{% endblock %}
```

- [ ] **Step 2: Start dev server and visually verify Hero + Problem sections**

```bash
flask run
```

Open http://127.0.0.1:5000 — verify:
- Hero renders with mask image, stat counters, both CTA buttons
- Counters animate on load (93.6%, 10000, €3.0B)
- Problem section shows 6 cards in 3-col grid on desktop, 1-col on mobile
- Scroll indicator visible and fades on scroll

- [ ] **Step 3: Run tests**

```bash
pytest tests/ -v
```

Expected: 6 PASSED

- [ ] **Step 4: Commit**

```bash
git add templates/index.html
git commit -m "feat: add homepage hero and problem sections"
```

---

## Task 6: index.html — Solution + ESG Summary sections

**Files:**
- Modify: `templates/index.html` (append before `{% endblock %}`)

- [ ] **Step 1: Append Solution section to index.html, before `{% endblock %}`**

Replace the closing `{% endblock %}` with:

```html

<!-- ══════════════════════════════════════════
     THE SOLUTION SECTION
══════════════════════════════════════════ -->
<section id="solution" class="py-24 bg-gradient-to-br from-teal-50 to-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16 fade-in">
      <div class="text-primary text-sm font-semibold uppercase tracking-widest mb-3">The Solution</div>
      <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900">Ion Plasma Mask Filter Technology</h2>
      <p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Natural Breathing with Superior Real-Protection vs. N95/FFP Masks</p>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">

      <div class="fade-in bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div class="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
          <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        </div>
        <h3 class="font-bold text-gray-900 mb-2">Active Ion Plasma Filtration</h3>
        <p class="text-gray-600 text-sm leading-relaxed">Electronically generated and digitally controlled. <strong>93.6% PM2.5</strong> filtration efficiency vs. N95's 71.6%.</p>
      </div>

      <div class="fade-in bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div class="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
          <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707"/></svg>
        </div>
        <h3 class="font-bold text-gray-900 mb-2">Zero Heat &amp; Moisture Buildup</h3>
        <p class="text-gray-600 text-sm leading-relaxed">No fatigue from eyeglass fogging. Eliminates in-mask heat and moisture entirely.</p>
      </div>

      <div class="fade-in bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div class="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
          <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.069A1 1 0 0121 8.82V15.18a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/></svg>
        </div>
        <h3 class="font-bold text-gray-900 mb-2">Full Vocal &amp; Facial Clarity</h3>
        <p class="text-gray-600 text-sm leading-relaxed">Clear patient interaction. Natural voice, visible face — no barrier to communication.</p>
      </div>

      <div class="fade-in bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div class="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
          <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
        </div>
        <h3 class="font-bold text-gray-900 mb-2">Continuous Self-Sanitizing</h3>
        <p class="text-gray-600 text-sm leading-relaxed">Kills all airborne viruses. Filters both inhaling and exhaling air continuously.</p>
      </div>

      <div class="fade-in bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div class="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
          <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
        </div>
        <h3 class="font-bold text-gray-900 mb-2">Connected &amp; Digital</h3>
        <p class="text-gray-600 text-sm leading-relaxed">NAI Protection Status monitoring. Battery status via app. Digital control and operation.</p>
      </div>

      <div class="fade-in bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div class="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
          <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
        </div>
        <h3 class="font-bold text-gray-900 mb-2">Totally Safe</h3>
        <p class="text-gray-600 text-sm leading-relaxed">No side effects at any dosage. Impact backed by peer-reviewed research.</p>
      </div>
    </div>

    <!-- NAI explainer + product images -->
    <div class="grid lg:grid-cols-2 gap-10 items-center fade-in">
      <div class="bg-primary/5 border border-primary/20 rounded-2xl p-8">
        <div class="text-4xl mb-4">🌿</div>
        <h3 class="text-xl font-bold text-gray-900 mb-3">The Science of NAI</h3>
        <p class="text-gray-700 leading-relaxed">
          NAI (Negative Air Ions) are naturally released from trees and waterfalls — known in Japan as <strong>"Forest Bath"</strong> (Shin-rin-yoku 森林浴). SCUDOdoc harnesses this natural phenomenon with electronic precision, delivering ion densities proven to neutralise airborne pathogens.
        </p>
        <a href="{{ url_for('technology') }}" class="inline-flex items-center mt-6 text-primary font-semibold text-sm hover:underline">
          Explore the full science &rarr;
        </a>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <img src="{{ url_for('static', filename='images/wear-shot-1.png') }}"
             alt="SCUDOdoc worn — front view"
             class="rounded-xl shadow-md object-cover w-full h-48" />
        <img src="{{ url_for('static', filename='images/wear-shot-2.png') }}"
             alt="SCUDOdoc worn — side view"
             class="rounded-xl shadow-md object-cover w-full h-48" />
      </div>
    </div>
  </div>
</section>


<!-- ══════════════════════════════════════════
     ESG IMPACT SUMMARY
══════════════════════════════════════════ -->
<section id="esg" class="py-24 bg-gray-900 text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16 fade-in">
      <div class="text-primary text-sm font-semibold uppercase tracking-widest mb-3">ESG Impact</div>
      <h2 class="text-3xl sm:text-4xl font-extrabold">ECO SCUDO — Reducing Medical Mask Waste</h2>
      <p class="mt-4 text-gray-400 max-w-xl mx-auto">One device replaces 10,000 disposable masks over its 5-year lifespan.</p>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12 fade-in">
      <div class="text-center">
        <div class="text-4xl sm:text-5xl font-extrabold text-primary">
          <span class="counter-value" data-counter data-target="10000" data-suffix="">0</span>
        </div>
        <div class="text-sm text-gray-400 mt-2 leading-tight">Masks eliminated<br />per clinic (5yr)</div>
      </div>
      <div class="text-center">
        <div class="text-4xl sm:text-5xl font-extrabold text-primary">
          <span class="counter-value" data-counter data-target="2137" data-suffix=" kg">0</span>
        </div>
        <div class="text-sm text-gray-400 mt-2 leading-tight">CO₂-eq saved<br />(≡ 9,200 km not driven)</div>
      </div>
      <div class="text-center">
        <div class="text-4xl sm:text-5xl font-extrabold text-primary">
          <span class="counter-value" data-counter data-target="3.6" data-decimals="1" data-suffix=" kg">0</span>
        </div>
        <div class="text-sm text-gray-400 mt-2 leading-tight">Microplastics<br />prevented</div>
      </div>
      <div class="text-center">
        <div class="text-4xl sm:text-5xl font-extrabold text-primary">
          &gt;<span class="counter-value" data-counter data-target="1.26" data-decimals="2" data-suffix="B">0</span>
        </div>
        <div class="text-sm text-gray-400 mt-2 leading-tight">Masks avoided/yr<br />@15% EU Phase I</div>
      </div>
    </div>

    <div class="text-center fade-in">
      <p class="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed mb-6">
        ECO-Social program: Annual Green-up to a new locally made SCUDO mask. Returned devices are refurbished and donated to clinics in low-income countries.
      </p>
      <a href="{{ url_for('esg') }}"
         class="inline-flex items-center px-6 py-3 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-colors">
        Full ESG Impact Report &rarr;
      </a>
    </div>
  </div>
</section>

{% endblock %}
```

- [ ] **Step 2: Verify visually**

```bash
flask run
```

Open http://127.0.0.1:5000 — scroll down to verify Solution (6 cards + NAI box + wear shots) and ESG dark section with animated counters.

- [ ] **Step 3: Run tests**

```bash
pytest tests/ -v
```

Expected: 6 PASSED

- [ ] **Step 4: Commit**

```bash
git add templates/index.html
git commit -m "feat: add solution features and ESG impact summary to homepage"
```

---

## Task 7: index.html — Competitive + Market + Team + Investment sections

**Files:**
- Modify: `templates/index.html` (replace `{% endblock %}` with full remaining sections)

- [ ] **Step 1: Append remaining sections before `{% endblock %}`**

```html

<!-- ══════════════════════════════════════════
     COMPETITIVE POSITIONING
══════════════════════════════════════════ -->
<section id="competitive" class="py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16 fade-in">
      <div class="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Competitive Advantage</div>
      <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900">SCUDOdoc Competitive Positioning</h2>
    </div>

    <div class="grid lg:grid-cols-2 gap-12 items-start">

      <!-- 2×2 Matrix -->
      <div class="fade-in flex flex-col items-center">
        <div class="matrix-container" style="height:280px;">
          <!-- Quadrant labels -->
          <div style="position:absolute;top:8px;left:8px;font-size:10px;color:#9ca3af;">High BFE/PFE</div>
          <div style="position:absolute;bottom:32px;left:8px;font-size:10px;color:#9ca3af;">Low BFE/PFE</div>
          <!-- Competitors -->
          <div class="matrix-dot bg-gray-400" style="left:20%;top:40%;" title="N95/FFP2"></div>
          <div style="position:absolute;left:22%;top:38%;font-size:9px;color:#6b7280;">N95/FFP2</div>
          <div class="matrix-dot bg-gray-300" style="left:15%;top:70%;" title="Surgical"></div>
          <div style="position:absolute;left:17%;top:68%;font-size:9px;color:#6b7280;">Surgical</div>
          <div class="matrix-dot bg-gray-300" style="left:25%;top:55%;" title="KN95"></div>
          <div style="position:absolute;left:27%;top:53%;font-size:9px;color:#6b7280;">KN95</div>
          <!-- SCUDOdoc -->
          <div class="matrix-dot bg-primary" style="left:82%;top:12%;width:18px;height:18px;" title="SCUDOdoc"></div>
          <div style="position:absolute;left:65%;top:8%;font-size:10px;color:#1ABC9C;font-weight:700;">SCUDOdoc</div>
          <!-- Axis labels -->
          <div class="matrix-label-x-left">Poor Patient Interaction</div>
          <div class="matrix-label-x-right" style="bottom:-28px;right:0;">Natural Patient Interaction</div>
        </div>
        <div class="mt-10 text-xs text-gray-500 text-center">
          X: Patient interaction quality &nbsp;|&nbsp; Y: On-face filtration efficiency
        </div>
      </div>

      <!-- Comparison table + checklist -->
      <div class="fade-in">
        <div class="overflow-x-auto mb-8">
          <table class="responsive-table w-full text-sm border-collapse">
            <thead>
              <tr class="bg-gray-50">
                <th class="text-left p-3 font-semibold text-gray-700 rounded-tl-lg">Feature</th>
                <th class="text-left p-3 font-semibold text-gray-700">Standard FFP2/N95</th>
                <th class="text-left p-3 font-semibold text-primary rounded-tr-lg">SCUDOdoc</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr>
                <td data-label="Feature" class="p-3 text-gray-700 font-medium">Patient Interaction</td>
                <td data-label="FFP2/N95" class="p-3 text-gray-500">Poor (muffled voice, hidden face)</td>
                <td data-label="SCUDOdoc" class="p-3 text-primary font-medium">Natural (clear voice &amp; face)</td>
              </tr>
              <tr class="bg-gray-50/50">
                <td data-label="Feature" class="p-3 text-gray-700 font-medium">User Fatigue</td>
                <td data-label="FFP2/N95" class="p-3 text-gray-500">High (heat, moisture, fit)</td>
                <td data-label="SCUDOdoc" class="p-3 text-primary font-medium">Low (no heat, no moisture)</td>
              </tr>
              <tr>
                <td data-label="Feature" class="p-3 text-gray-700 font-medium">On-Face Filtration</td>
                <td data-label="FFP2/N95" class="p-3 text-gray-500">48–60%</td>
                <td data-label="SCUDOdoc" class="p-3 text-primary font-bold">93.6%</td>
              </tr>
              <tr class="bg-gray-50/50">
                <td data-label="Feature" class="p-3 text-gray-700 font-medium">Recyclable</td>
                <td data-label="FFP2/N95" class="p-3 text-red-400">No</td>
                <td data-label="SCUDOdoc" class="p-3 text-primary font-medium">Yes</td>
              </tr>
              <tr>
                <td data-label="Feature" class="p-3 text-gray-700 font-medium">Annual Cost/Clinic</td>
                <td data-label="FFP2/N95" class="p-3 text-gray-500">€500–€1,000</td>
                <td data-label="SCUDOdoc" class="p-3 text-primary font-bold">€400</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="space-y-2">
          {% for item in ['No Fatigue', 'Best infection protection', 'Clear patient interaction', 'Eco &amp; Social impact', 'Cost efficient'] %}
          <div class="flex items-center gap-3 text-gray-700 text-sm">
            <div class="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <svg class="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
            </div>
            <span>{{ item }}</span>
          </div>
          {% endfor %}
        </div>
      </div>
    </div>
  </div>
</section>


<!-- ══════════════════════════════════════════
     MARKET OPPORTUNITY SUMMARY
══════════════════════════════════════════ -->
<section id="market" class="py-24 bg-gradient-to-br from-teal-50 to-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16 fade-in">
      <div class="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Market Opportunity</div>
      <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900">SCUDOdoc Global Market — €3 Billion</h2>
    </div>

    <div class="grid sm:grid-cols-3 gap-8 mb-12 fade-in">
      <div class="text-center bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div class="text-4xl font-extrabold text-primary mb-1">€3.0B</div>
        <div class="text-sm text-gray-500">Phase I TAM<br />(private clinics)</div>
      </div>
      <div class="text-center bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div class="text-4xl font-extrabold text-primary mb-1">€1.875B</div>
        <div class="text-sm text-gray-500">Serviceable<br />Addressable Market</div>
      </div>
      <div class="text-center bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div class="text-4xl font-extrabold text-primary mb-1">€400M</div>
        <div class="text-sm text-gray-500">Revenue Target<br />Year 6</div>
      </div>
    </div>

    <div class="overflow-x-auto fade-in mb-8">
      <table class="responsive-table w-full text-sm border-collapse">
        <thead>
          <tr class="bg-primary/5">
            <th class="text-left p-3 font-semibold text-gray-700">Phase</th>
            <th class="text-left p-3 font-semibold text-gray-700">Target</th>
            <th class="text-left p-3 font-semibold text-gray-700">Key Characteristic</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr><td data-label="Phase" class="p-3 font-bold text-primary">I</td><td data-label="Target" class="p-3 text-gray-700">France 47K dentists → EU 360K dentists</td><td data-label="Characteristic" class="p-3 text-gray-500">Private, fast cycle, ESG-driven</td></tr>
          <tr class="bg-gray-50/50"><td data-label="Phase" class="p-3 font-bold text-primary">II</td><td data-label="Target" class="p-3 text-gray-700">EU GP &amp; specialist clinics (480K)</td><td data-label="Characteristic" class="p-3 text-gray-500">Private; GP network adoption</td></tr>
          <tr><td data-label="Phase" class="p-3 font-bold text-primary">III</td><td data-label="Target" class="p-3 text-gray-700">US &amp; other Western (Japan, Korea, Taiwan)</td><td data-label="Characteristic" class="p-3 text-gray-500">Supply-security driver</td></tr>
          <tr class="bg-gray-50/50"><td data-label="Phase" class="p-3 font-bold text-primary">IV</td><td data-label="Target" class="p-3 text-gray-700">Public health systems, hospitals</td><td data-label="Characteristic" class="p-3 text-gray-500">Largest volume; longer procurement</td></tr>
        </tbody>
      </table>
    </div>

    <div class="text-center fade-in">
      <a href="{{ url_for('market') }}"
         class="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors shadow-md">
        Full Market Analysis &rarr;
      </a>
    </div>
  </div>
</section>


<!-- ══════════════════════════════════════════
     TEAM SECTION
══════════════════════════════════════════ -->
<section id="team" class="py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16 fade-in">
      <div class="text-primary text-sm font-semibold uppercase tracking-widest mb-3">The Team</div>
      <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900">Built by Experienced Founders</h2>
    </div>

    <div class="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">

      <!-- Benny -->
      <div class="fade-in bg-gray-50 rounded-2xl p-8 border border-gray-100 text-center">
        <img src="{{ url_for('static', filename='images/benny.png') }}"
             alt="Benny Shoham"
             class="w-24 h-24 rounded-full object-cover mx-auto mb-4 ring-4 ring-primary/20" />
        <h3 class="text-lg font-bold text-gray-900">Benny Shoham</h3>
        <p class="text-primary text-sm font-medium mb-3">Founder &amp; CEO</p>
        <p class="text-gray-600 text-sm leading-relaxed">BSc Electronic Engineering · Executive MBA · Serial entrepreneur, inventor (&gt;25 patents) · 3rd startup as co-founding CEO. Core NAI technology based on hands-on experience leading engineering team that developed NAI-based COVID-blocking solutions.</p>
      </div>

      <!-- Shai -->
      <div class="fade-in bg-gray-50 rounded-2xl p-8 border border-gray-100 text-center">
        <img src="{{ url_for('static', filename='images/shai.png') }}"
             alt="Shai Rubanenko Shalgi"
             class="w-24 h-24 rounded-full object-cover mx-auto mb-4 ring-4 ring-primary/20" />
        <h3 class="text-lg font-bold text-gray-900">Shai Rubanenko Shalgi</h3>
        <p class="text-primary text-sm font-medium mb-3">COO &amp; AI Lead</p>
        <p class="text-gray-600 text-sm leading-relaxed">MSc European Studies, LSE · M.A. Human Rights, Hebrew University · AI &amp; Automation, Hebrew University. Led national-scale digital transformation at EY Advisory. Experience across government, technology, and international organisations.</p>
      </div>

    </div>
  </div>
</section>


<!-- ══════════════════════════════════════════
     INVESTMENT CTA
══════════════════════════════════════════ -->
<section id="investment" class="py-24 bg-gradient-to-br from-secondary/5 to-primary/5">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16 fade-in">
      <div class="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Investment</div>
      <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900">Investment &amp; Use of Funds</h2>
      <p class="mt-4 text-xl text-gray-600 font-medium">Seeking seed funding of <strong class="text-primary">$4.0M</strong> for 18–24 months</p>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 fade-in">
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
        <div class="text-3xl font-extrabold text-primary mb-1">€3.0B</div>
        <div class="text-xs text-gray-500 uppercase tracking-wide">Phase I TAM</div>
      </div>
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
        <div class="text-3xl font-extrabold text-primary mb-1">&lt;80%</div>
        <div class="text-xs text-gray-500 uppercase tracking-wide">Gross Margin Target</div>
      </div>
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
        <div class="text-3xl font-extrabold text-primary mb-1">$4.0M</div>
        <div class="text-xs text-gray-500 uppercase tracking-wide">Seed Round (24 months)</div>
      </div>
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
        <div class="text-3xl font-extrabold text-primary mb-1">€400M</div>
        <div class="text-xs text-gray-500 uppercase tracking-wide">Revenue Target Year 6</div>
      </div>
    </div>

    <div class="max-w-2xl mx-auto mb-12 fade-in">
      <h3 class="text-lg font-bold text-gray-900 mb-4 text-center">Use of Funds</h3>
      <ul class="space-y-3">
        {% for item in [
          'Close on specification &amp; feature refinement with selected dentist clinics',
          'Deliver alpha units for performance &amp; regulation clearance (CE, MDR, PPE)',
          'Sign manufacturing partners for Phase I France launch',
          'Close agreements with prospect channel partners'
        ] %}
        <li class="flex items-start gap-3 text-gray-700 text-sm">
          <div class="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg class="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
          </div>
          <span>{{ item }}</span>
        </li>
        {% endfor %}
      </ul>
    </div>

    <div class="text-center fade-in">
      <a href="mailto:benny@scudodoc.com"
         class="inline-flex items-center px-8 py-4 bg-primary text-white text-lg font-bold rounded-full hover:bg-primary-dark transition-colors shadow-lg">
        Connect with the Team &rarr;
      </a>
    </div>
  </div>
</section>

{% endblock %}
```

- [ ] **Step 2: Verify visually — scroll through full homepage**

```bash
flask run
```

Check all 8 sections render correctly. Verify competitive table, market table, team photos, and investment metrics display.

- [ ] **Step 3: Run tests**

```bash
pytest tests/ -v
```

Expected: 6 PASSED

- [ ] **Step 4: Commit**

```bash
git add templates/index.html
git commit -m "feat: complete homepage with all 8 sections"
```

---

## Task 8: technology.html

**Files:**
- Modify: `templates/technology.html`

- [ ] **Step 1: Write templates/technology.html**

```html
{% extends "base.html" %}

{% block title %}Technology — SCUDOdoc Ion Plasma Mask Filter{% endblock %}
{% block meta_description %}Learn how SCUDOdoc's Ion Plasma active-filter delivers 93.6% PM2.5 filtration efficiency, eliminating mask fatigue while protecting against SARS-CoV-2, Influenza, RSV and more.{% endblock %}

{% block content %}

<!-- Page Header -->
<section class="py-20 bg-gradient-to-br from-teal-50 to-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div class="text-primary text-sm font-semibold uppercase tracking-widest mb-3">The Technology</div>
    <h1 class="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">Ion Plasma Mask Filter Technology</h1>
    <p class="text-xl text-gray-600 max-w-2xl mx-auto">Natural Breathing with Superior Real-Protection vs. N95/FFP Masks</p>
  </div>
</section>

<!-- Product Video -->
<section class="py-16 bg-white">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="rounded-2xl overflow-hidden shadow-xl bg-gray-900">
      <video controls class="w-full" poster="{{ url_for('static', filename='images/hero-mask.jpeg') }}">
        <source src="{{ url_for('static', filename='images/product-video.mp4') }}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</section>

<!-- NAI Science -->
<section class="py-16 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <div class="fade-in">
        <h2 class="text-3xl font-extrabold text-gray-900 mb-6">NAI Active Filtering &amp; Disinfection</h2>
        <p class="text-gray-700 leading-relaxed mb-4">
          Negative Air Ions (NAI) are naturally produced by trees, waterfalls, and ocean waves — known in Japan as <strong>Forest Bath</strong> (Shin-rin-yoku 森林浴). In these environments, NAI concentrations of 1,000–2,000 ions/cm³ are common. SCUDOdoc generates controlled NAI densities orders of magnitude higher — sufficient to neutralise airborne pathogens on contact.
        </p>
        <p class="text-gray-700 leading-relaxed mb-4">
          Unlike mechanical filtration (which relies on physical barriers with known bypass), Ion Plasma actively disinfects the air stream. Pathogens are charged and deactivated — not just trapped.
        </p>
        <div class="bg-primary/5 border border-primary/20 rounded-xl p-6">
          <h3 class="font-bold text-gray-900 mb-2">POC Prototype Results</h3>
          <div class="flex gap-8">
            <div>
              <div class="text-2xl font-extrabold text-primary">93.6%</div>
              <div class="text-xs text-gray-500">SCUDOdoc Prototype</div>
            </div>
            <div>
              <div class="text-2xl font-extrabold text-gray-400">71.6%</div>
              <div class="text-xs text-gray-500">N95 Mask</div>
            </div>
          </div>
          <p class="text-xs text-gray-500 mt-2">Test conditions: 3× EPA-allowed clinic pollution levels</p>
        </div>
      </div>
      <div class="fade-in">
        <img src="{{ url_for('static', filename='images/wear-shot-2.png') }}"
             alt="SCUDOdoc device worn"
             class="rounded-2xl shadow-lg w-full object-cover" />
      </div>
    </div>
  </div>
</section>

<!-- Virus Efficacy Table -->
<section class="py-16 bg-white">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl font-extrabold text-gray-900 mb-4 text-center">Pathogen Disinfection Efficacy</h2>
    <p class="text-center text-gray-600 mb-10">Peer-reviewed evidence for NAI disinfection across key pathogens</p>

    <div class="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
      <table class="responsive-table w-full text-sm">
        <thead>
          <tr class="bg-primary/5">
            <th class="text-left p-4 font-semibold text-gray-700">Pathogen</th>
            <th class="text-left p-4 font-semibold text-gray-700">Type</th>
            <th class="text-left p-4 font-semibold text-gray-700">NAI Disinfection</th>
            <th class="text-left p-4 font-semibold text-gray-700">Evidence</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr>
            <td data-label="Pathogen" class="p-4 font-medium text-gray-900">SARS-CoV-2</td>
            <td data-label="Type" class="p-4 text-gray-600">Enveloped</td>
            <td data-label="NAI Disinfection" class="p-4 font-bold text-primary">Up to 99.9% reduction</td>
            <td data-label="Evidence" class="p-4 text-gray-500">Ionized air chamber studies</td>
          </tr>
          <tr class="bg-gray-50/50">
            <td data-label="Pathogen" class="p-4 font-medium text-gray-900">Influenza A (H3N2)</td>
            <td data-label="Type" class="p-4 text-gray-600">Enveloped</td>
            <td data-label="NAI Disinfection" class="p-4 font-bold text-primary">Up to 99.8% reduction</td>
            <td data-label="Evidence" class="p-4 text-gray-500">Animal model studies</td>
          </tr>
          <tr>
            <td data-label="Pathogen" class="p-4 font-medium text-gray-900">RSV</td>
            <td data-label="Type" class="p-4 text-gray-600">Enveloped</td>
            <td data-label="NAI Disinfection" class="p-4 font-bold text-primary">Up to 98% reduction</td>
            <td data-label="Evidence" class="p-4 text-gray-500">Chamber studies</td>
          </tr>
          <tr class="bg-gray-50/50">
            <td data-label="Pathogen" class="p-4 font-medium text-gray-900">Common Cold</td>
            <td data-label="Type" class="p-4 text-gray-600">Non-Enveloped</td>
            <td data-label="NAI Disinfection" class="p-4 font-bold text-primary">81–99% reduction</td>
            <td data-label="Evidence" class="p-4 text-gray-500">MS2 bacteriophage studies</td>
          </tr>
          <tr>
            <td data-label="Pathogen" class="p-4 font-medium text-gray-900">Pollen &amp; PM2.5</td>
            <td data-label="Type" class="p-4 text-gray-600">Particles</td>
            <td data-label="NAI Disinfection" class="p-4 font-bold text-primary">80–95% removal</td>
            <td data-label="Evidence" class="p-4 text-gray-500">Clinical pollen trials</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<!-- Product Platform Variants -->
<section class="py-16 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl font-extrabold text-gray-900 mb-4 text-center">A Platform Supporting Various Medical Use Cases</h2>
    <p class="text-center text-gray-600 mb-10">Five product configurations designed for different clinical needs</p>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 fade-in">
      {% for variant in ['Basic Mask', 'Eye Protection Visor', 'Insert Eye Glass', 'Clip-on Magnifier', 'Eye Glass Friendly'] %}
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
        <div class="w-16 h-16 bg-primary/10 rounded-xl mx-auto mb-3 flex items-center justify-center">
          <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
        </div>
        <p class="text-sm font-semibold text-gray-900">{{ variant }}</p>
      </div>
      {% endfor %}
    </div>
  </div>
</section>

{% endblock %}
```

- [ ] **Step 2: Verify visually**

```bash
flask run
```

Open http://127.0.0.1:5000/technology — verify video player, NAI science section, efficacy table (responsive on mobile), and 5 product variant cards.

- [ ] **Step 3: Run tests**

```bash
pytest tests/ -v
```

Expected: 6 PASSED

- [ ] **Step 4: Commit**

```bash
git add templates/technology.html
git commit -m "feat: add technology page with video, NAI science, efficacy table, product variants"
```

---

## Task 9: esg.html

**Files:**
- Modify: `templates/esg.html`

- [ ] **Step 1: Write templates/esg.html**

```html
{% extends "base.html" %}

{% block title %}ESG Impact — SCUDOdoc{% endblock %}
{% block meta_description %}SCUDOdoc eliminates 10,000 disposable masks per clinic over 5 years, saving 2,137 kg CO₂-eq and preventing 3.6 kg of microplastics. Learn about our ECO SCUDO program.{% endblock %}

{% block content %}

<!-- Header -->
<section class="py-20 bg-gray-900 text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div class="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Environmental &amp; Social Impact</div>
    <h1 class="text-4xl sm:text-5xl font-extrabold mb-4">ECO SCUDO</h1>
    <p class="text-xl text-gray-300 max-w-2xl mx-auto">Reducing Medical Mask Waste — One Clinic at a Time</p>
  </div>
</section>

<!-- Impact Stats -->
<section class="py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16 fade-in">
      <div class="text-center">
        <div class="text-5xl font-extrabold text-primary mb-2">
          <span class="counter-value" data-counter data-target="10000">0</span>
        </div>
        <div class="text-sm text-gray-500 leading-tight">Masks eliminated<br />per clinic (5yr)</div>
      </div>
      <div class="text-center">
        <div class="text-5xl font-extrabold text-primary mb-2">
          <span class="counter-value" data-counter data-target="2137">0</span><span class="text-2xl"> kg</span>
        </div>
        <div class="text-sm text-gray-500 leading-tight">CO₂-eq saved<br />(≡ 9,200 km not driven)</div>
      </div>
      <div class="text-center">
        <div class="text-5xl font-extrabold text-primary mb-2">
          <span class="counter-value" data-counter data-target="3.6" data-decimals="1">0</span><span class="text-2xl"> kg</span>
        </div>
        <div class="text-sm text-gray-500 leading-tight">Microplastics<br />prevented</div>
      </div>
      <div class="text-center">
        <div class="text-4xl font-extrabold text-primary mb-2">
          &gt;<span class="counter-value" data-counter data-target="1.26" data-decimals="2">0</span><span class="text-2xl">B</span>
        </div>
        <div class="text-sm text-gray-500 leading-tight">Masks avoided/yr<br />@15% EU Phase I adoption</div>
      </div>
    </div>

    <!-- ECO-Social Program -->
    <div class="grid lg:grid-cols-2 gap-12 items-center mb-20 fade-in">
      <div>
        <h2 class="text-3xl font-extrabold text-gray-900 mb-4">The ECO-Social Program</h2>
        <p class="text-gray-700 leading-relaxed mb-4">
          Each year, clinics upgrade to a new locally manufactured SCUDO mask. Returned devices aren't discarded — they're fully refurbished and donated to clinics in low-income countries, extending their impact far beyond Europe.
        </p>
        <p class="text-gray-700 leading-relaxed mb-4">
          By switching to SCUDO, a single clinic saves the equivalent of <strong>9,200 km not driven</strong> in CO₂ emissions and prevents <strong>3.6 kg of microplastics</strong> from entering the environment — per 5-year device cycle.
        </p>
        <p class="text-gray-700 leading-relaxed">
          SCUDO is locally manufacturable, eliminating the 70% EU / 90% USA import dependency on Chinese supply chains, while creating local green manufacturing jobs.
        </p>
      </div>
      <div class="bg-gray-50 rounded-2xl p-8 border border-gray-100">
        <h3 class="text-xl font-bold text-gray-900 mb-6">DASRI Disposal Savings</h3>
        <div class="space-y-4 text-sm">
          <div class="flex justify-between items-center py-3 border-b border-gray-200">
            <span class="text-gray-700">DASRI disposal cost eliminated/yr per clinic</span>
            <span class="font-bold text-primary">€60–€72</span>
          </div>
          <div class="flex justify-between items-center py-3 border-b border-gray-200">
            <span class="text-gray-700">Hazardous waste cost (conventional)</span>
            <span class="font-bold text-red-400">€800–€1,200/tonne</span>
          </div>
          <div class="flex justify-between items-center py-3">
            <span class="text-gray-700">SCUDO waste cost</span>
            <span class="font-bold text-primary">€0</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Environmental Crisis Context -->
    <div class="fade-in">
      <h2 class="text-3xl font-extrabold text-gray-900 mb-8 text-center">The Scale of the Crisis</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-red-50 rounded-2xl p-6 border border-red-100 text-center">
          <div class="text-3xl font-extrabold text-red-400 mb-2">4B</div>
          <div class="text-sm text-gray-600">Masks trashed annually by GP &amp; dental clinics alone</div>
        </div>
        <div class="bg-red-50 rounded-2xl p-6 border border-red-100 text-center">
          <div class="text-3xl font-extrabold text-red-400 mb-2">82K</div>
          <div class="text-sm text-gray-600">Tonnes CO₂-eq footprint from manufacturing, transport &amp; disposal</div>
        </div>
        <div class="bg-red-50 rounded-2xl p-6 border border-red-100 text-center">
          <div class="text-3xl font-extrabold text-red-400 mb-2">450+</div>
          <div class="text-sm text-gray-600">Years masks persist as microplastics in the environment</div>
        </div>
        <div class="bg-red-50 rounded-2xl p-6 border border-red-100 text-center">
          <div class="text-3xl font-extrabold text-red-400 mb-2">16–20B</div>
          <div class="text-sm text-gray-600">Total masks/year across all healthcare settings</div>
        </div>
      </div>
    </div>
  </div>
</section>

{% endblock %}
```

- [ ] **Step 2: Verify visually**

```bash
flask run
```

Open http://127.0.0.1:5000/esg — check animated counters, ECO-Social section, DASRI savings table, environmental crisis cards.

- [ ] **Step 3: Run tests + commit**

```bash
pytest tests/ -v && git add templates/esg.html && git commit -m "feat: add ESG impact page"
```

---

## Task 10: market.html

**Files:**
- Modify: `templates/market.html`

- [ ] **Step 1: Write templates/market.html**

```html
{% extends "base.html" %}

{% block title %}Market Opportunity — SCUDOdoc{% endblock %}
{% block meta_description %}SCUDOdoc targets a €3.0B Phase I TAM across private GP and dental clinics. €400M ARR target by Year 6 through recurring device subscriptions.{% endblock %}

{% block content %}

<!-- Header -->
<section class="py-20 bg-gradient-to-br from-teal-50 to-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div class="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Market Opportunity</div>
    <h1 class="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">SCUDOdoc Global Market</h1>
    <p class="text-xl text-gray-600 max-w-xl mx-auto">A €3 Billion Phase I opportunity across private GP &amp; dental clinics</p>
  </div>
</section>

<!-- Key Metrics -->
<section class="py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 fade-in">
      <div class="text-center bg-primary/5 rounded-2xl p-8 border border-primary/10">
        <div class="text-4xl font-extrabold text-primary mb-1">€3.0B</div>
        <div class="text-sm text-gray-500">Phase I TAM<br />(private clinics)</div>
      </div>
      <div class="text-center bg-primary/5 rounded-2xl p-8 border border-primary/10">
        <div class="text-4xl font-extrabold text-primary mb-1">€1.875B</div>
        <div class="text-sm text-gray-500">Serviceable<br />Addressable Market</div>
      </div>
      <div class="text-center bg-primary/5 rounded-2xl p-8 border border-primary/10">
        <div class="text-4xl font-extrabold text-primary mb-1">&lt;80%</div>
        <div class="text-sm text-gray-500">Gross Margin<br />Target</div>
      </div>
      <div class="text-center bg-primary/5 rounded-2xl p-8 border border-primary/10">
        <div class="text-4xl font-extrabold text-primary mb-1">€400M</div>
        <div class="text-sm text-gray-500">Revenue Target<br />Year 6</div>
      </div>
    </div>

    <!-- Market Phases -->
    <h2 class="text-3xl font-extrabold text-gray-900 mb-8 text-center fade-in">Market Phases</h2>
    <div class="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm mb-16 fade-in">
      <table class="responsive-table w-full text-sm">
        <thead>
          <tr class="bg-primary/5">
            <th class="text-left p-4 font-semibold text-gray-700 w-16">Phase</th>
            <th class="text-left p-4 font-semibold text-gray-700">Target</th>
            <th class="text-left p-4 font-semibold text-gray-700">Key Characteristic</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr>
            <td data-label="Phase" class="p-4 font-extrabold text-primary text-xl">I</td>
            <td data-label="Target" class="p-4 text-gray-900 font-medium">France 47K dentists → EU 360K dentists</td>
            <td data-label="Characteristic" class="p-4 text-gray-600">Private, fast cycle, ESG-driven</td>
          </tr>
          <tr class="bg-gray-50/50">
            <td data-label="Phase" class="p-4 font-extrabold text-primary text-xl">II</td>
            <td data-label="Target" class="p-4 text-gray-900 font-medium">EU GP &amp; specialist clinics (480K)</td>
            <td data-label="Characteristic" class="p-4 text-gray-600">Private; GP network adoption</td>
          </tr>
          <tr>
            <td data-label="Phase" class="p-4 font-extrabold text-primary text-xl">III</td>
            <td data-label="Target" class="p-4 text-gray-900 font-medium">US &amp; other Western markets (Japan, Korea, Taiwan)</td>
            <td data-label="Characteristic" class="p-4 text-gray-600">Supply-security driver</td>
          </tr>
          <tr class="bg-gray-50/50">
            <td data-label="Phase" class="p-4 font-extrabold text-primary text-xl">IV</td>
            <td data-label="Target" class="p-4 text-gray-900 font-medium">Public health systems, hospitals &amp; community clinics</td>
            <td data-label="Characteristic" class="p-4 text-gray-600">Largest volume; longer procurement cycle</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Business Model -->
    <div class="grid lg:grid-cols-2 gap-12 mb-16">
      <div class="fade-in">
        <h2 class="text-3xl font-extrabold text-gray-900 mb-6">Business Model</h2>
        <div class="space-y-4">
          <div class="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <div class="font-bold text-gray-900 mb-1">Annual Recurring Revenue</div>
            <div class="text-primary font-semibold text-lg">€400/device/year</div>
            <div class="text-gray-500 text-sm">(declining to €300 in year 3+)</div>
          </div>
          <div class="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <div class="font-bold text-gray-900 mb-1">Gross Margin Target</div>
            <div class="text-primary font-semibold text-lg">&gt;80%</div>
            <div class="text-gray-500 text-sm">High margin SaaS-like model</div>
          </div>
          <div class="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <div class="font-bold text-gray-900 mb-1">EU Phase I–II ARR Target</div>
            <div class="text-primary font-semibold text-lg">€150M–€300M</div>
            <div class="text-gray-500 text-sm">Within 5–6 years</div>
          </div>
          <div class="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <div class="font-bold text-gray-900 mb-1">vs. Current Spend</div>
            <div class="text-primary font-semibold text-lg">Saves €100–€600/clinic/year</div>
            <div class="text-gray-500 text-sm">Replaces €500–€1,000 annual mask spend at €400</div>
          </div>
        </div>
      </div>
      <div class="fade-in">
        <h2 class="text-3xl font-extrabold text-gray-900 mb-6">Revenue Projections</h2>
        <div class="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
          <table class="responsive-table w-full text-sm">
            <thead>
              <tr class="bg-primary/5">
                <th class="text-left p-3 font-semibold text-gray-700">Year</th>
                <th class="text-right p-3 font-semibold text-gray-700">France (€M)</th>
                <th class="text-right p-3 font-semibold text-gray-700">EU Dentists (€M)</th>
                <th class="text-right p-3 font-semibold text-gray-700">EU GPs (€M)</th>
                <th class="text-right p-3 font-semibold text-gray-700 text-primary">Total (€M)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr><td data-label="Year" class="p-3 font-medium">1 &amp; 2</td><td data-label="France" class="p-3 text-right">11.0</td><td data-label="EU Dentists" class="p-3 text-right">—</td><td data-label="EU GPs" class="p-3 text-right">—</td><td data-label="Total" class="p-3 text-right font-bold text-primary">11.0</td></tr>
              <tr class="bg-gray-50/50"><td data-label="Year" class="p-3 font-medium">3</td><td data-label="France" class="p-3 text-right">11.2</td><td data-label="EU Dentists" class="p-3 text-right">43.6</td><td data-label="EU GPs" class="p-3 text-right">—</td><td data-label="Total" class="p-3 text-right font-bold text-primary">54.8</td></tr>
              <tr><td data-label="Year" class="p-3 font-medium">4</td><td data-label="France" class="p-3 text-right">14.9</td><td data-label="EU Dentists" class="p-3 text-right">72.6</td><td data-label="EU GPs" class="p-3 text-right">16.5</td><td data-label="Total" class="p-3 text-right font-bold text-primary">104.0</td></tr>
              <tr class="bg-gray-50/50"><td data-label="Year" class="p-3 font-medium">5</td><td data-label="France" class="p-3 text-right">18.6</td><td data-label="EU Dentists" class="p-3 text-right">101.7</td><td data-label="EU GPs" class="p-3 text-right">33.0</td><td data-label="Total" class="p-3 text-right font-bold text-primary">153.3</td></tr>
              <tr><td data-label="Year" class="p-3 font-medium">6</td><td data-label="France" class="p-3 text-right">22.3</td><td data-label="EU Dentists" class="p-3 text-right">130.7</td><td data-label="EU GPs" class="p-3 text-right">49.5 + 205.7</td><td data-label="Total" class="p-3 text-right font-bold text-primary">408.3</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</section>

{% endblock %}
```

- [ ] **Step 2: Verify visually**

```bash
flask run
```

Open http://127.0.0.1:5000/market — check metrics, phases table, business model cards, revenue projections table.

- [ ] **Step 3: Run tests + commit**

```bash
pytest tests/ -v && git add templates/market.html && git commit -m "feat: add market opportunity page with revenue projections"
```

---

## Task 11: contact.html — Contact + Full Team Profiles

**Files:**
- Modify: `templates/contact.html`

- [ ] **Step 1: Write templates/contact.html**

```html
{% extends "base.html" %}

{% block title %}Contact — SCUDOdoc{% endblock %}
{% block meta_description %}Connect with Benny Shoham, Founder & CEO of SCUDOdoc — Ion Plasma Mask Filter Technology for healthcare professionals.{% endblock %}

{% block content %}

<!-- Header -->
<section class="py-20 bg-gradient-to-br from-teal-50 to-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div class="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Get in Touch</div>
    <h1 class="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">Connect with the Team</h1>
    <p class="text-xl text-gray-600 max-w-xl mx-auto">We're looking for strategic investors and early clinical partners.</p>
  </div>
</section>

<!-- Contact CTA -->
<section class="py-16 bg-white">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-in">
    <div class="bg-primary/5 border border-primary/20 rounded-2xl p-10">
      <div class="text-5xl mb-6">✉️</div>
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Benny Shoham</h2>
      <p class="text-primary font-medium mb-6">Founder &amp; CEO, SCUDOdoc</p>
      <a href="mailto:benny@scudodoc.com"
         class="inline-flex items-center px-8 py-4 bg-primary text-white text-lg font-bold rounded-full hover:bg-primary-dark transition-colors shadow-lg">
        benny@scudodoc.com &rarr;
      </a>
      <p class="text-gray-500 text-sm mt-6">Confidential — For qualified investors only</p>
    </div>
  </div>
</section>

<!-- Full Team Profiles -->
<section class="py-16 bg-gray-50">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl font-extrabold text-gray-900 mb-12 text-center">The Team</h2>

    <div class="space-y-8">

      <!-- Benny -->
      <div class="fade-in bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div class="flex flex-col sm:flex-row gap-6 items-start">
          <img src="{{ url_for('static', filename='images/benny.png') }}"
               alt="Benny Shoham"
               class="w-28 h-28 rounded-xl object-cover flex-shrink-0 shadow" />
          <div>
            <h3 class="text-xl font-bold text-gray-900">Benny Shoham</h3>
            <p class="text-primary font-medium mb-4">Founder &amp; CEO</p>
            <ul class="space-y-2 text-gray-700 text-sm">
              <li class="flex gap-2"><span class="text-primary">▸</span> BSc Electronic Engineering · Executive MBA</li>
              <li class="flex gap-2"><span class="text-primary">▸</span> Serial entrepreneur, inventor with &gt;25 patents</li>
              <li class="flex gap-2"><span class="text-primary">▸</span> 3rd startup as co-founding CEO</li>
              <li class="flex gap-2"><span class="text-primary">▸</span> Hands-on executive: deep-tech, product innovation, creative business practices</li>
              <li class="flex gap-2"><span class="text-primary">▸</span> Core NAI technology based on Benny's experience leading engineering team that developed NAI-based solutions to block COVID</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Shai -->
      <div class="fade-in bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div class="flex flex-col sm:flex-row gap-6 items-start">
          <img src="{{ url_for('static', filename='images/shai.png') }}"
               alt="Shai Rubanenko Shalgi"
               class="w-28 h-28 rounded-xl object-cover flex-shrink-0 shadow" />
          <div>
            <h3 class="text-xl font-bold text-gray-900">Shai Rubanenko Shalgi</h3>
            <p class="text-primary font-medium mb-4">COO &amp; AI Lead</p>
            <ul class="space-y-2 text-gray-700 text-sm">
              <li class="flex gap-2"><span class="text-primary">▸</span> MSc European Studies, LSE</li>
              <li class="flex gap-2"><span class="text-primary">▸</span> M.A. Human Rights, Hebrew University</li>
              <li class="flex gap-2"><span class="text-primary">▸</span> AI Development and Automation Course graduate, Hebrew University</li>
              <li class="flex gap-2"><span class="text-primary">▸</span> Operations executive with extensive experience leading large-scale, multi-stakeholder programmes across government, technology, and international organisations</li>
              <li class="flex gap-2"><span class="text-primary">▸</span> Led national-scale digital transformation implementing AI and automation solutions at EY Advisory</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

{% endblock %}
```

- [ ] **Step 2: Verify visually**

```bash
flask run
```

Open http://127.0.0.1:5000/contact — check contact CTA, both team profile cards with photos.

- [ ] **Step 3: Run all tests**

```bash
pytest tests/ -v
```

Expected: 6 PASSED

- [ ] **Step 4: Final commit**

```bash
git add templates/contact.html
git commit -m "feat: add contact page with team profiles"
```

---

## Task 12: Final Polish + Verify

**Files:** No new files — smoke test, mobile check, cross-browser spot check

- [ ] **Step 1: Run full test suite**

```bash
pytest tests/ -v
```

Expected: 6 PASSED

- [ ] **Step 2: Start dev server and walk through every page**

```bash
flask run
```

Manual checklist:
- [ ] `/` — Hero image loads, 3 counters animate, Problem/Solution/ESG/Competitive/Market/Team/Investment all render
- [ ] `/technology` — Video player shows, efficacy table renders, 5 variant cards show
- [ ] `/esg` — 4 animated counters, DASRI table, crisis cards render
- [ ] `/market` — 4 metric boxes, phases table, revenue projections table render
- [ ] `/contact` — mailto link works, both team photos load
- [ ] Mobile (resize to 375px) — hamburger menu works, all tables render as cards, hero stacks

- [ ] **Step 3: Check all static assets load (no 404s in browser console)**

Open DevTools → Network tab → reload each page. Verify 0 failed asset requests.

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "feat: complete SCUDOdoc website — all pages, assets, and interactions"
```

---

## Self-Review: Spec Coverage Check

| Spec Requirement | Task |
|---|---|
| Confidential banner | Task 3 (base.html) |
| Sticky nav + mobile hamburger | Task 3 |
| Hero + stats + CTA + scroll indicator | Task 5 |
| Problem — 6 cards | Task 5 |
| Solution — 6 features + NAI box + wear shots | Task 6 |
| ESG summary section (dark) + counters | Task 6 |
| Competitive 2×2 matrix + table + checklist | Task 7 |
| Market phases + stats | Task 7 |
| Team snippets (Benny + Shai) | Task 7 |
| Investment CTA + 4 metric boxes + use of funds | Task 7 |
| Footer with closing message + links | Task 3 |
| Technology page — video, NAI science, efficacy table, variants | Task 8 |
| ESG full page — counters, ECO program, crisis context | Task 9 |
| Market full page — phases, business model, revenue projections | Task 10 |
| Contact page + full team profiles | Task 11 |
| Animated counters (IntersectionObserver) | Task 4 |
| Smooth scroll | Task 4 |
| Mobile menu toggle | Task 4 |
| Scroll animations (fade-in) | Task 4 |
| Responsive tables → cards on mobile | Task 4 |
| Real logo asset | Task 2 |
| Real product images | Task 2 |
| Real team photos (Benny, Shai only) | Task 2 |
| Product video | Task 2 |
| OG meta tags | Task 3 |
| No database | ✓ (static content throughout) |
