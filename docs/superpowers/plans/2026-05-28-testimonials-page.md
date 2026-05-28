# Testimonials Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a dedicated `/testimonials` page featuring Dr. Eyal Politi's testimonial with a hero split layout, two photos, and a bottom CTA.

**Architecture:** New Flask route in `app.py` renders a Jinja2 template `templates/testimonials.html` that extends `base.html`. Two photos are added to `static/images/`. Navbar and footer links in `base.html` are updated to include Testimonials. No new dependencies.

**Tech Stack:** Python/Flask, Jinja2, Tailwind CSS (CDN), vanilla JS (existing fade-in animations)

---

### Task 1: Save doctor photos to static/images

**Files:**
- Create: `static/images/dr-politi-front.jpg`
- Create: `static/images/dr-politi-side.jpg`

- [ ] **Step 1: Copy the front-facing photo**

Save the front-facing photo (doctor looking straight at camera) to:
```
static/images/dr-politi-front.jpg
```

- [ ] **Step 2: Copy the side-profile photo**

Save the side-profile photo (doctor looking to the right) to:
```
static/images/dr-politi-side.jpg
```

- [ ] **Step 3: Verify both files exist**

```bash
ls static/images/dr-politi-front.jpg static/images/dr-politi-side.jpg
```
Expected: both paths printed with no errors.

- [ ] **Step 4: Commit**

```bash
git add static/images/dr-politi-front.jpg static/images/dr-politi-side.jpg
git commit -m "feat: add Dr. Politi testimonial photos"
```

---

### Task 2: Write failing tests for /testimonials route

**Files:**
- Modify: `tests/test_routes.py`

- [ ] **Step 1: Add two tests to `tests/test_routes.py`**

Append these two functions after the existing `test_contact_returns_200` test (before `test_404_on_unknown_route`):

```python
def test_testimonials_returns_200(client):
    r = client.get('/testimonials')
    assert r.status_code == 200


def test_testimonials_contains_doctor_name(client):
    r = client.get('/testimonials')
    assert b'Dr. Eyal Politi' in r.data
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
pytest tests/test_routes.py::test_testimonials_returns_200 tests/test_routes.py::test_testimonials_contains_doctor_name -v
```
Expected: both tests FAIL with `404` / route not found.

- [ ] **Step 3: Commit the failing tests**

```bash
git add tests/test_routes.py
git commit -m "test: add failing tests for /testimonials route"
```

---

### Task 3: Add /testimonials route to app.py

**Files:**
- Modify: `app.py`

- [ ] **Step 1: Add the route**

In `app.py`, add the following after the `contact` route (before `if __name__ == '__main__':`):

```python
@app.route('/testimonials')
def testimonials():
    return render_template('testimonials.html')
```

Full `app.py` after change:
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


@app.route('/testimonials')
def testimonials():
    return render_template('testimonials.html')


if __name__ == '__main__':
    app.run(debug=True)
```

- [ ] **Step 2: Run tests — expect partial failure**

```bash
pytest tests/test_routes.py::test_testimonials_returns_200 tests/test_routes.py::test_testimonials_contains_doctor_name -v
```
Expected: `test_testimonials_returns_200` FAILS with `TemplateNotFound: testimonials.html` (route exists, template missing). `test_testimonials_contains_doctor_name` also FAILS.

---

### Task 4: Create templates/testimonials.html

**Files:**
- Create: `templates/testimonials.html`

- [ ] **Step 1: Create the template**

Create `templates/testimonials.html` with the following content:

```html
{% extends "base.html" %}

{% block title %}Testimonials — SCUDOdoc{% endblock %}

{% block content %}

<!-- SECTION 1: PAGE HEADER -->
<section class="bg-gray-50 py-20 text-center fade-in">
  <div class="max-w-3xl mx-auto px-6">
    <p class="text-xs font-bold tracking-widest text-primary uppercase mb-4">From the Field</p>
    <h1 class="text-5xl font-extrabold text-gray-900 leading-tight">What Professionals Say</h1>
    <p class="mt-4 text-lg text-gray-500">Real experiences from clinicians using SCUDOdoc every day.</p>
  </div>
</section>

<!-- SECTION 2: MAIN SPLIT LAYOUT -->
<section class="py-24 bg-white">
  <div class="max-w-7xl mx-auto px-6 lg:px-12">
    <div class="grid lg:grid-cols-5 gap-16 items-start fade-in">

      <!-- LEFT: Quote -->
      <div class="lg:col-span-3">
        <div class="text-8xl font-extrabold text-primary leading-none mb-2 select-none" style="font-family: Georgia, serif; line-height: 0.8;">&ldquo;</div>

        <blockquote class="text-lg text-gray-700 leading-relaxed space-y-5">
          <p>I wore the SCUDOdoc mask every day for the whole day for three weeks at the clinic, and I couldn't be happier with it.</p>
          <p>Breathing is easy and comfortable and it totally eliminated my eye glass fogging — far more than I expected, and definitely compared to a regular medical mask. During the day, I noticed a real difference in my energy levels. Less fatigue, better focus.</p>
          <p>But what surprised me the most was my patients' reactions. They love it. They tell me they could see my face, hear me clearly, and actually feel my presence — not like I was hidden behind a barrier. It completely changed the dynamic during treatment.</p>
          <p class="font-semibold text-gray-800">ScudoDoc doesn't just protect — it transforms the care experience, for me and for my patient alike.</p>
        </blockquote>

        <!-- Byline -->
        <div class="mt-10 pt-6 border-t-2 border-primary inline-block">
          <p class="text-xl font-bold text-gray-900">Dr. Eyal Politi</p>
          <span class="inline-block mt-1 text-sm font-semibold text-primary bg-green-50 px-3 py-1 rounded-full">Dentist</span>
        </div>
      </div>

      <!-- RIGHT: Photos -->
      <div class="lg:col-span-2 flex flex-col gap-4">
        <img
          src="{{ url_for('static', filename='images/dr-politi-front.jpg') }}"
          alt="Dr. Eyal Politi wearing the SCUDOdoc mask"
          class="w-full rounded-2xl shadow-lg object-cover"
        />
        <img
          src="{{ url_for('static', filename='images/dr-politi-side.jpg') }}"
          alt="Dr. Eyal Politi wearing the SCUDOdoc mask, side profile"
          class="w-3/4 self-end rounded-xl shadow-md object-cover"
        />
      </div>

    </div>
  </div>
</section>

<!-- SECTION 3: BOTTOM CTA -->
<section class="bg-gray-900 py-20 text-center">
  <div class="max-w-3xl mx-auto px-6">
    <h2 class="text-3xl font-bold text-white mb-8">Ready to transform your practice?</h2>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="{{ url_for('contact') }}" class="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-lg transition-colors">
        Contact Us
      </a>
      <a href="{{ url_for('index') }}" class="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-3 rounded-lg transition-colors">
        Learn More
      </a>
    </div>
  </div>
</section>

{% endblock %}
```

- [ ] **Step 2: Run tests — expect both to pass**

```bash
pytest tests/test_routes.py::test_testimonials_returns_200 tests/test_routes.py::test_testimonials_contains_doctor_name -v
```
Expected: both tests PASS.

- [ ] **Step 3: Run the full test suite**

```bash
pytest tests/ -v
```
Expected: all 8 tests PASS.

- [ ] **Step 4: Commit**

```bash
git add app.py templates/testimonials.html
git commit -m "feat: add /testimonials route and template"
```

---

### Task 5: Add Testimonials link to navbar and footer in base.html

**Files:**
- Modify: `templates/base.html`

- [ ] **Step 1: Add link to desktop navbar**

In `templates/base.html`, find the desktop nav links block (around line 66–69). Add the Testimonials link after the Market link and before the Contact link:

Find:
```html
          <a href="{{ url_for('market') }}" class="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Market</a>
          <a href="{{ url_for('contact') }}" class="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Contact</a>
```

Replace with:
```html
          <a href="{{ url_for('market') }}" class="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Market</a>
          <a href="{{ url_for('testimonials') }}" class="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Testimonials</a>
          <a href="{{ url_for('contact') }}" class="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Contact</a>
```

- [ ] **Step 2: Add link to mobile menu**

In `templates/base.html`, find the mobile menu block (around line 90–93). Add the Testimonials link after the Market link and before the Contact link:

Find:
```html
      <a href="{{ url_for('market') }}" class="block text-sm font-medium text-gray-700 hover:text-primary py-1">Market</a>
      <a href="{{ url_for('contact') }}" class="block text-sm font-medium text-gray-700 hover:text-primary py-1">Contact</a>
```

Replace with:
```html
      <a href="{{ url_for('market') }}" class="block text-sm font-medium text-gray-700 hover:text-primary py-1">Market</a>
      <a href="{{ url_for('testimonials') }}" class="block text-sm font-medium text-gray-700 hover:text-primary py-1">Testimonials</a>
      <a href="{{ url_for('contact') }}" class="block text-sm font-medium text-gray-700 hover:text-primary py-1">Contact</a>
```

- [ ] **Step 3: Add link to footer**

In `templates/base.html`, find the footer nav links (around line 120–124). Add the Testimonials link after the Market link and before the Contact link:

Find:
```html
            <a href="{{ url_for('market') }}" class="hover:text-primary transition-colors">Market</a>
            <a href="{{ url_for('contact') }}" class="hover:text-primary transition-colors">Contact</a>
```

Replace with:
```html
            <a href="{{ url_for('market') }}" class="hover:text-primary transition-colors">Market</a>
            <a href="{{ url_for('testimonials') }}" class="hover:text-primary transition-colors">Testimonials</a>
            <a href="{{ url_for('contact') }}" class="hover:text-primary transition-colors">Contact</a>
```

- [ ] **Step 4: Run full test suite to confirm nothing broke**

```bash
pytest tests/ -v
```
Expected: all 8 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add templates/base.html
git commit -m "feat: add Testimonials link to navbar and footer"
```

---

### Task 6: Cleanup and final verification

**Files:**
- Delete: `mockup.html`

- [ ] **Step 1: Remove the mockup file**

```bash
git rm mockup.html
```

- [ ] **Step 2: Run full test suite one last time**

```bash
pytest tests/ -v
```
Expected: all 8 tests PASS.

- [ ] **Step 3: Start Flask dev server and verify visually**

```bash
python app.py
```

Open `http://127.0.0.1:5000/testimonials` in a browser. Verify:
- Page header renders with "What Professionals Say"
- Both doctor photos appear side by side (stacked on mobile)
- Full quote text is readable
- "Dr. Eyal Politi" byline with Dentist badge is visible
- Bottom CTA has "Contact Us" and "Learn More" buttons
- Navbar shows "Testimonials" link between Market and Contact

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: remove mockup.html after testimonials implementation"
```
