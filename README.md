# Niyam Partner Playbook

Internal guide for the Niyam partner team. It covers every fee, the terminology behind it,
how partner commission works, and ready answers to the questions affiliates ask in
in-person meetings. Live calculators are included. The guide is in Hinglish and English,
with a toggle in the top bar.

**Internal only.** It shows Niyam's margin at each commission share (deal desk), unconfirmed
items and internal scripts. Turn on **Meeting mode** before sharing your screen with an
affiliate. That hides internal notes, TBC badges, the deal desk and the open-items list.
Meeting mode only hides things on screen; the page source still holds internal data, so
**never send this playbook's link to a partner.** Send the Partner Kit instead.

## Partner Kit (`partner-kit.html`)

The shareable page for onboarded partners. It loads only `rates.js` and `kit-content.js`, never
`config.js` or `content.js`, so nothing internal can reach it.

| # | Section |
|---|---|
| 01 | Start here: 15-minute checklist and what happens after signing |
| 02 | The programme: share, what earns commission, payout |
| 03 | Rules for every post: ASCI disclaimer, #ad label, placement by format, words to avoid, never-do list, SEBI-registered partners |
| 04 | Content library: launch posts, carousels, a Reel script, webinar invites, X thread, poster. Copy adds the label, disclaimer and Niyam's details; each post gets its own tracked link |
| 05 | Link builder: sub-ID and UTM links per channel and post, QR for offline events |
| 06 | Webinar series (7 modules) and host run-sheet |
| 07 | Printable rate card |
| 08 | Dashboard guide |
| 09 | FAQ for the partner and their audience |
| 10 | Support and service levels |
| 11 | Changelog |

The kit shows a **DRAFT** banner until `status` in `kit-content.js` is set to `'live'`; do that only
after compliance signs off. Hindi (Devanagari) templates wait for compliance to supply the Hindi
disclaimer (`disclaimer.hi` in `rates.js`).

Run `bash tools/check-kit.sh` before every push. It fails if the kit loads an internal file, if
an internal marker, competitor name or banned ad word (ASCI VDA guidelines) appears in kit
files, or if a script template lacks the disclaimer.

## Sections

| # | Section | Calculator |
|---|---|---|
| 00 | Rate card, 30-second pitch, 5 things to remember | — |
| 01 | Futures basics: spot, long/short, margin, leverage, notional, bps | Position builder |
| 02 | Maker vs taker | 6-question training quiz |
| 03 | Futures fees + GST | Futures fee calculator |
| 04 | Options fees: cap, delivery fee, seller liquidation | Options fee calculator |
| 05 | Funding | Funding calculator |
| 06 | Liquidation and the insurance fund | Liquidation charges |
| 07 | Deposits, withdrawals, KYC | — |
| 08 | Partner commission: what earns it, retail vs partner programme | Fee & commission split |
| 09 | Earnings (Partner Deck model, or build from activity) | Earnings projector |
| 10 | Deal desk: shares up to 75% vs Niyam margin *(internal)* | Share vs margin |
| 11 | Affiliate FAQ: 100 answers, searchable, by category | — |
| 12 | Meeting playbook, don't-say / say pairs | — |
| 13 | Kick-off & onboarding: lifecycle and SLAs, handover note, setup checklist, 45-min kick-off, 30/60/90 by partner type, templates *(internal)* | — |
| 14 | Engagement & health: funnel, health score, segments and cadence, QBR, re-activation plays, escalations, compliance ladder, offboarding, templates *(internal)* | — |
| 15 | Glossary A–Z | — |
| 16 | Open items to confirm *(internal)* | — |

Press `/` anywhere to search the FAQ, glossary and sections.

## Editing

No build step. It's plain HTML, CSS and JS; open `index.html` or serve the folder.

| To change… | Edit |
|---|---|
| A public rate, the standard share, SLAs, the disclaimer (playbook and kit) | `assets/js/rates.js` |
| Share ceiling, discount, minimum deposit, deck model, health-score weights, open items | `assets/js/config.js` |
| FAQ, glossary, don't-say pairs, kick-off templates (both languages) | `assets/js/content.js` |
| Anything on the Partner Kit | `assets/js/kit-content.js` (page layout in `partner-kit.html`) |
| Section text, calculator layout | `index.html` |
| Calculator maths | `assets/js/calculators.js` |
| Brand tokens, themes | `assets/css/styles.css` |

`rates.js` holds everything partners may see; `config.js` extends it with internal fields.
Unconfirmed values (trader discount, minimum deposit) stay in `config.js` until confirmed.
Rates in the page and in FAQ answers use
tokens such as `{futTaker}`, `{share}` or `<span data-r="gst">`, so a change there updates
every section, calculator and answer. Every FAQ entry has Hinglish fields (`q`, `a`, `more`)
and English twins (`q_en`, `a_en`, `more_en`). Mark anything unconfirmed with `tbc: true`,
and anything not for affiliate eyes with `internal: true`.

## Sources

- niyam.exchange/fee-structure, read 25 Sep 2026
- Niyam Partner Deck (Generic) and Partner One-Pager, Sep 2026
- Niyam Tax Education One-Pager v1.0, 17 Sep 2026
- Brand: Niyam Brand Guidelines (Electric Blue #00007B, Niyam Blue #2C4F96, Sky Blue #15B9F8; Inter / Satoshi / SF Mono)

## Compliance

Partner-facing rules (ASCI VDA disclaimer, influencer disclosure, CCPA endorsement rules, SEBI,
FIU-IND 2026 KYC guidelines, DPDP) and their sources are in
`docs/kickoff-engagement-partner-kit-plan.md`. The kick-off defaults adopted on 2 Oct 2026 are
listed in the open items and still need compliance and leadership sign-off.

Figures are illustrative, not guarantees. The playbook gives no investment or tax advice.
Tax questions are answered by sharing the tax one-pager as-is. Competitors are never named.
Any change to the footer disclaimer should go through compliance review.
