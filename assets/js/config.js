/*
 * Single source of truth for every rate on the playbook.
 * Change a number here and every section, calculator and FAQ answer updates.
 * All fee rates are % of notional unless noted. GST is charged on top.
 */
window.PB_CONFIG = {
  updated: '25 Sep 2026',
  sources: [
    'niyam.exchange/fee-structure (read 25 Sep 2026)',
    'Niyam Partner Deck (Generic), Sep 2026',
    'Niyam Partner One-Pager, Sep 2026',
    'Niyam Tax Education One-Pager v1.0, 17 Sep 2026'
  ],

  fut: { maker: 0.02, taker: 0.05 },
  opt: { maker: 0.0127, taker: 0.0169, cap: 5, delivery: 0.015, deliveryCap: 7, liq: 0.20 },
  gst: 18,

  share: 25,        // standard partner share, % of trading fees (Partner Deck)
  shareMax: 75,     // negotiable ceiling, needs approval
  disc: 10,         // trader discount on fees, % (TBC: site shows 10% and 30%)
  fx: 95,           // INR per USD, for volume in the deal desk

  minDep: 100,
  maxLev: 25,
  fiuReid: 'VA00045558',

  // Partner Deck model, per active trader per month (INR fee revenue, ex-GST)
  model: {
    m12: 3979, m1: 1640, conv: 10,
    futOrders: 306, futAvgFee: 10.9, futFees: 3348,
    optOrders: 23, optAvgFee: 61.7, optPart: 44, optFees: 632
  },

  // Anything the team must not state as final yet.
  openItems: [
    { k: 'Trader discount for partner-referred users', v: '/refer page says 10% off; homepage says 30% off for the first 2 months.' },
    { k: 'Commission basis', v: 'Calculator pays on gross fee (before trader discount, ex-GST). Confirm in the partnership letter.' },
    { k: 'Approval for shares above 25%', v: 'Who signs off, and at which levels up to 75%.' },
    { k: 'Public referral numbers', v: 'Site shows 20% (/refer, homepage card) and 30/40/50% (homepage FAQ). Partner programme is 25%.' },
    { k: 'Payout frequency', v: 'Public referral says daily; Partner Deck says reconciled and paid monthly.' },
    { k: 'Minimum deposit', v: 'Site says Rs 100 in one place and "No minimum deposit" in the footer.' },
    { k: 'Pair count', v: 'Site says 200+ pairs; Partner Deck says curated blue-chip assets.' },
    { k: 'Liquidation close fee', v: 'Does the taker fee on a liquidation close earn partner commission?' },
    { k: 'Insurance clearance rate', v: 'Varies by symbol; publish a per-symbol table for the team.' },
    { k: 'Tax on commission', v: 'TDS on partner payouts and partner GST invoicing are not yet documented for the team.' },
    { k: 'Options fee base', v: 'Playbook assumes options trading, delivery and seller-liquidation fees are charged on underlying notional. Confirm.' },
    { k: 'Commissionable options fees', v: 'Do the options delivery fee and seller liquidation fee earn partner commission?' },
    { k: 'USDT market mechanics', v: 'How USDT-market margin and settlement work when the wallet is INR only.' },
    { k: 'Margin modes', v: 'Cross, isolated, or both? The glossary defines both and says to confirm.' },
    { k: 'Payout terms', v: 'Payout date and method, minimum payout, carry-forward of small balances.' },
    { k: 'Partner programme rules', v: 'Already-registered users, two partners claiming one user, clawbacks (fraud / self-trading), exclusivity, exit terms, sub-partners, fixed-fee or minimum-guarantee requests.' },
    { k: 'Partner onboarding documents', v: 'What a partner submits to sign (PAN, GST, bank details, entity proof).' },
    { k: 'Product facts', v: 'API / algo access, sub-accounts, NRI eligibility, order-book depth data to share.' },
    { k: 'Safety of funds', v: 'Escrow bank, scope of the $1M insurance, client funds if the exchange shuts down; whether TDS applies to derivatives trades.' }
  ]
};
