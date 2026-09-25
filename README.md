# Niyam Partner Playbook

Internal guide for the Niyam partner team. It covers every fee, the terminology behind it,
how partner commission works, and ready answers to the questions affiliates ask in
in-person meetings. Live calculators are included. The guide is in Hinglish and English,
with a toggle in the top bar.

**Internal only.** It shows Niyam's margin at each commission share (deal desk), unconfirmed
items and internal scripts. Turn on **Meeting mode** before sharing your screen with an
affiliate. That hides internal notes, TBC badges, the deal desk and the open-items list.

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
| 13 | Glossary A–Z | — |
| 14 | Open items to confirm *(internal)* | — |

Press `/` anywhere to search the FAQ, glossary and sections.

## Editing

No build step. It's plain HTML, CSS and JS; open `index.html` or serve the folder.

| To change… | Edit |
|---|---|
| Any rate, share, discount, deck model number, open item | `assets/js/config.js` |
| FAQ, glossary, don't-say pairs (both languages) | `assets/js/content.js` |
| Section text, calculator layout | `index.html` |
| Calculator maths | `assets/js/calculators.js` |
| Brand tokens, themes | `assets/css/styles.css` |

`config.js` is the single source of truth. Rates in the page and in FAQ answers use
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

Figures are illustrative, not guarantees. The playbook gives no investment or tax advice.
Tax questions are answered by sharing the tax one-pager as-is. Competitors are never named.
Any change to the footer disclaimer should go through compliance review.
