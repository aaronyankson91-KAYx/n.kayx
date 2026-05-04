import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════════════
   📸  BEHOLD.SO SETUP — Connect @kayxmedia_ Instagram feed
   ───────────────────────────────────────────────────────────────────
   1. Go to https://behold.so → create FREE account
   2. Sources → Add Source → connect @kayxmedia_ Instagram
      (account must be Business or Creator type)
   3. Feeds → Add Feed → User Feed → copy your Feed ID
   4. Replace "YOUR_BEHOLD_FEED_ID" below with your Feed ID
   ───────────────────────────────────────────────────────────────────
   📧  EMAILJS SETUP — Send booking forms to your Gmail
   ───────────────────────────────────────────────────────────────────
   1. Go to https://emailjs.com → free account
   2. Add Gmail service → get SERVICE_ID
   3. Create template using vars: {{from_name}}, {{from_email}},
      {{phone}}, {{service}}, {{date}}, {{budget}}, {{message}}
   4. Copy TEMPLATE_ID + PUBLIC_KEY → paste below
═══════════════════════════════════════════════════════════════════ */
const BEHOLD_FEED_ID      = "bmUXFJTJv80LKNubKoJn";
const EMAILJS_SERVICE_ID  = "service_wmc7j4b";
const EMAILJS_TEMPLATE_ID = "template_sdmxzb9";
const EMAILJS_PUBLIC_KEY  = "UrchJkO_WRa51qjYd";


const GOLD  = "#b8860b";
const GOLD2 = "#d4a017";

/* Placeholder cards shown until Behold is connected */
const PLACEHOLDERS = [
  { emoji:"🎬", label:"Music Video",    type:"video", bg:"linear-gradient(135deg,#1a0030,#06000f)" },
  { emoji:"📸", label:"Brand Shoot",    type:"photo", bg:"linear-gradient(135deg,#2a1000,#0a0500)" },
  { emoji:"🎥", label:"Event Coverage", type:"video", bg:"linear-gradient(135deg,#001030,#000510)" },
  { emoji:"✨", label:"Campaign",       type:"photo", bg:"linear-gradient(135deg,#0a2a00,#020800)" },
  { emoji:"🎞️", label:"Short Film",     type:"video", bg:"linear-gradient(135deg,#2a0010,#0a0005)" },
  { emoji:"🏙️", label:"Aerial Reel",    type:"video", bg:"linear-gradient(135deg,#0a1a2a,#020508)" },
  { emoji:"💎", label:"Product Launch", type:"photo", bg:"linear-gradient(135deg,#1a0020,#060008)" },
  { emoji:"🌟", label:"Collab Drop",    type:"video", bg:"linear-gradient(135deg,#001020,#000510)" },
  { emoji:"🔥", label:"Reel",           type:"video", bg:"linear-gradient(135deg,#2a0800,#0a0300)" },
];

const TESTIMONIALS = [
  { text:"The music video exceeded every expectation. Storytelling, colour grade, direction — pure cinema from start to finish.", name:"Marcus Webb",  role:"Recording Artist",          initial:"M" },
  { text:"Kayxmedia transformed our brand campaign entirely. Every frame is intentional, luxurious, and deeply considered.",     name:"Sarah Chen",   role:"Marketing Director, LUXE",   initial:"S" },
  { text:"Our campaign hit 2M impressions in 48 hours. Authentic content that actually converts — highly recommended.",          name:"Priya Sharma", role:"Partnerships Lead, Adidas",  initial:"P" },
];

const TICKER_ITEMS = ["Music Videos","Brand Films","Event Coverage","Influencer Content","UGC Creation","4K Cinema","Colour Grading","Visual Storytelling","@kayxmedia_"];

const SERVICES = [
  {
    icon:"🎬", num:"01", name:"Cinematography",
    desc:"4K ProRes productions with professional colour grading. From concept to delivery, every frame is intentional and crafted with precision.",
    packages:[["Music Video Production","GH₵ 15,000+"],["Event Coverage (Full Day)","GH₵ 8,000+"],["Brand Film (30–90 sec)","GH₵ 20,000+"],["Professional Retouching","GH₵ 2,500+"]],
  },
  {
    icon:"📱", num:"02", name:"Creator Collabs",
    desc:"1.2M followers. 8.4% engagement. Authentic content that bridges your brand with a real, loyal, and active audience on Instagram & TikTok.",
    packages:[["Sponsored Content (Reel+Story)","GH₵ 10,000+"],["Brand Ambassadorship","GH₵ 25,000/mo"],["UGC Package (5 Assets)","GH₵ 5,000+"],["Product Launch Campaign","GH₵ 18,000+"]],
  },
  {
    icon:"✨", num:"03", name:"Full Campaign",
    desc:"Cinematic production combined with influencer distribution. One creative vision, maximum reach, measurable results from end to end.",
    packages:[["Campaign Strategy + Concept","GH₵ 7,500+"],["Full Production + Post","GH₵ 32,000+"],["Distribution + Promotion","GH₵ 12,000+"],["Analytics Report","GH₵ 2,000+"]],
  },
];

/* ─────────────────────────────────────────────────────────────── */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Outfit:wght@300;400;500;600;700;800&family=Bebas+Neue&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  background: #f4f2ee;
  color: #111;
  font-family: 'Outfit', sans-serif;
  overflow-x: hidden;
}
::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: #f4f2ee; }
::-webkit-scrollbar-thumb { background: ${GOLD}; border-radius: 2px; }

/* ── NAV ─────────────────────────────────────────────────────── */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 200;
  display: flex; align-items: center; justify-content: space-between;
  padding: 26px 64px;
  transition: all .4s ease;
}
.nav.solid {
  background: rgba(244,242,238,.97);
  backdrop-filter: blur(20px);
  padding: 16px 64px;
  border-bottom: 1px solid rgba(0,0,0,.07);
  box-shadow: 0 4px 40px rgba(0,0,0,.05);
}
.logo {
  font-family: 'Playfair Display', serif;
  font-size: 20px; font-weight: 900; letter-spacing: .06em;
  color: #111; text-decoration: none;
  display: flex; align-items: center; gap: 2px;
}
.logo-k { font-style: italic; color: ${GOLD}; }
.nav-links { display: flex; gap: 38px; list-style: none; }
.nav-links a {
  font-size: 10px; font-weight: 700;
  letter-spacing: .22em; text-transform: uppercase;
  color: #666; text-decoration: none; transition: color .2s;
  position: relative;
}
.nav-links a::after {
  content: ''; position: absolute; bottom: -4px; left: 0;
  width: 0; height: 1px; background: ${GOLD}; transition: width .3s;
}
.nav-links a:hover { color: #111; }
.nav-links a:hover::after { width: 100%; }
.nav-cta {
  font-size: 10px; font-weight: 800; letter-spacing: .2em; text-transform: uppercase;
  background: #111; color: #f4f2ee; padding: 12px 30px;
  border: none; cursor: pointer; text-decoration: none; transition: all .2s;
}
.nav-cta:hover { background: ${GOLD}; color: #fff; transform: translateY(-1px); }

/* ── HERO ────────────────────────────────────────────────────── */
.hero {
  min-height: 100vh; background: #0a0a0a;
  display: flex; align-items: flex-end;
  position: relative; overflow: hidden;
}
.hero-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,.015) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.015) 1px, transparent 1px);
  background-size: 64px 64px;
}
.hero-glow {
  position: absolute; width: 700px; height: 700px; border-radius: 50%;
  background: radial-gradient(circle, rgba(184,134,11,.13) 0%, transparent 68%);
  top: -150px; right: -150px;
  animation: glowDrift 9s ease-in-out infinite;
}
.hero-glow2 {
  position: absolute; width: 400px; height: 400px; border-radius: 50%;
  background: radial-gradient(circle, rgba(184,134,11,.07) 0%, transparent 70%);
  bottom: 80px; left: -100px;
  animation: glowDrift 13s ease-in-out infinite reverse;
}
@keyframes glowDrift {
  0%,100% { transform: translate(0,0) scale(1); }
  50%      { transform: translate(-40px,40px) scale(1.08); }
}
.hero-content {
  position: relative; z-index: 2;
  padding: 0 64px 90px; width: 100%;
}
.hero-eyebrow {
  font-size: 10px; font-weight: 700; letter-spacing: .55em; text-transform: uppercase;
  color: ${GOLD}; margin-bottom: 22px;
  display: flex; align-items: center; gap: 16px;
  animation: fadeUp .7s ease both;
}
.hero-eyebrow::before { content: ''; width: 36px; height: 1px; background: ${GOLD}; }
.hero-h1 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(72px,12vw,190px);
  line-height: .9; letter-spacing: .03em; color: #f4f2ee;
  margin-bottom: 36px;
  animation: fadeUp .7s .12s ease both;
}
.hero-h1 .outline {
  -webkit-text-stroke: 1.5px rgba(244,242,238,.2);
  color: transparent;
}
.hero-h1 .gold { color: ${GOLD}; }
.hero-bottom {
  display: flex; align-items: flex-end;
  justify-content: space-between; gap: 40px; flex-wrap: wrap;
  animation: fadeUp .7s .24s ease both;
}
.hero-desc {
  font-size: 15px; font-weight: 300;
  color: rgba(244,242,238,.55); line-height: 1.85; max-width: 420px;
}
.hero-desc strong { color: rgba(244,242,238,.85); font-weight: 500; }
.hero-btns { display: flex; gap: 14px; align-items: center; flex-wrap: wrap; }
.btn-gold {
  font-size: 11px; font-weight: 800; letter-spacing: .2em; text-transform: uppercase;
  background: ${GOLD}; color: #fff; padding: 15px 36px;
  border: none; cursor: pointer; text-decoration: none;
  display: inline-flex; align-items: center; gap: 10px; transition: all .2s;
  clip-path: polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px));
}
.btn-gold:hover { background: ${GOLD2}; transform: translateY(-2px); }
.btn-ghost {
  font-size: 11px; font-weight: 600; letter-spacing: .18em; text-transform: uppercase;
  background: transparent; color: rgba(244,242,238,.6);
  padding: 14px 30px; border: 1px solid rgba(244,242,238,.18);
  cursor: pointer; text-decoration: none; transition: all .2s;
}
.btn-ghost:hover { border-color: rgba(244,242,238,.6); color: #f4f2ee; }
.hero-stats {
  display: flex; gap: 52px; flex-wrap: wrap;
  animation: fadeUp .7s .36s ease both;
  padding-top: 64px;
}
.sv {
  font-family: 'Playfair Display', serif;
  font-size: 44px; font-weight: 900; color: #f4f2ee; line-height: 1;
}
.sv em { font-style: normal; color: ${GOLD}; }
.sl {
  font-size: 10px; font-weight: 500; letter-spacing: .2em; text-transform: uppercase;
  color: rgba(244,242,238,.35); margin-top: 5px;
}
.hero-scroll {
  position: absolute; bottom: 36px; right: 64px; z-index: 3;
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  font-size: 9px; font-weight: 700; letter-spacing: .35em; text-transform: uppercase;
  color: rgba(244,242,238,.3);
}
.hero-scroll-bar {
  width: 1px; height: 56px;
  background: linear-gradient(to bottom, ${GOLD}, transparent);
  animation: scrollPulse 2.2s ease-in-out infinite;
}
@keyframes scrollPulse {
  0%,100% { opacity: .3; transform: scaleY(1); }
  50%      { opacity: 1;  transform: scaleY(1.15); }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── TICKER ──────────────────────────────────────────────────── */
.ticker {
  background: #111; overflow: hidden; padding: 15px 0;
  border-top: 1px solid #1e1e1e; border-bottom: 1px solid #1e1e1e;
}
.ticker-track {
  display: flex; animation: tick 30s linear infinite; white-space: nowrap;
}
.ticker-track:hover { animation-play-state: paused; }
.ti {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 13px; letter-spacing: .3em;
  color: rgba(244,242,238,.3);
  padding: 0 44px; display: flex; align-items: center; gap: 44px;
}
.ti span { color: ${GOLD}; font-size: 16px; }
@keyframes tick { from { transform: translateX(0); } to { transform: translateX(-50%); } }

/* ── SHARED SECTION ──────────────────────────────────────────── */
section { padding: 120px 64px; position: relative; }
.sec-label {
  font-size: 10px; font-weight: 700; letter-spacing: .45em; text-transform: uppercase;
  color: ${GOLD}; display: flex; align-items: center; gap: 14px; margin-bottom: 14px;
}
.sec-label::before { content: ''; width: 32px; height: 1px; background: ${GOLD}; }
.sec-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(34px,5vw,60px); font-weight: 900; line-height: 1.05; margin-bottom: 12px;
}
.sec-title em { font-style: italic; color: ${GOLD}; }

/* ── WORKS / INSTAGRAM ───────────────────────────────────────── */
#works { background: #f4f2ee; }
.works-top {
  display: flex; justify-content: space-between; align-items: flex-end;
  max-width: 1440px; margin: 0 auto 48px; flex-wrap: wrap; gap: 24px;
}
.ig-badge {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 20px; background: #fff; border: 1px solid #e8e4dc;
  font-size: 12px; font-weight: 600; color: #555;
}
.ig-badge-dot {
  width: 8px; height: 8px; border-radius: 50%; background: #e1306c;
  animation: liveDot 2s infinite;
}
@keyframes liveDot {
  0%,100% { box-shadow: 0 0 0 0 rgba(225,48,108,.4); }
  50%      { box-shadow: 0 0 0 6px rgba(225,48,108,0); }
}
.ig-badge strong { color: #111; }
.behold-wrap { max-width: 1440px; margin: 0 auto; }

/* Behold widget brand overrides */
behold-widget {
  --behold-gap: 6px;
  --behold-border-radius: 0px;
}

/* Setup notice */
.setup-notice {
  background: #fff; border: 2px dashed #e0dbd2;
  padding: 28px 36px; margin-bottom: 32px;
  display: flex; align-items: flex-start; gap: 20px;
}
.setup-icon { font-size: 28px; flex-shrink: 0; margin-top: 2px; }
.setup-title {
  font-family: 'Playfair Display', serif;
  font-size: 18px; font-weight: 700; margin-bottom: 10px;
}
.setup-steps { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.setup-steps li {
  font-size: 13px; color: #555; line-height: 1.6;
  display: flex; align-items: flex-start; gap: 8px;
}
.setup-steps li::before { content: '→'; color: ${GOLD}; font-weight: 700; flex-shrink: 0; }
.setup-steps a { color: ${GOLD}; font-weight: 600; text-decoration: none; }
.setup-steps a:hover { text-decoration: underline; }
.code-tag {
  font-family: monospace; font-size: 12px;
  background: #f4f2ee; padding: 2px 8px;
  border: 1px solid #ddd; color: #333; border-radius: 2px;
}

/* Placeholder grid */
.ph-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}
.ph-card {
  position: relative; overflow: hidden; cursor: pointer;
  background: #ddd;
}
.ph-card:nth-child(1) { grid-row: span 2; }
.ph-card:nth-child(7) { grid-column: span 2; }
.ph-inner {
  width: 100%; min-height: 300px; height: 100%;
  display: flex; align-items: center; justify-content: center;
  font-size: clamp(44px,5vw,72px);
  transition: transform .55s cubic-bezier(.25,.46,.45,.94), filter .35s;
  filter: grayscale(15%) brightness(.88);
}
.ph-card:hover .ph-inner { transform: scale(1.07); filter: grayscale(0%) brightness(1); }
.ph-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,.88) 0%, transparent 52%);
  opacity: 0; transition: opacity .3s;
  display: flex; flex-direction: column; justify-content: flex-end; padding: 26px;
}
.ph-card:hover .ph-overlay { opacity: 1; }
.ph-play {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%,-50%) scale(.75);
  width: 58px; height: 58px; border-radius: 50%;
  background: rgba(184,134,11,.92);
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; padding-left: 4px; color: #fff;
  opacity: 0; transition: all .3s;
}
.ph-card.video:hover .ph-play { opacity: 1; transform: translate(-50%,-50%) scale(1); }
.ph-title {
  font-family: 'Playfair Display', serif;
  font-size: 17px; font-weight: 700; color: #fff;
}
.ph-meta {
  font-size: 10px; font-weight: 700; letter-spacing: .2em;
  text-transform: uppercase; color: ${GOLD}; margin-top: 4px;
}
.ph-badge {
  position: absolute; top: 14px; left: 14px;
  font-size: 9px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase;
  padding: 5px 12px; background: rgba(244,242,238,.92); color: #111;
  backdrop-filter: blur(8px);
}
.load-more-wrap { text-align: center; margin-top: 48px; }
.btn-load {
  font-size: 11px; font-weight: 700; letter-spacing: .25em; text-transform: uppercase;
  padding: 16px 52px; background: transparent; border: 2px solid #111; color: #111;
  cursor: pointer; transition: all .2s; text-decoration: none; display: inline-block;
}
.btn-load:hover { background: #111; color: #f4f2ee; }

/* ── SERVICES ────────────────────────────────────────────────── */
#services { background: #111; color: #f4f2ee; }
.srv-inner { max-width: 1340px; margin: 0 auto; }
.srv-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2px; margin-top: 60px; }
.srv-card {
  padding: 52px 40px; background: #191919;
  position: relative; overflow: hidden;
  transition: background .3s, transform .3s;
}
.srv-card:hover { background: #222; transform: translateY(-5px); }
.srv-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0;
  height: 2px; background: ${GOLD};
}
.srv-num {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 100px; color: rgba(255,255,255,.025);
  position: absolute; top: 10px; right: 16px; line-height: 1;
}
.srv-icon { font-size: 34px; margin-bottom: 24px; display: block; }
.srv-name {
  font-family: 'Playfair Display', serif;
  font-size: 26px; font-weight: 700; margin-bottom: 12px;
  color: #f4f2ee;
}
.srv-name em { font-style: italic; color: ${GOLD}; }
.srv-desc {
  font-size: 14px; font-weight: 300;
  color: rgba(244,242,238,.5); line-height: 1.8; margin-bottom: 28px;
}
.pkg-list { list-style: none; display: flex; flex-direction: column; }
.pkg {
  padding: 13px 0; border-bottom: 1px solid rgba(255,255,255,.06);
  display: flex; justify-content: space-between; align-items: center;
  font-size: 13px; color: rgba(244,242,238,.45);
  transition: color .2s, padding-left .2s;
}
.pkg:hover { color: #f4f2ee; padding-left: 8px; }
.pkg-price {
  font-family: 'Playfair Display', serif;
  font-size: 18px; color: ${GOLD};
}

/* ── BOOKING ─────────────────────────────────────────────────── */
#booking { background: #fff; }
.bk-wrap { max-width: 1200px; margin: 0 auto; }
.bk-grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 80px; margin-top: 60px; align-items: start; }
.bk-aside h3 { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; margin-bottom: 14px; }
.bk-aside p { font-size: 14px; color: #666; line-height: 1.85; margin-bottom: 32px; }
.avail-box { padding: 22px 24px; background: #f4f2ee; border-left: 3px solid ${GOLD}; margin-bottom: 12px; }
.avail-tag { font-size: 9px; font-weight: 700; letter-spacing: .3em; text-transform: uppercase; color: ${GOLD}; margin-bottom: 6px; }
.avail-val { font-size: 17px; font-weight: 500; display: flex; align-items: center; gap: 8px; }
.dot-live {
  width: 8px; height: 8px; border-radius: 50%; background: #22c55e;
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,.4); }
  50%      { box-shadow: 0 0 0 6px rgba(34,197,94,0); }
}
.contact-rows { margin-top: 28px; display: flex; flex-direction: column; gap: 13px; }
.crow { display: flex; align-items: center; gap: 12px; font-size: 14px; color: #444; }
.crow-icon { font-size: 20px; }
.form-wrap { display: flex; flex-direction: column; gap: 3px; }
.form-row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 3px; }
.fg { display: flex; flex-direction: column; }
.fl {
  font-size: 9px; font-weight: 700; letter-spacing: .3em; text-transform: uppercase;
  color: #999; padding: 14px 18px 0; background: #f4f2ee;
}
.fi, .fsel, .fta {
  background: #f4f2ee; border: none; border-bottom: 2px solid transparent;
  padding: 8px 18px 16px;
  font-family: 'Outfit', sans-serif; font-size: 15px; color: #111;
  outline: none; transition: border-color .2s, background .2s;
  -webkit-appearance: none;
}
.fi:focus, .fsel:focus, .fta:focus { border-bottom-color: ${GOLD}; background: #ebe7df; }
.fsel { cursor: pointer; }
option { background: #f4f2ee; }
.fta { resize: none; height: 130px; line-height: 1.6; }
.budget-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 3px; }
.bopt {
  padding: 16px 8px; background: #f4f2ee; text-align: center; cursor: pointer;
  font-size: 11px; font-weight: 600; letter-spacing: .1em; color: #888;
  border: 2px solid transparent; transition: all .2s;
}
.bopt.sel, .bopt:hover { background: #111; color: #f4f2ee; border-color: #111; }
.fsub {
  margin-top: 6px; padding: 20px;
  background: #111; color: #f4f2ee;
  font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 700;
  letter-spacing: .25em; text-transform: uppercase;
  border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 12px;
  transition: all .25s; position: relative; overflow: hidden;
}
.fsub::before {
  content: ''; position: absolute; inset: 0;
  background: ${GOLD}; transform: scaleX(0); transform-origin: left; transition: transform .35s;
}
.fsub:hover::before { transform: scaleX(1); }
.fsub > * { position: relative; z-index: 1; }
.fsub:disabled { opacity: .55; cursor: not-allowed; }
.form-note { font-size: 11px; color: #aaa; margin-top: 8px; text-align: center; letter-spacing: .05em; }
.err-box { padding: 12px 18px; background: #fff0f0; border: 1px solid #fca5a5; color: #b91c1c; font-size: 13px; }
.success-wrap {
  padding: 80px 48px; background: #f4f2ee;
  text-align: center; display: flex; flex-direction: column; align-items: center; gap: 20px;
}
.success-icon { font-size: 60px; animation: popIn .5s ease both; }
@keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }
.success-wrap h3 { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; }
.success-wrap p { color: #666; font-size: 15px; line-height: 1.8; max-width: 420px; }

/* ── TESTIMONIALS ────────────────────────────────────────────── */
#testimonials { background: #f4f2ee; }
.t-grid {
  display: grid; grid-template-columns: repeat(3,1fr);
  gap: 6px; max-width: 1440px; margin: 60px auto 0;
}
.tcard {
  padding: 52px 40px; background: #fff;
  position: relative; overflow: hidden;
  transition: transform .3s, box-shadow .3s;
}
.tcard:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,0,0,.08); }
.tcard::before {
  content: '"'; font-family: 'Playfair Display', serif;
  font-size: 140px; font-weight: 900; color: rgba(184,134,11,.06);
  position: absolute; top: -20px; left: 20px; line-height: 1;
}
.stars { color: ${GOLD}; font-size: 14px; margin-bottom: 16px; letter-spacing: 2px; }
.ttext {
  font-family: 'Playfair Display', serif; font-size: 17px; font-style: italic;
  line-height: 1.8; color: #222; margin-bottom: 28px; position: relative; z-index: 1;
}
.tauthor { display: flex; align-items: center; gap: 14px; }
.tavatar {
  width: 46px; height: 46px; border-radius: 50%;
  background: linear-gradient(135deg, ${GOLD}, #7a5a00);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700;
  color: #fff; flex-shrink: 0;
}
.tname { font-size: 14px; font-weight: 700; color: #111; }
.trole { font-size: 11px; color: ${GOLD}; margin-top: 3px; letter-spacing: .05em; }

/* ── SOCIAL / NEWSLETTER ─────────────────────────────────────── */
#social { background: #111; color: #f4f2ee; padding: 100px 64px; }
.soc-inner { max-width: 1440px; margin: 0 auto; }
.soc-head {
  display: flex; justify-content: space-between; align-items: flex-end;
  margin-bottom: 40px; flex-wrap: wrap; gap: 24px;
}
.soc-title { font-family: 'Playfair Display', serif; font-size: clamp(28px,4vw,52px); font-weight: 900; }
.soc-title em { font-style: italic; color: ${GOLD}; }
.soc-right { display: flex; flex-direction: column; align-items: flex-end; gap: 12px; }
.soc-sub { font-size: 13px; color: rgba(244,242,238,.4); line-height: 1.7; max-width: 300px; text-align: right; }
.ig-link {
  display: inline-flex; align-items: center; gap: 10px;
  font-size: 11px; font-weight: 700; letter-spacing: .15em; text-transform: uppercase;
  color: ${GOLD}; text-decoration: none;
  border: 1px solid rgba(184,134,11,.4); padding: 12px 24px;
  transition: all .2s;
}
.ig-link:hover { background: rgba(184,134,11,.1); border-color: ${GOLD}; }
.nl-wrap { max-width: 620px; margin: 72px auto 0; text-align: center; }
.nl-wrap h3 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(22px,3vw,36px); font-weight: 700; margin-bottom: 10px;
}
.nl-wrap p { font-size: 14px; color: rgba(244,242,238,.45); margin-bottom: 28px; line-height: 1.7; }
.nl-form { display: flex; }
.nl-in {
  flex: 1; padding: 16px 24px;
  background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.1);
  border-right: none;
  font-family: 'Outfit', sans-serif; font-size: 14px; color: #f4f2ee; outline: none;
}
.nl-in::placeholder { color: rgba(255,255,255,.3); }
.nl-in:focus { border-color: rgba(184,134,11,.5); }
.nl-btn {
  padding: 16px 32px; background: ${GOLD}; color: #fff; border: none;
  font-family: 'Outfit', sans-serif; font-size: 11px; font-weight: 800;
  letter-spacing: .2em; text-transform: uppercase; cursor: pointer; transition: background .2s;
}
.nl-btn:hover { background: ${GOLD2}; }
.nl-done { color: ${GOLD}; font-weight: 700; letter-spacing: .1em; font-size: 14px; }

/* ── FOOTER ──────────────────────────────────────────────────── */
footer { background: #080808; color: rgba(244,242,238,.45); padding: 64px; }
.ft-inner { max-width: 1440px; margin: 0 auto; }
.ft-top {
  display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 60px; padding-bottom: 56px;
  border-bottom: 1px solid rgba(255,255,255,.05);
}
.ft-logo {
  font-family: 'Playfair Display', serif;
  font-size: 26px; font-weight: 900; color: #f4f2ee;
  margin-bottom: 16px; display: block; text-decoration: none;
}
.ft-logo em { font-style: italic; color: ${GOLD}; }
.ft-bio { font-size: 14px; line-height: 1.8; max-width: 280px; }
.ft-heading {
  font-size: 9px; font-weight: 700; letter-spacing: .35em; text-transform: uppercase;
  color: ${GOLD}; margin-bottom: 20px;
}
.ft-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.ft-links a { font-size: 14px; color: rgba(244,242,238,.4); text-decoration: none; transition: color .2s; }
.ft-links a:hover { color: #f4f2ee; }
.ft-bottom {
  padding-top: 32px; display: flex; justify-content: space-between;
  align-items: center; flex-wrap: wrap; gap: 16px;
}
.ft-copy { font-size: 12px; letter-spacing: .05em; }
.socials { display: flex; gap: 10px; }
.slink {
  width: 40px; height: 40px; border: 1px solid rgba(255,255,255,.09);
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 700; color: rgba(244,242,238,.35);
  text-decoration: none; transition: all .2s; letter-spacing: .04em;
}
.slink:hover { border-color: ${GOLD}; color: ${GOLD}; background: rgba(184,134,11,.06); }

/* ── RESPONSIVE ──────────────────────────────────────────────── */
@media (max-width: 1080px) {
  .nav, .nav.solid { padding: 18px 32px; }
  .nav-links { display: none; }
  section { padding: 80px 32px; }
  #social { padding: 80px 32px; }
  footer { padding: 56px 32px; }
  .hero-content { padding: 0 32px 80px; }
  .hero-scroll { right: 32px; }
  .srv-grid { grid-template-columns: 1fr; }
  .bk-grid { grid-template-columns: 1fr; gap: 40px; }
  .t-grid { grid-template-columns: 1fr; }
  .ph-grid { grid-template-columns: 1fr 1fr; }
  .ph-card:nth-child(1) { grid-row: span 1; }
  .ph-card:nth-child(7) { grid-column: span 1; }
  .ft-top { grid-template-columns: 1fr 1fr; gap: 40px; }
  .works-top { flex-direction: column; align-items: flex-start; }
  .soc-right { align-items: flex-start; }
  .soc-sub { text-align: left; }
}
@media (max-width: 640px) {
  .hero-h1 { font-size: clamp(56px,16vw,90px); }
  .hero-bottom { flex-direction: column; align-items: flex-start; }
  .hero-stats { gap: 24px; }
  .ph-grid { grid-template-columns: 1fr; }
  .budget-grid { grid-template-columns: 1fr 1fr; }
  .form-row2 { grid-template-columns: 1fr; }
  .nl-form { flex-direction: column; }
  .nl-in { border-right: 1px solid rgba(255,255,255,.1); border-bottom: none; }
  .ft-top { grid-template-columns: 1fr; }
  .ft-bottom { flex-direction: column; text-align: center; }
  .soc-head { flex-direction: column; align-items: flex-start; }
}
`;

/* ─────────────────────────────────────────────────────────────── */

export default function App() {
  const [scrolled,  setScrolled]  = useState(false);
  const [budget,    setBudget]    = useState(null);
  const [sending,   setSending]   = useState(false);
  const [sent,      setSent]      = useState(false);
  const [sendErr,   setSendErr]   = useState(null);
  const [nlEmail,   setNlEmail]   = useState("");
  const [nlDone,    setNlDone]    = useState(false);
  const [form, setForm] = useState({ name:"", email:"", phone:"", service:"", date:"", message:"" });

  const isConfigured = BEHOLD_FEED_ID !== "YOUR_BEHOLD_FEED_ID";

  /* Inject Behold widget script once Feed ID is set */
  useEffect(() => {
    if (!isConfigured) return;
    const s = document.createElement("script");
    s.src  = "https://w.behold.so/widget.js";
    s.type = "module";
    document.head.appendChild(s);
    return () => { try { document.head.removeChild(s); } catch(_) {} };
  }, [isConfigured]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.service) {
      setSendErr("Please fill in your name, email, and service type.");
      return;
    }
    const msg =
      `Hi Kayxmedia! 👋 I'd like to book a session.\n\n` +
      `*Name:* ${form.name}\n` +
      `*Email:* ${form.email}\n` +
      `*Phone:* ${form.phone || "Not provided"}\n` +
      `*Service:* ${form.service}\n` +
      `*Preferred Date:* ${form.date || "Flexible"}\n` +
      `*Budget:* ${budget || "Not specified"}\n` +
      `*Message:* ${form.message || "No additional notes."}`;

    const url = `https://wa.me/233597617967?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    setSent(true);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{CSS}</style>

      {/* ── NAV ── */}
      <nav className={scrolled ? "nav solid" : "nav"}>
        <span onClick={() => scrollTo("home")} className="logo" style={{cursor:"pointer"}}>
          <span className="logo-k">K</span>ayxmedia
        </span>
        <ul className="nav-links">
          {[["Works","works"],["Services","services"],["Booking","booking"],["Contact","social"]].map(([label,id]) => (
            <li key={id}><span onClick={() => scrollTo(id)} style={{cursor:"pointer"}}>{label}</span></li>
          ))}
        </ul>
        <button onClick={() => scrollTo("booking")} className="nav-cta">Book Now</button>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="home">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-glow2" />
        <div className="hero-content">
          <div className="hero-eyebrow">Videographer · Creator · @kayxmedia_ · @n.kayx</div>
          <h1 className="hero-h1">
            KAYX<span className="gold">✦</span><br />
            <span className="outline">MEDIA</span>
          </h1>
          <div className="hero-bottom">
            <p className="hero-desc">
              <strong>4K cinematic productions</strong> that move audiences and build brands.
              Music videos, brand films, and event coverage — paired with an engaged
              community of over 1M across Instagram.
            </p>
            <div className="hero-btns">
              <button onClick={() => scrollTo("booking")} className="btn-gold">Book a Shoot →</button>
              <button onClick={() => scrollTo("works")} className="btn-ghost">View Work</button>
            </div>
          </div>
          <div className="hero-stats">
            {[
              ["1.2M", "<em>+</em> Followers"],
              ["8.4",  "<em>%</em> Engagement"],
              ["200<em>+</em>", "Projects"],
              ["4K",  "<em>/</em>ProRes"],
            ].map(([v, l], i) => (
              <div key={i}>
                <div className="sv" dangerouslySetInnerHTML={{ __html: v }} />
                <div className="sl" dangerouslySetInnerHTML={{ __html: l }} />
              </div>
            ))}
          </div>
        </div>
        <div className="hero-scroll">
          <div className="hero-scroll-bar" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker">
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
            <div key={i} className="ti">{t}<span>✦</span></div>
          ))}
        </div>
      </div>

      {/* ── WORKS / INSTAGRAM ── */}
      <section id="works">
        <div className="works-top">
          <div>
            <div className="sec-label">Portfolio</div>
            <h2 className="sec-title">Latest <em>Works</em></h2>
          </div>
          <div className="ig-badge">
            <div className="ig-badge-dot" />
            <span>Live from <strong>@kayxmedia_</strong> on Instagram</span>
          </div>
        </div>

        <div className="behold-wrap">
          {/* ── LIVE BEHOLD FEED (active once Feed ID is pasted in) ── */}
          {isConfigured && (
            <behold-widget feed-id={BEHOLD_FEED_ID} />
          )}

          {/* ── SETUP GUIDE + PREVIEW GRID (shown until configured) ── */}
          {!isConfigured && (
            <>
              <div className="setup-notice">
                <div className="setup-icon">📸</div>
                <div>
                  <div className="setup-title">Connect @kayxmedia_ — 3-minute setup at behold.so (free)</div>
                  <ul className="setup-steps">
                    <li>Sign up free at <a href="https://behold.so" target="_blank" rel="noreferrer">behold.so</a> — no credit card needed</li>
                    <li>Go to <strong>Sources → Add Source</strong> and log into your <strong>@kayxmedia_</strong> Instagram account <em>(must be Business or Creator)</em></li>
                    <li>Go to <strong>Feeds → Add Feed → User Feed</strong>, customise the layout, then copy your <strong>Feed ID</strong></li>
                    <li>Open this file and replace <span className="code-tag">YOUR_BEHOLD_FEED_ID</span> at the very top with your copied ID</li>
                    <li>Your real @kayxmedia_ videos will auto-appear here and update every time you post!</li>
                  </ul>
                </div>
              </div>

              <div className="ph-grid">
                {PLACEHOLDERS.map((p, i) => (
                  <div key={i} className={`ph-card${p.type === "video" ? " video" : ""}`}>
                    <div className="ph-inner" style={{ background: p.bg }}>{p.emoji}</div>
                    <div className="ph-overlay">
                      <div className="ph-title">@kayxmedia_</div>
                      <div className="ph-meta">{p.label}</div>
                    </div>
                    {p.type === "video" && <div className="ph-play">▶</div>}
                    <div className="ph-badge">{p.type === "video" ? "▶ Video" : "◼ Photo"}</div>
                  </div>
                ))}
              </div>

              <div className="load-more-wrap">
                <a href="https://instagram.com/kayxmedia_" target="_blank" rel="noreferrer" className="btn-load">
                  View All on Instagram →
                </a>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services">
        <div className="srv-inner">
          <div className="sec-label">What I Offer</div>
          <h2 className="sec-title" style={{ color: "#f4f2ee" }}>
            Services &amp; <em>Packages</em>
          </h2>
          <div className="srv-grid">
            {SERVICES.map((s, i) => (
              <div key={i} className="srv-card">
                <div className="srv-num">{s.num}</div>
                <span className="srv-icon">{s.icon}</span>
                <div className="srv-name">{s.name}</div>
                <div className="srv-desc">{s.desc}</div>
                <ul className="pkg-list">
                  {s.packages.map(([n, p]) => (
                    <li key={n} className="pkg">
                      <span>{n}</span>
                      <span className="pkg-price">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING ── */}
      <section id="booking">
        <div className="bk-wrap">
          <div className="sec-label">Let's Collaborate</div>
          <h2 className="sec-title">Book a <em>Shoot</em></h2>
          <div className="bk-grid">

            {/* Aside info */}
            <div className="bk-aside">
              <h3>Start your next project</h3>
              <p>
                Fill out the brief and I'll respond within 24 hours with a tailored
                proposal for your vision, timeline, and budget.
              </p>
              <div className="avail-box">
                <div className="avail-tag">Availability</div>
                <div className="avail-val">
                  <span className="dot-live" /> Accepting Projects — Q3 2026
                </div>
              </div>
              <div className="avail-box" style={{ borderColor: GOLD2 }}>
                <div className="avail-tag">Response Time</div>
                <div className="avail-val" style={{ fontSize: 16 }}>Within 24 hours</div>
              </div>
              <div className="contact-rows">
                <div className="crow"><span className="crow-icon">💬</span> WhatsApp: +233 597 617 967</div>
                <div className="crow"><span className="crow-icon">📸</span> @kayxmedia_ on Instagram</div>
                <div className="crow"><span className="crow-icon">🎵</span> @n.kayx on TikTok</div>
                <div className="crow"><span className="crow-icon">📍</span> Shooting worldwide</div>
              </div>
            </div>

            {/* Form / Success */}
            {sent ? (
              <div className="success-wrap">
                <div className="success-icon">✅</div>
                <h3>Opening WhatsApp!</h3>
                <p>
                  Your booking details are pre-filled and ready to send on WhatsApp.
                  If it didn't open automatically,{" "}
                  <a href="https://wa.me/233597617967" target="_blank" rel="noreferrer" style={{color:"#b8860b"}}>click here</a>.
                </p>
                <button onClick={() => scrollTo("works")} className="btn-gold" style={{ marginTop: 8 }}>View Portfolio →</button>
              </div>
            ) : (
              <div className="form-wrap">
                <div className="form-row2">
                  <div className="fg">
                    <div className="fl">Full Name *</div>
                    <input className="fi" placeholder="Alex Rivera"
                      value={form.name} onChange={e => upd("name", e.target.value)} />
                  </div>
                  <div className="fg">
                    <div className="fl">Email Address *</div>
                    <input className="fi" type="email" placeholder="alex@brand.com"
                      value={form.email} onChange={e => upd("email", e.target.value)} />
                  </div>
                </div>
                <div className="form-row2">
                  <div className="fg">
                    <div className="fl">Phone (Optional)</div>
                    <input className="fi" placeholder="+1 (555) 000-0000"
                      value={form.phone} onChange={e => upd("phone", e.target.value)} />
                  </div>
                  <div className="fg">
                    <div className="fl">Preferred Date</div>
                    <input className="fi" type="date" style={{ colorScheme: "light" }}
                      value={form.date} onChange={e => upd("date", e.target.value)} />
                  </div>
                </div>
                <div className="fg">
                  <div className="fl">Service Type *</div>
                  <select className="fsel" value={form.service} onChange={e => upd("service", e.target.value)}>
                    <option value="">Select a service…</option>
                    <option>Music Video Production</option>
                    <option>Event Coverage</option>
                    <option>Brand Film</option>
                    <option>Sponsored Content</option>
                    <option>Brand Ambassadorship</option>
                    <option>UGC Package</option>
                    <option>Full Campaign</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="fg">
                  <div className="fl">Budget Range</div>
                  <div className="budget-grid">
                    {["GH₵ 3K–8K", "GH₵ 8K–20K", "GH₵ 20K–50K", "GH₵ 50K–100K", "GH₵ 100K+", "Let's Talk"].map(b => (
                      <div key={b} className={`bopt${budget === b ? " sel" : ""}`}
                        onClick={() => setBudget(b)}>{b}</div>
                    ))}
                  </div>
                </div>
                <div className="fg">
                  <div className="fl">Project Vision</div>
                  <textarea className="fta"
                    placeholder="Tell me about your project, goals, mood, and any creative direction…"
                    value={form.message} onChange={e => upd("message", e.target.value)} />
                </div>
                {sendErr && <div className="err-box">{sendErr}</div>}
                <button className="fsub" onClick={handleSubmit} disabled={sending}>
                  <span>{sending ? "Sending…" : "Send Inquiry"}</span>
                  <span>{sending ? "⏳" : "✦"}</span>
                </button>
                <p className="form-note">You'll be redirected to WhatsApp to send your booking</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials">
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div className="sec-label">Social Proof</div>
          <h2 className="sec-title">Client <em>Stories</em></h2>
        </div>
        <div className="t-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="tcard">
              <div className="stars">★★★★★</div>
              <p className="ttext">"{t.text}"</p>
              <div className="tauthor">
                <div className="tavatar">{t.initial}</div>
                <div>
                  <div className="tname">{t.name}</div>
                  <div className="trole">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SOCIAL / NEWSLETTER ── */}
      <section id="social" style={{ padding: "100px 64px" }}>
        <div className="soc-inner">
          <div className="soc-head">
            <div>
              <div className="sec-label" style={{ color: GOLD }}>Follow the Journey</div>
              <h2 className="soc-title">Stay <em>Inspired</em></h2>
            </div>
            <div className="soc-right">
              <p className="soc-sub">
                Daily content drops, behind the scenes, and collab announcements — all on Instagram.
              </p>
              <a href="https://instagram.com/kayxmedia_" target="_blank" rel="noreferrer" className="ig-link">
                Follow @kayxmedia_ →
              </a>
            </div>
          </div>

          <div className="nl-wrap">
            <h3>Follow Our <em style={{ fontStyle: "italic", color: GOLD }}>Updates</em></h3>
            <p>
              Subscribe to receive the hottest news, project drops, and future event information!
            </p>
            {nlDone ? (
              <p className="nl-done">✦ You're on the list — thank you!</p>
            ) : (
              <div className="nl-form">
                <input className="nl-in" placeholder="Your email *"
                  value={nlEmail} onChange={e => setNlEmail(e.target.value)} />
                <button className="nl-btn" onClick={() => { if (nlEmail) setNlDone(true); }}>
                  Subscribe
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="ft-inner">
          <div className="ft-top">
            <div>
              <a href="#home" className="ft-logo"><em>K</em>ayxmedia</a>
              <p className="ft-bio">
                Cinematic storytelling for brands and artists who refuse to be ordinary.
                Based in Ghana. Shooting worldwide.
              </p>
            </div>
            <div>
              <div className="ft-heading">Services</div>
              <ul className="ft-links">
                {["Music Videos","Event Coverage","Brand Films","Sponsored Content","UGC Creation"].map(l => (
                  <li key={l}><a onClick={(e) => { e.preventDefault(); scrollTo("services"); }} href="#">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="ft-heading">Work</div>
              <ul className="ft-links">
                {["Portfolio","2026 Reel","Case Studies","Behind Scenes","Process"].map(l => (
                  <li key={l}>
                    {l === "Portfolio" ? (
                      <a href="https://instagram.com/kayxmedia_" target="_blank" rel="noreferrer">{l}</a>
                    ) : (
                      <a onClick={(e) => { e.preventDefault(); scrollTo("works"); }} href="#">{l}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="ft-heading">Contact</div>
              <ul className="ft-links">
                <li><a onClick={(e) => { e.preventDefault(); scrollTo("booking"); }} href="#">Book a Shoot</a></li>
                <li><a onClick={(e) => { e.preventDefault(); scrollTo("booking"); }} href="#">Brand Partnerships</a></li>
                <li><a onClick={(e) => { e.preventDefault(); scrollTo("booking"); }} href="#">Press Inquiries</a></li>
                <li><a href="https://wa.me/233597617967" target="_blank" rel="noreferrer">WhatsApp: +233 597 617 967</a></li>
              </ul>
            </div>
          </div>
          <div className="ft-bottom">
            <p className="ft-copy">© 2026 Kayxmedia. All rights reserved.</p>
            <div className="socials">
              {[["IG","https://instagram.com/kayxmedia_"],["TT","https://tiktok.com/@n.kayx"],["YT","#"],["LI","#"]].map(([s,h]) => (
                <a key={s} href={h} target="_blank" rel="noreferrer" className="slink">{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
