// ============================================================
// CUSTOM CURSOR
// ============================================================
const cursor = document.querySelector('.cursor');

if (cursor) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
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
// SCROLL ANIMATIONS
// ============================================================
const scrollElements = document.querySelectorAll('[data-scroll]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -40px 0px'
});

scrollElements.forEach(el => observer.observe(el));

// ============================================================
// HEADER HIDE ON SCROLL DOWN
// ============================================================
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > lastScroll && current > 120) {
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
  }
  lastScroll = current;
}, { passive: true });

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
