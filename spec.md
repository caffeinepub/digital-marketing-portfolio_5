# Digital Marketing Portfolio — Ankit Sharma

## Current State
A single-page React portfolio app for a digital marketing specialist. Uses dark theme (deep charcoal) with electric teal + warm amber accents. Framer Motion animations throughout. Sections: Hero, About, Services, Industries, Experience, Case Studies, 2026 Trends, Contact, Footer.

Issues to fix:
- Name shows as "Alex Sharma" everywhere — must be "Ankit Sharma"
- Contact email shows "alex.sharma@email.com" — must be "Ankitsharma951126@gmail.com"
- No phone number shown — must add "7988686185"
- Hero subtitle tagline "Digital marketing specialist across Real Estate, Automobile, Education, Fashion & IT — building campaigns that convert, retain, and scale." is not visible (contrast issue)
- Real Estate ROAS is shown as "320%" — must be "200%"
- Experience section is incorrect and over-elaborated:
  - Current role: Real Estate (present)
  - Before that: IT company
  - Before that: Automobile, Education
  - Before that: Fashion brand
  - Bullet points should be short and concise, not long elaborations
- Theme needs a fresh visual direction — more interesting/energetic

## Requested Changes (Diff)

### Add
- Phone number "7988686185" in contact section alongside email
- Phone icon in contact info list

### Modify
- Name: "Alex Sharma" → "Ankit Sharma" everywhere (Navbar, About, Footer, page title)
- Contact email: "alex.sharma@email.com" → "Ankitsharma951126@gmail.com"
- Hero subtitle visibility: ensure the tagline paragraph has strong contrast (white or near-white text, not muted)
- Real Estate ROAS: "320% ROAS" → "200% ROAS" in both Industries and Case Studies sections
- Case Studies headline for Real Estate: "320% ROAS" → "200% ROAS"
- Experience section — full rewrite to correct order and concise bullets:
  1. Current: Real Estate Digital Marketing Specialist (Present)
     - Bullets: short, 1 line each, no elaboration
  2. Previous: IT Company — Personal Branding & Client Accounts
  3. Before that: Automobile & Education — Paid Campaigns
  4. Earliest: Fashion Brand — Social Media & Meta Ads
- Theme overhaul: shift from teal/amber to a bold, high-energy dark theme. Use deep navy/black background with electric violet/purple + neon green or electric blue as accents. Add more visual energy — glowing borders, sharper contrasts, dynamic grid/dot patterns in backgrounds. Make it feel like a premium 2026 digital agency aesthetic. All text must be clearly legible.
- CSS design tokens in index.css updated for new color palette
- Ensure hero subtitle and all body text have sufficient contrast against new background

### Remove
- Nothing removed structurally

## Implementation Plan
1. Update index.css: new OKLCH color tokens — deep navy background, electric violet primary, neon accent secondary
2. In App.tsx, replace all "Alex Sharma" with "Ankit Sharma"
3. Update hero subtitle paragraph className to use foreground/90 or white text (not muted-foreground)
4. Update Real Estate stat in INDUSTRIES array: "320% ROAS" → "200% ROAS"
5. Update CASE_STUDIES real estate headline: "320% ROAS" → "200% ROAS", adjust sub text accordingly
6. Rewrite EXPERIENCE array with correct chronological order (newest first) and concise bullets (2-3 short bullets per role, no elaboration)
7. Update contact info: email to "Ankitsharma951126@gmail.com", add phone "7988686185" with Phone icon
8. Apply new theme classes throughout (update teal→violet, amber→neon references where needed in JSX className strings)
9. Update About section floating badge: adjust metric if needed
10. Update footer/navbar brand name
