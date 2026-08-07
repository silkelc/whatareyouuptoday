# whatareyouuptoday — Project Guide for Claude Code

Last updated: 8 June 2026

## Project Overview

Personal portfolio website for Silke Sonnenberg.
Live at: https://whatareyouuptoday.com
Stack: Static HTML, CSS, vanilla JS. No framework.
Deployed on Vercel, auto-deploy on push to main.

## Figma Design System

- File: https://www.figma.com/design/Miw8cTJB8qJuchYeHNHatE/whatareyouuptoday-DS
- The Figma Desktop Bridge plugin must be running in Figma for Claude to read/update variables.
- Figma has two modes: **Desktop** and **Mobile**. The tablet breakpoint (1024px) is a CSS-only interpolation, not a Figma token.
- Always check Figma DS variables before setting any font-size, color, or spacing value in CSS.

## Source Files (untracked)

- `.jpg` files in `images/` and `images/carousel_branding/` are source originals. Do not commit them.
- `.mov` files in `videos/` are uncompressed sources. Do not commit them.
- Only `.webp` images and `.mp4` videos are committed to the repo.

## CSS Breakpoints

Three breakpoints in `styles.css`:
- **Desktop**: default (no media query)
- **Tablet**: `@media (max-width: 1024px)` — intermediate sizes, CSS-only (no Figma mode)
- **Mobile**: `@media (max-width: 768px)` — maps to Figma Mobile mode

## Known Exceptions

- `.frame-skill p` stays 16px on mobile (does not reduce to 14px like `caption-2`)
- Port 3000 is used by a different project (Prompt Library). Use a different port for the preview server.

## Critical Rules (do not break these)

### Fonts
- **Never load fonts from external CDNs** (no Google Fonts `<link>` tags, no `@import` from googleapis.com).
- Rubik is self-hosted at `fonts/rubik-latin.woff2`, loaded via `@font-face` in `styles.css`.
- If a new font is needed: download the `.woff2` file, place it in `fonts/`, add an `@font-face` declaration. Never link to a CDN.
- Reason: German GDPR rulings (LG München 2022) make external font loading a legal risk.

### Third-party scripts
- Only Vercel Web Analytics (`/_vercel/insights/script.js`) and Vercel Speed Insights (`/_vercel/speed-insights/script.js`) are permitted.
- Any other third-party script (analytics, chat widget, embed, image CDN) requires:
  1. Explicit user approval
  2. A privacy policy update before the script goes live

### Social media
- Instagram and LinkedIn are plain HTML links only.
- Never add embedded widgets, follow buttons, or social plugins (they load third-party trackers).

### Hosting
- Stay on Vercel. The privacy policy specifically references Vercel as the hosting provider.
- Do not introduce additional services (Cloudflare, image CDN, form backend) without updating the privacy policy first.

## File Structure

```
/
├── index.html          # Homepage
├── about.html          # About page
├── branding.html       # Brand & Visual Systems portfolio
├── workflow.html       # Creative AI Workflows portfolio
├── agentic.html        # Agentic Design Systems portfolio
├── ai-gallery.html     # AI Gallery (placeholder scaffold, served at /ai-gallery)
├── privacy.html        # Privacy policy (GDPR)
├── imprint.html        # Legal imprint
├── 404.html            # Custom not-found page (Vercel auto-serves on unmatched routes)
├── styles.css          # Single stylesheet for all pages
├── favicon.ico         # Favicon 32x32
├── favicon.svg         # SVG favicon
├── favicon-16x16.png   # 16px favicon
├── favicon-32x32.png   # 32px favicon
├── apple-touch-icon.png # Apple touch icon
├── site.webmanifest    # Web app manifest
├── fonts/
│   └── rubik-latin.woff2
├── images/
│   ├── carousel_branding/   # 8 branding slideshow images (01-08-branding.webp)
│   └── *.webp               # All other images
└── videos/
    ├── ai-typelogo.mp4      # Branding page type logo animation (496KB)
    ├── flow.mp4             # Workflow teaser video (1.1MB)
    ├── loader.mp4           # Agentic teaser video (899KB)
    ├── workflow-cook.mp4    # COOK Framework walkthrough (19MB)
    ├── workflow-ds.mp4      # Design system walkthrough (11MB)
    ├── workflow-system.mp4  # System foundations walkthrough (20MB)
    └── workflow-claudecode.mp4  # Claude Code workflow (24MB)
```

## Design Tokens (from Figma)

### Typography (desktop / mobile)
- `h1/` — 64px / 32px (used by `.hero-text h1`, `.portfolio-header h1`, `.about-headline`)
- `h2/` — 38px / 32px (used by `.project-title`, `.heading`, `.about-skill-title`)
- `body/` — 20px / 18px (set on `body`, inherited by `.body-copy`, `.portfolio-intro`, `.say-hi-text`)
- `caption-2/` — 16px / 14px (used by `.caption-2`, `.project-label`)
- `link/` — 16px, weight 400, letter-spacing -0.72
- `caption/` — 16px, weight 300, letter-spacing -0.72

### Colors
- `background` #FFFFFF, `text-primary` #000000, `text-secondary` #313131
- `accent` #FBFF01, `accent-hover` #E8EC00, `border` #000000

### Spacing
- Page: `page-padding` (50), `page-padding-mobile` (20), `content-max-width` (1180)
- Sections: `hero-padding-top` (200), `section-padding-top` (30), `section-padding-bottom` (80)
- Elements: `element-gap-sm` (12), `element-gap-md` (19), `element-gap-lg` (24), `element-gap-xl` (48)
- Components: `card-gap` (50), `button-padding-v` (6), `button-padding-h` (10), `border-radius` (4)

## Navigation

- Desktop nav: About, AI Gallery, Contact (top right). Homepage omits "Home" link; subpages include Home, About, AI Gallery, Contact.
- Nav links are semi-bold (font-weight 600), underlined. The current page's link is marked `aria-current="page"` and is NOT underlined (signals "you are here") — set on About in about.html and AI Gallery in ai-gallery.html.
- Mobile burger menu (7 links): Home, Branding, AI Workflows, Agentic Design, AI Gallery, About, Contact
- Mobile overlay: primary links 42px; secondary links Home & Contact are 24px (de-emphasized, targeted via `a[href="/"]` and `a[href^="mailto:"]`); underline on hover only
- When the overlay is open, the nav stays visible above it: yellow logo dot only on the left (the wordmark is hidden in the open menu via `.nav:has(.burger.active) .nav-logo-text { display:none }`), and the burger→X close icon on the right. This requires `.nav` z-index 200 > `.mobile-overlay` z-index 150 (the burger's own z-index is trapped in the nav's stacking context, so the nav itself must sit above the overlay). Tapping the X closes the overlay and returns to the current page.

## Favicon

All standard sizes are set up:
- `favicon.ico` (32x32), `favicon.svg` (scalable), `favicon-16x16.png`, `favicon-32x32.png`
- `apple-touch-icon.png` for iOS
- `site.webmanifest` for PWA metadata
- All HTML pages include favicon links in `<head>`

## Video Patterns

### Self-hosted videos (no external CDNs)
All videos are self-hosted in `/videos/` as compressed MP4. Never use YouTube embeds or external video CDNs.

### Compression workflow
- Source videos are `.mov` files in the main project `/videos/` folder
- Compress with: `avconvert --preset PresetHighestQuality --source input.mov --output output.mp4`
- Available presets: `PresetMediumQuality` (smallest), `PresetHighestQuality` (best quality). No middle ground.
- User preference: highest quality unless file size is a concern

### Video HTML pattern
```html
<video autoplay loop muted playsinline poster="images/fallback.webp"
       style="object-fit: contain; width: 100%; height: 100%; border-radius: 4px;">
  <source src="videos/filename.mp4" type="video/mp4">
</video>
```
- Always include `poster` attribute with the original image as fallback
- Always use `autoplay loop muted playsinline` for background videos
- Use `object-fit: contain` to show full video without cropping
- Match container `aspect-ratio` to the video's native dimensions when replacing fixed-ratio containers

### Transparent background videos
For videos with white/grey backgrounds that need to blend into the page:
```html
style="mix-blend-mode: multiply;
       -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 5%);
       mask-image: linear-gradient(to bottom, transparent 0%, black 5%);"
```
- `mix-blend-mode: multiply` makes white areas transparent
- Mask gradient fades edges (3-5% depending on the video)
- For all-edge fade, use intersecting masks:
```css
-webkit-mask-image: linear-gradient(to bottom, transparent, black 5%, black 95%, transparent),
                    linear-gradient(to right, transparent, black 5%, black 95%, transparent);
-webkit-mask-composite: destination-in;
mask-image: linear-gradient(to bottom, transparent, black 5%, black 95%, transparent),
            linear-gradient(to right, transparent, black 5%, black 95%, transparent);
mask-composite: intersect;
```

## CSS Carousel (Crossfade Slideshow)

Pure CSS, no JavaScript, GPU-accelerated via opacity animation.

```html
<div class="carousel">
  <img src="images/carousel_branding/01-branding.webp" alt="Brand visual 1">
  <!-- ... up to 8 images -->
</div>
```

```css
.carousel { position: relative; width: 100%; height: 100%; }
.carousel img {
  position: absolute; inset: 0;
  width: 100%; height: 100%; object-fit: cover;
  opacity: 0;
  animation: carousel-fade 8s infinite;
}
.carousel img:nth-child(1) { animation-delay: 0s; }
/* each subsequent child: +1s delay */
```
- Currently set to 1s per image, 8s full cycle
- Used on: homepage (Brand & Visual Systems), agentic teasers, workflow teasers

## Image Conversion

- Convert images to WebP: `cwebp -q 100 input.png -o output.webp`
- User preference: 100% quality for portfolio images, 90% for carousel/teaser images
- Always use `.webp` format for the site

## Nav Logo Animation

The yellow dot in the nav has a CSS morph animation:
- `animation: morph 6s ease-in-out infinite`
- Radial gradient: `#fbff01` (yellow) center to transparent
- Gentle shape morphing via border-radius and scale changes

## Button Patterns

### Single button (left-aligned, hug content)
```html
<a href="url" class="btn" target="_blank" rel="noopener">Label</a>
```
- `.gallery-text` has `align-items: flex-start` to prevent button stretching

### Multiple buttons in a row
```html
<div class="btn-row">
  <a href="url1" class="btn">Button 1</a>
  <a href="url2" class="btn">Button 2</a>
</div>
```
- `.btn-row`: `display: flex; flex-wrap: wrap; gap: 12px;` (element-gap-sm)
- Spacing from text above: `margin-top: 16px` (+ 8px gap = 24px element-gap-lg)

## Git Workflow

- Work on feature branch (e.g. `claude/jolly-wiles-bafaab`)
- Squash merge PRs to main via `gh pr merge --squash`
- Delete feature branch after merge
- Vercel auto-deploys on push to main
- Squash merges cause branch divergence: rebase before merging if conflicts arise

## Repo Size Awareness

- GitHub max: 100MB per file, recommended repo size under 1GB
- Vercel: Free plan 1GB deployment size, Pro 10GB
- Current videos total ~77MB, monitor as more are added
- Consider Git LFS or Vercel Blob if repo exceeds 500MB

## Privacy Policy

Located at `privacy.html`. Current section structure:
1. Overview
2. Controller
3. General Information
4. Hosting (Vercel)
5. Web Analytics and Speed Insights (Vercel)
6. Fonts, Images, and Videos
7. Social Media Links
8. Contact by Email
9. Cookies and Tracking
10. SSL/TLS Encryption
11. Your Rights
12. Right to Lodge a Complaint
13. Changes to This Privacy Policy

If you add, remove, or change any data-processing functionality on the site, update the privacy policy in the same commit.

## Frame Skill Component

Grey text box used for short skill/service descriptions within portfolio sections.

```html
<div class="frame-skill">
  <p>→ Description text here.</p>
</div>
```
- Background: `#e9e9e9`, padding: 6px
- Text: caption-2 style (16px desktop, 16px mobile), color `#313131`
- Used on: agentic.html (3 sections), workflow.html (1 section)

## Session Log — 3 June 2026

### Figma DS token sync
- Set `body` font-size to 20px desktop / 18px mobile
- Updated `.body-copy` and `.portfolio-intro` to inherit from body (removed hardcoded 22px)
- Updated `.caption-2` and `.project-label` to 16px desktop / 14px mobile
- Updated `.btn-row` gap from 16px to 12px (element-gap-sm)
- Fixed button margin inside `.btn-row` (was doubling up with gap)
- Updated `.btn-row` margin-top to 16px (24px total with gap = element-gap-lg)
- Updated `.say-hi` gap to 20px desktop and mobile, removed hardcoded text size

### New frame-skill component
- Created `.frame-skill` CSS component (grey box with caption-2 text)
- Added to agentic.html: AI-Assisted System Creation, Figma to Code, Governance sections
- Added to workflow.html: visual systems section

### Copy updates
- workflow.html: headline "Visual exploration and storytelling", new body copy for section 01, main headline shortened
- agentic.html: frame-skill text iterations across 3 sections
- about.html: headline updated, paragraph break added with 24px spacing

### Image updates
- Updated 5 branding carousel images (03, 05, 06, 07, 08)
- Updated workflow-01.webp from new source

### Mobile spacing
- Added 48px spacing between about-body and about-skill on mobile
- Frame-skill text stays 16px on mobile (not reduced to 14px like caption-2)

## Session Log — 8 June 2026

### h1/display font-size update (Figma `h1/` token)
- Changed all h1 elements from previous sizes to Figma `display/` (now `h1/`) token: 64px desktop, 42px tablet (1024px), 32px mobile (768px)
- Affected selectors: `.hero-text h1`, `.portfolio-header h1`, `.about-headline`
- Letter-spacing scaled proportionally at each breakpoint

### Figma DS variable rename for SEO alignment
- Renamed `display/` → `h1/` in Figma Typography variables (font-size, line-height, letter-spacing, font-weight)
- Renamed `heading/` → `h2/` in Figma Typography variables (font-size, line-height, letter-spacing, font-weight)
- Naming now maps directly to HTML semantic elements for better SEO and design-to-code clarity

### Documentation
- Updated CLAUDE.md typography tokens to reflect `h1/` and `h2/` naming
- Updated memory file with new token names

## Session Log — 16 June 2026

### SEO
- Added meta descriptions and Open Graph tags to all 7 pages
- Created robots.txt (allow all, points to sitemap)
- Created sitemap.xml (7 pages with priorities)
- OG image placeholder path: `images/og-image.webp` (1200x630px, not yet created)

### Yellow marker highlight
- `.highlight-underline` class: background gradient in accent yellow (#FBFF01), marker style
- Applied to "creative direction" on: index.html, about.html, branding.html, workflow.html

### Two-image crossfade
- `.swap-two` CSS component with separate `swap-a`/`swap-b` keyframes (8s cycle)
- Used on workflow.html section 02: workflow-02.webp and workflow-02b.webp

### Spacing and sizing fixes
- About page top padding matched to homepage (200px)
- `.project-label` stays 16px on mobile (not 14px)

### Copy updates
- about.html: full bio rewrite (5 paragraphs, personal intro through LABASAD)
- branding.html: mid-text changed to "From visual exploration to a coherent brand system."

## Session Log — 16 June 2026 (later)

### Custom 404 page
- Created `404.html` at repo root (Vercel auto-serves it for unmatched routes on static sites; no `vercel.json` change needed, returns proper 404 status)
- Reuses `.hero-text` layout, nav (Home/About/Contact), mobile overlay + burger script, and footer
- Yellow marker highlight (`.highlight-underline`) on "404"; copy avoids em dashes and AI buzzwords
- `<meta name="robots" content="noindex">` added so the error page is not indexed
- Verified in preview: renders on desktop and mobile, no console errors, unknown routes return 404 status with the page
- Used absolute `/styles.css` (not relative) so the page stays styled when served at nested unknown paths (e.g. `/foo/bar`)

### No-JS reveal fallback
- Added `<noscript><style>.reveal{opacity:1;transform:none}</style></noscript>` after the stylesheet link on all 5 pages that use `.reveal` (index, about, branding, workflow, agentic)
- Reason: `.reveal` starts at `opacity:0` and is shown by the IntersectionObserver. Without JS, reveal sections (incl. the lecaid.com link + portrait on about) stayed invisible. The noscript rule overrides to visible (no animation) when JS is off; inert when JS is on.

### AI Gallery page
- New `ai-gallery.html` served at `/ai-gallery`: portfolio-header + masonry gallery wall + explore-more CTA + footer
- No project teasers on this page (`.explore-projects` removed); only the "Let's shape what's next." CTA is kept in the explore-more section
- Gallery is a balanced masonry (`.gallery-grid`, 3 cols desktop / 2 tablet / 2 mobile, 20px gap / 12px mobile, square corners). Images display at their **native aspect ratio** (`.gallery-tile img` is `width:100%; height:auto`, no `object-fit` crop), so heights vary per image. Tiles fade in via `.reveal` (no vertical movement — `.gallery-tile.reveal` is `transform:none` so columns stay top-aligned); hover zooms the image to 1.04.
- Layout is built by a small inline JS masonry in `ai-gallery.html`: it adds `.is-masonry` (flex) and distributes each tile into the currently **shortest column** using the `<img>` width/height attributes (so balance is instant and unaffected by lazy loading). Column count comes from the `--cols` CSS var per breakpoint; rebuilds on resize. CSS `column-count` remains as the no-JS fallback.
- Reason: CSS-column balancing was unreliable across viewport widths and with lazy images (one column ran much longer on iPhone/iPad). The JS shortest-column approach is deterministic and balanced on every device.
- Final images live in `images/ai_gallery/` (21 files, `01_…`–`21_…`). Each `<img>` carries `width`/`height` (native px) so layout doesn't shift on load; all `loading="lazy"`.
- **Video tiles:** a tile can be a `<video loop muted playsinline preload="none">` with `poster=` set to the matching still (the still is the fallback / no-JS view) and `width`/`height` = the still's native px (same aspect ratio, so the masonry balances unchanged). The masonry JS and `.gallery-tile` CSS target `img, video`. Video + still are paired by name in `images/ai_gallery/` (e.g. `05_Gallery_Flowers.webp` + `.mp4`). Current video tiles: 05, 12, 21.
- **Play-on-visible:** videos are NOT `autoplay`. An IntersectionObserver in `ai-gallery.html` (`rootMargin: '200px'`) calls `play()` when a video nears the viewport and `pause()` when it leaves, and `preload="none"` means off-screen clips never load. Keeps the page light when several videos exist. Without JS, the poster (still) shows.
- Gallery video compression: source `.mp4`/`.mov` is over-spec (~12MB, ~20Mbps); re-encode H.264 with `avconvert -p Preset960x540 --multiPass` (≈540 tall portrait, ~2.6MB for a 5s loop). Use `Preset1280x720` for crisper/larger, or `--duration 5` to trim a long clip to a 5s loop (~half the size). Only the compressed `.mp4` is committed; source `.mov` is gitignored.
- Nav link "AI Gallery" added between About and Contact in the desktop nav, and between Agentic Design and About in the mobile overlay, on all 9 pages (incl. 404)
- Added `/ai-gallery` to sitemap.xml (priority 0.8)
- Verified in preview: renders desktop + mobile, burger menu shows all 7 links, no console errors

### Open Graph image
- `images/open-graph-image.jpg` (1800x945, 1.91:1 ratio, ~184KB) referenced by all `og:image` / `twitter:image` tags on all 9 pages
- Kept as **JPG, not WebP**: OG previews render more reliably as JPG across social platforms (esp. LinkedIn). This is the one committed `.jpg` — `.gitignore` has an explicit `!images/open-graph-image.jpg` exception to the `*.jpg` rule.

## Session Log — 17 June 2026

### Shipped today
- Custom 404 page; no-JS `.reveal` fallback on all reveal pages
- **AI Gallery** (`/ai-gallery`): full build — balanced JS shortest-column masonry, native aspect ratios, square corners, 20px/12px gaps; nav link on all 9 pages; sitemap entry (details in the AI Gallery notes above)
- AI Gallery content: 21 images (`01_…`–`21_…`), headline "A gallery of ideas and the few that made the cut"
- **Video tiles** (03, 05, 12, 21): still as `poster`, `preload="none"`, play-on-visible via IntersectionObserver; H.264 compression workflow with `avconvert`
- Open Graph image (`open-graph-image.jpg`, JPG) on all pages
- Rewrote all meta titles + descriptions to match each page's real copy (dropped AI buzzwords); fixed workflow/branding `<title>` mismatches
- Nav polish: active-page link not underlined (`aria-current`); mobile overlay keeps logo dot + burger→X close icon visible, Home/Contact de-emphasized to 24px
- Homepage: "AI Gallery" button on the Brand card; tag edits (+Weavy −iteration; +Claude)
- Added `.gitignore` (`.DS_Store`, `.jpg`/`.mov` sources, worktrees; exception for the OG jpg)

### Important to keep in mind
- **AI Gallery is the active work area.** New videos arrive paired by name in `images/ai_gallery/` (`NN_Name.webp` + `NN_Name.mp4`/`.mov`). Per video: compress if over-spec (`avconvert -p Preset960x540 --multiPass`, add `--duration 5` for long clips), replace the heavy original, convert that tile from `<img>` to the `<video>` poster pattern. Some delivered clips are already small (e.g. 03 was 0.9MB) and need no compression. Masonry + play-on-visible then handle it automatically.
- Only compressed `.mp4` + `.webp` get committed; `.mov`/`.jpg`/`.DS_Store` are gitignored.
- Masonry balance + top-alignment depend on the inline JS in `ai-gallery.html` (CSS columns is only the no-JS fallback). Each tile needs correct `width`/`height` on its `img`/`video`.

## Session Log — 7 August 2026

### AI Gallery: tiles 23 and 24
- `23_Gallery_Summer`: delivered as 7MB PNG (1968x2464), converted with `cwebp -q 90 -resize 1000 0` → 239KB WebP (1000x1253). Image tile.
- `24_Gallery_Fotoshoot`: delivered as MP4 only (720x1280, 5s, 2.1Mbps — already in spec, no re-encode). No still was delivered, so the poster was extracted from the first video frame via a Swift `AVAssetImageGenerator` one-liner (no ffmpeg on this machine), then `cwebp -q 90` → 69KB poster. Video tile, `width="720" height="1280"`.
- `.gitignore`: added `images/**/*.png` under source originals (PNG sources were not covered; root favicon PNGs are unaffected since the pattern is scoped to `images/`).
- Verified in preview: both tiles load, video plays via play-on-visible, masonry balanced at 2 and 3 columns.

## Open Tasks

- AI Gallery: more videos may still arrive (same per-video workflow as above)

## Tone and Copy

- No em dashes in copy (use commas, periods, colons, brackets, hyphens instead).
- Avoid generic AI buzzwords (AI integration, AI expert, prompt designer).
- Preferred language: AI-native workflows, creative direction, human-led processes, systems thinking.
