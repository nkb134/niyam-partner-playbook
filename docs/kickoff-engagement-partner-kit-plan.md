# Partner kick-off, engagement and affiliate kit: research and plan

**Internal only.** Prepared 1 Oct 2026 for the Niyam partner team.

This is research and planning, not legal or tax advice. Every compliance point here needs sign-off from Niyam's compliance and tax teams before it goes into partner-facing material. Competitor names appear only in §2.2, for internal benchmarking; they must never reach partner-facing content (README rule).

**How the research was done:** desk research on 1 Oct 2026 across four tracks:
1. partner onboarding and engagement practice
2. crypto exchange and Indian broker partner programmes
3. Indian compliance
4. affiliate content kits

Some primary sites (ASCI, Google and Meta policy pages, binance.com) blocked automated reading, so some points rest on law-firm or news summaries. Source strength is marked throughout and summarised in the Appendix.

> **Status, 2 Oct 2026:** the suggested defaults for D1–D13 (§3) were adopted as working defaults,
> pending compliance and leadership sign-off. Phases 1 and 2 are built: playbook sections 13–14 and
> `partner-kit.html` (shown with a DRAFT banner until compliance signs off). One change from §6:
> instead of a shared `faq-public.js`, the kit has its own short written FAQ in `kit-content.js`.
> The playbook FAQ answers are written as spoken lines for the team, with coaching notes, so they
> don't suit a page partners keep and forward.

---

## 1. Summary

### Findings that change what we build

1. **Most partners never activate unless someone pushes them.** Rewardful's data covers 2,847 affiliate programmes [moderate]:
   - 7.6% of affiliates ever refer anyone.
   - 1.28% ever produce a sale.
   - About 10% of affiliates produce most of the revenue.

   Partners recruited by direct outreach (as ours are) activate at roughly 50–70% within 30 days [weak]. A partner who sends nothing in the first 30 days rarely recovers. **The first 7–30 days are the whole game.** The kick-off playbook should be built around one goal: the partner's **first funded referral**, meaning a referred user who completes KYC, deposits and makes a first trade.

2. **Our offer is mid-market, and the gaps are commission share and payout speed.**
   - **Share:** Our 25% lifetime share is well above Delta Exchange India's standard 10% for two months. It is well below what Mudrex (60%), CoinSwitch (75–100%) and CoinDCX (up to 50%) pay on futures.
   - **Payout speed:** Almost every crypto peer pays daily. We pay monthly.

   Kick-off and engagement must win on what peers don't do well:
   - dedicated partner success
   - webinars
   - a clear fee basis
   - fair terms
   - compliance done for the partner

3. **Compliance shapes every shareable asset.** Every piece of partner content is an ad under:
   - ASCI's guidelines for crypto (VDA, virtual digital asset) advertising
   - ASCI's influencer guidelines
   - the CCPA endorsement rules, with penalties up to ₹10 lakh (₹50 lakh for repeat offences) that also fall on the endorser

   So every template must carry:
   - the mandatory crypto disclaimer, placed as each medium requires
   - an #ad / #partnership label
   - no banned words ("currency", "securities", "custodian", "depositories")
   - no return claims

4. **SEBI-registered partners need a legal check before onboarding.** Our partner list includes sub-brokers. This covers SEBI-registered Authorised Persons (sub-brokers), investment advisers (IAs) and research analysts (RAs). There is risk to the partner from their own broker and from SEBI rules. Onboarding must ask about SEBI registration and send these partners to legal.

5. **Partners must never touch KYC or user funds.** FIU-IND's updated anti-money-laundering guidelines (8 Jan 2026) require liveness checks, geo-tagging and device ID at onboarding, designed so that no third party operates the account. Partners can show users how KYC works; they must never collect documents, take selfies, use their own devices for users, or handle money.

6. **The dashboard should show aggregate data by default.** India's data protection rules (DPDP Rules) phase in through May 2027 (possibly Nov 2026). Partners should see counts and totals, plus masked user IDs. They should not see names, phone numbers, balances or individual users' P&L.

7. **The affiliate kit must be a separate page with separate data.** Today `config.js` holds internal items (the 75% ceiling, open items), and `content.js` holds internal FAQ answers. Meeting mode only hides these with CSS, so anyone can read them in the page source. Sending an affiliate the playbook link, or building the kit on top of those files, would leak internal terms.

### Decisions needed from you before or while we build (detail in §3)
- Policy on SEBI-registered partners
- What the dashboard shows
- Payout cadence
- Fee basis
- Tier and new-partner protection policy
- Paid-ads policy
- "Fair terms" commitments
- Hindi disclaimer wording
- Approved wording for "FIU-registered"

---

## 2. Research findings

### 2.1 Onboarding, activation and engagement practice

| Finding | Number | Strength | Source |
|---|---|---|---|
| Affiliates who make ≥1 referral / ≥1 sale | 7.6% / 1.28% | Moderate (n = 2,847 programmes) | Rewardful, State of SaaS Affiliate Programs |
| Share of affiliates generating most revenue | ~10% | Moderate | Rewardful |
| Average affiliate commission | 24.16% (96% pay a percentage) | Moderate | Rewardful |
| 30-day activation: direct outreach vs open sign-up | 50–70% vs 15–25% | Weak (vendor) | Track360 |
| Activation level that signals an onboarding problem | under 30% at day 30 | Weak | Track360 |
| Revenue concentration | top 5% of partners → 40–60% of revenue; next 15–20% → 25–35% | Weak | Track360 |
| Time to ramp | 60–90 days with structured onboarding vs 6–12 months without | Weak, untraceable | Magentrix / Introw |
| Effect of an early first deal | partners with a first deal inside 90 days are 3–4× more likely to be active at one year | Weak, untraceable; use for direction only | Introw citing Unifyr |
| High- vs low-maturity programmes | High-maturity programmes have 2–3× more automation and set joint objectives and metrics | Moderate (commissioned survey, n=400+) | Forrester for impact.com |

**Practices that recur across sources:**

- **Handover note from sales.** Several sources say the most common failure is verbal promises that never get written down. The note captures:
  - relationship map
  - why they signed
  - every promise made
  - targets
  - open questions
  - risks
- **Kick-off within the first week**, focused on *the partner's* business. Its output is a **mutual success plan**: joint goals, owners, dates and an action tracker that is reviewed at every QBR (quarterly business review). Onboarding should start automatically at signature, because a gap between signing and first activity loses momentum that is hard to recover.
- **30/60/90 phases:**
  - access and orientation, days 0–7
  - training and first content, days 8–30
  - first campaign and first referrals, days 31–60
  - review and first QBR, days 61–90
- **Nudges triggered by behaviour** (Tapfiliate):
  - ready-to-post content if the link is unused at day 5–7
  - congratulations on the first referral
  - growth nudges
  - a win-back after 30–90 days of inactivity
- **Health score.** Use 6–8 weighted inputs and a green/amber/red band (healthy 75–100, attention 50–74, at risk under 50). Engagement drops before revenue does, so watch the leading signals.
- **Segment the partner base and staff to match:**
  - top 5–10%: dedicated time and a monthly review
  - the "core" middle band: best return on retention effort
  - the long tail: automated nurture and group office hours
- **QBR:** 75–90 minutes, a one-page dashboard, and the first 10 minutes spent on last quarter's action items. A partner who refuses QBRs is disengaging.
- **Tiers that promote quickly and demote slowly.** Evaluate on a rolling window, promote quickly, and demote only after two quarters below target. OKX protects new partners' rates for 5 months and demotes only after 3 months below target. Non-cash benefits (featured webinars, an advisory council, badges) often change behaviour more per rupee than commission does.
- **Dispute handling** (Track360):
  - acknowledge within 24 hours
  - investigate within 48 hours
  - reply with evidence within 5 business days
  - update every 48 hours until closed
  - escalate based on the value at stake

  Unresolved disputes spill into the partner's Telegram or YouTube community.

### 2.2 Market benchmark (internal only, never shown to partners)

| Programme | Share | Duration | Payout | Notable |
|---|---|---|---|---|
| **Niyam** | 25% (to 75% with approval) | Lifetime | Monthly; dashboard daily | Webinars, RM pod, partner success manager |
| Delta Exchange India | 10% of net fee; no commission on maker trades | **2 months** | Daily, INR, ₹1,000 minimum, 2% TDS | Ban on brand-keyword ads with clawback; can change terms retrospectively; can end the agreement at any time |
| CoinSwitch | Futures 75–100% by volume tier; options 80% | — | Daily | Sub-affiliates; ₹500 bonus per user |
| Mudrex | Futures 60%, spot 40% | Lifetime | Daily or monthly (its pages conflict) | Deposit bonuses; openly targets stock sub-brokers and Telegram admins |
| CoinDCX | 20% futures, up to 50% | Lifetime | Daily | Key account manager, events, travel, creator mentorship |
| Bybit / OKX / Bitget (global) | 30–50% | Lifetime | Daily | Sub-affiliate overrides; partner sets the user cashback; academies, competitions |
| 5paisa / Upstox / Angel One (broker analogues) | 30–60%+ | Lifetime | Monthly | Lead CRM with status per user; team helps referred clients open accounts; training and seminars |

**Patterns worth acting on:**
- **What commission is calculated on is a hidden lever.** Peers pay on *net* fee: after discounts or rebates, sometimes excluding maker trades or trades paid with vouchers. Our calculator assumes *gross* fee (an open item). If confirmed, that is a real selling point.
- **Fair terms set us apart.** Indian peers reserve retrospective changes and termination at any time. Zerodha's abrupt shutdown of its referral programme (after the NSE circular of Aug 2024) badly hurt partner trust. OKX's terms for creators (it calls them KOLs) are the fairest model:
  - 30 days' notice
  - a 5-day cure period
  - clawback only for fraud, with 30 days to dispute
  - 3 days' notice of any rate change
- **Peers support partners well beyond the link:**
  - academies (Bitget)
  - competitions for referred users (Bybit, BingX)
  - events and travel (CoinDCX)
  - lead CRM and onboarding help for referred users (5paisa, Upstox)
- **Private cashback deals.** Binance demotes partners who privately pay kickbacks to users. We need a rule on this.

### 2.3 Compliance rules that shape the kit and the kick-off

| Rule | What it requires | Effect on our kit and process | Status |
|---|---|---|---|
| **ASCI guidelines for crypto (VDA) ads** (in force from 1 Apr 2022) | Mandatory disclaimer: *"Crypto products and NFTs are unregulated and can be highly risky. There may be no regulatory recourse for any loss from such transactions."* It must be in the ad's dominant language. Placement by medium (rows below). | Disclaimer built into every template, in English and Hindi. A disclaimer card in the kit showing each format. | Verified via Khaitan, ELP and The Quint; short-form wording to confirm |
| ↳ Static images | At least 1/5 of the space, at the bottom | Static templates reserve that space | Verified |
| ↳ Video | At the end, with a voiceover at normal pace, for at least 5 seconds; repeated at the start if the video is over 2 minutes | A 5-second end card and voiceover script | Verified |
| ↳ Social posts | At the very start of the caption **and** in the image or video itself | Caption templates open with it | Verified |
| ↳ Stories of 15 seconds or less | An overlay is allowed | Story templates carry the overlay | Verified |
| ↳ Audio over 90 seconds | At the start and the end | Webinar run-sheet: disclaimer at the start and the end | Verified |
| ↳ Content rules | Never say "currency", "securities", "custodian", "depositories". No past returns over periods under 12 months and no selective returns. No promise of profit. No downplaying risk. No comparison with regulated assets. No minors. Must not present crypto as a fix for money or personal problems. Advertiser name and contact must appear. | Banned-word list. No P&L screenshots. Use "INR-settled", not "INR currency". No comparisons with F&O, FDs or stocks. Institutes must not target students under 18. Co-branded assets show "Niyam (Lightningnodes Technologies Pvt Ltd)" and a contact. | Verified |
| **ASCI influencer guidelines** (2021; financial-influencer rules added in 2023) | Label (#ad, #collab, #partnership and others) upfront, not hidden behind "see more" or among hashtags. Superimposed on visuals; on videos of 15 seconds or less, for at least 2–3 seconds (sources differ); on videos up to 2 minutes, for one-third of the length. People giving investment advice must be SEBI-registered and say so. | Every partner post carries a label plus the platform's "Paid partnership" tool. No trade calls framed as Niyam content. | Verified |
| **CCPA rules** (2022 misleading-ads guidelines; 2023 "Endorsement Know-hows") | Disclose every material connection, including commission. On video, in both audio and visual. On livestreams, continuously. Endorser must have used the product. Penalties up to ₹10 lakh, ₹50 lakh for repeat offences, and endorsement bans of 1–3 years. | Partner signs an attestation. Webinars and lives show a continuous label. Partner must use Niyam before promoting it. Niyam keeps records of what it approved. | Verified |
| **SEBI** (association ban of Aug 2024 and Oct 2024; Jan 2025 price-data rule; investment-adviser bar on crypto since 2021; NSE rule since Aug 2024 that referrers must be Authorised Persons; NSE rules of Jun 2026 on what else brokers may do) | Rules on regulated entities associating with unregistered advisers apply to *securities*. IAs may not advise on crypto except through a separate entity. Brokers may not offer unregulated third-party products. | The partner application asks for SEBI status (AP, IA, RA or broker) and the principal broker. Such partners promote only in a personal or separate-entity capacity: no SEBI number, no broker branding, no broker client lists. Recommend they get a written no-objection from their broker. No stock tips and Niyam promotion in the same channel. **Legal review for each case.** | Rules verified; how they apply to our partners needs legal |
| **FIU-IND anti-money-laundering guidelines for crypto providers** (8 Jan 2026) | PAN, a liveness selfie, geo-tag, IP, device ID, penny-drop bank check, OTPs. No tipping-off about suspicious-transaction reports. Records kept for 5 years. | Partners never collect documents or selfies for users, use their own devices for users, open accounts for users, or handle funds. No "no-KYC" or "easy approval" promises. We never tell a partner why an account was frozen or rejected. | Verified; third-party clauses to read in the source PDF |
| **DPDP Act 2023 and Rules** (notified Nov 2025; main duties from about May 2027, possibly Nov 2026) | Consent, purpose limitation, security | Dashboard defaults to aggregate counts and masked IDs. Contract bars partners from scraping or contacting users with Niyam data. | Verified; final deadline to confirm |
| **Tax on commission** (Income-tax Act 2025, in force 1 Apr 2026) | TDS on commission at 2% (old s.194H, now s.393(1)) above ₹20,000 a year. Perks above ₹20,000 a year attract 10% TDS. GST at 18% on commission; partners register above ₹20 lakh turnover. | Onboarding collects PAN, GSTIN, bank details and entity type. The monthly statement shows the TDS and GST lines. Perks such as trips and merchandise are tracked against the threshold. | Verified; confirm rate without PAN and section mapping |
| **Tax for users** | The 30% tax and 1% TDS on crypto transfers (old ss.115BBH and 194S) may not apply the same way to crypto futures and options; CAs disagree. | Partners give no tax advice. Share the tax one-pager as-is and point users to a CA. | Verified as unsettled |
| **Ad platforms** | Google requires country certification for crypto ads, reportedly including FIU registration and the ASCI disclaimer. Meta requires a licence from an accepted list. | **Partners may not run paid ads or bid on Niyam's brand name without written approval.** Organic posts only. | Needs confirmation |
| **Approved wording** | FIU registration is registration as an anti-money-laundering reporting entity, not a licence. RBI's stance has hardened again (Jul 2026, secondary source). | Approved claim: "Registered with FIU-IND as a reporting entity (REID VA00045558)". Banned claims: "licensed", "regulated", "government-approved", "RBI/SEBI approved", "legal tender". | Needs legal |

**Checked against the current playbook.** The FIU FAQ already words this honestly ("not a SEBI licence"), and the don't-say list covers "safe" and tax claims. Gaps:
- There is no FAQ or don't-say entry for the ASCI disclaimer, #ad labels, SEBI-registered partners, KYC hand-offs, or the banned words "currency" / "securities" / "licensed".
- The dashboard FAQ ("signups, KYC completions, first trades…") should say these are aggregates.

### 2.4 Affiliate content kits

- **A Day-1 welcome kit should take about 15 minutes to read** (UpPromote, vendor). Contents:
  - brand voice and visual guide, including approved and banned claims
  - image pack
  - captions for each platform with the disclosure built in
  - a one-page disclosure guide
  - a screenshot guide to finding the link

  Add in week one: content angles, product FAQ, and an earnings guide that states its assumptions. Review quarterly and show "Last updated" on the cover.
- **Many partners drop out because they don't know how to start, not because the commission is low.** This is a vendor claim, but it matches the activation numbers in §2.1.
- **HubSpot's partner marketing hub is the best public model** for co-brandable campaign kits and an embeddable calculator. Wise and Zerodha ban paid ads and brand bidding, and ask partners for educational content.
- **Formats:**
  - Instagram carousels get the most engagement per post, and Reels the most reach for accounts under 50K followers. This is global data.
  - Over 60% of consumers in Tier 2 and 3 towns are influenced by creators (BCG 2025).
  - No hard data exists on Hinglish trading content; our choice of it is a judgement call.
- **WhatsApp:**
  - Users must opt in, the opt-in must name the business, and opt-out must be easy.
  - Since Feb 2024 Meta has capped marketing templates per Indian user.
  - So reach comes from partners' own WhatsApp Channels and groups, not from Business API blasts.
  - Ban trade calls and signals in partner groups; SEBI has raided pump-and-dump groups run on Telegram and WhatsApp.
- **Webinars:**
  - B2B benchmark: about 60% of registrants attend (ON24 2025, secondary source).
  - About 29% register on the day of the webinar.
  - Promote from 2 weeks out. Send reminders at T-1 week, T-1 day, on the morning, and at T-15 minutes, through WhatsApp and Telegram in India.
- **Delivery:** one static page as the single source of truth, with:
  - a copy button on every item
  - a language toggle
  - version number and changelog
  - withdrawn assets marked visibly
  - rates pulled from one config value

  Heavy files (videos, PSDs) live in a linked Drive folder.
- **Tracking:**
  - Link pattern: `?ref={partner}&sub={asset}&utm_source={partner}&utm_medium={yt|ig|tg|wa|x|qr}&utm_campaign={campaign}&utm_content={asset-variant-lang}`, all in lowercase with hyphens.
  - A dynamic QR code per offline event, tagged `utm_source=qr`.
  - Judge each asset by sign-up → KYC → first trade → active at 30 days, not by clicks.

---

## 3. Decisions needed

These sit alongside the existing `openItems` in `config.js`. ★ marks items that block the kit or the kick-off.

| # | Decision | Why it matters | Suggested default |
|---|---|---|---|
| D1 ★ | **SEBI-registered partners** (APs, IAs, RAs, brokers): accept, accept with conditions, or decline? | Our partner list includes sub-brokers; there is regulatory risk to them and reputational risk to us | Accept only after a declaration, a legal review, and promotion in a personal or separate-entity capacity |
| D2 ★ | **What the partner dashboard shows** | DPDP rules; also the FIU tipping-off rule | Aggregate counts and fees, plus masked IDs with funnel status for each user. No PII, balances or P&L. |
| D3 ★ | **Paid ads and brand bidding by partners** | Google and Meta crypto rules; brand protection | Banned without written approval |
| D4 ★ | **Exact ASCI disclaimer text in English and Hindi, plus short form** | Must appear in every asset | English text as quoted in §2.3; legal translates the Hindi |
| D5 ★ | **Approved "FIU" wording and the approved-claims list** | Partners will paraphrase whatever they hear | "Registered with FIU-IND as a reporting entity (REID …)" |
| D6 | **Payout cadence**: monthly vs daily at peers | Competitive gap | Keep monthly with daily accrual visible on the dashboard; consider weekly payout above a threshold |
| D7 | **Fee basis**: gross vs net of discount (already an open item) | Selling point if gross | Confirm gross; publish what is excluded |
| D8 | **Tier ladder and new-partner protection** | Retention and fairness; we compete with 50–100% offers | Fast up, slow down; reviewed quarterly; 3–5 months of rate protection |
| D9 | **Fair-terms charter**: notice period, cure period, clawback only for fraud | Differentiator; builds trust | 30 days' notice, 5-day cure period, clawback only for proven fraud with a 30-day dispute window |
| D10 | **Private cashback from partners to users** | Abuse risk; Binance penalises it | Not allowed unless run through an official Niyam campaign |
| D11 | **Dispute SLA and attribution claim window** | Goes in the letter and the kit | Acknowledge in 24h, investigate in 48h, resolve in 5 business days; claims within 30 days of a statement |
| D12 | **Sub-partners** (already an open item) | Peers offer overrides | Defer; the kit gets a section only if approved |
| D13 | **Who owns the kit and approvals** (content review turnaround) | Partners need fast turnaround | Partner success owns the kit; compliance approves within 2 business days |

---

## 4. Content of the kick-off and engagement playbook (internal)

### 4.1 Lifecycle and service levels

| Stage | When | Owner | Done when |
|---|---|---|---|
| Handover | Day 0, at signing | Sales → partner success | Handover note complete. **The kick-off cannot be booked without it.** |
| Setup and compliance | Days 0–2 | Partner success | Code and tracked links live (same day, per FAQ); dashboard access; documents collected (PAN, GSTIN, bank, entity, SEBI declaration); compliance briefing done and attestation signed |
| Kick-off | Within 5 business days of signing | Partner success (with sales owner and RM pod lead) | Mutual success plan sent within 24h |
| Activation check | Day 7 | Partner success | First post or broadcast live; test sign-up seen on the dashboard |
| First webinar | By day 21 | Partner success + education | Webinar #1 delivered |
| Day-30 review | Day 30 | Partner success | First funded referral reached, or partner marked amber with a recovery plan |
| Day-60 | Day 60 | Partner success | Second campaign run; active traders tracking against plan |
| First QBR | Day 90 | Partner success + lead | Tier reviewed; plan for next quarter |
| Ongoing | Monthly / quarterly | Partner success | See 4.6 |
| Re-activation | 30 / 60 / 90 days without a new funded referral | Partner success | See 4.7 |
| Offboarding | On exit | Partner success + legal + finance | See 4.10 |

### 4.2 Handover note (fields)

- **Partner:** type (institute, sub-broker, creator, community) and legal entity.
- **People:** decision-maker, day-to-day operator, content lead.
- **Audience:** size by channel (YouTube, Instagram, Telegram, WhatsApp, offline batches), languages, experience level, what they trade today.
- **Deal:**
  - why they signed
  - exchanges they currently work with
  - agreed share and approval reference
  - trader discount
- **Every promise made by sales:** webinar dates, RM pod scope, landing page, events.
- **Targets for months 1–3:** funded referrals and active traders.
- **Compliance:**
  - SEBI status
  - red flags from their past content (return claims, tips)
  - audience under 18 (institutes)
- **Open questions** from the meeting, each with an owner.

### 4.3 Kick-off call (45 minutes)

| Minutes | Block | Content |
|---|---|---|
| 0–5 | Introductions and roles | Partner success manager, RM pod lead, escalation contact; the partner's point person |
| 5–12 | Their goals | Success at 30, 90 and 180 days, measured in **funded referrals and active traders**, not sign-ups |
| 12–20 | Programme recap | What earns commission and what doesn't (playbook §08); lifetime attribution; statement and payout cycle; TDS/GST lines; dispute window |
| 20–28 | Compliance briefing | Disclaimer, #ad, banned words, no calls or tips, no KYC hand-offs, no paid ads, approval flow. Partner signs the attestation. |
| 28–36 | Live setup | Tracked links with sub-IDs per channel; test sign-up; dashboard tour |
| 36–42 | 30-day launch plan | Announcement date, date of webinar #1, first three content pieces from the kit |
| 42–45 | Cadence and next steps | Weekly 15-minute check-ins for 90 days; partner Telegram group; recap within 24h |

**Mutual success plan (one page):**
- goals
- 30/60/90 targets
- audience segments
- planned content and webinars, with dates
- owners on both sides
- action tracker
- review dates

### 4.4 The 30/60/90 plan by partner type

| | Days 0–30 | Days 31–60 | Days 61–90 |
|---|---|---|---|
| **Institute / educator** | Add a module to a batch; webinar #1 (basics and risk); help desk on how KYC works (no documents handled) | Webinar #2 (margin, leverage, liquidation); batch Q&A | Advanced session; first QBR |
| **Creator** | Launch video or short + carousel series; live Q&A with the label shown | Explainer series (fees, funding); co-branded live | Review which content performed; next quarter's calendar |
| **Sub-broker** (after legal clearance) | Personal-capacity outreach to opted-in contacts; one-to-one walkthroughs | Small-group webinar | QBR |
| **Community** (Telegram/WhatsApp) | Pinned welcome and education posts; AMA (ask-me-anything) with Niyam | Weekly education post; webinar | Community event; QBR |

### 4.5 Metrics and health score

**Funnel**, using one set of definitions everywhere:
> clicks → sign-ups → KYC complete → first deposit → first trade (**funded referral**) → monthly active trader (≥1 trade in the month, as already defined in the FAQ) → fees → commission

**North-star metrics:**
- days from signing to first funded referral
- share of partners activated by day 30, with an alert below 30% and a target of 50% or more

**Health score** (0–100), recomputed weekly from the dashboard:

| Component | Weight | Signal |
|---|---|---|
| New funded referrals vs plan | 30 | Lagging |
| Trend in monthly active traders | 15 | Lagging |
| Funnel quality (sign-up → KYC → first trade rates) | 15 | Leading |
| Content activity (posts and broadcasts using kit links) | 15 | Leading |
| Webinars run vs plan | 10 | Leading |
| Relationship (check-ins attended, dashboard logins, response time) | 15 | Leading |

- **Green** 75–100, **amber** 50–74, **red** under 50.
- **Compliance override:** any unresolved breach → red, whatever the score.
- Alert the partner success manager when the band changes.
- Recalibrate the weights once a year.

### 4.6 Segments and cadence

| Segment | Who | Cadence |
|---|---|---|
| New | First 90 days | Weekly 15-minute check-in; day-30 and day-60 reviews; QBR at day 90 |
| Top | Top ~10% by fees | Monthly business review, QBR, RM pod time, early access, featured webinars |
| Core | The middle band | Fortnightly then monthly check-in; QBR |
| Long tail | Everyone else | Automated nurture, weekly group office hours, monthly newsletter |
| All | — | Monthly statement that reconciles to the dashboard; monthly newsletter by partner type; partner Telegram group; at least 30 days' notice of commercial changes (D9) |

**QBR (75 minutes):**
1. Last quarter's action items (10)
2. Results against plan (15)
3. Funnel and content (15)
4. Next quarter's campaigns and webinars (15)
5. Issues and escalations (10)
6. Actions (10)

Use a one-page dashboard.

### 4.7 Re-activation plays

| Trigger | Play |
|---|---|
| No link clicks by day 7 | Personal call plus a ready-to-post pack in Hindi and English for their main channel |
| No funded referral by day 30 | Amber; recovery plan; offer a webinar or AMA date |
| Sign-ups but KYC stuck | Session showing how KYC works; the RM pod follows up with users directly (partner never handles documents) |
| KYC done but no trades | Beginner webinar (fees, maker/taker, risk) |
| 30 / 60 / 90 days without a new funded referral | A fresh angle each time: product launch, a volatility explainer pack (education, not calls), time-boxed campaign |
| Engagement dropped | Escalate to lead; offer a QBR |

### 4.8 Escalations and SLAs

| Issue | First owner | SLA |
|---|---|---|
| Referred-user support issue | RM pod | Per support SLA |
| Attribution dispute ("my student isn't showing") | Partner success → ops | Acknowledge 24h, investigate 48h, resolve 5 business days; claims within 30 days of the statement |
| Payout or statement dispute | Partner success → finance | Same as above |
| Content approval | Compliance | 2 business days (D13) |
| Compliance breach | Partner success → compliance | Same day |
| High-value or public complaint | Head of partnerships + legal | Same day |

### 4.9 Compliance monitoring

- **Monthly sample audit** of partner posts.
- **Breach ladder:**
  1. minor: missing label → fix within 5 days
  2. repeat → written warning
  3. serious (return promises, impersonation, KYC hand-offs, signal groups) → immediate suspension and legal review
- **Record-keeping:** approvals logged and attestations stored.

### 4.10 Offboarding

- Notice period and cure period per the letter (D9).
- Treatment of lifetime commission after exit, for cause versus without cause (already an open item).
- Final statement.
- Revoke dashboard and group access.
- Withdraw co-branded assets.
- Partner confirms they hold no Niyam user data.

### 4.11 Templates the playbook ships

1. Handover note
2. Kick-off invite
3. Kick-off agenda
4. Mutual success plan
5. Recap email
6. Day-7 nudge
7. Day-30 review
8. Monthly statement explainer
9. QBR one-pager
10. Re-activation messages (×3)
11. Breach warning
12. Offboarding letter

All in Hinglish and English.

---

## 5. What goes in the partner kit (shareable)

### Rules for every audience-facing item

- **Disclaimer:** the ASCI disclaimer is built in, placed for its medium, in the template's language.
- **Disclosure label:** #ad / #partnership plus the platform's paid-partnership tool, with continuous disclosure on lives.
- **Advertiser identity:** advertiser name and contact on co-branded assets.
- **Claims:** no banned words, no return or P&L claims, no comparisons with F&O, stocks or FDs, no tax advice.
- **Commission:** the partner's commission is never shown in audience material. It is disclosed as a relationship through the label.

### A. For the partner

| # | Item | Format | Owner | Refresh |
|---|---|---|---|---|
| A1 | Welcome and "start in 15 minutes" checklist, plus a 3-minute video | Kit page + Loom | Partner success | Quarterly |
| A2 | Programme one-pager: share, what earns, attribution, statement and payout, TDS/GST worked example, dispute window | Kit page + PDF (rates from config) | Partner success + finance | On any change |
| A3 | Partner FAQ: the non-internal, non-TBC subset of the playbook FAQ | Kit page | Partner success | Monthly |
| A4 | **Compliance card:** disclaimer by medium, labels, banned words, approved claims, no calls or tips, no KYC hand-offs, no paid ads, SEBI-registered partner rules | Kit page + 1-page PDF | Compliance | Quarterly and on rule changes |
| A5 | Brand guide: logos (light and dark), colours, co-brand lock-ups, permitted uses | PDF + zip | Brand | Twice a year |
| A6 | Link builder: channel/asset sub-IDs, UTM convention, QR for events, screenshot guide | Kit page tool | Growth | When tracking changes |
| A7 | Dashboard guide: what each number means, what you won't see and why (DPDP) | Kit page + video | Partner success | When the product changes |
| A8 | Webinar host kit: run-sheet (disclaimer at start and end, continuous label, no calls, Q&A guardrails), slide master, reminder schedule | Slides + doc | Partner success + compliance | Each series |
| A9 | Monthly content calendar and hooks (launches, Budget, Diwali learning month, financial-year end, volatility explainers) | Kit page | Content | Monthly |
| A10 | Support map: partner success manager, RM pod, escalation SLAs, partner Telegram | Kit page | Partner success | On change |
| A11 | Changelog and withdrawn assets | Kit page | Partner success | Every update |

### B. For the partner's audience (Hinglish / English / Hindi)

| # | Item | Format | Refresh |
|---|---|---|---|
| B1 | Launch announcements: WhatsApp Channel, Telegram, Instagram, YouTube community, email | Copy-button text | Quarterly |
| B2 | "How to join in 5 steps": code → KYC on the user's own phone → free INR deposit → first trade → support | Text + carousel | On product change |
| B3 | Trader rate card (fees, GST, free deposits and withdrawals; **no partner share**) | Image + PDF, generated from rates | On any rate change |
| B4 | Explainer series: notional vs margin, maker vs taker, round-trip cost, funding, liquidation, options basics (reuses playbook examples) | Carousels + 30-second Reel/Short scripts with a 5-second end card | Monthly additions |
| B5 | Webinar series (7 modules): basics and risk → derivatives and perpetuals → margin, leverage, liquidation → fees and funding → position sizing and risk management → platform walkthrough → options | Slides + co-branded registration page + replay | Each series (quarterly) |
| B6 | Webinar invites and reminders (T-2 weeks, T-1 week, T-1 day, morning, T-15 minutes) | Copy-button text | Each series |
| B7 | Audience FAQ: KYC, deposits, withdrawals, fees, safety claims as approved, "talk to a CA" on tax | Kit page + PDF | Monthly |
| B8 | Tax one-pager (as-is) | PDF | On change |
| B9 | Offline poster and standee with QR | PDF | Per event |

### Never in the kit

- Deal desk or Niyam margins
- The 75% ceiling, tier internals, other partners' terms
- Internal scripts, TBC numbers, open items
- Competitor names
- Return or earnings promises to users
- Coin tips
- Tax-saving claims
- "Licensed", "regulated", "approved", "safe" claims

---

## 6. How we build it in this repo

### Architectural constraint (must fix first)

The internal playbook loads `config.js` (which contains `shareMax`, `openItems`, internal notes) and `content.js` (internal FAQ answers). Meeting mode only hides these with CSS. **The partner kit must never load either file.**

Split the data:
- `assets/js/rates.js`: **public** rates only (fees, GST, share, discount, min deposit, leverage, REID, updated date, sources). Both pages load it.
- `assets/js/config.js`: keeps the internal fields and extends `rates.js`. Only the playbook loads it.
- `assets/js/kit-content.js`: partner-safe content only (kit text, templates, audience FAQ, compliance card).

Partner FAQ entries move to a shared, partner-safe file (`assets/js/faq-public.js`), so each answer lives in one place:
- The playbook loads `faq-public.js` and then `content.js`, which adds internal and TBC entries.
- The kit loads only `faq-public.js`.

No build step, consistent with the README.

### Phase 0: decisions and sign-off (you and compliance; no code)
- Resolve D1–D5 (blockers) and as many of D6–D13 as possible.
- Compliance supplies the Hindi disclaimer and approves the claims list.

### Phase 1: internal playbook additions (≈ 2–3 days)
1. **New section 15 "Kick-off & onboarding"**, internal: lifecycle table (4.1), handover fields (4.2), kick-off agenda with a "say" box (4.3), 30/60/90 by type (4.4), templates (4.11), each with a copy button.
2. **New section 16 "Engagement & health"**, internal: funnel, health score and bands (4.5), segments and cadence, QBR (4.6), re-activation plays (4.7), SLAs (4.8), compliance ladder (4.9), offboarding (4.10). The health-score weights and SLA numbers live in `config.js` so they can be tuned.
3. **New FAQ category "Compliance for partners"** (Hinglish and English), covering:
   - the ASCI disclaimer and where it goes
   - #ad labels
   - "Can I run Google/Meta ads?"
   - "I'm a sub-broker/AP — can I partner?"
   - "Can I help my students with KYC?"
   - "What will I see about my users?"
   - "Is TDS deducted from my commission?" (TBC until tax confirms)
4. **Don't-say additions:** "currency" → "INR-settled"; "licensed/regulated" → the approved FIU wording; "I'll do your KYC" → "the app guides you, RM pod helps"; "share your P&L screenshot" → education framing.
5. **New open items in `config.js`:** D1–D13 that are still unresolved.
6. Add the new sections to the table of contents, search index and README section table.
7. **Wording check** of existing content against the banned list. A quick pass found nothing that breaks the rules, but the dashboard FAQ should say "aggregate".

### Phase 2: partner kit page `partner-kit.html` (≈ 4–5 days)
1. Data split as above (`rates.js`, `faq-public.js`, `kit-content.js`). Regression-check the playbook after the split.
2. **Page sections:**
   - Start here (A1)
   - Programme (A2)
   - Compliance card (A4)
   - Link builder (A6)
   - Dashboard guide (A7)
   - Content library (B1–B4, B6)
   - Webinars (A8, B5)
   - FAQ (A3, B7)
   - Downloads (A5, B3, B8, B9 → Drive)
   - Support (A10)
   - Changelog (A11)
3. **Content library:**
   - each item has a channel tag, a language toggle (Hinglish / English / Hindi) and a copy button
   - the **disclaimer and #ad label are added on copy** and can't be switched off
   - "last reviewed" date on each item
   - withdrawn items are shown struck through
4. **Link builder:**
   - inputs: partner code, channel, asset, campaign
   - outputs: tracked URL, plus a QR image generated in the browser (a small QR library from cdnjs)
5. **Rate card generator** reads `rates.js` and prints to PDF.
6. Same brand tokens, themes and bilingual toggle as the playbook. No Meeting mode needed, since nothing internal is loaded. Footer with the ASCI disclaimer and advertiser identity.
7. **Guard script** `tools/check-kit.sh`: fails if `partner-kit.html` references `config.js` or `content.js`, or if banned words appear in kit content. Run it before every push.

### Phase 3: assets and operations (no code; owners outside this repo)
- **Design:**
  - Canva/Figma templates for carousels, story overlays, the 5-second end card
  - static posts with a 1/5 disclaimer band
  - posters with QR
- **Education:** webinar slide master and 7-module deck.
- **Product and data:**
  - dashboard fields for the health score (funnel by sub-ID, content-link clicks, logins)
  - masked user IDs
  - a monthly statement that reconciles (gross fees, exclusions, share, TDS, GST)
- **Ops:** CRM fields for the handover note and health band; partner Telegram group; monthly audit routine.

### Verification
- Open both pages in Chromium (Playwright): Hinglish and English, light and dark, phone width. On the playbook, Meeting mode on and off.
- Check that the kit page source contains none of: `shareMax`, `openItems`, `internal:`, "deal desk", competitor names.
- Run `tools/check-kit.sh`.
- Compliance reviews the kit page before the first partner gets the link.

### Rough timeline
| Week | Work |
|---|---|
| 1 | Phase 0 decisions; Phase 1 built |
| 2 | Phase 2 built; compliance review |
| 3 | Fixes; first 2–3 partners piloted on the new kick-off; asset production continues |
| 4+ | Monthly refresh cycle; first health-score review |

---

## Appendix: main sources

**Onboarding and engagement:**
- [weak] Magentrix, Introw, Kiflo, PartnerPack, Tapfiliate, Unifyr, Track360, AskElephant, RevPartners
- [moderate] rewardful.com/articles/state-of-saas-affiliate-programs-report
- [moderate] impact.com Forrester study
- [strong; rule document] okx.com/help/okx-affiliate-program-rules

**Peer programmes (read 1 Oct 2026):**
- delta.exchange/referral-program and /affiliate-agreement
- coinswitch.co/affiliate
- mudrex.com/partner-program
- coindcx.com/affiliate
- zebpay.com/in/affiliate-program
- bybit.com help centre
- bitget.com academy
- kucoin.com/affiliate
- 5paisa.com/partner
- upstox.com/become-sub-broker
- angelone.in/authorised-person
- zerodha.com/z-connect (NSE referral circular)
- Binance figures from search summaries only (unverified)

**Compliance:**
- **ASCI crypto (VDA) rules:** Khaitan & Co, ELP, The Quint
- **ASCI influencer rules:** Khaitan, Legal500, MediaNama
- **CCPA:** SCC Online, Business Today, PIB release consumeraffairs.nic.in/sites/default/files/PIB1897389.pdf
- **SEBI:** Nishith Desai, Outlook Business, Storyboard18, finseclaw.com (NSE, Jun 2026), Business Today
- **FIU-IND:** fiuindia.gov.in/pdfs/downloads/VDA08012026.pdf, Tsaaro
- **DPDP:** AZB, KS&K, Storyboard18
- **Tax:** tdsman.com, taxheal.com, kanakkupillai.com, KoinX
- **RBI and discussion paper:** cryptotimes.io (secondary)
- **Google and Meta:** momentumadworks.net (vendor), MediaNama (2021)

**Content kits:**
- uppromote.com welcome-kit guide (vendor)
- hubspot.com/partner-resources
- easyaffiliate.com, partnero.com, rewardful.com
- BCG India creator economy 2025
- Socialinsider
- Meta WhatsApp opt-in docs (seen as a search summary)
- utm.io, Accutics
- ON24 benchmarks via MarketingProfs (secondary)
