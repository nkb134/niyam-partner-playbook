/*
 * Internal config. Extends the public rates in rates.js (load rates.js first).
 * Change a public rate in rates.js; change internal numbers and open items here.
 * Every section, calculator and FAQ answer reads from the merged object.
 * Never load this file from partner-kit.html.
 */
window.PB_CONFIG = Object.assign({}, window.PB_RATES, {
  shareMax: 75,     // negotiable ceiling, needs approval
  fx: 95,           // INR per USD, for volume in the deal desk
  disc: 10,         // trader discount on fees, % (TBC: site shows 10% and 30%); not in rates.js until confirmed
  minDep: 100,      // TBC: site says Rs 100 in one place and "No minimum deposit" in the footer

  // Partner Deck model, per active trader per month (INR fee revenue, ex-GST)
  model: {
    m12: 3979, m1: 1640, conv: 10,
    futOrders: 306, futAvgFee: 10.9, futFees: 3348,
    optOrders: 23, optAvgFee: 61.7, optPart: 44, optFees: 632
  },

  // Partner health score (internal). Weights add up to 100; bands are score thresholds.
  health: {
    green: 75, amber: 50,
    activationAlert: 30,   // % of new partners with a funded referral by day 30; alert below this
    activationTarget: 50,
    weights: [
      { k: 'New funded referrals vs plan', k_hi: 'Plan ke against naye funded referrals', w: 30, lead: false },
      { k: 'Monthly active traders, trend', k_hi: 'Monthly active traders ka trend', w: 15, lead: false },
      { k: 'Funnel quality (signup → KYC → first trade)', k_hi: 'Funnel quality (signup → KYC → first trade)', w: 15, lead: true },
      { k: 'Content activity (posts using kit links)', k_hi: 'Content activity (kit links wale posts)', w: 15, lead: true },
      { k: 'Webinars run vs plan', k_hi: 'Plan ke against webinars', w: 10, lead: true },
      { k: 'Relationship (check-ins, dashboard logins, replies)', k_hi: 'Relationship (check-ins, dashboard logins, replies)', w: 15, lead: true }
    ]
  },

  // Anything the team must not state as final yet.
  openItems: [
    { k: 'Kick-off and kit defaults (D1–D13)', v: 'Adopted 2 Oct 2026 as working defaults: SEBI-registered partners only after declaration + legal review + personal capacity; dashboard shows aggregates and masked IDs only; no partner paid ads or brand bidding without written approval; ASCI disclaimer on every asset; FIU wording "Registered with FIU-IND as a reporting entity"; monthly payout with daily accrual; tiers fast-up/slow-down with 3–5 months protection; 30 days notice, 5-day cure, clawback only for proven fraud; no private cashback; dispute SLA 24h / 48h / 5 days with a 30-day claim window; content review in 2 business days. All need compliance and leadership sign-off.' },
    { k: 'Hindi ASCI disclaimer', v: 'Compliance to supply the Hindi (Devanagari) and short-form wording. Until then the kit uses the English text in every language.' },
    { k: 'Referral link format', v: 'The kit link builder appends sub-ID and UTM parameters to the partner’s own link. Confirm the tracking system keeps these parameters and reports by sub-ID.' },
    { k: 'Dashboard data scope', v: 'Confirm with product that partners see counts, totals and masked user IDs only: no names, phone numbers, balances or P&L (DPDP).' },
    { k: 'SEBI-registered partners', v: 'Owner and turnaround for the legal review of APs / sub-brokers, IAs and RAs; whether a broker no-objection letter is required.' },
    { k: 'Tier ladder', v: 'Tier thresholds, review cadence and the new-partner protection period, if tiers above the standard share are offered.' },
    { k: 'Trader discount for partner-referred users', v: '/refer page says 10% off; homepage says 30% off for the first 2 months.' },
    { k: 'Commission basis', v: 'Calculator pays on gross fee (before trader discount, ex-GST). Confirm in the partnership letter.' },
    { k: 'Approval for shares above 25%', v: 'Who signs off, and at which levels up to 75%.' },
    { k: 'Public referral numbers', v: 'Site shows 20% (/refer, homepage card) and 30/40/50% (homepage FAQ). Partner programme is 25%.' },
    { k: 'Payout frequency', v: 'Public referral says daily; Partner Deck says reconciled and paid monthly.' },
    { k: 'Minimum deposit', v: 'Site says Rs 100 in one place and "No minimum deposit" in the footer.' },
    { k: 'Pair count', v: 'Site says 200+ pairs; Partner Deck says curated blue-chip assets.' },
    { k: 'Liquidation close fee', v: 'Does the taker fee on a liquidation close earn partner commission?' },
    { k: 'Insurance clearance rate', v: 'Varies by symbol; publish a per-symbol table for the team.' },
    { k: 'Tax on commission', v: 'Research (Oct 2026): TDS on commission is 2% above ₹20,000 a year under the Income-tax Act 2025 (s.393(1), formerly s.194H); GST 18% on commission, partner registers above ₹20 lakh turnover; perks above ₹20,000 a year attract perquisite TDS. Tax team to confirm, including the rate without PAN.' },
    { k: 'Options fee base', v: 'Playbook assumes options trading, delivery and seller-liquidation fees are charged on underlying notional. Confirm.' },
    { k: 'Commissionable options fees', v: 'Do the options delivery fee and seller liquidation fee earn partner commission?' },
    { k: 'USDT market mechanics', v: 'How USDT-market margin and settlement work when the wallet is INR only.' },
    { k: 'Margin modes', v: 'Cross, isolated, or both? The glossary defines both and says to confirm.' },
    { k: 'Payout terms', v: 'Payout date and method, minimum payout, carry-forward of small balances.' },
    { k: 'Partner programme rules', v: 'Already-registered users, two partners claiming one user, clawbacks (fraud / self-trading), exclusivity, exit terms, sub-partners, fixed-fee or minimum-guarantee requests.' },
    { k: 'Partner onboarding documents', v: 'Working list for the kick-off: PAN, GSTIN (if registered), bank details, entity proof, SEBI-registration declaration, signed compliance attestation. Finance and legal to confirm.' },
    { k: 'Product facts', v: 'API / algo access, sub-accounts, NRI eligibility, order-book depth data to share.' },
    { k: 'Safety of funds', v: 'Escrow bank, scope of the $1M insurance, client funds if the exchange shuts down; whether TDS applies to derivatives trades.' }
  ]
});
