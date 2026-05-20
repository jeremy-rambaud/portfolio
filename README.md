# Jérémy Rambaud — Portfolio

Personal portfolio of Jérémy Rambaud, Art Director based in Angers.

## Structure

```
portfolio/
├── index.html        — Home: editorial intro + project list
├── project.html      — Project page template (editorial layout)
├── infos.html        — About: bio, contact, address, CV
├── styles.css        — All styles
├── script.js         — Scroll animations, cursor, header
└── images/           — Add your visuals here
```

## Adding images

Name your images following this convention and drop them in `/images/`:

| File | Usage |
|------|-------|
| `project-01.jpg` | Project 1 cover (home list) |
| `project-02.jpg` | Project 2 cover |
| `project-03.jpg` | Project 3 cover |
| `project-04.jpg` | Project 4 cover |
| `project-05.jpg` | Project 5 cover |
| `project-06.jpg` | Project 6 cover |
| `project-01b.jpg` … `project-01e.jpg` | Detail shots for project page |

Recommended ratio for cover images: **16:9** (e.g. 2400 × 1350 px).

## Updating project content

Each project in `index.html` follows this pattern:

```html
<article class="project" data-scroll>
  <a href="project.html" class="project-link">
    <div class="project-image">
      <img src="images/project-XX.jpg" alt="Project Name">
    </div>
    <div class="project-info">
      <span class="project-category">Category</span>
      <h2 class="project-title">Title —<em> Subtitle</em></h2>
      <p class="project-desc">Short description.</p>
    </div>
  </a>
</article>
```

Duplicate `project.html` for each project and rename accordingly (e.g. `studio-lumiere.html`).

## Fonts

- **Fraunces** — display titles, Google Fonts (loaded via CDN)
- **Inter** — body, navigation, captions, Google Fonts (loaded via CDN)

## Typography conventions

- Title with em dash + italic: `Title —<em> Subtitle</em>`
- Roles in running text: `<em>designer</em>`, `<em>art director</em>`
- Pull quote: `<p class="pullquote">...</p>`

## Customisation

Update these values at the top of `styles.css`:

```css
:root {
  --cream: #F5EFE6;   /* background */
  --black: #1A1A1A;   /* text & lines */
  --gray: #888888;    /* captions, labels */
  --placeholder: #D8D0C6; /* image placeholder */
}
```

## Deployment

No build step. Drop the folder on any static host (Netlify, Vercel, GitHub Pages).

---

©2026 Jérémy Rambaud
