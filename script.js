// ============================================================
// CUSTOM CURSOR
// ============================================================
const cursor = document.querySelector('.cursor');

if (cursor) {
  document.addEventListener('mousemove', e => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  });

  const interactables = document.querySelectorAll('a, button, input');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--hover'));
  });

  document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
  document.addEventListener('mouseenter', () => cursor.style.opacity = '1');
}

// ============================================================
// GSAP SCROLL REVEAL
// ============================================================
(function () {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  // prefers-reduced-motion : on laisse tout visible, aucune animation
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);

  // Zones exclues : heroes existants, chrome de navigation, ui non-contenu,
  // images des pages projet (affichées directement, sans animation)
  const EXCLUDED = '.hero-pin, .project-hero-pin, header, .nav-mobile, #lightbox, .travaux-card, .photo-cat-nav, .project-image-block, .project-logo-block';

  function animatable(el) {
    // Exclut aussi .project-title-large (animé par SplitText si présent)
    return !el.closest(EXCLUDED) && !el.classList.contains('project-title-large');
  }

  function setupReveal(els) {
    if (!els.length) return;

    // Regrouper par parent direct pour le stagger entre éléments voisins
    const groups = new Map();
    els.forEach(el => {
      const key = el.parentElement;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(el);
    });

    groups.forEach(batch => {
      // État initial posé par JS → pas de CSS opacity:0 résiduel sans JS
      gsap.set(batch, { opacity: 0, y: 24 });

      ScrollTrigger.create({
        trigger: batch[0],
        start: 'top 85%',
        toggleActions: 'play none none none',
        onEnter() {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            stagger: batch.length > 1 ? 0.08 : 0
          });
        }
      });
    });
  }

  const headings = [...document.querySelectorAll('h1, h2, h3')].filter(animatable);
  const paras    = [...document.querySelectorAll('p')].filter(animatable);
  const imgs     = [...document.querySelectorAll('img:not(#lightbox-img)')].filter(animatable);

  setupReveal(headings);
  setupReveal(paras);
  setupReveal(imgs);
})();

// ============================================================
// HEADER (toujours visible)
// ============================================================
const header = document.querySelector('header');

// ============================================================
// BURGER MENU
// ============================================================
const burger = document.querySelector('.burger');
const navMobile = document.querySelector('.nav-mobile');

if (burger && navMobile) {
  burger.addEventListener('click', () => {
    const isOpen = burger.classList.toggle('is-open');
    navMobile.classList.toggle('is-open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    navMobile.setAttribute('aria-hidden', String(!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (isOpen && header) header.style.transform = 'translateY(0)';
  });

  navMobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('is-open');
      navMobile.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      navMobile.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });
}

// ============================================================
// BROKEN IMAGE CLEANUP
// ============================================================
document.querySelectorAll('img:not(#lightbox-img)').forEach(img => {
  img.addEventListener('error', () => img.remove());
});

// ============================================================
// LIGHTBOX (photographie.html)
// ============================================================
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxSeries = document.getElementById('lightbox-series');
  const lightboxYear = document.getElementById('lightbox-year');
  const photos = [...document.querySelectorAll('.photo-item')];
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const item = photos[index];
    lightboxImg.src = item.dataset.src || '';
    lightboxImg.alt = item.querySelector('img') ? item.querySelector('img').alt : '';
    lightboxSeries.textContent = item.dataset.series || '';
    lightboxYear.textContent = item.dataset.year || '';
    lightbox.removeAttribute('aria-hidden');
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.body.style.cursor = 'auto';
    if (cursor) cursor.style.opacity = '0';
  }

  function closeLightbox() {
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    document.body.style.cursor = '';
    lightboxImg.src = '';
    if (cursor) cursor.style.opacity = '1';
  }

  function navigate(dir) {
    currentIndex = (currentIndex + dir + photos.length) % photos.length;
    openLightbox(currentIndex);
  }

  photos.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });

  document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  document.querySelector('.lightbox-prev').addEventListener('click', () => navigate(-1));
  document.querySelector('.lightbox-next').addEventListener('click', () => navigate(1));

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  if (cursor) {
    [document.querySelector('.lightbox-close'),
     document.querySelector('.lightbox-prev'),
     document.querySelector('.lightbox-next')].forEach(btn => {
      btn.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
      btn.addEventListener('mouseleave', () => cursor.classList.remove('cursor--hover'));
    });
  }
}

// ============================================================
// GSAP — TITLE REVEAL (pages projet)
// ============================================================
if (typeof gsap !== 'undefined' && typeof SplitText !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const titleEl = document.querySelector('.project-title-large');
  if (titleEl && !titleEl.closest('.project-hero-pin__title')) {
    const split = new SplitText(titleEl, { type: 'lines' });
    gsap.from(split.lines, {
      y: 24,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.08,
      delay: 0.1,
      clearProps: 'all'
    });
  }
}

// ============================================================
// ADAPTIVE NAV THEME
// ============================================================
(function () {
  const themed = document.querySelectorAll('[data-nav-theme]');
  if (!themed.length || !header) return;

  const update = () => {
    const triggerY = header.offsetHeight;
    let active = null;
    for (const el of themed) {
      if (el.getBoundingClientRect().top <= triggerY) active = el;
    }
    header.classList.toggle('header--on-dark', active?.dataset.navTheme === 'dark');
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
})();
