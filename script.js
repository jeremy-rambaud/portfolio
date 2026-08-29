// ============================================================
// CUSTOM CURSOR
// ============================================================
const cursor = document.querySelector('.cursor');

if (cursor) {
  document.addEventListener('mousemove', e => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  });

  // Bloque tout drag natif (image, lien, sélection glissée...) qui coupe
  // mousemove et fait réapparaître le curseur système en plein milieu du geste.
  document.addEventListener('dragstart', e => e.preventDefault());

  const interactables = document.querySelectorAll('a, button, input');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--hover'));
  });

  document.addEventListener('mouseout', e => {
    if (!e.relatedTarget) cursor.style.opacity = '0';
  });
  document.addEventListener('mouseover', () => cursor.style.opacity = '1');
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
  // images des pages projet et de la home (affichées directement, sans animation)
  const EXCLUDED = '.hero-pin, .project-hero-pin, header, .nav-mobile, #lightbox, .travaux-card, .photo-cat-nav, .photo-grid, .project-image-block, .project-logo-block, .project-image';

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
    // Menu ouvert : fond opaque clair (--cream) quel que soit le thème
    // scrollé en dessous -> on force is-light le temps que le menu est ouvert.
    if (isOpen && header) {
      header.classList.remove('is-dark');
      header.classList.add('is-light');
    } else {
      updateHeaderTheme();
    }
  });

  navMobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('is-open');
      navMobile.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      navMobile.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      updateHeaderTheme();
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
  const lightboxCredit = document.getElementById('lightbox-credit');
  const photos = [...document.querySelectorAll('.photo-item')];
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const item = photos[index];
    lightboxImg.src = item.dataset.src || '';
    lightboxImg.alt = item.querySelector('img') ? item.querySelector('img').alt : '';
    const credit = item.querySelector('.caption-series');
    lightboxCredit.innerHTML = credit ? credit.innerHTML : '';
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
// Desktop : pilote header--on-dark (couleur fixe, voir CSS).
// Mobile (<768px) : pilote is-light / is-dark (voir CSS), aussi
// réutilisé par le menu burger pour se resynchroniser à la
// fermeture. rAF-throttled pour éviter un recalcul par event
// de scroll (le layout .getBoundingClientRect() a un coût).
//
// data-nav-theme="light|dark" reste l'attribut lu au scroll, mais sa
// valeur n'est plus fixée à la main : refreshAutoNavThemes() l'écrase
// en échantillonnant les pixels réels de l'image/vidéo de chaque bloc
// (canvas, bande du haut sous le header) et ne retombe sur la valeur
// HTML d'origine que si aucun média n'est trouvé ou n'a pu être lu
// (bloc texte, image pas encore chargée, canvas cross-origin...).
// Ainsi un tag mal posé à la main, ou une image remplacée plus tard,
// ne peut plus rendre le logo/burger illisibles sur aucune page.
// ============================================================
const themedBlocks = document.querySelectorAll('[data-nav-theme]');

// DEBUG temporaire : trace chaque bascule de thème du header dans la console
// (bloc détecté + valeur), pour diagnostiquer une détection incorrecte.
// À retirer une fois le comportement mobile confirmé stable.
let lastHeaderThemeLog = null;

function updateHeaderTheme() {
  if (!themedBlocks.length || !header) return;
  const triggerY = header.offsetHeight;
  // Un élément display:none (ex. .project-image-block--video-desktop, masqué
  // ≤767px pour éviter de charger la vidéo sur mobile) renvoie un
  // getBoundingClientRect().top à 0, indiscernable d'un bloc réellement
  // scrollé en haut d'écran. Sans ce filtre, un bloc cible tagué mais
  // masqué — même situé tout en bas du DOM — peut usurper le thème du
  // header dès le chargement, avant même le moindre scroll.
  const rendered = Array.from(themedBlocks).filter(el => el.getClientRects().length > 0);
  let active = null;
  for (const el of rendered) {
    if (el.getBoundingClientRect().top <= triggerY) active = el;
  }
  // En bas de page, le dernier élément marqué (le footer) peut ne jamais
  // franchir triggerY s'il est plus court que la fenêtre : on force son thème.
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;
  if (atBottom && rendered.length) active = rendered[rendered.length - 1];
  const isDark = active?.dataset.navTheme === 'dark';
  header.classList.toggle('header--on-dark', isDark);
  header.classList.toggle('is-dark', isDark);
  header.classList.toggle('is-light', !isDark);

  const themeLabel = isDark ? 'dark' : 'light';
  if (themeLabel !== lastHeaderThemeLog) {
    lastHeaderThemeLog = themeLabel;
    const blockLabel = active
      ? (active.alt || active.id || `<${active.tagName.toLowerCase()} class="${active.className}">`)
      : '(aucun bloc détecté)';
    console.log(`[header-theme] ${themeLabel} — bloc: ${blockLabel}`);
  }
}

// ------------------------------------------------------------
// Détection automatique de contraste (remplace le tag manuel)
// ------------------------------------------------------------
const AUTO_THEME_SAMPLE_H = 90;   // hauteur échantillonnée (header ~74px + marge)
const AUTO_THEME_THRESHOLD = 140; // luminance 0-255 : en dessous -> fond sombre ("dark")

function averageLuminance(ctx, w, h) {
  let data;
  try {
    data = ctx.getImageData(0, 0, w, h).data;
  } catch (e) {
    return null; // canvas "tainted" (image cross-origin) ou zone invalide
  }
  let sum = 0;
  const n = data.length / 4;
  if (!n) return null;
  for (let i = 0; i < data.length; i += 4) {
    sum += 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
  }
  return sum / n;
}

// Reproduit le rendu réel de l'élément (object-fit cover/contain, fond de
// lettrage) dans un canvas hors-écran, pour lire la luminance de ce qui
// est effectivement affiché sous le header — pas l'image brute non recadrée.
// Volontairement limité aux <img> : une vidéo change de contenu en boucle,
// un échantillon pris à un instant T (ex. au chargement) n'est pas
// représentatif de l'ensemble de la boucle et pourrait remplacer un tag
// manuel correct par une valeur juste pour cette frame-là mais fausse une
// seconde plus tard. Les héros vidéo (ex. Grapillon) gardent donc leur
// data-nav-theme posé à la main.
function sampleMediaTopStrip(media) {
  const naturalW = media.naturalWidth;
  const naturalH = media.naturalHeight;
  const rect = media.getBoundingClientRect();
  const boxW = Math.round(rect.width);
  const boxH = Math.round(rect.height);
  if (!naturalW || !naturalH || boxW < 1 || boxH < 1) return null;

  const canvas = document.createElement('canvas');
  canvas.width = boxW;
  canvas.height = Math.min(boxH, AUTO_THEME_SAMPLE_H);
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;

  const bg = getComputedStyle(media).backgroundColor;
  ctx.fillStyle = (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') ? bg : '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const fit = getComputedStyle(media).objectFit || 'fill';
  const scale = fit === 'contain'
    ? Math.min(boxW / naturalW, boxH / naturalH)
    : Math.max(boxW / naturalW, boxH / naturalH);
  const drawW = naturalW * scale;
  const drawH = naturalH * scale;
  const offsetX = (boxW - drawW) / 2;
  const offsetY = (boxH - drawH) / 2;

  try {
    ctx.drawImage(media, offsetX, offsetY, drawW, drawH);
  } catch (e) {
    return null; // ex : frame vidéo pas encore décodée
  }

  return averageLuminance(ctx, canvas.width, canvas.height);
}

function mediaOf(el) {
  return el.matches('img') ? [el] : Array.from(el.querySelectorAll('img'));
}

function isMediaVisible(m) {
  // Exclut les images cachées par défaut et révélées seulement au survol
  // (ex. le logo Synapse Studio, deux <img> superposées en opacity 0/1) :
  // les inclure fausserait la moyenne avec un contenu jamais visible au repos.
  const style = getComputedStyle(m);
  return style.display !== 'none' && style.visibility !== 'hidden' && parseFloat(style.opacity) > 0;
}

function isMediaReady(m) {
  return m.complete && m.naturalWidth > 0 && isMediaVisible(m);
}

function computeAutoTheme(el) {
  const media = mediaOf(el).filter(isMediaReady);
  if (!media.length) return null; // pas de média (ou pas encore chargé) : on garde le tag existant

  const values = media.map(sampleMediaTopStrip).filter(v => v !== null);
  if (!values.length) return null;

  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  return avg < AUTO_THEME_THRESHOLD ? 'dark' : 'light';
}

function refreshAutoNavThemes() {
  let changed = false;
  themedBlocks.forEach(el => {
    const auto = computeAutoTheme(el);
    if (auto && el.dataset.navTheme !== auto) {
      el.dataset.navTheme = auto;
      changed = true;
    }
  });
  if (changed) updateHeaderTheme();
}

// Tant que des images (lazy notamment) n'ont pas fini de charger, la mise en
// page peut être partiellement effondrée (hauteur pas encore réservée) : un
// bloc plus bas dans le DOM peut alors sembler être tout en haut de l'écran
// au moment précis où on lit son getBoundingClientRect(). refreshAutoNavThemes()
// seul ne suffit pas à corriger ça : si le thème d'une image ne change pas
// (elle était déjà correctement taguée), son "changed" reste false et
// updateHeaderTheme() n'est jamais rappelé — le header peut alors rester
// bloqué sur le mauvais bloc jusqu'au premier scroll de l'utilisateur. On
// force donc updateHeaderTheme() après chaque chargement d'image, indépendamment
// de la valeur retournée par refreshAutoNavThemes().
function resyncAfterLoad() {
  refreshAutoNavThemes();
  updateHeaderTheme();
}

// Recalcule dès qu'une image pas encore prête au premier passage finit de charger
// (images lazy notamment).
function scheduleAutoThemeOnLoad() {
  const seen = new Set();
  themedBlocks.forEach(el => {
    mediaOf(el).forEach(m => {
      if (seen.has(m) || isMediaReady(m)) return;
      seen.add(m);
      m.addEventListener('load', resyncAfterLoad, { once: true });
    });
  });
}

if (themedBlocks.length && header) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateHeaderTheme();
      ticking = false;
    });
  }, { passive: true });

  refreshAutoNavThemes();
  scheduleAutoThemeOnLoad();
  updateHeaderTheme();

  // Filet de sécurité final : une fois la page entièrement chargée (toutes
  // les images non-lazy, fonts, etc.), la mise en page est nécessairement
  // stable — on revérifie une dernière fois au cas où le calcul initial
  // aurait eu lieu pendant une mise en page encore partielle.
  window.addEventListener('load', resyncAfterLoad);

  // Le crop object-fit change entre mobile empilé et desktop en colonnes :
  // on ré-échantillonne après un resize (ex. rotation, redimensionnement fenêtre).
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(refreshAutoNavThemes, 200);
  });
}

// ============================================================
// DÉCOUVRIR D'AUTRES PROJETS (pages projet)
// Source unique de l'ordre des projets — reflète travaux.html.
// Ajouter/retirer/réordonner un projet ici met à jour
// automatiquement la section sur toutes les pages projet.
// ============================================================
const PROJECTS = [
  { file: 'project.html',    name: 'Malbec Coffee',                                          category: 'IDENTITÉ',             img: 'images/travaux-01.jpg', cardBg: '#DCCFBE', cardText: '#1A1A1A' },
  { file: 'project-02.html', name: 'Les&nbsp;Résonances Saint-Martin',                        category: 'DIRECTION ARTISTIQUE', img: 'images/travaux-02.jpg', cardBg: '#7952A8', cardText: '#F5EFE6' },
  { file: 'project-03.html', name: 'Le&nbsp;Paradoxe du&nbsp;progrès',                        category: 'DESIGN ÉDITORIAL',     img: 'images/travaux-03.jpg', cardBg: '#2A2A2A', cardText: '#F5EFE6' },
  { file: 'project-04.html', name: '93<sup>e</sup> Congrès des&nbsp;Assises départementales', category: 'SIGNALÉTIQUE',         img: 'images/travaux-04.jpg', cardBg: '#9B9180', cardText: '#1A1A1A' },
  { file: 'project-05.html', name: 'Balenciaga, Demna Gvasalia',                               category: 'DESIGN ÉDITORIAL',     img: 'images/travaux-05.jpg', cardBg: '#8C8C7A', cardText: '#F5EFE6' },
  { file: 'project-06.html', name: 'Grapillon',                                                category: 'DIRECTION ARTISTIQUE', img: 'images/travaux-06.jpg', cardBg: '#fff1a6', cardText: '#1A1A1A' },
  { file: 'project-11.html', name: 'Synapse Studio',                                           category: 'COLLECTIF',            img: 'images/travaux-11.jpg', cardBg: '#1A1A1A', cardText: '#F5EFE6', extraClass: 'travaux-card--synapse' },
  { file: 'project-08.html', name: "Arch'ocktail",                                             category: 'Identité visuelle',    img: 'images/travaux-08.jpg', cardBg: '#A8C4D4', cardText: '#1A1A1A' }
];

(function () {
  const grid = document.querySelector('.project-discover-grid');
  if (!grid) return;

  const currentFile = location.pathname.split('/').pop() || 'index.html';
  const currentIndex = PROJECTS.findIndex(p => p.file === currentFile);
  if (currentIndex === -1) return;

  const len = PROJECTS.length;
  const picks = [
    PROJECTS[(currentIndex - 1 + len) % len],
    PROJECTS[(currentIndex + 1) % len],
    PROJECTS[(currentIndex + 2) % len]
  ];

  grid.innerHTML = picks.map(p => `
    <a href="${p.file}" class="travaux-card${p.extraClass ? ' ' + p.extraClass : ''}" style="--card-bg: ${p.cardBg}; --card-text: ${p.cardText};">
      <div class="travaux-img" style="background-image: url('${p.img}');"></div>
      <div class="travaux-overlay">
        <span class="travaux-card-cat">${p.category}</span>
        <span class="travaux-card-title"><span class="project-name">${p.name}</span></span>
      </div>
    </a>
  `).join('');
})();
