# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static personal portfolio website for Pradip Sapkota, deployed to GitHub Pages at `www.pradipsapkota.com`. No build system — all files are served directly.

## Development

Open `index.html` directly in a browser or use a local static server:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

No install step, no package manager, no compilation.

## Architecture

### Pages
- `index.html` — single-page portfolio (Home, About, Skills, Experience, Projects, Contact sections)
- `blog.html` — blog listing page
- `blog/post1.html`, `blog/post2.html` — individual blog post pages

### CSS (load order matters)
1. `css/thm-theme.css` — CSS custom properties for both themes, global base styles (typography, buttons, cards). All color values reference variables defined here.
2. `css/animations.css` — keyframes and animation utility classes (`animate-on-scroll`, `animate-fade-in-*`, delay helpers).
3. `css/style.css` — section-specific layout (hero, timeline, grids, responsive breakpoints).

### Theming System
Dark mode is the default. Light mode is activated by adding `light-mode` to `<body>`. Theme is persisted in `localStorage` under key `"theme"`.

- All colors use CSS custom properties defined in `:root` (dark) and `body.light-mode` (light) in `thm-theme.css`.
- The matrix rain canvas (`#matrix-canvas`) is hidden and its animation paused in light mode.
- To change theme colors, edit the variable blocks in `thm-theme.css` — do not hardcode colors in `style.css`.

### JavaScript (`js/script.js`)
Single script loaded on all pages, handles:
- Scroll-based `IntersectionObserver` for `.animate-on-scroll` elements (adds `is-visible` class)
- Skill progress bars animated on scroll via `data-progress` attribute
- Typing effect on hero `h1` (character-by-character, preserves inner HTML tags like `<span>`)
- Matrix rain canvas animation using `setInterval` at 50ms; paused on tab hidden, stopped in light mode
- Theme toggle button (`#theme-toggle`) with `localStorage` persistence
- Active nav link highlighting based on scroll position

Blog pages and post pages duplicate the nav toggle and scroll animation logic inline because `script.js` is loaded `defer` — the inline scripts run first for immediate interactivity.

### Missing Asset
`assets/Pradip_Sapkota_Resume.pdf` is referenced in `index.html` but not committed to the repo. Add it under `assets/` before the resume download button will work.

## Deployment

Push to `main` branch — GitHub Pages auto-deploys. The `CNAME` file sets the custom domain to `www.pradipsapkota.com`.
