BUILDWITHMAHA — SITE v6 "LEDGER"
================================
Redesigned to match your uploaded design reference.

LOOK & FEEL
  - Fonts: Newsreader (serif headlines), IBM Plex Mono (labels/numbers),
    Hanken Grotesk (body). Loaded from Google Fonts.
  - Palette: warm paper #F6F5F1, near-black #12141A, GREEN accent #1f8a5b,
    terracotta #c2533b for the "Cut" strike. (The old blue is gone.)
  - Signature animations: the terracotta strike on the hero "Cut" line,
    the self-drawing green/terracotta funnel chart with the three leak dips,
    mono counters that tick up, and the italic ticker.

PAGES (all rebuilt in the new style)
  /            index.html          home: hero + cut, stat strip, ticker,
                                    BS/Truth, three leaks + funnel chart,
                                    the maths, what I build, how it works, FAQ, CTA
  /services    services.html       seven services as a numbered ledger
  /landing-pages landing-pages.html the six-block page anatomy
  /pricing     pricing.html        three tiers + 30-day guarantee
  /guide       guide.html          lead magnet opt-in (LIVE Google Form + PDF)
  /about       about.html          background + the three rules
  /contact     contact.html        message form (LIVE Google Form)
  /book        book/index.html     LinkedIn -> booking page w/ Calendly embed

FORMS — already wired to your live Google Forms and tested:
  guide.html   -> guide signups (name + email) + triggers PDF download
  contact.html -> contact form (name, email, role, message)
  Both have a honeypot that silently drops bots.

BEFORE GOING LIVE
  - Put mortgage-lead-guide.pdf in the repo ROOT (next to guide.html) so the
    guide download works.
  - That's it. Calendly, LinkedIn, and dev@buildwithmaha.com are all set.

DEPLOY (GitHub Pages, same as before)
  Upload every file + the 'book' folder to the repo root. Clean URLs
  (/services, /book, etc.) work automatically on your custom domain.
  Links start with "/" so test on the LIVE site, not by double-clicking files.

MOBILE
  Tested 320-768px: no overflow, animated mobile menu, sticky book button,
  calendar fits its card, all strikes/chart/counters fire. Reduced-motion honoured.
