# whatareyouuptoday — Project Guide for Claude Code

Last updated: 18 May 2026

## Project Overview

Personal portfolio website for Silke Sonnenberg.
Live at: https://whatareyouuptoday.com
Stack: Static HTML, CSS, vanilla JS. No framework.
Deployed on Vercel, auto-deploy on push to main.

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

## File Structure Conventions

- 8 HTML pages total (index, about, privacy, imprint, and project subpages).
- Single `styles.css` file for all styling.
- Fonts in `fonts/`.
- Images in their existing folders (do not move without checking all references).

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

## Open Tasks

- Imprint review for TMG Section 5 compliance
- SEO basics: title tags, meta descriptions, Open Graph image
- Favicon in all standard sizes
- robots.txt and sitemap.xml
- Custom 404 page verification

## Tone and Copy

- No em dashes in copy (use commas, periods, colons, brackets, hyphens instead).
- Avoid generic AI buzzwords (AI integration, AI expert, prompt designer).
- Preferred language: AI-native workflows, creative direction, human-led processes, systems thinking.
