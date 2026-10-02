/*
 * PUBLIC rates and facts. Loaded by both the internal playbook and the partner kit.
 * Never add internal items here (share ceiling, margins, open items, scripts).
 * Internal fields live in config.js, which extends this object.
 * All fee rates are % of notional unless noted. GST is charged on top.
 */
window.PB_RATES = {
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
  maxLev: 25,
  fiuReid: 'VA00045558',
  entity: 'Lightningnodes Technologies Pvt Ltd',

  // Partner-facing service levels (defaults adopted 2 Oct 2026, pending compliance sign-off)
  sla: {
    kickoffDays: 5,       // business days from signing to kick-off call
    recapHours: 24,       // kick-off recap sent within
    disputeAck: 24,       // hours to acknowledge a dispute
    disputeInvestigate: 48,
    disputeResolveDays: 5, // business days
    claimWindowDays: 30,  // days after a monthly statement to raise a claim
    contentReviewDays: 2, // business days for compliance to review co-branded content
    noticeDays: 30,       // notice before any commercial change
    cureDays: 5           // days to fix a minor compliance breach
  },

  // ASCI VDA guidelines (Feb 2022). Hindi text needs compliance translation; until then the
  // English text is used in every language.
  disclaimer: {
    en: 'Crypto products and NFTs are unregulated and can be highly risky. There may be no regulatory recourse for any loss from such transactions.',
    short: 'Crypto products and NFTs are unregulated and risky.',
    hi: null
  },
  disclosure: '#ad #NiyamPartner'
};
