/* =============================================
   BARBEARIA DO REI — script.js
   ============================================= */

'use strict';

/* ── WhatsApp ── */
const WA_NUMBER = '5562999999999';

function agendarWhatsApp(servico) {
  const texto = encodeURIComponent(
    `Olá, quero agendar o serviço: ${servico} na Barbearia do REI 👑`
  );
  window.open(`https://wa.me/${WA_NUMBER}?text=${texto}`, '_blank', 'noopener,noreferrer');
}

// Expor globalmente para os onclick inline no HTML
window.agendarWhatsApp = agendarWhatsApp;

/* ── Navbar: scroll effect ── */
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll();

/* ── Mobile menu toggle ── */
const navToggle  = document.getElementById('navToggle');
const navLinks   = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('active', open);
  navToggle.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !navToggle.contains(e.target)) {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
    document.body.style.overflow = '';
  }
});

/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const offset = 80; // navbar height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── Reveal on scroll (IntersectionObserver) ── */
const revealEls = document.querySelectorAll(
  '.service-card, .gallery-item, .info-item, .sobre-badge, .sobre-text-col, .stat'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach(el => observer.observe(el));

/* ── Stagger delay for cards ── */
document.querySelectorAll('.service-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.12}s`;
});

document.querySelectorAll('.gallery-item').forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.08}s`;
});

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
  const scrollY = window.scrollY + 120;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);

    if (!link) return;

    if (scrollY >= top && scrollY < top + height) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink, { passive: true });
updateActiveNavLink();

/* ── Subtle parallax on hero bg ── */
const hero = document.querySelector('.hero-bg');

function heroParallax() {
  if (!hero) return;
  const y = window.scrollY * 0.3;
  hero.style.transform = `translateY(${y}px)`;
}

window.addEventListener('scroll', heroParallax, { passive: true });

/* ── Init ── */
console.log('%c♛ Barbearia do REI', 'color: #c9a84c; font-size: 18px; font-weight: bold; font-family: serif;');
console.log('%cSite desenvolvido com requinte e excelência.', 'color: #9a9a9a; font-size: 12px;');
