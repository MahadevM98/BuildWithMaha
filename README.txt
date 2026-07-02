BUILDWITHMAHA | SITE v6.2 "LEDGER, HUMANISED"
=============================================

WHAT CHANGED IN THIS PASS (the de-AI edit)
  Copy:
   - Zero em-dashes anywhere, including page titles. Your rule, applied.
   - Rhythmic triads and seesaw sentences rewritten in plain speech.
     e.g. the old "No pitch deck. No pressure. Just the leaks, named."
     is now "No pitch deck. You get a straight list of what's broken."
   - Sentence lengths vary. More first person. British English.
   - Small honest touches: "This occasionally costs me money.",
     "I'd be embarrassed otherwise.", "Please don't tidy it first."
  Design:
   - The "//" mono kickers are gone. The status-dot pill is gone.
   - Tick-up counters removed; stats read as editorial numbers now.
   - Section openers vary (some have the ruled label, some a plain
     small-caps line, some none) so pages no longer repeat one rhythm.
   - The Cut tag sits at a slight hand-placed angle.
   - A hand-drawn green underline draws itself under "booked enquiries".
   - Footer has a human note: "built and maintained by one person, if
     something breaks email me" plus "Last updated June 2026".

EVERYTHING ELSE (unchanged and tested)
   - Ledger design: Newsreader / IBM Plex Mono / Hanken Grotesk,
     green #1f8a5b, terracotta cut #c2533b, warm paper.
   - Interactive funnel calculator (drag 1%-6%, numbers recalc live).
   - Self-drawing funnel chart with the three leak dips.
   - The Cut strike animation on hero lines.
   - GUIDE form: live Google Form (name+email) + PDF download + honeypot.
   - CONTACT form: live Google Form (name, email, role, message) + honeypot.
   - BOOK page: Calendly embedded, themed green.
   - Clean URLs (/services, /book etc). Links start with "/" so preview
     on the LIVE domain, not by double-clicking files.

DEPLOY
   Upload all files + the book folder to the repo root. Keep
   mortgage-lead-guide.pdf in the root. Done.

TESTED
   All 8 pages, 1280px and 390px: no overflow. Strike, hand underline,
   chart draw, calculator, both forms, honeypots: all verified in a
   real browser before packaging.
v6.3 MOTION LAYER (added on top of the humanised site)
  - Reading-progress hairline: a 2px green line along the very top that
    fills as you read. Subtle, editorial.
  - Headline wipes: h2s rise out of a mask as they enter view.
  - Button ink sweep: hovers now sweep green (primary) or ink (ghost)
    from the left instead of flat colour swaps.
  - Nav links: green underline sweeps in from the left on hover.
  - The Cut tag stamps in (scale-down thump) when its strike fires.
  - Chart: the green "Calls" end dot pulses gently after the line draws.
  - Calculator: numbers do a tiny pop each time the slider changes them.
  - FAQ: answers now slide open smoothly instead of snapping.
  - Stat numbers rise out of a mask, staggered left to right.
  - Leak "fix" lines slide in when their row lights up.
  All of it respects prefers-reduced-motion and was tested on mobile.
