# whatareyouuptoday — Portfolio Website

## Project overview
Portfolio website for Silke Sonnenberg. Vanilla HTML/CSS/JS, no frameworks, no build tools. Served with `npx serve` on localhost:3458.

Figma source: https://www.figma.com/design/Miw8cTJB8qJuchYeHNHatE/whatareyouuptoday-website

## Tech stack
- Vanilla HTML, CSS, JS (no React, no Tailwind)
- Font: Rubik (Google Fonts) — weights 300 (light/captions), 400 (regular/body/links), 600 (semibold/headings)
- Colors: white background, black text, yellow accent `#fbff01`
- Images: local 2x retina WebP files in `images/`
- Responsive breakpoints: 1024px (tablet), 768px (mobile)

## Pages
- `index.html` — Homepage with hero, 3 project cards, Say Hi CTA, footer
- `about.html` — Bio headline, 3 body paragraphs, 3 capability blocks with tags, portrait, Explore More (3 cards), footer
- `ai.html` — Brand & Visual Systems subpage (gallery layout)
- `workflow.html` — Creative AI Workflows subpage (gallery layout)
- `agentic.html` — Agentic Design Systems subpage (gallery layout)
- `motion.html` — Motion subpage (NOT yet updated with new copy or local images, still has Figma API URLs)
- `styles.css` — All styles in one file

## Figma-to-code workflow
Figma MCP tools (`get_design_context`, `get_metadata`) output React/Tailwind. Always convert to vanilla HTML/CSS matching existing patterns.

## Image pipeline
1. Download from Figma API
2. Check actual file type (`file --mime-type`) — Figma often mislabels formats
3. Convert to PNG if needed
4. Resize to 2x retina (display size x 2) with `sips -Z` (sips cannot resize WebP directly — convert to PNG first with `dwebp`)
5. Convert to WebP with `cwebp -q 80`

## Gallery layout patterns
Layout classes on `<section class="content gallery-item {alignment}">`:
- `.center`, `.left`, `.right`, `.wide`, `.medium-center`, `.medium-left`

Image aspect classes on `<div class="gallery-img {aspect}">`:
- `.portrait`, `.landscape`, `.landscape-wide`, `.wide-cinema`, `.full-wide`, `.square`, `.fixed-medium`

## Explore More component
Each subpage has an Explore More section with 2 cards linking to the other subpages + a CTA block below ("Let's shape what's next."). The about page has 3 cards (all subpages). Structure:
```html
<section class="content explore-more">
  <div class="explore-projects">
    <div class="explore-project">
      <div class="explore-project-info">
        <p class="project-label">Subline description</p>
        <h3 class="project-title">Category Name</h3>
        <a href="page.html" class="btn">Explore</a>
      </div>
      <div class="explore-project-img">
        <img src="images/explore-*.webp" ...>
      </div>
    </div>
  </div>
  <div class="explore-more-cta">
    <p class="explore-more-heading">Let's shape what's next.</p>
    <p class="explore-more-sub">Open for freelance projects, collaborations and AI-native creative systems.</p>
  </div>
</section>
```

## Canonical copy source
`/Users/sille/Jobs/26001_BrandNew/website_screens/whatareyouuptoday_website_copy_summary.md`

## Copy rules
- No em dashes in copywriting
- Do not invent copy — only use text from the markdown or Figma
- Do not change image captions (those come from Figma)

## What's done
- All pages have local 2x retina WebP images (replaced expired Figma API URLs)
- Copy updated on all pages (index, about, ai, workflow, agentic) from canonical markdown
- Mobile burger menu with fullscreen overlay on all pages
- Explore More sections restructured to match latest Figma (cards first, CTA below)

## What's remaining
- `motion.html` — still has old copy, 2 placeholder `href="#"` links, and Figma API image URLs that will expire
- General QA: responsive testing, cross-browser checks
- Deployment (Vercel or similar)
