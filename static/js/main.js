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
    const num = (target * eased).toFixed(decimals);
    const formatted = el.dataset.separator
      ? parseFloat(num).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
      : num;
    el.textContent = prefix + formatted + suffix;
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
