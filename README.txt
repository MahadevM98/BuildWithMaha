BUILDWITHMAHA — SITE V2 (revamped)
==================================

WHAT'S IN HERE
  index.html           Home (kinetic hero, Three Leaks, funnel math, process, FAQ)
  services.html        All 7 services
  landing-pages.html   The anatomy teaching page (sticky phone mockup lights up as you scroll)
  pricing.html         3 tiers + guarantee + honest small print
  about.html           Your background and working rules
  contact.html         Form + Calendly + LinkedIn + email
  styles.css           Shared design system
  script.js            Shared animations and interactions

BEFORE GOING LIVE — 1 THING TO EDIT
  contact.html, line with: action="https://formspree.io/f/YOUR_FORM_ID"
  Replace YOUR_FORM_ID with your real Formspree form ID (formspree.io, free plan works).
  Everything else (Calendly, LinkedIn, email) is already your real links.

V5 "REDLINE" - the site is a live teardown: the hero opens with classic
agency BS which gets struck through in red pen and rewritten in Maha's
handwriting. Margin notes follow you down the page like a reviewer reading
along. A BS/Truth ledger, the funnel ridge line, and a closing line that
ties it together: "You just watched me tear down my own site."

Built on V4 "RIDGE" - design direction inspired by Tresmares Capital (Awwwards nominee):
quiet premium finance aesthetic. Hairline rules, generous whitespace, refined
Fraunces type. The signature: a single line (your funnel) that draws itself
as you scroll through the Three Leaks section, dipping at each leak, with a
blue dot traveling the line toward "Booked calls". Gentle parallax, masked
word-by-word headlines, thin italic ticker, pill buttons with ink-fill hover.
No libraries at all - pure HTML/CSS/JS. All animations respect reduced motion.

HOSTING ON GITHUB PAGES (same as before)
  1. Go to your existing repo (or create one, e.g. buildwithmaha-site)
  2. Delete the old files, upload all files from this folder to the repo ROOT
  3. Settings > Pages > Source: Deploy from branch > main > / (root) > Save
  4. Wait 1-2 minutes. Done. Your custom domain settings stay as they are.

NOTES
  - All animations respect "reduce motion" settings automatically.
  - The opening black curtain shows your thesis line for under a second, then lifts.
  - On mobile, a sticky "Book audit" button appears after the first screen.
  - No external libraries. Just HTML, CSS, JS. Loads fast.


CLEAN URLS (v5.2)
  All internal links are now extensionless: /services, /pricing, /guide,
  /landing-pages, /about, /contact, and / for home. GitHub Pages serves
  services.html automatically when /services is requested, so no file
  renaming or folders are needed - just upload the same flat files.
  NOTE: because links now start with /, they work on your custom domain
  (buildwithmaha domain) but will look broken if you preview the files by
  double-clicking them locally. Test on the live site.
  Contact email across the site is now dev@buildwithmaha.com.


MOBILE POLISH (v5.3)
  - Margin notes turn into bordered annotation cards (with a pencil mark)
    on phones/tablets instead of loose text, keeping the "reviewer" feel.
  - Hero strike-through + BS stamp scale down and fire correctly on mobile.
  - Funnel maths becomes a 2x2 grid on phones; ridge line gets more height
    so the dips stay visible on narrow screens.
  - Mobile menu now animates open with staggered links and a ✕ close icon,
    and closes itself when you tap a link.
  - Parallax is disabled on touch (it felt jittery); reduced-motion fully
    honoured. Tap targets are >=44px. Tested at 360 / 390 / 768px.
