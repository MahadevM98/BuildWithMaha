BUILDWITHMAHA | v7 "THE LETTER"
================================
A complete redesign. The homepage is no longer a website trying to look
like a website. It is a typed letter from you to every broker who has
been burned by an agency, sitting on a desk.

THE CONCEPT
  Direct-response sales letters are the most human high-converting
  format ever used, and nobody in your niche has a site like this.
  The letter reads top to bottom in about four minutes:
   - Letterhead, dateline, "Dear broker,"
   - The agency line, typed then crossed out in red pencil, with the
     correction handwritten above it in pen: "no. I run ads that pay
     for themselves. That's it."
   - The three leaks as numbered points in the letter
   - Exhibit A (taped-on card, slightly crooked): the funnel chart
   - Exhibit B: the working conversion calculator. Readers drag it
     and prove the doubling claim themselves.
   - The guarantee in a red stamp box, "GUARANTEED - IN WRITING"
   - Your signature, drawn in ink as it scrolls into view
   - The CTA where every great sales letter puts it: in the P.S.
   - A P.P.S. pointing to the free guide for non-ready readers

THE OTHER PAGES are documents from the same desk:
  /services       "The services, itemised"      (Document 2 of 7)
  /pricing        "The rate card"               (Document 3 of 7)
  /landing-pages  "Field notes"                 (Document 4 of 7)
  /about          "A short file on me"          (Document 5 of 7)
  /guide          "The pamphlet"                (Document 6 of 7)
  /contact        "Write back"                  (Document 7 of 7)
  /book           "The appointment slip"        (Calendly embedded)
  Handwritten margin scribbles in blue ink appear through the pages.

DESIGN TOKENS
  Desk #E7E2D5 · Paper #FBF9F3 · Ink #1C1B17
  Fountain-pen blue #1B3FA0 (handwriting, signature, slider)
  Editor's red pencil #C03B2B (strikes, stamp, progress line)
  Newsreader (letter body) · IBM Plex Mono (typed labels) ·
  Caveat (handwriting) · Hanken Grotesk (buttons)

STILL WIRED AND TESTED
  Guide form -> your live Google Form + PDF download + honeypot
  Contact form -> your live Google Form + honeypot
  Calendly on /book, themed to the pen blue
  Calculator: 1,000 clicks, drag 1-6%, 2%=20 vs 4%=40 enquiries

DEPLOY
  Upload everything + the book folder to the repo root.
  Keep mortgage-lead-guide.pdf in the root.
  Links start with "/" so preview on the LIVE domain.

TESTED
  All 8 pages at 1280 / 390 / 360px: no overflow, no JS errors.
  Strike + correction, chart draw, signature draw, scribbles,
  calculator, both forms, honeypots, smooth FAQ: all verified.
