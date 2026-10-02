/*
 * Partner Kit content. PARTNER-SAFE ONLY: this file is shipped to affiliates.
 * Never add internal notes, unconfirmed (TBC) numbers, the share ceiling, deal-desk data
 * or competitor names. Rates come from rates.js via {tokens}.
 * Run tools/check-kit.sh before every push.
 *
 * Lines that must mention a banned word (to tell partners not to use it) end with
 * the marker  check-kit:allow
 */
window.KIT = {
  version: '1.0',
  updated: '2 Oct 2026',
  // 'draft' shows a "do not share yet" banner. Set to 'live' after compliance sign-off.
  status: 'draft',

  /* ---------- 01 Start here ---------- */
  checklist: [
    { t: 'Dashboard mein login karo aur apna referral link aur code dhoondo.', t_en: 'Log in to your dashboard and find your referral link and code.' },
    { t: '"Har post ke rules" padho (5 minute). Har Niyam post pe ye lagu hote hain.', t_en: 'Read "Rules for every post" (5 minutes). They apply to every Niyam post.' },
    { t: 'Apna khud ka Niyam account kholo (apne referral link se nahi), taaki jo recommend kar rahe ho use khud use kiya ho.', t_en: 'Open your own Niyam account (not through your own referral link), so you have used what you recommend.' },
    { t: 'Link builder se har channel ke liye alag tracked link banao.', t_en: 'Use the link builder to make a separate tracked link for each channel.' },
    { t: 'Content library se pehle 3 posts chuno.', t_en: 'Pick your first 3 posts from the content library.' },
    { t: 'Partner success manager ke saath pehle webinar ki date fix karo.', t_en: 'Fix the date of your first webinar with your partner success manager.' }
  ],
  timeline: [
    { d: 'Day 0', t: 'Letter sign hote hi referral code aur link live.', t_en: 'Your referral code and link go live the day the letter is signed.' },
    { d: 'Day 1–{kickoffDays}', t: 'Kick-off call (45 min): goals, rules, link setup, dashboard tour, 30-din ka plan. Recap {recapHours} ghante mein.', t_en: 'Kick-off call (45 min): goals, rules, link setup, dashboard tour, 30-day plan. Recap within {recapHours} hours.', note: 'business days' },
    { d: 'Day 7', t: 'Pehla post ya broadcast live.', t_en: 'Your first post or broadcast goes live.' },
    { d: 'Day 21', t: 'Pehla co-branded webinar.', t_en: 'Your first co-branded webinar.' },
    { d: 'Day 30', t: 'Review: kya chala, kya badalna hai.', t_en: 'Review: what worked, what to change.' },
    { d: 'Day 90', t: 'Pehla quarterly review aur agle quarter ka plan.', t_en: 'First quarterly review and next quarter’s plan.' }
  ],

  /* ---------- 02 Programme ---------- */
  earns: [
    { t: 'Futures trading fees (maker + taker)', ok: true },
    { t: 'Options trading fees', ok: true },
    { t: 'Funding (traders ke beech, Niyam ki kamai nahi)', t_en: 'Funding (paid between traders, not Niyam revenue)', ok: false },
    { t: 'GST', ok: false },
    { t: 'Insurance Clearance Fee (Insurance Fund mein jaati hai)', t_en: 'Insurance Clearance Fee (goes to the Insurance Fund)', ok: false },
    { t: 'Deposits / withdrawals (free hain)', t_en: 'Deposits / withdrawals (no fee)', ok: false },
    { t: 'User ka profit ya loss', t_en: 'User profit or loss', ok: false }
  ],

  /* ---------- 03 Rules ---------- */
  placement: [
    { m: 'Image / static post', m_hi: 'Image / static post', r: 'Disclaimer neeche, kam se kam 1/5 jagah mein, saaf background aur padhne layak font mein.', r_en: 'Disclaimer at the bottom, taking at least 1/5 of the space, on a plain background in a readable font.' },
    { m: 'Caption (Instagram, YouTube, X, Facebook)', m_hi: 'Caption (Instagram, YouTube, X, Facebook)', r: 'Caption ki sabse pehli line mein, "see more" se pehle. Image ya video ke andar bhi.', r_en: 'In the very first line of the caption, before "see more". Also inside the image or video.' },
    { m: 'Video (Reels, Shorts, YouTube)', m_hi: 'Video (Reels, Shorts, YouTube)', r: 'End mein, plain background pe, kam se kam 5 second, normal speed pe voiceover ke saath. 2 minute se lamba video ho to shuru aur end dono mein.', r_en: 'At the end, on a plain background, for at least 5 seconds, with a voiceover at normal pace. Videos over 2 minutes: at both the start and the end.' },
    { m: 'Story (15 sec ya kam)', m_hi: 'Story (15 sec or less)', r: 'Poori story pe saaf overlay.', r_en: 'A clear overlay on the whole story.' },
    { m: 'Live / webinar / audio', m_hi: 'Live / webinar / audio', r: 'Shuru aur end mein bol ke aur screen pe. "#ad / Paid partnership" label poore live mein dikhna chahiye.', r_en: 'Spoken and on screen at the start and the end. The "#ad / Paid partnership" label stays visible for the whole live.' },
    { m: 'WhatsApp / Telegram / email', m_hi: 'WhatsApp / Telegram / email', r: 'Message ke upar label aur disclaimer. Library ka copy button ye apne aap jodta hai.', r_en: 'Label and disclaimer at the top of the message. The library copy button adds both for you.' }
  ],
  // Words and claims partners must not use. Every line here is allowed to mention them.
  never: [
    { bad: '"Currency", "securities", "custodian", "depository" (crypto ke liye)', bad_en: '"Currency", "securities", "custodian", "depository" (about crypto)', good: '"INR-settled futures aur options"', good_en: '"INR-settled futures and options"' }, // check-kit:allow
    { bad: 'Pakka profit, guaranteed return, double paisa, risk-free, safe investment', bad_en: 'Sure profit, guaranteed returns, double your money, risk-free, safe investment', good: '"Pehle seekho, risk samjho, phir decide karo."', good_en: '"Learn first, understand the risk, then decide."' }, // check-kit:allow
    { bad: 'P&L screenshots, "maine itna kamaya", 12 mahine se kam ke returns', bad_en: 'P&L screenshots, "I made this much", returns over periods under 12 months', good: 'Concepts samjhao: margin, fees, funding, liquidation.', good_en: 'Explain concepts: margin, fees, funding, liquidation.' },
    { bad: '"Licensed", "regulated", "government approved", "SEBI/RBI approved"', bad_en: '"Licensed", "regulated", "government approved", "SEBI/RBI approved"', good: '"FIU-IND ke saath reporting entity ke roop mein registered (REID {fiuReid})"', good_en: '"Registered with FIU-IND as a reporting entity (REID {fiuReid})"' }, // check-kit:allow
    { bad: 'Stocks, F&O, FD ya gold se comparison', bad_en: 'Comparisons with stocks, F&O, FDs or gold', good: 'Sirf Niyam ke product ke facts.', good_en: 'Only facts about Niyam’s product.' },
    { bad: '"Tax bachao", "TDS nahi lagega", "tax-free"', bad_en: '"Save tax", "no TDS", "tax-free"', good: '"Tax ke liye apne CA se baat karo." Niyam ka tax one-pager jaisa hai waisa share karo.', good_en: '"Talk to your CA about tax." Share Niyam’s tax one-pager as is.' }, // check-kit:allow
    { bad: 'Crypto ko paise ki problem ka solution batana', bad_en: 'Presenting crypto as a fix for money problems', good: 'Risk ke saath balanced education.', good_en: 'Balanced education, with the risks.' }
  ],
  dont: [
    { t: '<b>KYC ya paisa kabhi handle mat karo.</b> User ke documents, selfie, OTP, phone ya bank details na lo, na unke liye account kholo, na unka paisa pakdo. User apne phone pe khud KYC karta hai; atakne pe Niyam ki RM team help karti hai.', t_en: '<b>Never handle KYC or money.</b> Do not take a user’s documents, selfie, OTP, phone or bank details, do not open accounts for them, and do not hold their money. Users complete KYC on their own phone; Niyam’s RM team helps if they get stuck.' },
    { t: '<b>Trade calls, tips ya signals nahi.</b> Na apne group mein, na webinar mein. Market ki baat sirf education ya commentary ke roop mein.', t_en: '<b>No trade calls, tips or signals,</b> in your group or in a webinar. Talk about markets only as education or commentary.' },
    { t: '<b>Paid ads nahi.</b> Google, Meta, YouTube ads ya "Niyam" keyword pe bidding, Niyam ki likhit approval ke bina nahi. Organic posts hi.', t_en: '<b>No paid ads.</b> No Google, Meta or YouTube ads and no bidding on the "Niyam" keyword without Niyam’s written approval. Organic posts only.' },
    { t: '<b>18 se kam umar walon ko target mat karo,</b> aur content mein minors nahi.', t_en: '<b>Do not target anyone under 18,</b> and keep minors out of your content.' },
    { t: '<b>Niyam ka naam ya logo wale fake ya lookalike pages, handles ya groups nahi.</b>', t_en: '<b>No pages, handles or groups that look like Niyam’s own.</b>' },
    { t: '<b>Users ko private cashback ya side deal nahi.</b> Koi offer ho to sirf Niyam ke official campaign se.', t_en: '<b>No private cashback or side deals for users.</b> Offers run only through official Niyam campaigns.' }
  ],
  sebi: {
    t: '<b>SEBI-registered ho?</b> (Authorised Person / sub-broker, investment adviser, research analyst ya broker) Pehle partner success manager ko batao. Legal review ke baad hi shuru karein. Niyam ko sirf personal ya alag entity ke roop mein promote karo: SEBI registration number, broker ki branding ya broker ke client lists use nahi. Apne broker se likhit no-objection lena behtar hai. Stock tips aur Niyam ek hi channel mein nahi.',
    t_en: '<b>SEBI-registered?</b> (Authorised Person / sub-broker, investment adviser, research analyst or broker) Tell your partner success manager first, and start only after a legal review. Promote Niyam only in a personal or separate-entity capacity: no SEBI registration number, no broker branding, no broker client lists. Getting a written no-objection from your broker is recommended. Keep stock tips and Niyam out of the same channel.'
  },
  ladder: [
    { t: 'Chhoti galti (label ya disclaimer chhoota): {cureDays} din mein theek karo.', t_en: 'Minor slip (missing label or disclaimer): fix within {cureDays} days.' },
    { t: 'Dobara hua: likhit warning.', t_en: 'Repeated: written warning.' },
    { t: 'Serious (return ka promise, KYC handle karna, signal groups, impersonation): partnership turant suspend aur review.', t_en: 'Serious (promising returns, handling KYC, signal groups, impersonation): partnership suspended at once, pending review.' }
  ],

  /* ---------- 04 Content library ----------
   * fmt: post   → copy adds the label + disclaimer on top and Niyam's identity at the end
   *      email  → same as post
   *      script → copied as written; the script carries its own on-screen label and end card
   * {link} becomes a tracked link for that post once the partner pastes their referral link in the link builder.
   */
  channels: [
    { id: 'all', t: 'All' },
    { id: 'wa', t: 'WhatsApp / Telegram' },
    { id: 'ig', t: 'Instagram' },
    { id: 'yt', t: 'YouTube' },
    { id: 'x', t: 'X' },
    { id: 'email', t: 'Email' },
    { id: 'offline', t: 'Offline' }
  ],
  library: [
    { id: 'launch-wa', ch: 'wa', fmt: 'post', reviewed: '2 Oct 2026',
      title: 'Launch announcement', title_en: 'Launch announcement',
      t: 'Ek update: hum Niyam ke saath partner ban gaye hain.\n\nNiyam ek Indian crypto derivatives exchange hai. Perpetual futures aur options, sab INR mein settle hota hai. Deposit aur withdrawal UPI, IMPS ya NEFT se hota hai, us pe koi fee nahi. Trading fees aur GST lagte hain.\n\nIske saath hum ek free learning series shuru kar rahe hain: margin, leverage, funding aur liquidation, basics se.\n\nDerivatives mein leverage hota hai aur nuksan bhi ho sakta hai. Pehle seekho, phir decide karo.\n\nJoin karne ka link: {link}',
      t_en: 'An update: we are now a Niyam partner.\n\nNiyam is an Indian crypto derivatives exchange for perpetual futures and options, all settled in INR. Deposits and withdrawals go through UPI, IMPS or NEFT with no fee; trading fees and GST apply.\n\nWe are also starting a free learning series: margin, leverage, funding and liquidation, from the basics.\n\nDerivatives use leverage and you can lose money. Learn first, then decide.\n\nLink to join: {link}' },

    { id: 'launch-ig', ch: 'ig', fmt: 'post', reviewed: '2 Oct 2026',
      title: 'Launch caption', title_en: 'Launch caption',
      t: 'Naya chapter: ab hum Niyam ke saath partner hain.\n\nHamari community crypto futures ke baare mein bahut puchti hai, isliye hum basics se ek series laa rahe hain: notional kya hai, fee kis pe lagti hai, funding kaise kaam karta hai, aur liquidation ka risk.\n\nSab INR mein. Risk samajh ke hi trade karna.\n\nLink bio mein, ya yahan: {link}\n\nUse the "Paid partnership" tag when you post.',
      t_en: 'New chapter: we are now partnering with Niyam.\n\nOur community asks a lot about crypto futures, so we are starting a series from the basics: what notional means, what fees are charged on, how funding works, and the risk of liquidation.\n\nAll in INR. Only trade once you understand the risk.\n\nLink in bio, or here: {link}\n\nUse the "Paid partnership" tag when you post.' },

    { id: 'launch-yt', ch: 'yt', fmt: 'post', reviewed: '2 Oct 2026',
      title: 'YouTube community post', title_en: 'YouTube community post',
      t: 'Aap mein se kaafi log crypto futures ke baare mein puchte ho. Agle kuch hafton mein hum Niyam ke saath ek series karenge: basics, fees, funding, liquidation aur risk management.\n\nPehla live: [date, time]. Reminder ke liye comment karo.\n\nNiyam pe account banane ka link: {link}',
      t_en: 'Many of you ask about crypto futures. Over the next few weeks we will run a series with Niyam: basics, fees, funding, liquidation and risk management.\n\nFirst live: [date, time]. Comment to get a reminder.\n\nLink to open a Niyam account: {link}' },

    { id: 'launch-email', ch: 'email', fmt: 'email', reviewed: '2 Oct 2026',
      title: 'Email to your list', title_en: 'Email to your list',
      t: 'Subject: Crypto futures ki learning series + ek update\n\nNamaste [name],\n\nHum Niyam ke saath partner ban gaye hain. Niyam ek Indian crypto derivatives exchange hai jahan futures aur options INR mein settle hote hain.\n\nIs mahine hum ek free series chala rahe hain:\n1. Crypto derivatives aur risk\n2. Margin, leverage aur liquidation\n3. Fees aur funding\n\nRegister: [webinar link]\nNiyam account: {link}\n\nLeverage nuksan bhi badhata hai. Sirf utna lagao jitna kho sakte ho.\n\n[Your name]',
      t_en: 'Subject: A learning series on crypto futures, and an update\n\nHi [name],\n\nWe have partnered with Niyam, an Indian crypto derivatives exchange where futures and options settle in INR.\n\nThis month we are running a free series:\n1. Crypto derivatives and risk\n2. Margin, leverage and liquidation\n3. Fees and funding\n\nRegister: [webinar link]\nNiyam account: {link}\n\nLeverage magnifies losses too. Only put in what you can afford to lose.\n\n[Your name]' },

    { id: 'join-steps', ch: 'wa', fmt: 'post', reviewed: '2 Oct 2026',
      title: 'How to join in 5 steps', title_en: 'How to join in 5 steps',
      t: 'Niyam pe shuru karne ke 5 steps:\n\n1. Is link se sign up karo: {link}\n2. KYC apne phone pe khud karo: DigiLocker se Aadhaar aur PAN. Apne documents ya OTP kisi ko mat bhejna, mujhe bhi nahi.\n3. UPI, IMPS ya NEFT se apne bank account se INR deposit karo. Deposit pe koi fee nahi.\n4. Pehle chhota aur kam leverage pe try karo. Limit order pe maker fee {futMaker}, market order pe taker fee {futTaker}, GST alag.\n5. Atak gaye? App mein support se baat karo, Niyam ki RM team help karegi.',
      t_en: '5 steps to start on Niyam:\n\n1. Sign up with this link: {link}\n2. Do KYC yourself on your own phone: Aadhaar and PAN through DigiLocker. Never send your documents or OTP to anyone, including me.\n3. Deposit INR from your own bank account by UPI, IMPS or NEFT. No deposit fee.\n4. Start small and with low leverage. Limit orders that wait in the book pay the maker fee of {futMaker}; market orders pay the taker fee of {futTaker}; GST is extra.\n5. Stuck? Contact support in the app and Niyam’s RM team will help.' },

    { id: 'car-notional', ch: 'ig', fmt: 'post', reviewed: '2 Oct 2026',
      title: 'Carousel: notional vs margin', title_en: 'Carousel: notional vs margin',
      t: 'Slide 1: Fee margin pe lagti hai ya poori position pe?\nSlide 2: Margin = aapka security deposit. Notional = poori position ki value.\nSlide 3: ₹10,000 margin × 10x leverage = ₹1,00,000 notional.\nSlide 4: Fee notional pe lagti hai. Taker fee {futTaker} × ₹1,00,000 = {tk1L}, plus GST {tk1Lg}.\nSlide 5: Isliye zyada leverage = badi fee aur bada risk. Ek chhota move bhi poora margin le ja sakta hai.\nSlide 6 (disclaimer slide): plain background pe disclaimer, 1/5 jagah.',
      t_en: 'Slide 1: Is the fee charged on your margin or on the whole position?\nSlide 2: Margin = your security deposit. Notional = the full value of the position.\nSlide 3: ₹10,000 margin × 10x leverage = ₹1,00,000 notional.\nSlide 4: The fee is on notional. Taker fee {futTaker} × ₹1,00,000 = {tk1L}, plus GST of {tk1Lg}.\nSlide 5: So more leverage means a bigger fee and bigger risk. A small move can take your whole margin.\nSlide 6 (disclaimer slide): the disclaimer on a plain background, taking 1/5 of the space.' },

    { id: 'car-makertaker', ch: 'ig', fmt: 'post', reviewed: '2 Oct 2026',
      title: 'Carousel: maker vs taker', title_en: 'Carousel: maker vs taker',
      t: 'Slide 1: Maker aur taker fee mein fark kya hai?\nSlide 2: Taker: order turant match hota hai (jaise market order). Fee {futTaker}.\nSlide 3: Maker: order book mein wait karta hai (jaise limit order jo turant match nahi hua). Fee {futMaker}.\nSlide 4: Buy ya sell se fark nahi padta. Order kaise lagaya, us se padta hai.\nSlide 5: ₹1,00,000 pe: taker {tk1L}, maker {mk1L}. GST {gst} dono pe alag.\nSlide 6 (disclaimer slide).',
      t_en: 'Slide 1: What is the difference between maker and taker fees?\nSlide 2: Taker: your order matches instantly (like a market order). Fee {futTaker}.\nSlide 3: Maker: your order waits in the order book (like a limit order that did not match at once). Fee {futMaker}.\nSlide 4: Buying or selling does not matter. How you placed the order does.\nSlide 5: On ₹1,00,000: taker {tk1L}, maker {mk1L}. GST of {gst} on top of both.\nSlide 6 (disclaimer slide).' },

    { id: 'car-roundtrip', ch: 'ig', fmt: 'post', reviewed: '2 Oct 2026',
      title: 'Carousel: the real cost of one trade', title_en: 'Carousel: the real cost of one trade',
      t: 'Slide 1: Ek trade ka poora kharcha, entry se exit tak.\nSlide 2: Fee entry pe bhi lagti hai aur exit pe bhi.\nSlide 3: ₹1,00,000 position, dono taker: {rtTk} (GST samet).\nSlide 4: Dono maker: {rtMk} (GST samet).\nSlide 5: Matlab sirf fees cover karne ke liye price ko {rtTkPctG} move karna padega (dono taker). Loss wale trade pe bhi fee lagti hai.\nSlide 6 (disclaimer slide).',
      t_en: 'Slide 1: The full cost of one trade, entry to exit.\nSlide 2: You pay a fee on entry and again on exit.\nSlide 3: ₹1,00,000 position, taker both ways: {rtTk} including GST.\nSlide 4: Maker both ways: {rtMk} including GST.\nSlide 5: So the price has to move {rtTkPctG} just to cover fees (taker both ways). A losing trade pays fees too.\nSlide 6 (disclaimer slide).' },

    { id: 'car-funding', ch: 'ig', fmt: 'post', reviewed: '2 Oct 2026',
      title: 'Carousel: what is funding?', title_en: 'Carousel: what is funding?',
      t: 'Slide 1: Perpetual futures ki expiry nahi hoti. To price spot ke paas kaise rehta hai?\nSlide 2: Funding: longs aur shorts ke beech chhota payment, har kuch ghante mein.\nSlide 3: Rate positive: longs shorts ko dete hain. Negative: shorts longs ko.\nSlide 4: Funding = position value × funding rate. ₹5,00,000 long, +0.01% = ₹50.\nSlide 5: Funding traders ke beech jaata hai. Ye exchange ki fee nahi hai, aur is pe GST nahi.\nSlide 6 (disclaimer slide).',
      t_en: 'Slide 1: Perpetual futures never expire. So how does the price stay close to spot?\nSlide 2: Funding: a small payment between longs and shorts, every few hours.\nSlide 3: Positive rate: longs pay shorts. Negative: shorts pay longs.\nSlide 4: Funding = position value × funding rate. A ₹5,00,000 long at +0.01% = ₹50.\nSlide 5: Funding passes between traders. It is not an exchange fee, and there is no GST on it.\nSlide 6 (disclaimer slide).' },

    { id: 'car-liquidation', ch: 'ig', fmt: 'post', reviewed: '2 Oct 2026',
      title: 'Carousel: liquidation, the risk to understand first', title_en: 'Carousel: liquidation, the risk to understand first',
      t: 'Slide 1: Liquidation kya hota hai?\nSlide 2: Jab price aapke against itna chale ki margin khatam hone lage, position apne aap band ho jaati hai.\nSlide 3: Jitna zyada leverage, utna chhota move kaafi hai. Max leverage {maxLev} pe lagbhag 4% ka move poora margin le ja sakta hai.\nSlide 4: Liquidation pe taker fee aur Insurance Clearance Fee bhi lagti hai.\nSlide 5: Kam leverage aur stop-loss risk kam karte hain, khatam nahi.\nSlide 6 (disclaimer slide).',
      t_en: 'Slide 1: What is liquidation?\nSlide 2: When the price moves far enough against you that your margin runs out, the position is closed automatically.\nSlide 3: The more leverage, the smaller the move it takes. At the maximum {maxLev}, a move of about 4% can take your whole margin.\nSlide 4: A liquidation also pays the taker fee and an Insurance Clearance Fee.\nSlide 5: Low leverage and a stop-loss reduce the risk; they do not remove it.\nSlide 6 (disclaimer slide).' },

    { id: 'reel-margin', ch: 'yt', fmt: 'script', reviewed: '2 Oct 2026',
      title: '30-second Reel / Short script: margin vs notional', title_en: '30-second Reel / Short script: margin vs notional',
      t: '[On screen, poore video mein: "#ad · Paid partnership with Niyam"]\n\n0–5s: "Crypto futures mein fee kis pe lagti hai? Zyaadatar log galat sochte hain."\n5–15s: "Aapne ₹10,000 lagaye, 10x leverage. Position ₹1 lakh ki hai, aur fee ₹1 lakh pe lagegi, ₹10,000 pe nahi."\n15–25s: "Isliye leverage badhane se fee bhi badhti hai aur risk bhi. Ek chhota move poora margin le ja sakta hai."\n25–30s: "Aise basics ke liye series follow karo. Link description mein."\n\n[END CARD, plain background, 5 seconds, normal pace voiceover]\n{disclaimer}',
      t_en: '[On screen for the whole video: "#ad · Paid partnership with Niyam"]\n\n0–5s: "In crypto futures, what is the fee charged on? Most people get this wrong."\n5–15s: "You put in ₹10,000 at 10x leverage. The position is worth ₹1 lakh, and the fee is charged on ₹1 lakh, not ₹10,000."\n15–25s: "So more leverage means a bigger fee and more risk. A small move can take your whole margin."\n25–30s: "Follow the series for more basics like this. Link in the description."\n\n[END CARD, plain background, 5 seconds, voiceover at normal pace]\n{disclaimer}' },

    { id: 'webinar-invite', ch: 'wa', fmt: 'post', reviewed: '2 Oct 2026',
      title: 'Webinar invite', title_en: 'Webinar invite',
      t: 'Free live session: [topic]\n[day, date] · [time] · [duration]\n\nIs session mein: [3 points from the module]\nKoi trade call ya tip nahi, sirf samajh.\n\nRegister: [webinar link]\nSawaal pehle se bhej do, live mein lenge.',
      t_en: 'Free live session: [topic]\n[day, date] · [time] · [duration]\n\nWe will cover: [3 points from the module]\nNo trade calls or tips, just understanding.\n\nRegister: [webinar link]\nSend your questions in advance and we will take them live.' },

    { id: 'webinar-reminders', ch: 'wa', fmt: 'post', reviewed: '2 Oct 2026',
      title: 'Webinar reminders (4 messages)', title_en: 'Webinar reminders (4 messages)',
      t: '1 hafta pehle: "Agle [day] ko live: [topic]. Register: [link]"\n\n1 din pehle: "Kal [time] pe live: [topic]. Calendar mein add karo: [link]"\n\nUs din subah: "Aaj [time] pe milte hain. Link: [link]"\n\n15 minute pehle: "15 minute mein shuru. Join: [link]"',
      t_en: 'A week before: "Live next [day]: [topic]. Register: [link]"\n\nThe day before: "Live tomorrow at [time]: [topic]. Add it to your calendar: [link]"\n\nThat morning: "See you today at [time]. Link: [link]"\n\n15 minutes before: "Starting in 15 minutes. Join: [link]"' },

    { id: 'x-thread', ch: 'x', fmt: 'post', reviewed: '2 Oct 2026',
      title: 'X thread: perpetual futures in 5 posts', title_en: 'X thread: perpetual futures in 5 posts',
      t: '1/ Perpetual futures 5 posts mein.\n2/ Normal futures ki expiry hoti hai. Perpetual ki nahi.\n3/ Price spot ke paas rahe, isliye longs aur shorts ke beech funding hota hai.\n4/ Fee poori position (notional) pe lagti hai, margin pe nahi. Leverage badhaya to fee bhi badhi.\n5/ Liquidation ka risk sabse pehle samjho. Niyam pe INR mein seekh ke shuru karo: {link}',
      t_en: '1/ Perpetual futures in 5 posts.\n2/ Normal futures expire. Perpetuals do not.\n3/ To keep the price near spot, longs and shorts pay each other funding.\n4/ Fees are charged on the whole position (notional), not on margin. More leverage, bigger fee.\n5/ Understand liquidation risk before anything else. Learn and start in INR on Niyam: {link}' },

    { id: 'poster', ch: 'offline', fmt: 'post', reviewed: '2 Oct 2026',
      title: 'Poster / standee text (add the QR from the link builder)', title_en: 'Poster / standee text (add the QR from the link builder)',
      t: 'Crypto futures, INR mein, basics se.\nScan karo, learning series join karo.\n[QR code]',
      t_en: 'Crypto futures in INR, from the basics.\nScan to join the learning series.\n[QR code]' }
  ],

  /* ---------- 06 Webinars ---------- */
  modules: [
    { t: 'Crypto derivatives aur risk: pehle risk', t_en: 'Crypto derivatives and risk: risk first', d: 'Spot vs derivatives, long/short, kaun kyun nuksan karta hai.', d_en: 'Spot vs derivatives, long and short, and why people lose money.' },
    { t: 'Perpetual futures', t_en: 'Perpetual futures', d: 'Notional, margin, mark price, expiry kyun nahi.', d_en: 'Notional, margin, mark price, and why there is no expiry.' },
    { t: 'Leverage, margin aur liquidation', t_en: 'Leverage, margin and liquidation', d: 'Har leverage pe kitna move liquidation laata hai.', d_en: 'How big a move causes liquidation at each leverage.' },
    { t: 'Fees aur funding', t_en: 'Fees and funding', d: 'Maker/taker, GST, round-trip cost, funding.', d_en: 'Maker and taker, GST, round-trip cost, funding.' },
    { t: 'Position sizing aur risk management', t_en: 'Position sizing and risk management', d: 'Stop-loss, kam leverage, kitna lagana hai.', d_en: 'Stop-losses, low leverage, how much to put in.' },
    { t: 'Platform walkthrough', t_en: 'Platform walkthrough', d: 'KYC, deposit, order types, limit order lagana. Demo, koi call nahi.', d_en: 'KYC, deposits, order types, placing a limit order. A demo, not a call.' },
    { t: 'Options basics', t_en: 'Options basics', d: 'Buyer ka max loss = premium, seller ka risk, fee cap.', d_en: 'A buyer’s maximum loss is the premium; seller risk; the fee cap.' }
  ],
  runsheet: [
    { t: 'Shuru mein disclaimer bolo aur screen pe dikhao. "#ad / Paid partnership" label poore session mein.', t_en: 'Open by reading the disclaimer and showing it on screen. Keep the "#ad / Paid partnership" label up for the whole session.' },
    { t: 'Koi buy/sell call, price target ya coin recommendation nahi.', t_en: 'No buy or sell calls, price targets or coin recommendations.' },
    { t: 'Q&A mein personal advice nahi. Tax ke sawaal: "apne CA se baat karo".', t_en: 'No personal advice in Q&A. Tax questions: "talk to your CA".' },
    { t: 'Account sawaal Niyam support ya RM team ko bhejo. Kisi ka OTP ya document mat lo.', t_en: 'Send account questions to Niyam support or the RM team. Never take anyone’s OTP or documents.' },
    { t: 'End mein dobara disclaimer. Replay mein label aur disclaimer rehne do.', t_en: 'Close with the disclaimer again. Keep the label and disclaimer in the replay.' },
    { t: 'Registration form: sirf zaroori details, clear consent line, 18+ confirm.', t_en: 'Registration form: only the details you need, a clear consent line, and an 18+ confirmation.' }
  ],

  /* ---------- 08 Dashboard ---------- */
  metrics: [
    { k: 'Signups', t: 'Aapke link ya code se bane naye accounts.', t_en: 'New accounts opened through your link or code.' },
    { k: 'KYC complete', t: 'Jinhone KYC poora kiya.', t_en: 'Those who completed KYC.' },
    { k: 'First trades', t: 'Jinhone pehla trade kiya. Ye hamara main early signal hai.', t_en: 'Those who made a first trade. This is the main early signal.' },
    { k: 'Active traders', t: 'Is mahine kam se kam ek trade karne wale users. Kamai inhi se hoti hai.', t_en: 'Users with at least one trade this month. Your earnings come from them.' },
    { k: 'Traded volume', t: 'Aapke users ka total notional.', t_en: 'Total notional traded by your users.' },
    { k: 'Commission accrued', t: 'Trading fees ka aapka hissa, roz update.', t_en: 'Your share of trading fees, updated daily.' }
  ],

  /* ---------- 09 FAQ ---------- */
  faqGroups: [
    { id: 'prog', t: 'Programme ke baare mein', t_en: 'About the programme' },
    { id: 'aud', t: 'Aapke audience ke sawaal', t_en: 'Questions from your audience' }
  ],
  faq: [
    { g: 'prog', q: 'Mujhe kitna milega?', q_en: 'How much do I earn?',
      a: 'Aapke link ya code se aaye users ki trading fees ka {share}, jab tak wo trade karte rahein. Example: aapka user ₹1,00,000 ki position kholta aur band karta hai, dono taker: fees ₹100, aapka {share} = ₹25. GST alag hai aur us pe share nahi.',
      a_en: '{share} of the trading fees paid by users who join through your link or code, for as long as they trade. Example: your user opens and closes a ₹1,00,000 position, taker both ways: fees ₹100, your {share} = ₹25. GST is extra and earns no share.' },
    { g: 'prog', q: 'Kya ye kamai pakki hai?', q_en: 'Are these earnings guaranteed?', // check-kit:allow
      a: 'Nahi. Kamai aapke users kitna aur kitni baar trade karte hain us pe depend karti hai. Koi bhi example sirf samjhane ke liye hai.',
      a_en: 'No. Earnings depend on how much and how often your users trade. Any example is only an illustration.' },
    { g: 'prog', q: 'Commission kis pe milta hai?', q_en: 'What earns commission?',
      a: 'Futures aur options ki trading fees pe. Funding, GST, Insurance Clearance Fee, deposit/withdrawal, aur user ke profit ya loss pe nahi.',
      a_en: 'Futures and options trading fees. Not funding, GST, the Insurance Clearance Fee, deposits or withdrawals, or a user’s profit or loss.' },
    { g: 'prog', q: 'Sirf signup se kuch milta hai?', q_en: 'Does a signup alone earn anything?',
      a: 'Nahi. Commission trading fees se aata hai, isliye kamai sirf un users se hoti hai jo trade karte hain.',
      a_en: 'No. Commission comes from trading fees, so you earn only from users who trade.' },
    { g: 'prog', q: 'User aapka hai, ye kaise pata chalta hai?', q_en: 'How is a user linked to me?',
      a: 'Jo user aapke link ya code se sign up karta hai, wo aapke account se jud jaata hai. Har channel ke liye alag tracked link banao taaki pata chale kya kaam kar raha hai.',
      a_en: 'A user who signs up through your link or code is linked to your account. Make a separate tracked link for each channel so you can see what works.' },
    { g: 'prog', q: 'Payment kab aur kaise milta hai?', q_en: 'When and how am I paid?',
      a: 'Commission dashboard pe roz judta hai. Har mahine reconcile hokar aapke bank account mein aata hai, aapke partnership letter ke hisaab se. Statement mein TDS aur GST (jo lagu ho) alag dikhte hain.',
      a_en: 'Commission accrues on your dashboard daily. It is reconciled and paid to your bank account monthly, as set out in your partnership letter. The statement shows any TDS and GST that applies.' },
    { g: 'prog', q: 'Dashboard ya statement mein kuch galat lage to?', q_en: 'What if my dashboard or statement looks wrong?',
      a: 'Statement ke {claimWindowDays} din ke andar partner success manager ko batao. Hum {disputeAck} ghante mein confirm karte hain, {disputeInvestigate} ghante mein jaanch shuru, aur {disputeResolveDays} business days mein jawab.',
      a_en: 'Tell your partner success manager within {claimWindowDays} days of the statement. We acknowledge within {disputeAck} hours, start investigating within {disputeInvestigate} hours, and reply within {disputeResolveDays} business days.' },
    { g: 'prog', q: 'Mere user ko loss hua to mera commission katega?', q_en: 'If my user loses money, is my commission cut?',
      a: 'Nahi. Commission ka user ke profit ya loss se koi link nahi. Isliye achhi education aapke aur aapke users dono ke liye sahi hai.',
      a_en: 'No. Commission has no link to a user’s profit or loss. That is why good education is right for you and your users.' },
    { g: 'prog', q: 'Kya main apna content ya ads bana sakta hoon?', q_en: 'Can I make my own content or ads?',
      a: 'Apna content haan: co-branded content partner success manager ko bhejo, compliance {contentReviewDays} business days mein review karta hai. Paid ads aur "Niyam" keyword pe bidding, likhit approval ke bina nahi.',
      a_en: 'Your own content, yes: send co-branded content to your partner success manager and compliance reviews it within {contentReviewDays} business days. Paid ads and bidding on the "Niyam" keyword need written approval.' },
    { g: 'prog', q: 'Dashboard pe users ki kaun si details dikhengi?', q_en: 'What will I see about my users?',
      a: 'Counts aur totals (signups, KYC, first trades, active traders, volume, commission), aur masked user IDs. Naam, phone, balance ya P&L nahi, user ki privacy ke liye. Niyam ke data se users ko contact mat karo.',
      a_en: 'Counts and totals (signups, KYC, first trades, active traders, volume, commission) and masked user IDs. Not names, phone numbers, balances or P&L, to protect user privacy. Do not use Niyam data to contact users.' },

    { g: 'aud', q: 'Niyam kya hai?', q_en: 'What is Niyam?',
      a: 'Ek Indian crypto derivatives exchange: perpetual futures aur options, sab INR mein settle. FIU-IND ke saath reporting entity ke roop mein registered (REID {fiuReid}). Web, iOS aur Android pe live. Operated by {entity}.',
      a_en: 'An Indian crypto derivatives exchange for perpetual futures and options, all settled in INR. Registered with FIU-IND as a reporting entity (REID {fiuReid}). Live on web, iOS and Android. Operated by {entity}.' },
    { g: 'aud', q: 'FIU registration ka matlab Niyam regulated hai?', q_en: 'Does FIU registration mean Niyam is regulated?', // check-kit:allow
      a: 'Nahi. FIU-IND registration anti-money-laundering aur KYC reporting ke liye hai. Ye SEBI ya RBI ka licence nahi hai. Crypto products unregulated hain aur risky ho sakte hain.',
      a_en: 'No. FIU-IND registration is for anti-money-laundering and KYC reporting. It is not a SEBI or RBI licence. Crypto products are unregulated and can be risky.' },
    { g: 'aud', q: 'Fees kitni hain?', q_en: 'What are the fees?',
      a: 'Futures: maker {futMaker}, taker {futTaker}. Options: maker {optMaker}, taker {optTaker}, premium ke {optCap} tak capped. GST {gst} har fee pe alag. INR deposit aur withdrawal pe koi fee nahi.',
      a_en: 'Futures: maker {futMaker}, taker {futTaker}. Options: maker {optMaker}, taker {optTaker}, capped at {optCap} of premium. GST of {gst} on every fee. No fee on INR deposits or withdrawals.' },
    { g: 'aud', q: 'Fee margin pe lagti hai ya poori position pe?', q_en: 'Is the fee on margin or on the whole position?',
      a: 'Poori position (notional) pe. ₹10,000 margin × 10x = ₹1,00,000 notional; taker fee {tk1L} + GST {tk1Lg}.',
      a_en: 'On the whole position (notional). ₹10,000 margin × 10x = ₹1,00,000 notional; taker fee {tk1L} + GST {tk1Lg}.' },
    { g: 'aud', q: 'Funding kya hai?', q_en: 'What is funding?',
      a: 'Perpetual futures ka price spot ke paas rakhne ke liye longs aur shorts ke beech chhota payment. Ye traders ke beech jaata hai; exchange ki fee nahi hai.',
      a_en: 'A small payment between longs and shorts that keeps the perpetual price close to spot. It passes between traders; it is not an exchange fee.' },
    { g: 'aud', q: 'Liquidation kya hai?', q_en: 'What is liquidation?',
      a: 'Price aapke against itna chale ki margin khatam hone lage to position apne aap band ho jaati hai. Zyada leverage = chhota move kaafi. Liquidation pe taker fee aur Insurance Clearance Fee lagti hai.',
      a_en: 'If the price moves far enough against you that your margin runs out, the position is closed automatically. More leverage means a smaller move is enough. A liquidation pays the taker fee and an Insurance Clearance Fee.' },
    { g: 'aud', q: 'KYC kaise hota hai?', q_en: 'How does KYC work?',
      a: 'Apne phone pe, DigiLocker se Aadhaar aur PAN. Kuch minute lagte hain. Apne documents ya OTP kisi ko mat do, partner ko bhi nahi. Atakne pe app mein support se baat karo.',
      a_en: 'On your own phone, with Aadhaar and PAN through DigiLocker. It takes a few minutes. Never give your documents or OTP to anyone, including a partner. If you get stuck, contact support in the app.' },
    { g: 'aud', q: 'Deposit aur withdrawal kaise?', q_en: 'How do deposits and withdrawals work?',
      a: 'INR mein, UPI, IMPS ya NEFT se, apne verified bank account se aur usi mein. Deposit ya withdrawal pe koi fee nahi.',
      a_en: 'In INR, by UPI, IMPS or NEFT, from and to your own verified bank account. No fee on deposits or withdrawals.' },
    { g: 'aud', q: 'Tax kaise lagega?', q_en: 'How is it taxed?',
      a: 'Hum tax advice nahi dete. Niyam ka tax education one-pager padho aur apne CA se confirm karo.',
      a_en: 'We do not give tax advice. Read Niyam’s tax education one-pager and confirm with your CA.' }
  ],

  /* ---------- 10 Support ---------- */
  support: [
    { who: 'Partner success manager', t: 'Onboarding, kick-off, monthly statement, dashboard review, content calendar, campaigns, content review.', t_en: 'Onboarding, kick-off, monthly statement, dashboard reviews, content calendar, campaigns, content review.' },
    { who: 'RM team', t: 'Aapke users ke account, KYC aur deposit ke sawaal, seedhe user ke saath.', t_en: 'Your users’ account, KYC and deposit questions, handled directly with the user.' },
    { who: 'Compliance', t: 'Co-branded content ka review, partner success manager ke through.', t_en: 'Reviews co-branded content, through your partner success manager.' }
  ],

  changelog: [
    { v: '1.0', d: '2 Oct 2026', t: 'Pehla version. Hindi (Devanagari) templates aur Hindi disclaimer compliance review ke baad aayenge.', t_en: 'First version. Hindi (Devanagari) templates and the Hindi disclaimer will follow after compliance review.' }
  ]
};
