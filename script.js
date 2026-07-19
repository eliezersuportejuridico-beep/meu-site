/* ==========================================================================
   M.A.C - Método Agenda Cheia — interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Ano no rodapé ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Loader ---------- */
  const loader = document.getElementById('pageLoader');
  window.addEventListener('load', () => {
    setTimeout(() => loader && loader.classList.add('is-hidden'), 300);
  });

  /* ---------- Navbar on scroll ---------- */
  const navbar = document.getElementById('navbar');
  const stickyCta = document.getElementById('stickyCta');
  const hero = document.getElementById('hero');

  const onScroll = () => {
    const scrolled = window.scrollY > 40;
    navbar && navbar.classList.toggle('is-scrolled', scrolled);

    if (hero) {
      const heroBottom = hero.offsetTop + hero.offsetHeight * 0.6;
      stickyCta && stickyCta.classList.toggle('is-visible', window.scrollY > heroBottom);
    }
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach((item) => {
    const question = item.querySelector('.faq-item__q');
    const answer = item.querySelector('.faq-item__a');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      document.querySelectorAll('.faq-item.is-open').forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove('is-open');
          openItem.querySelector('.faq-item__a').style.maxHeight = null;
        }
      });

      item.classList.toggle('is-open', !isOpen);
      answer.style.maxHeight = !isOpen ? answer.scrollHeight + 'px' : null;
    });
  });

  /* ---------- ScrollReveal (fade-in on scroll) ---------- */
  if (window.ScrollReveal) {
    const sr = ScrollReveal({
      distance: '40px',
      duration: 900,
      easing: 'cubic-bezier(.19,1,.22,1)',
      interval: 90,
      reset: false,
    });

    sr.reveal('[data-reveal="fade-up"]', { origin: 'bottom' });
    sr.reveal('[data-reveal="fade-right"]', { origin: 'left' });
    sr.reveal('[data-reveal="fade-left"]', { origin: 'right' });
    sr.reveal('[data-reveal="zoom-in"]', { scale: 0.9, origin: 'bottom' });
  }

  /* ---------- GSAP: parallax glows + micro interactions ---------- */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll('[data-parallax]').forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.2;
      gsap.to(el, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: el.closest('section, header'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    gsap.utils.toArray('.pain-card, .module-card, .bonus-card, .result-item').forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { y: -6, duration: 0.35, ease: 'power2.out' });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { y: 0, duration: 0.35, ease: 'power2.out' });
      });
    });

    gsap.from('.hero__title', { opacity: 0, y: 24, duration: 1, ease: 'power3.out', delay: 0.2 });
    gsap.from('.hero__subtitle', { opacity: 0, y: 20, duration: 1, ease: 'power3.out', delay: 0.35 });
    gsap.from('.hero__price-card', { opacity: 0, y: 20, duration: 1, ease: 'power3.out', delay: 0.5 });
    gsap.from('.hero__cta', { opacity: 0, y: 20, duration: 1, ease: 'power3.out', delay: 0.6 });
    gsap.from('.hero__media', { opacity: 0, scale: 0.94, duration: 1.1, ease: 'power3.out', delay: 0.4 });
  }

  /* ---------- Smooth anchor scroll offset for fixed navbar ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

});
