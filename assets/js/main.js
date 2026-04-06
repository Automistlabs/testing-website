/* ============================================================
   AUTOMIST LABS — Main JavaScript
   Smooth scrolling, animations, mobile nav, scroll spy
   ============================================================ */

(function () {
  'use strict';

  /* ── Helpers ────────────────────────────────────────────── */
  const qs  = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => [...root.querySelectorAll(sel)];

  /* ── Nav: scroll state ──────────────────────────────────── */
  const nav = qs('.nav');

  function updateNav () {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ── Mobile nav toggle ──────────────────────────────────── */
  const toggle     = qs('.nav__toggle');
  const mobileMenu = qs('.nav__mobile');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      mobileMenu.classList.toggle('open', !open);
      document.body.style.overflow = open ? '' : 'hidden';
    });

    // Close when a link is clicked
    qsa('a', mobileMenu).forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        toggle.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });
  }

  /* ── Intersection Observer: fade-in ────────────────────── */
  const fadeEls = qsa('.fade-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    fadeEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  /* ── Staggered card reveals ─────────────────────────────── */
  const cardGroups = qsa('[data-stagger]');

  if ('IntersectionObserver' in window) {
    const staggerObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const children = qsa('[data-stagger-item]', entry.target);
            children.forEach((child, i) => {
              setTimeout(() => child.classList.add('visible'), i * 90);
            });
            staggerObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    cardGroups.forEach(g => staggerObserver.observe(g));
  }

  /* ── Back-to-top button ─────────────────────────────────── */
  const backTop = qs('.back-top');

  function updateBackTop () {
    if (!backTop) return;
    backTop.classList.toggle('visible', window.scrollY > 400);
  }

  if (backTop) {
    window.addEventListener('scroll', updateBackTop, { passive: true });
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    updateBackTop();
  }

  /* ── Active nav link (scroll spy) ───────────────────────── */
  const sections   = qsa('section[id]');
  const navLinks   = qsa('.nav__links a[href^="#"], .nav__mobile a[href^="#"]');

  function updateActiveLink () {
    let current = '';
    const offset = 100;

    sections.forEach(sec => {
      if (window.scrollY + offset >= sec.offsetTop) {
        current = sec.id;
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === current);
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  /* ── Animated counter ───────────────────────────────────── */
  function animateCounter (el, target, duration = 1400) {
    const start    = Date.now();
    const isPlus   = String(target).includes('+');
    const numTarget = parseInt(String(target).replace(/\D/g, ''), 10);

    function tick () {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const ease     = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value    = Math.round(ease * numTarget);
      el.textContent = value + (isPlus ? '+' : '');
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  const statEls = qsa('.hero__stat-value');

  if ('IntersectionObserver' in window && statEls.length) {
    const counterObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el     = entry.target;
            const target = el.dataset.target;
            if (target) animateCounter(el, target);
            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.6 }
    );
    statEls.forEach(el => {
      if (el.dataset.target) counterObserver.observe(el);
    });
  }

  /* ── Smooth hover tilt for service cards ───────────────── */
  qsa('.service-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const cx     = rect.width / 2;
      const cy     = rect.height / 2;
      const rotX   = ((y - cy) / cy) * -4;
      const rotY   = ((x - cx) / cx) * 4;
      card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ── Year in footer ─────────────────────────────────────── */
  const yearEl = qs('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
