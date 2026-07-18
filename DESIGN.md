---
name: Jérémy Rambaud — Art Director
description: Portfolio monograph for a DA specializing in fashion and luxury direction.
colors:
  blanc-de-maison: "#FFFFFF"
  encre: "#1A1A1A"
  annotation: "#888888"
  maquette: "#D8D0C6"
  note: "#AAAAAA"
  legende: "#F5EFE6"
typography:
  display:
    fontFamily: "Romie, Georgia, serif"
    fontSize: "clamp(2.5rem, 5.5vw, 6.5rem)"
    fontWeight: 300
    lineHeight: 1.04
    letterSpacing: "normal"
  pullquote:
    fontFamily: "Romie, Georgia, serif"
    fontSize: "clamp(1.5rem, 2.5vw, 2.75rem)"
    fontWeight: 300
    lineHeight: 1.3
    letterSpacing: "normal"
  headline:
    fontFamily: "Romie, Georgia, serif"
    fontSize: "clamp(1.75rem, 2.5vw, 3rem)"
    fontWeight: 300
    lineHeight: 1.2
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 300
    lineHeight: 1.85
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.12em"
  emphasis:
    fontFamily: "Inter, system-ui, sans-serif"
    fontWeight: 600
    letterSpacing: "normal"
rounded:
  none: "0"
spacing:
  sm: "1rem"
  md: "2rem"
  lg: "4rem"
  xl: "8rem"
components:
  nav-link:
    textColor: "{colors.encre}"
    typography: "{typography.label}"
  nav-link-active:
    textColor: "{colors.encre}"
    typography: "{typography.label}"
  category-label:
    textColor: "{colors.annotation}"
    typography: "{typography.label}"
  back-link:
    textColor: "{colors.encre}"
    typography: "{typography.label}"
---

# Design System: Jérémy Rambaud — Art Director

## 1. Overview

**Creative North Star: "The Fashion House Archive"**

The design system operates from a single premise: the portfolio is not a website — it is a document. Every screen is a page in the private archive of a maison: the kind of folder a creative director receives, bound in plain materials, whose authority comes entirely from the precision of what it holds. The interface does not announce itself. It is the envelope. The work is the letter.

This system rejects the conventions of the DA portfolio as web artifact. No hover overlays that flood with color. No typography that performs refinement by reaching for an italic serif and calling it done. No motion that fills silence with noise. Refinement here is structural — in the interval between elements, in the weight of ink against the page, in the moment a viewer slows because the rhythm asked them to.

Blanc de Maison (pure white, `#FFFFFF`) is the ground. Encre (`#1A1A1A`) is the mark. No third color competes with the work. The vocabulary reduces to three decisions: Romie italic for voice, Inter light for function, and white space as active structure. Motion is carried by GSAP (ScrollTrigger, SplitText for text reveals) and CSS transitions for hover states. The standard ease is `cubic-bezier(0.25, 0.1, 0.25, 1)`. All animations include a `prefers-reduced-motion` alternative that removes transforms and collapses durations.

**Key Characteristics:**
- Monochromatic ground — Blanc de Maison and Encre only; no accent hue interrupts the work
- Romie for hierarchy, Inter for function — the pairing is never inverted
- All-italic display — Romie is always set italic; the upright cut does not appear
- Sharp edges — zero border-radius on every element
- Flat surfaces — no elevation shadows at rest; depth comes from scale and interval
- Motion that disappears — transitions are noticed only in their absence, not their presence

## 2. Colors: La Palette de la Maison

The palette is a press proof, not a mood board. Two values carry all structural weight; supporting tones appear only where the work itself requires differentiation.

### Primary
- **Encre** (`#1A1A1A`): The dominant ink. All body text, headings, borders, dividers, interactive elements at rest, and the custom cursor. Near-black rather than pure black — absorbs without the harshness of `#000000`.

### Neutral
- **Blanc de Maison** (`#FFFFFF`): The ground. Every page background, mobile nav overlay, and white-side surface. Pure white, not cream — the system does not soften the ground with warmth.
- **Annotation** (`#888888`): Secondary labels, category eyebrows, year markers, footer labels, and section titles. The footnote voice of the system. Used for uppercase label/metadata only — never body prose (contrast 3.5:1 fails WCAG AA at text sizes).
- **Maquette** (`#D8D0C6`): Warm off-white used exclusively for image placeholder and loading states. Appears only until the photograph resolves; never used as a surface or background color.
- **Note** (`#AAAAAA`): Lighter supporting text for project descriptions and photo-section subtitles. One step lighter than Annotation; used where even less visual weight is needed.
- **Légende** (`#F5EFE6`): Warm off-white for text on dark backgrounds — photo captions overlaid on a dark gradient, lightbox controls. Appears nowhere on white.

**The Two-Voice Rule.** Encre and Blanc de Maison carry the structural identity. Annotation appears in label/metadata roles only. Note and Légende are contextual — never structural. No color outside this set is added without an explicit reason tied to a new project surface.

**The No-Accent Rule.** This system has no accent color. No third hue is introduced for hover states, active states, or emphasis. Emphasis is typographic — scale, weight, italic/roman contrast. If you feel the need for a color accent, you are solving a hierarchy problem with the wrong tool.

## 3. Typography

**Display Font:** Romie (local `@font-face` — `Romie-Regular-Italic.otf`, `RomieTrial-MediumItalic.otf` for weight 500 italic)
**Body Font:** Inter (Google Fonts, weights 300/400/600, `display=swap`)

**Character:** Romie is an editorial italic — not a Garamond revival, not a "refined serif" by reflex. It carries the voice of the system: a single cut, always oblique, weight held light. Inter provides measured functional contrast: a neutral grotesque, precise from long-form prose down to label scale, with a weight range wide enough to carry its own internal hierarchy. The pair works because it is a pairing of opposites held by shared economy.

**The Romie-is-Always-Italic Rule.** Romie is never set upright. The italic is not an emphasis state; it is the only state. Using Romie upright breaks the voice.

**The Cross-Contamination Rule.** Romie carries display and voice roles. Inter carries navigation, labels, body prose, and metadata. These roles do not swap. A heading set in Inter or a label set in Romie breaks the system's register. No third typeface is added for any reason.

**The Weight-Carries-Emphasis Rule.** Within Inter, hierarchy is carried by weight, not by introducing color or a new face. Body prose sits at 300 (light). Functional/UI text (labels, nav, metadata) sits at 400 (regular). Strong emphasis — foundry names, typeface names, and other terms that must read as a beat heavier than the surrounding sentence — sits at 600 (semibold), via `<strong>`/`<b>`, styled globally rather than per-instance.

### Hierarchy
- **Display** (Romie italic, weight 300, `clamp(2.5rem, 5.5vw, 6.5rem)`, line-height 1.04): Project page hero titles. The ceiling of the type scale.
- **Page Headline** (Romie italic, weight 300, `clamp(2.5rem, 5–7vw, 6–8rem)`, line-height 1): Section-level page titles — travaux, photo, infos. Scale varies by page.
- **Intro Text** (Romie italic, weight 300, `clamp(0.875rem, 1.05vw, 1rem)`, line-height 1.8): Homepage introductory statement; photo page intro. A whisper at display scale.
- **Pullquote** (Romie italic, weight 300, `clamp(1.5rem, 2.5vw, 2.75rem)`, line-height 1.3): Editorial quotes and voice within project pages.
- **Section Title** (Romie italic, weight 300, `clamp(1.75rem, 2.5vw, 3rem)`, line-height 1.2): Sub-headings inside project bodies ("Le concept", "Approche", "La Typographie"...). Same voice as Display, one register down.
- **Body** (Inter 300, `1rem`, line-height 1.85): Project descriptions, infos bio, text-block prose. Max width 520px (~65ch). `text-wrap: pretty` to reduce orphans.
- **Small Body** (Inter 300, `0.875–0.9375rem`, line-height 1.5–2.1): CV items, credit rows, footer text.
- **Emphasis** (Inter 600): Foundry names, typeface names, and other strong emphasis within running prose (`<strong>`/`<b>`). One deliberate weight step above body, never a color or size change.
- **Label** (Inter 400, `0.6875rem`, letter-spacing `0.10–0.12em`, uppercase): Category eyebrows, nav links, metadata, back/next links, Crédits/Découvrir headers. The annotation voice. `text-wrap: balance` on h1–h3.

## 4. Elevation

This system is flat by doctrine. No structural shadow appears at rest; no surface lifts from another. Depth is conveyed through three mechanisms in order of priority: (1) scale contrast — display text at 6.5rem and label text at 11px create depth without shadow; (2) interval — the 8rem `--space-xl` gap between sections reads as separation; (3) ink on ground — full-bleed images that run edge-to-edge create foreground/background without elevation metaphor.

### Shadow Vocabulary

- **Photo Hover Ambient** (`box-shadow: 0 10px 40px rgba(0, 0, 0, 0.18)`): Applied to photo grid items on hover only. The single permitted structural exception — signals that a photograph is an interactive object, like a print lifted off a table.

**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows appear only as a response to hover interaction on the photo grid specifically, where the physical-object metaphor earns its place. No shadow decorates a card, container, modal header, or fixed nav at any state.

## 5. Components

The system is typographic. Every interactive element reduces to text with a state change that reveals itself on hover: a 1px underline that slides from left to right at `width 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)`. No filled buttons. No bordered chips. No decorated cards. The custom cursor — a 10px dot (Encre) that expands to a 40px empty ring on hover over interactive elements — is the one gestural exception in the system.

### Navigation

**Style:** Fixed header, padding `1.5rem var(--gutter)`, z-index 100. Logo left (Romie italic, 13px, weight 300, letter-spacing 0.06em). Nav links right (Inter 400, 11px, uppercase, letter-spacing 0.12em, flex gap 2.5rem).
**Default:** Encre text on Blanc de Maison. On dark-background sections, `.header--on-dark` class inverts text and cursor to white.
**Hover / Active:** 1px underline extends from 0 to 100% width over 0.35s standard ease. Active link holds the underline permanently.
**Mobile (≤600px):** Desktop nav hidden. Burger button shown (two 22px × 1px Encre spans). Opens fullscreen Blanc de Maison overlay with Romie italic links at `clamp(2.25rem, 10vw, 3.5rem)`.

### Links

All links are underline-slide. No filled, bordered, or colored treatment at rest. Hover reveals a 1px bottom line growing from left at `width 0.35s`. Varieties: back/next project links (11px, uppercase, 0.10em tracking); footer and infos links (14px, normal case); see-all link (11px, uppercase).

### Cards / Containers

Zero border-radius everywhere. No card container exists independently — content is full-bleed image or typographic text block on Blanc de Maison.

**Project listing (home):** Full-bleed image at 3:1 aspect ratio, edge-to-edge across viewport via negative margin technique (`width: 100vw; margin-left: calc(-50vw + 50%)`). Category label (Annotation, uppercase) + Romie italic title centered below, separated by `--space-md`. Image scales to 1.02× on hover over 0.7s.
**Travaux card:** Square 1:1 grid. Image fills at rest; fades to opacity 0 on hover. Centered overlay with category (11px uppercase) + Romie italic title. Transition 0.55s ease.
**Two-column layout (project pages):** 50/50 grid. Image at 3:4 ratio. Text column sticky at `top: calc(5rem + 2rem)`.
**Photo grid (masonry):** 3 columns at desktop, `column-gap: 3px`. Hover: image scales 1.025×, ambient shadow appears, caption slides up from bottom with dark-gradient overlay.

### Inputs / Fields

One form field in the system: newsletter email in the footer. No background, no border. Bottom rule only: `1px solid Encre`. Placeholder in Annotation (`#888888`). No focus ring treatment — the bottom rule is the field's form.

### Lightbox

Full-viewport overlay, `rgba(26, 26, 26, 0.96)`. Image constrained to 88vw × 82vh, `object-fit: contain`. Controls: close `×` (top-right), prev/next (uppercase 11px, Légende color `#F5EFE6`, 50% opacity at rest, 100% on hover). Activates on opacity transition 0.35s.

### Custom Cursor

10px filled circle (Encre) tracking the pointer. On hover over interactive elements: expands to 40px circle, fill transparent, 1px Encre border. Inverts to `#FFFFFF` fill/border on dark-background sections (`:has(.header--on-dark)` selector). Hidden on touch devices (`pointer: coarse`).

## 6. Do's and Don'ts

### Do:
- **Do** use Romie in italic only, always. Never set it upright; never use it at label or body scale.
- **Do** carry emphasis within Inter through weight (300 body → 400 label → 600 strong), never through color or a new face. Wrap foundry names, typeface names, and other must-stand-out terms in `<strong>`/`<b>`.
- **Do** use `text-wrap: balance` on h1–h3 and `text-wrap: pretty` on all body prose.
- **Do** keep body prose within 520px max-width (~65ch) to preserve reading rhythm.
- **Do** use full-bleed images edge-to-edge for cinematic staging — the photograph is the design.
- **Do** keep all hover interactions to the underline-slide pattern: `width 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)`, 1px, Encre.
- **Do** honor `prefers-reduced-motion`: remove all `translateY` transforms, reduce CSS transition durations to `0.01ms`.
- **Do** use `--space-xl` (8rem) between major sections. White space is the interval that gives the next element weight.
- **Do** use Annotation (`#888888`) for label and metadata text only. It fails WCAG 2.1 AA (3.5:1) at body text sizes — never use it for paragraph prose.
- **Do** use GSAP for scroll-triggered text reveals (SplitText character/word) and ScrollTrigger for section entrances. These are already wired; extend them, do not replace them.

### Don't:
- **Don't** introduce an accent color. This system has no hue beyond Encre and Blanc de Maison. No hover color, no active color, no highlight hue.
- **Don't** add `border-radius` to any element. Sharp edges are a design decision, not an oversight.
- **Don't** use gradient text (`background-clip: text`), glassmorphism, or drop shadows on structural elements at rest.
- **Don't** add purple or blue gradients, neon accents, or any visual tells from AI/tech interfaces — these are prohibited by name in PRODUCT.md.
- **Don't** create motion overdrive: scroll effects for their own sake, identical entrance animations on every section, or micro-interactions that exist to fill silence.
- **Don't** produce a SaaS-landing-page or "vibe-coded" result. If the page reads as a Behance grid without identity, or as a tech startup portfolio, it has failed.
- **Don't** use Cargo/Squarespace-style uniform grids: identical card heights, identical reveals, no editorial decision-making.
- **Don't** set Inter in a role that belongs to Romie, or Romie in a role that belongs to Inter. The pairing boundary is fixed.
- **Don't** add a third typeface.
- **Don't** use em dashes (`—`) anywhere in visible text on the site.
- **Don't** use Annotation gray (`#888888`) for body prose paragraphs — contrast fails WCAG 2.1 AA at text sizes.
- **Don't** add decorative shadows, card borders, or any surface treatment that implies material depth where the design intends flatness.
