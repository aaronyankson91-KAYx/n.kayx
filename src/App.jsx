import { useState, useEffect } from "react";
import kayxPhoto from "./kayxphoto.jpg";
import kayxPhoto2 from "./kayxphoto2.png";

const BEHOLD_FEED_ID      = "bmUXFJTJv80LKNubKoJn";
const EMAILJS_SERVICE_ID  = "service_wmc7j4b";
const EMAILJS_TEMPLATE_ID = "template_sdmxzb9";
const EMAILJS_PUBLIC_KEY  = "UrchJkO_WRa51qjYd";

const GOLD  = "#555555";
const GOLD2 = "#777777";

const PLACEHOLDERS = [
  { emoji:"🎬", label:"Music Video",    type:"video", bg:"linear-gradient(135deg,#e8e8e8,#d0d0d0)" },
  { emoji:"📸", label:"Brand Shoot",    type:"photo", bg:"linear-gradient(135deg,#ebebeb,#d5d5d5)" },
  { emoji:"🎥", label:"Event Coverage", type:"video", bg:"linear-gradient(135deg,#e5e5e5,#cccccc)" },
  { emoji:"✨", label:"Campaign",       type:"photo", bg:"linear-gradient(135deg,#eeeeee,#d8d8d8)" },
  { emoji:"🎞️", label:"Short Film",     type:"video", bg:"linear-gradient(135deg,#e0e0e0,#c8c8c8)" },
  { emoji:"🏙️", label:"Aerial Reel",    type:"video", bg:"linear-gradient(135deg,#e8e8e8,#d4d4d4)" },
  { emoji:"💎", label:"Product Launch", type:"photo", bg:"linear-gradient(135deg,#ececec,#dedede)" },
  { emoji:"🌟", label:"Collab Drop",    type:"video", bg:"linear-gradient(135deg,#e6e6e6,#d2d2d2)" },
  { emoji:"🔥", label:"Reel",           type:"video", bg:"linear-gradient(135deg,#e9e9e9,#d6d6d6)" },
];

const TESTIMONIALS = [
  { text:"The music video exceeded every expectation. Storytelling, colour grade, direction — pure cinema from start to finish.", name:"Marcus Webb",  role:"Recording Artist",          initial:"M" },
  { text:"Kayxmedia transformed our brand campaign entirely. Every frame is intentional, luxurious, and deeply considered.",     name:"Sarah Chen",   role:"Marketing Director, LUXE",   initial:"S" },
  { text:"Our campaign hit 2M impressions in 48 hours. Authentic content that actually converts — highly recommended.",          name:"Priya Sharma", role:"Partnerships Lead, Adidas",  initial:"P" },
];

const TICKER_ITEMS = ["Music Videos","Brand Films","Event Coverage","Influencer Content","UGC Creation","4K Cinema","Colour Grading","Visual Storytelling","@kayxmedia_"];

const SHOOT_PACKAGES = [
  {
    tier:"Starter", price:"GH₵ 3,500", emoji:"🎬",
    tagline:"Perfect for individuals, upcoming artists & small brands",
    includes:[
      "2-hour shoot session",
      "1 location",
      "2 final edited deliverables",
      "Basic colour correction",
      "1 round of revisions",
      "Delivery within 5 business days",
    ],
    bestFor:"Social media content, quick promos, personal brand visuals",
  },
  {
    tier:"Standard", price:"GH₵ 8,000", emoji:"🎥",
    tagline:"Ideal for growing brands & serious content creators",
    includes:[
      "Half-day shoot (4 hours)",
      "2 locations",
      "5 final edited deliverables",
      "Full professional colour grade",
      "Licensed background music",
      "2 rounds of revisions",
      "Delivery within 7 business days",
    ],
    bestFor:"Brand campaigns, music visuals, product launches, event highlights",
  },
  {
    tier:"Premium", price:"GH₵ 18,000", emoji:"💎",
    tagline:"For brands & artists who demand the highest quality",
    includes:[
      "Full-day shoot (8 hours)",
      "Multiple locations",
      "10 final edited deliverables",
      "Cinematic 4K colour grade",
      "Licensed music + sound design",
      "Drone / aerial shots (where available)",
      "Unlimited revisions",
      "Priority 5-day delivery",
      "Behind-the-scenes content included",
    ],
    bestFor:"Full brand campaigns, music videos, commercial films, luxury product shoots",
  },
];

const SERVICES = [
  {
    icon:"🎬", num:"01", name:"Video Production",
    desc:"4K ProRes productions with professional colour grading. From concept to delivery, every frame is intentional and crafted with precision.",
    packages:[["Music Video","GH₵ 5,000 – 15,000"],["Event Highlight","GH₵ 2,000 – 6,000"],["Brand Film (30–90 sec)","GH₵ 8,000 – 18,000"],["UGC Package (5 Assets)","GH₵ 2,500 – 5,000"]],
  },
  {
    icon:"📦", num:"02", name:"Shoot Packages",
    desc:"Three clear tiers to match your vision and budget — hover each package below to see exactly what\'s included.",
    packages:null,
  },
  {
    icon:"✨", num:"03", name:"Full Campaign",
    desc:"Cinematic production combined with influencer distribution. One creative vision, maximum reach, measurable results.",
    packages:[["Brand / Product Shoot","GH₵ 3,500 – 8,000"],["Brand Campaign (Full)","GH₵ 15,000 – 35,000"],["Sponsored Content (Reel + Story)","GH₵ 5,000 – 10,000"],["Brand Ambassadorship","GH₵ 15,000/mo"],["Real Estate Film","Let\'s Talk →"]],
  },
];

const EXPERIENCE = [
  {
    period: "2022 – Present",
    role: "Creative Lead",
    focus: "Campaigns & Collaborations",
    points: [
      "Leading creative direction for multiple brand campaigns with a strong focus on visual storytelling.",
      "Coordinating production shoots, managing final edits, and overseeing the strategic rollout of media deliverables.",
      "Partnering directly with marketing teams to craft visibility campaigns that drive measurable results.",
    ],
  },
  {
    period: "2021 – Present",
    role: "Content Creator",
    focus: "Digital Storyteller",
    points: [
      "Developing high-quality photography, video, and written content for high-profile brands, events, and commercial campaigns.",
      "Managing content calendars, social media scheduling, and cross-platform community engagement.",
      "Analyzing performance metrics to actively optimize content for maximum reach, engagement, and conversion.",
    ],
  },
  {
    period: "2019 – 2021",
    role: "Content Producer",
    focus: "& Editor",
    points: [
      "Produced and edited high-performing videos, reels, and promotional materials that built brand awareness.",
      "Specialized in high-impact, short-form editing optimized for TikTok, Instagram Reels, and YouTube.",
    ],
  },
];

const BRANDS = [
  "Socialite AF","Pepsodent","Emy Africa","Echo Campus",
  "Signature Apartment","Routs & Routes","Future of Work",
  "Revvaled","KE&CO Creative Studio","DrDoGood",
];

const ACHIEVEMENTS = [
  { value:"200%+", label:"Engagement Growth",  desc:"Increased social engagement for multiple brands using targeted short-form content strategies." },
  { value:"50+",   label:"Campaign Shoots",    desc:"Professional shoots spanning lifestyle, live events, and commercial product promotions across Ghana and internationally." },
  { value:"100M+", label:"Total Views",         desc:"Collective impact across a content production career working with 10+ local and international brands." },
];

/* ─── STYLES ────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&family=Bebas+Neue&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { background:#fafaf9; color:#111; font-family:'DM Sans',sans-serif; overflow-x:hidden; }
::-webkit-scrollbar { width:3px; }
::-webkit-scrollbar-track { background:#fff; }
::-webkit-scrollbar-thumb { background:${GOLD}; border-radius:2px; }

/* NAV */
.nav {
  position:fixed; top:0; left:0; right:0; z-index:200;
  display:flex; align-items:center; justify-content:space-between;
  padding:26px 64px;
  transition:all .5s cubic-bezier(.16,1,.3,1);
}
.nav.solid {
  background:rgba(244,242,238,.97); backdrop-filter:blur(20px);
  padding:16px 64px;
  border-bottom:1px solid rgba(0,0,0,.07);
  box-shadow:0 4px 40px rgba(0,0,0,.05);
}
.logo {
  font-family:'Cormorant Garamond',serif;
  font-size:20px; font-weight:900; letter-spacing:.06em;
  color:#fafaf9; text-decoration:none;
  display:flex; align-items:center; gap:2px; transition:color .3s; cursor:pointer;
}
.nav.solid .logo { color:#111; }
.logo-k { font-style:italic; color:${GOLD}; }
.nav-links { display:flex; gap:38px; list-style:none; }
.nav-links a {
  font-size:10px; font-weight:700; letter-spacing:.22em; text-transform:uppercase;
  color:rgba(244,242,238,.7); text-decoration:none; transition:color .2s;
  position:relative; cursor:pointer;
}
.nav.solid .nav-links a { color:#666; }
.nav-links a::after {
  content:''; position:absolute; bottom:-4px; left:0;
  width:0; height:1px; background:${GOLD}; transition:width .3s;
}
.nav-links a:hover { color:#111; }
.nav-links a:hover::after { width:100%; }
.nav-cta {
  font-size:10px; font-weight:800; letter-spacing:.2em; text-transform:uppercase;
  background:#333; color:#111; padding:12px 30px;
  border:none; cursor:pointer; text-decoration:none; transition:all .2s;
}
.nav-cta:hover { background:${GOLD}; color:#fff; transform:translateY(-1px); }

/* HERO */
.hero {
  min-height:100vh; background:#111;
  display:flex; align-items:stretch;
  position:relative; overflow:hidden;
  animation:heroFadeIn 1.8s cubic-bezier(.16,1,.3,1) both;
}
@keyframes heroFadeIn { from{opacity:0} to{opacity:1} }
.hero-bg {
  position:absolute; inset:0; z-index:0;
  display:grid; grid-template-columns:1fr 1fr;
}
.hero-bg-photo {
  width:100%; height:100%; object-fit:cover; object-position:center top; display:block;
  filter:grayscale(10%) contrast(1.05) brightness(0.45);
}
.hero-bg-photo-2 {
  width:100%; height:100%; object-fit:cover; object-position:center top; display:block;
  filter:grayscale(10%) contrast(1.05) brightness(0.4);
}
.hero-bg-overlay {
  position:absolute; inset:0; z-index:1;
  background:
    linear-gradient(to right,rgba(10,10,10,.82) 0%,rgba(10,10,10,.45) 50%,rgba(10,10,10,.65) 100%),
    linear-gradient(to top,rgba(10,10,10,.9) 0%,transparent 40%);
}
.hero-grid {
  position:absolute; inset:0; z-index:1;
  background-image:
    linear-gradient(rgba(255,255,255,.012) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.012) 1px,transparent 1px);
  background-size:64px 64px;
}
.hero-glow {
  position:absolute; width:700px; height:700px; border-radius:50%;
  background:radial-gradient(circle,rgba(150,150,150,.09) 0%,transparent 68%);
  top:-150px; right:-150px; z-index:1;
  animation:glowDrift 9s ease-in-out infinite;
}
.hero-glow2 {
  position:absolute; width:400px; height:400px; border-radius:50%;
  background:radial-gradient(circle,rgba(150,150,150,.05) 0%,transparent 70%);
  bottom:80px; left:-100px; z-index:1;
  animation:glowDrift 13s ease-in-out infinite reverse;
}
@keyframes glowDrift {
  0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-40px,40px) scale(1.08)}
}
.hero-content {
  position:relative; z-index:2;
  display:flex; width:100%; min-height:100vh; align-items:flex-end;
}
.hero-left {
  display:flex; flex-direction:column; justify-content:flex-end;
  padding:0 64px 90px; width:100%;
}
.hero-eyebrow {
  font-size:10px; font-weight:700; letter-spacing:.55em; text-transform:uppercase;
  color:${GOLD}; margin-bottom:22px;
  display:flex; align-items:center; gap:16px;
  animation:fadeUp .9s cubic-bezier(.16,1,.3,1) both;
}
.hero-eyebrow::before { content:''; width:36px; height:1px; background:${GOLD}; }
.hero-h1 {
  font-family:'Bebas Neue',sans-serif;
  font-size:clamp(72px,12vw,190px);
  line-height:.9; letter-spacing:.03em; color:#f5f4f2; margin-bottom:36px;
  animation:fadeUp .9s .15s cubic-bezier(.16,1,.3,1) both;
}
.hero-h1 .outline { -webkit-text-stroke:2px rgba(244,242,238,.55); color:transparent; }
.hero-h1 .gold { color:${GOLD}; }
.hero-bottom {
  display:flex; align-items:flex-end; justify-content:space-between;
  gap:40px; flex-wrap:wrap;
  animation:fadeUp .9s .3s cubic-bezier(.16,1,.3,1) both;
}
.hero-desc { font-size:15px; font-weight:300; color:rgba(244,242,238,.75); line-height:1.85; max-width:420px; }
.hero-desc strong { color:rgba(244,242,238,.95); font-weight:500; }
.hero-btns { display:flex; gap:14px; align-items:center; flex-wrap:wrap; }
.btn-gold {
  font-size:11px; font-weight:800; letter-spacing:.2em; text-transform:uppercase;
  background:${GOLD}; color:#fff; padding:15px 36px;
  border:none; cursor:pointer; text-decoration:none;
  display:inline-flex; align-items:center; gap:10px;
  transition:all .35s cubic-bezier(.16,1,.3,1);
  clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px));
}
.btn-gold:hover { background:${GOLD2}; transform:translateY(-3px); box-shadow:0 12px 32px rgba(0,0,0,.13); }
.btn-ghost {
  font-size:11px; font-weight:600; letter-spacing:.18em; text-transform:uppercase;
  background:transparent; color:rgba(244,242,238,.7);
  padding:14px 30px; border:1px solid rgba(244,242,238,.35);
  cursor:pointer; text-decoration:none; transition:all .2s;
}
.btn-ghost:hover { border-color:rgba(244,242,238,.8); color:#fff; background:rgba(255,255,255,.08); }
.hero-stats {
  display:flex; gap:52px; flex-wrap:wrap;
  animation:fadeUp .9s .45s cubic-bezier(.16,1,.3,1) both;
  padding-top:64px;
}
.sv { font-family:'Cormorant Garamond',serif; font-size:44px; font-weight:900; color:#f0ede8; line-height:1; }
.sv em { font-style:normal; color:${GOLD}; }
.sl { font-size:10px; font-weight:500; letter-spacing:.2em; text-transform:uppercase; color:rgba(244,242,238,.5); margin-top:5px; }
.hero-scroll {
  position:absolute; bottom:36px; right:64px; z-index:3;
  display:flex; flex-direction:column; align-items:center; gap:10px;
  font-size:9px; font-weight:700; letter-spacing:.35em; text-transform:uppercase;
  color:rgba(244,242,238,.45);
}
.hero-scroll-bar {
  width:1px; height:56px;
  background:linear-gradient(to bottom,${GOLD},transparent);
  animation:scrollPulse 2.2s ease-in-out infinite;
}
@keyframes scrollPulse { 0%,100%{opacity:.3;transform:scaleY(1)} 50%{opacity:1;transform:scaleY(1.15)} }
@keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }

/* TICKER */
.ticker { background:#333; overflow:hidden; padding:15px 0; border-top:1px solid #1e1e1e; border-bottom:1px solid #1e1e1e; }
.ticker-track { display:flex; animation:tick 30s linear infinite; white-space:nowrap; }
.ticker-track:hover { animation-play-state:paused; }
.ti { font-family:'Bebas Neue',sans-serif; font-size:13px; letter-spacing:.3em; color:rgba(244,242,238,.3); padding:0 44px; display:flex; align-items:center; gap:44px; }
.ti span { color:${GOLD}; font-size:16px; }
@keyframes tick { from{transform:translateX(0)} to{transform:translateX(-50%)} }

/* SHARED */
section { padding:120px 64px; position:relative; }
.sec-label {
  font-size:10px; font-weight:700; letter-spacing:.45em; text-transform:uppercase;
  color:${GOLD}; display:flex; align-items:center; gap:14px; margin-bottom:14px;
}
.sec-label::before { content:''; width:32px; height:1px; background:${GOLD}; }
.sec-title { font-family:'Cormorant Garamond',serif; font-size:clamp(34px,5vw,60px); font-weight:900; line-height:1.05; margin-bottom:12px; }
.sec-title em { font-style:italic; color:${GOLD}; }

/* ABOUT */
#about { background:#111110; color:#f0ede8; overflow:hidden; }
.about-inner { max-width:1340px; margin:0 auto; }
.about-grid { display:grid; grid-template-columns:1fr 1.1fr; gap:90px; align-items:center; margin-top:64px; }
.about-photo-wrap { position:relative; padding-bottom:24px; padding-right:24px; }
.about-photo-frame { position:relative; overflow:hidden; }
.about-photo-frame::before {
  content:''; position:absolute; top:-2px; left:-2px; right:22px; bottom:22px;
  border:1px solid rgba(150,150,150,.2); z-index:1; pointer-events:none;
}
.about-photo-frame::after {
  content:''; position:absolute; top:22px; left:22px; right:-2px; bottom:-2px;
  border:1px solid ${GOLD}; z-index:1; pointer-events:none;
}
.about-photo {
  width:100%; aspect-ratio:4/5; object-fit:cover; object-position:center top; display:block;
  filter:grayscale(15%) contrast(1.05) brightness(0.88);
  transition:filter .5s;
}
.about-photo-wrap:hover .about-photo { filter:grayscale(0%) brightness(1); }
.about-photo-badge {
  position:absolute; bottom:0; right:0;
  background:${GOLD}; padding:18px 24px; z-index:2;
}
.about-photo-badge-val { font-family:'Bebas Neue',sans-serif; font-size:38px; color:#fff; line-height:1; }
.about-photo-badge-label { font-size:9px; font-weight:700; letter-spacing:.22em; text-transform:uppercase; color:rgba(255,255,255,.75); margin-top:2px; }
.about-text { display:flex; flex-direction:column; gap:24px; }
#about .sec-label { color:${GOLD}; }
#about .sec-label::before { background:${GOLD}; }
#about .sec-title { color:#f0ede8; margin-bottom:0; }
.about-name { font-family:'Cormorant Garamond',serif; font-size:15px; font-weight:400; font-style:italic; color:rgba(240,237,232,.45); letter-spacing:.08em; margin-top:-8px; }
.about-bio { font-size:15px; font-weight:300; color:rgba(240,237,232,.72); line-height:1.95; border-left:2px solid ${GOLD}; padding-left:24px; }
.about-bio strong { color:#f0ede8; font-weight:500; }
.about-tags { display:flex; flex-wrap:wrap; gap:8px; }
.about-tag {
  font-size:10px; font-weight:700; letter-spacing:.18em; text-transform:uppercase;
  padding:8px 18px; border:1px solid rgba(150,150,150,.22); color:rgba(240,237,232,.5);
  transition:all .2s; cursor:default;
}
.about-tag:hover { border-color:${GOLD}; color:#f0ede8; }

/* EXPERIENCE */
#experience { background:#f5f4f2; }
.exp-inner { max-width:1340px; margin:0 auto; }
.exp-grid { display:grid; grid-template-columns:1fr 1.6fr; gap:80px; margin-top:64px; align-items:start; }
.exp-aside { position:sticky; top:120px; }
.exp-aside-title { font-family:'Cormorant Garamond',serif; font-size:clamp(24px,3vw,38px); font-weight:700; line-height:1.2; margin-bottom:16px; color:#111; }
.exp-aside-title em { font-style:italic; color:${GOLD}; }
.exp-aside-desc { font-size:14px; color:#666; line-height:1.85; margin-bottom:32px; }
.achievements { display:flex; flex-direction:column; gap:2px; }
.ach-card { padding:22px 24px; background:#fff; border-left:3px solid ${GOLD}; }
.ach-val { font-family:'Bebas Neue',sans-serif; font-size:36px; color:#111; line-height:1; }
.ach-label { font-size:10px; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:${GOLD}; margin:4px 0 6px; }
.ach-desc { font-size:13px; color:#777; line-height:1.65; }
.exp-timeline { display:flex; flex-direction:column; gap:2px; }
.exp-card {
  background:#fff; padding:40px 40px; border-left:0px solid transparent;
  transition:border-left-width .2s, padding-left .2s;
  cursor:default;
}
.exp-card:hover { border-left:3px solid ${GOLD}; padding-left:37px; }
.exp-period { font-size:10px; font-weight:700; letter-spacing:.3em; text-transform:uppercase; color:${GOLD}; margin-bottom:10px; }
.exp-role { font-family:'Cormorant Garamond',serif; font-size:26px; font-weight:700; color:#111; line-height:1.1; }
.exp-focus { font-family:'Cormorant Garamond',serif; font-size:18px; font-weight:400; font-style:italic; color:#999; margin-bottom:18px; }
.exp-points { display:flex; flex-direction:column; gap:10px; list-style:none; }
.exp-points li { font-size:14px; color:#555; line-height:1.75; display:flex; gap:12px; }
.exp-points li::before { content:'→'; color:${GOLD}; font-weight:700; flex-shrink:0; margin-top:1px; }

/* BRANDS */
#brands { background:#111110; padding:80px 64px; }
.brands-inner { max-width:1340px; margin:0 auto; }
.brands-intro { display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:24px; margin-bottom:52px; }
#brands .sec-label { color:${GOLD}; }
#brands .sec-label::before { background:${GOLD}; }
#brands .sec-title { color:#f0ede8; margin-bottom:0; }
.brands-sub { font-size:14px; color:rgba(240,237,232,.4); line-height:1.7; max-width:280px; text-align:right; }
.brands-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:2px; }
.brand-tile {
  padding:28px 20px; background:rgba(255,255,255,.04);
  display:flex; align-items:center; justify-content:center;
  font-size:13px; font-weight:600; letter-spacing:.06em;
  color:rgba(240,237,232,.35); text-align:center;
  border:1px solid rgba(255,255,255,.04);
  transition:all .25s; cursor:default;
}
.brand-tile:hover { background:rgba(255,255,255,.09); color:#f0ede8; border-color:rgba(150,150,150,.25); }

/* WORKS */
#works { background:#fff; }
.works-top { display:flex; justify-content:space-between; align-items:flex-end; max-width:1440px; margin:0 auto 48px; flex-wrap:wrap; gap:24px; }
.ig-badge { display:flex; align-items:center; gap:10px; padding:10px 20px; background:#fff; border:1px solid #e8e4dc; font-size:12px; font-weight:600; color:#555; }
.ig-badge-dot { width:8px; height:8px; border-radius:50%; background:#e1306c; animation:liveDot 2s infinite; }
@keyframes liveDot { 0%,100%{box-shadow:0 0 0 0 rgba(225,48,108,.4)} 50%{box-shadow:0 0 0 6px rgba(225,48,108,0)} }
.ig-badge strong { color:#111; }
.behold-wrap { max-width:1440px; margin:0 auto; }
behold-widget { --behold-gap:6px; --behold-border-radius:0px; }
.ph-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:6px; }
.ph-card { position:relative; overflow:hidden; cursor:pointer; background:#ddd; }
.ph-card:nth-child(1) { grid-row:span 2; }
.ph-card:nth-child(7) { grid-column:span 2; }
.ph-inner { width:100%; min-height:300px; height:100%; display:flex; align-items:center; justify-content:center; font-size:clamp(44px,5vw,72px); transition:transform .55s cubic-bezier(.25,.46,.45,.94),filter .35s; filter:grayscale(15%) brightness(.88); }
.ph-card:hover .ph-inner { transform:scale(1.07); filter:grayscale(0%) brightness(1); }
.ph-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(0,0,0,.88) 0%,transparent 52%); opacity:0; transition:opacity .3s; display:flex; flex-direction:column; justify-content:flex-end; padding:26px; }
.ph-card:hover .ph-overlay { opacity:1; }
.ph-play { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%) scale(.75); width:58px; height:58px; border-radius:50%; background:rgba(150,150,150,.92); display:flex; align-items:center; justify-content:center; font-size:20px; padding-left:4px; color:#fff; opacity:0; transition:all .3s; }
.ph-card.video:hover .ph-play { opacity:1; transform:translate(-50%,-50%) scale(1); }
.ph-title { font-family:'Cormorant Garamond',serif; font-size:17px; font-weight:700; color:#fff; }
.ph-meta { font-size:10px; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:${GOLD}; margin-top:4px; }
.ph-badge { position:absolute; top:14px; left:14px; font-size:9px; font-weight:700; letter-spacing:.18em; text-transform:uppercase; padding:5px 12px; background:rgba(255,255,255,.92); color:#111; backdrop-filter:blur(8px); }
.load-more-wrap { text-align:center; margin-top:48px; }
.btn-load { font-size:11px; font-weight:700; letter-spacing:.25em; text-transform:uppercase; padding:16px 52px; background:transparent; border:2px solid #111; color:#111; cursor:pointer; transition:all .2s; text-decoration:none; display:inline-block; }
.btn-load:hover { background:#333; color:#111; }

/* SERVICES */
#services { background:#f0efed; color:#111; }
.srv-inner { max-width:1340px; margin:0 auto; }
.srv-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:2px; margin-top:60px; }
.srv-card { padding:52px 40px; background:#fff; position:relative; overflow:hidden; transition:background .4s,transform .4s,box-shadow .4s; }
.srv-card:hover { background:#e8e8e8; transform:translateY(-8px); box-shadow:0 24px 60px rgba(0,0,0,.09); }
.srv-card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:${GOLD}; }
.srv-num { font-family:'Bebas Neue',sans-serif; font-size:100px; color:rgba(0,0,0,.03); position:absolute; top:10px; right:16px; line-height:1; }
.srv-icon { font-size:34px; margin-bottom:24px; display:block; }
.srv-name { font-family:'Cormorant Garamond',serif; font-size:26px; font-weight:700; margin-bottom:12px; color:#333; }
.srv-desc { font-size:14px; font-weight:300; color:#777; line-height:1.8; margin-bottom:28px; }
.pkg-list { list-style:none; display:flex; flex-direction:column; }
.pkg { padding:13px 0; border-bottom:1px solid rgba(0,0,0,.06); display:flex; justify-content:space-between; align-items:center; font-size:13px; color:#666; transition:color .2s,padding-left .2s; }
.pkg:hover { color:#111; padding-left:8px; }
.pkg-price { font-family:'Cormorant Garamond',serif; font-size:18px; color:${GOLD}; }

/* TESTIMONIALS */
#testimonials { background:#fff; }
.t-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:6px; max-width:1440px; margin:60px auto 0; }
.tcard { padding:52px 40px; background:#fff; position:relative; overflow:hidden; transition:transform .4s,box-shadow .4s; }
.tcard:hover { transform:translateY(-6px); box-shadow:0 20px 60px rgba(0,0,0,.08); }
.tcard::before { content:'"'; font-family:'Cormorant Garamond',serif; font-size:140px; font-weight:900; color:rgba(150,150,150,.06); position:absolute; top:-20px; left:20px; line-height:1; }
.stars { color:${GOLD}; font-size:14px; margin-bottom:16px; letter-spacing:2px; }
.ttext { font-family:'Cormorant Garamond',serif; font-size:17px; font-style:italic; line-height:1.8; color:#222; margin-bottom:28px; position:relative; z-index:1; }
.tauthor { display:flex; align-items:center; gap:14px; }
.tavatar { width:46px; height:46px; border-radius:50%; background:linear-gradient(135deg,${GOLD},#7a5a00); display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:20px; font-weight:700; color:#fff; flex-shrink:0; }
.tname { font-size:14px; font-weight:700; color:#111; }
.trole { font-size:11px; color:${GOLD}; margin-top:3px; letter-spacing:.05em; }

/* SOCIAL */
#social { background:#e8e7e5; color:#111; padding:100px 64px; }
.soc-inner { max-width:1440px; margin:0 auto; }
.soc-head { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:40px; flex-wrap:wrap; gap:24px; }
.soc-title { font-family:'Cormorant Garamond',serif; font-size:clamp(28px,4vw,52px); font-weight:900; }
.soc-title em { font-style:italic; color:${GOLD}; }
.soc-right { display:flex; flex-direction:column; align-items:flex-end; gap:12px; }
.soc-sub { font-size:13px; color:#888; line-height:1.7; max-width:300px; text-align:right; }
.ig-link { display:inline-flex; align-items:center; gap:10px; font-size:11px; font-weight:700; letter-spacing:.15em; text-transform:uppercase; color:${GOLD}; text-decoration:none; border:1px solid rgba(150,150,150,.4); padding:12px 24px; transition:all .2s; }
.ig-link:hover { background:rgba(150,150,150,.1); border-color:${GOLD}; }
.nl-wrap { max-width:620px; margin:72px auto 0; text-align:center; }
.nl-wrap h3 { font-family:'Cormorant Garamond',serif; font-size:clamp(22px,3vw,36px); font-weight:700; margin-bottom:10px; }
.nl-wrap p { font-size:14px; color:#666; margin-bottom:28px; line-height:1.7; }
.nl-form { display:flex; }
.nl-in { flex:1; padding:16px 24px; border:1px solid #ddd; border-right:none; font-family:'DM Sans',sans-serif; font-size:14px; color:#111; outline:none; background:#fff; }
.nl-in:focus { border-color:${GOLD}; }
.nl-btn { padding:16px 32px; background:${GOLD}; color:#fff; border:none; font-family:'DM Sans',sans-serif; font-size:11px; font-weight:800; letter-spacing:.2em; text-transform:uppercase; cursor:pointer; transition:background .2s; }
.nl-btn:hover { background:${GOLD2}; }
.nl-done { color:${GOLD}; font-weight:700; letter-spacing:.1em; font-size:14px; }

/* BOOKING PAGE */
.booking-page { min-height:100vh; background:#111; padding-top:100px; }
.booking-page-hero {
  background:#111; position:relative; overflow:hidden;
  padding:80px 64px 60px;
}
.booking-page-hero::before {
  content:''; position:absolute; inset:0;
  background-image:
    linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.015) 1px,transparent 1px);
  background-size:64px 64px;
}
.booking-page-hero-inner { max-width:800px; margin:0 auto; position:relative; z-index:1; text-align:center; }
.booking-page-hero .sec-label { justify-content:center; color:${GOLD}; }
.booking-page-hero .sec-label::before { background:${GOLD}; }
.booking-page-hero .sec-title { color:#f0ede8; margin-bottom:16px; }
.booking-page-hero p { font-size:15px; color:rgba(240,237,232,.55); line-height:1.85; }
.booking-page-body { background:#111; padding:60px 64px 120px; }
.bk-wrap { max-width:1200px; margin:0 auto; }
.bk-grid { display:grid; grid-template-columns:1fr 1.6fr; gap:80px; align-items:start; }
.bk-aside h3 { font-family:'Cormorant Garamond',serif; font-size:28px; font-weight:700; margin-bottom:14px; color:#f0ede8; }
.bk-aside p { font-size:14px; color:rgba(220,216,208,.65); line-height:1.85; margin-bottom:32px; }
.avail-box { padding:22px 24px; background:rgba(255,255,255,.07); border-left:3px solid ${GOLD}; margin-bottom:12px; backdrop-filter:blur(8px); }
.avail-tag { font-size:9px; font-weight:700; letter-spacing:.3em; text-transform:uppercase; color:${GOLD}; margin-bottom:6px; }
.avail-val { font-size:17px; font-weight:500; display:flex; align-items:center; gap:8px; color:#f0ede8; }
.dot-live { width:8px; height:8px; border-radius:50%; background:#22c55e; animation:pulse 2s infinite; }
@keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.4)} 50%{box-shadow:0 0 0 6px rgba(34,197,94,0)} }
.contact-rows { margin-top:28px; display:flex; flex-direction:column; gap:13px; }
.crow { display:flex; align-items:center; gap:12px; font-size:14px; color:rgba(220,216,208,.7); }
.crow-icon { font-size:20px; display:flex; align-items:center; flex-shrink:0; }
.form-wrap { display:flex; flex-direction:column; gap:3px; }
.form-row2 { display:grid; grid-template-columns:1fr 1fr; gap:3px; }
.fg { display:flex; flex-direction:column; }
.fl { font-size:9px; font-weight:700; letter-spacing:.3em; text-transform:uppercase; color:rgba(200,196,188,.6); padding:14px 18px 0; background:rgba(255,255,255,.08); backdrop-filter:blur(12px); }
.fi,.fsel,.fta { background:rgba(255,255,255,.08); border:none; border-bottom:2px solid transparent; padding:8px 18px 16px; font-family:'DM Sans',sans-serif; font-size:15px; color:#f0ede8; outline:none; transition:border-color .2s,background .2s; -webkit-appearance:none; backdrop-filter:blur(12px); }
.fi::placeholder,.fta::placeholder { color:rgba(200,196,188,.35); }
.fi:focus,.fsel:focus,.fta:focus { border-bottom-color:${GOLD}; background:rgba(255,255,255,.13); }
.fsel { cursor:pointer; }
option { background:#1a1a1a; color:#f0ede8; }
.fta { resize:none; height:130px; line-height:1.6; }
.budget-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:3px; }
.bopt { padding:16px 8px; background:rgba(255,255,255,.07); text-align:center; cursor:pointer; font-size:11px; font-weight:600; letter-spacing:.1em; color:rgba(200,196,188,.6); border:2px solid rgba(255,255,255,.1); transition:all .2s; backdrop-filter:blur(8px); }
.bopt.sel,.bopt:hover { background:${GOLD}; color:#fff; border-color:${GOLD}; }
.fsub { margin-top:6px; padding:20px; background:#333; color:#111; font-family:'DM Sans',sans-serif; font-size:12px; font-weight:700; letter-spacing:.25em; text-transform:uppercase; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:12px; transition:all .25s; position:relative; overflow:hidden; }
.fsub::before { content:''; position:absolute; inset:0; background:${GOLD}; transform:scaleX(0); transform-origin:left; transition:transform .35s; }
.fsub:hover::before { transform:scaleX(1); }
.fsub > * { position:relative; z-index:1; }
.fsub:disabled { opacity:.55; cursor:not-allowed; }
.form-note { font-size:11px; color:rgba(180,176,168,.5); margin-top:8px; text-align:center; letter-spacing:.05em; }
.err-box { padding:12px 18px; background:#fff0f0; border:1px solid #fca5a5; color:#b91c1c; font-size:13px; }
.success-wrap { padding:80px 48px; background:rgba(255,255,255,.07); backdrop-filter:blur(16px); text-align:center; display:flex; flex-direction:column; align-items:center; gap:20px; color:#f0ede8; }
.success-icon { font-size:60px; animation:popIn .5s ease both; }
@keyframes popIn { from{transform:scale(0)} to{transform:scale(1)} }
.success-wrap h3 { font-family:'Cormorant Garamond',serif; font-size:32px; font-weight:700; color:#f0ede8; }
.success-wrap p { color:rgba(220,216,208,.7); font-size:15px; line-height:1.8; max-width:420px; }

/* FOOTER */
footer { background:#111110; color:rgba(220,218,214,.6); padding:80px 64px; }
.ft-inner { max-width:1440px; margin:0 auto; }
.ft-top { display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:60px; padding-bottom:56px; border-bottom:1px solid rgba(255,255,255,.07); }
.ft-logo { font-family:'Cormorant Garamond',serif; font-size:28px; font-weight:700; color:#fafaf9; margin-bottom:16px; display:block; text-decoration:none; letter-spacing:.01em; cursor:pointer; }
.ft-logo em { font-style:italic; color:${GOLD}; }
.ft-bio { font-size:14px; line-height:1.9; max-width:280px; color:rgba(200,198,194,.55); }
.ft-heading { font-size:9px; font-weight:600; letter-spacing:.4em; text-transform:uppercase; color:rgba(200,198,194,.4); margin-bottom:22px; }
.ft-links { list-style:none; display:flex; flex-direction:column; gap:10px; }
.ft-links a { font-size:14px; color:rgba(200,198,194,.5); text-decoration:none; transition:color .3s; cursor:pointer; }
.ft-links a:hover { color:#fafaf9; }
.ft-bottom { padding-top:32px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; }
.ft-copy { font-size:11px; letter-spacing:.08em; color:rgba(200,198,194,.3); }
.socials { display:flex; gap:10px; }
.slink { width:42px; height:42px; border:1px solid rgba(255,255,255,.1); display:flex; align-items:center; justify-content:center; color:rgba(220,218,214,.45); text-decoration:none; transition:all .3s; border-radius:2px; }
.slink svg { width:18px; height:18px; }
.slink:hover { border-color:rgba(255,255,255,.4); color:#fafaf9; background:rgba(255,255,255,.05); }

/* RESPONSIVE */
@media (max-width:1080px) {
  .nav,.nav.solid { padding:18px 32px; }
  .nav-links { display:none; }
  section { padding:80px 32px; }
  #social,.booking-page-hero,.booking-page-body { padding-left:32px; padding-right:32px; }
  .hero-left { padding:36px 24px 72px; }
  .hero-scroll { right:32px; }
  .about-grid { grid-template-columns:1fr; gap:48px; }
  .about-photo-wrap { max-width:400px; }
  .exp-grid { grid-template-columns:1fr; gap:40px; }
  .exp-aside { position:static; }
  .srv-grid,.t-grid { grid-template-columns:1fr; }
  .bk-grid { grid-template-columns:1fr; gap:40px; }
  .ph-grid { grid-template-columns:1fr 1fr; }
  .ph-card:nth-child(1) { grid-row:span 1; }
  .ph-card:nth-child(7) { grid-column:span 1; }
  .ft-top { grid-template-columns:1fr 1fr; gap:40px; }
  .brands-grid { grid-template-columns:repeat(2,1fr); }
}
@media (max-width:640px) {
  .hero-h1 { font-size:clamp(56px,16vw,90px); }
  .hero-bottom { flex-direction:column; align-items:flex-start; }
  .hero-stats { gap:24px; }
  .ph-grid { grid-template-columns:1fr; }
  .budget-grid { grid-template-columns:1fr 1fr; }
  .form-row2 { grid-template-columns:1fr; }
  .nl-form { flex-direction:column; }
  .nl-in { border-right:1px solid #ddd; border-bottom:none; }
  .ft-top { grid-template-columns:1fr; }
  .ft-bottom { flex-direction:column; text-align:center; }
  .soc-head { flex-direction:column; align-items:flex-start; }
  .brands-grid { grid-template-columns:repeat(2,1fr); }
  .about-photo-wrap { max-width:100%; }
}
`;

/* ─── SHOOT PACKAGE CARD ────────────────────────────────────────── */
function ShootPackageCard({ pkg, navigate }) {
  const [hovered, setHovered] = useState(false);
  const colors = { Starter:"#555", Standard:"#333", Premium:"#111" };
  const accentColor = colors[pkg.tier] || "#555";
  return (
    <div
      onMouseEnter={()=>setHovered(true)}
      onMouseLeave={()=>setHovered(false)}
      style={{
        position:"relative", overflow:"hidden",
        background: hovered ? accentColor : "#f5f4f2",
        border:`2px solid ${hovered ? accentColor : "#e8e4dc"}`,
        padding: hovered ? "22px 20px" : "16px 20px",
        transition:"all .35s cubic-bezier(.16,1,.3,1)",
        cursor:"pointer",
      }}
      onClick={()=>navigate("booking")}
    >
      {!hovered && (
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:22}}>{pkg.emoji}</span>
            <div>
              <div style={{fontSize:14,fontWeight:700,color:"#111",letterSpacing:".02em"}}>{pkg.tier}</div>
              <div style={{fontSize:11,color:"#888",marginTop:2}}>{pkg.tagline}</div>
            </div>
          </div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:900,color:accentColor,whiteSpace:"nowrap"}}>{pkg.price}</div>
        </div>
      )}
      {hovered && (
        <div style={{color:"#fff"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
            <div>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:28,letterSpacing:".06em",lineHeight:1}}>{pkg.tier}</div>
              <div style={{fontSize:11,opacity:.65,marginTop:3,letterSpacing:".05em"}}>{pkg.tagline}</div>
            </div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:900,color:"rgba(255,255,255,.9)"}}>{pkg.price}</div>
          </div>
          <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:6,marginBottom:14}}>
            {pkg.includes.map((item,i)=>(
              <li key={i} style={{fontSize:12,display:"flex",gap:8,alignItems:"flex-start",opacity:.9}}>
                <span style={{color:"rgba(255,255,255,.5)",marginTop:1,flexShrink:0}}>&#10003;</span>
                {item}
              </li>
            ))}
          </ul>
          <div style={{borderTop:"1px solid rgba(255,255,255,.15)",paddingTop:10,fontSize:11,opacity:.6}}>
            <strong style={{opacity:1,color:"#fff"}}>Best for:</strong> {pkg.bestFor}
          </div>
          <div style={{marginTop:12,fontSize:11,fontWeight:700,letterSpacing:".18em",textTransform:"uppercase",opacity:.8}}>
            Book this package &rarr;
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── BOOKING PAGE ──────────────────────────────────────────────── */
function BookingPage({ onNavigate }) {
  const [budget, setBudget]   = useState(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);
  const [sendErr, setSendErr] = useState(null);
  const [form, setForm]       = useState({ name:"", email:"", phone:"", service:"", date:"", message:"" });
  const upd = (k,v) => setForm(f => ({...f,[k]:v}));

  useEffect(() => { window.scrollTo(0,0); }, []);

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.service) {
      setSendErr("Please fill in your name, email, and service type.");
      return;
    }
    const msg =
      `Hi Kayxmedia! 👋 I'd like to book a session.\n\n` +
      `*Name:* ${form.name}\n*Email:* ${form.email}\n*Phone:* ${form.phone||"Not provided"}\n` +
      `*Service:* ${form.service}\n*Preferred Date:* ${form.date||"Flexible"}\n` +
      `*Budget:* ${budget||"Not specified"}\n*Message:* ${form.message||"No additional notes."}`;
    window.open(`https://wa.me/233597617967?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
  };

  return (
    <div className="booking-page">
      <div className="booking-page-hero">
        <div className="booking-page-hero-inner">
          <div className="sec-label">Let's Collaborate</div>
          <h1 className="sec-title">Book a <em>Shoot</em></h1>
          <p>Fill out the brief and I'll respond within 24 hours with a tailored proposal for your vision, timeline, and budget.</p>
        </div>
      </div>

      <div className="booking-page-body">
        <div className="bk-wrap">
          <div className="bk-grid">
            <div className="bk-aside">
              <h3>Start your next project</h3>
              <p>Whether it's a music video, brand film, or full campaign — let's build something iconic together.</p>
              <div className="avail-box">
                <div className="avail-tag">Availability</div>
                <div className="avail-val"><span className="dot-live" /> Accepting Projects — Q3 2026</div>
              </div>
              <div className="avail-box" style={{borderColor:GOLD2}}>
                <div className="avail-tag">Response Time</div>
                <div className="avail-val" style={{fontSize:16}}>Within 24 hours</div>
              </div>
              <div className="contact-rows">
                <div className="crow">
                  <span className="crow-icon" style={{color:"#25D366"}}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                  </span> WhatsApp: +233 597 617 967
                </div>
                <div className="crow">
                  <span className="crow-icon" style={{color:"#E1306C"}}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </span> @kayxmedia_ on Instagram
                </div>
                <div className="crow">
                  <span className="crow-icon" style={{color:"#555"}}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                  </span> Shooting worldwide
                </div>
              </div>
            </div>

            {sent ? (
              <div className="success-wrap">
                <div className="success-icon">✅</div>
                <h3>Opening WhatsApp!</h3>
                <p>Your booking details are pre-filled and ready to send on WhatsApp. If it didn't open, <a href="https://wa.me/233597617967" target="_blank" rel="noreferrer" style={{color:"#b8860b"}}>click here</a>.</p>
                <button onClick={() => onNavigate("home")} className="btn-gold" style={{marginTop:8}}>Back to Home →</button>
              </div>
            ) : (
              <div className="form-wrap">
                <div className="form-row2">
                  <div className="fg"><div className="fl">Full Name *</div><input className="fi" placeholder="Alex Rivera" value={form.name} onChange={e=>upd("name",e.target.value)} /></div>
                  <div className="fg"><div className="fl">Email Address *</div><input className="fi" type="email" placeholder="alex@brand.com" value={form.email} onChange={e=>upd("email",e.target.value)} /></div>
                </div>
                <div className="form-row2">
                  <div className="fg"><div className="fl">Phone (Optional)</div><input className="fi" placeholder="+233 000 000 000" value={form.phone} onChange={e=>upd("phone",e.target.value)} /></div>
                  <div className="fg"><div className="fl">Preferred Date</div><input className="fi" type="date" style={{colorScheme:"dark"}} value={form.date} onChange={e=>upd("date",e.target.value)} /></div>
                </div>
                <div className="fg">
                  <div className="fl">Service Type *</div>
                  <select className="fsel" value={form.service} onChange={e=>upd("service",e.target.value)}>
                    <option value="">Select a service…</option>
                    <option>Starter Package — GH₵ 3,500</option>
                    <option>Standard Package — GH₵ 8,000</option>
                    <option>Premium Package — GH₵ 18,000</option>
                    <option>Music Video — GH₵ 5,000–15,000</option>
                    <option>Event Highlight — GH₵ 2,000–6,000</option>
                    <option>Brand / Product Shoot — GH₵ 3,500–8,000</option>
                    <option>UGC Package (5 Assets) — GH₵ 2,500–5,000</option>
                    <option>Brand Campaign (Full) — GH₵ 15,000–35,000</option>
                    <option>Sponsored Content — GH₵ 5,000–10,000</option>
                    <option>Brand Ambassadorship — GH₵ 15,000/mo</option>
                    <option>Custom / Let's Talk</option>
                  </select>
                </div>
                <div className="fg">
                  <div className="fl">Budget Range</div>
                  <div className="budget-grid">
                    {["GH₵ 2K–5K","GH₵ 5K–10K","GH₵ 10K–20K","GH₵ 20K–35K","GH₵ 35K+","Let's Talk"].map(b=>(
                      <div key={b} className={`bopt${budget===b?" sel":""}`} onClick={()=>setBudget(b)}>{b}</div>
                    ))}
                  </div>
                </div>
                <div className="fg">
                  <div className="fl">Project Vision</div>
                  <textarea className="fta" placeholder="Tell me about your project, goals, mood, and any creative direction…" value={form.message} onChange={e=>upd("message",e.target.value)} />
                </div>
                {sendErr && <div className="err-box">{sendErr}</div>}
                <button className="fsub" onClick={handleSubmit} disabled={sending}>
                  <span>{sending?"Sending…":"Send Inquiry"}</span>
                  <span>{sending?"⏳":"✦"}</span>
                </button>
                <p className="form-note">You'll be redirected to WhatsApp to send your booking</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN APP ──────────────────────────────────────────────────── */
export default function App() {
  const [page,      setPage]      = useState("home");
  const [scrolled,  setScrolled]  = useState(false);
  const [nlEmail,   setNlEmail]   = useState("");
  const [nlDone,    setNlDone]    = useState(false);

  const isConfigured = BEHOLD_FEED_ID !== "YOUR_BEHOLD_FEED_ID";

  useEffect(() => {
    if (!isConfigured) return;
    const s = document.createElement("script");
    s.src = "https://w.behold.so/widget.js"; s.type = "module";
    document.head.appendChild(s);
    return () => { try { document.head.removeChild(s); } catch(_){} };
  }, [isConfigured]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    if (page !== "home") { setPage("home"); setTimeout(()=>{ document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); }, 100); return; }
    document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
  };

  const navigate = (p) => { setPage(p); window.scrollTo(0,0); };

  if (page === "booking") {
    return (
      <>
        <style>{CSS}</style>
        <nav className="nav solid">
          <span className="logo" onClick={()=>navigate("home")}><span className="logo-k">K</span>ayxmedia</span>
          <ul className="nav-links">
            {[["About","about"],["Works","works"],["Services","services"],["Experience","experience"]].map(([label,id])=>(
              <li key={id}><a onClick={()=>scrollTo(id)}>{label}</a></li>
            ))}
          </ul>
          <button onClick={()=>navigate("booking")} className="nav-cta">Book Now</button>
        </nav>
        <BookingPage onNavigate={navigate} />
        <Footer scrollTo={scrollTo} navigate={navigate} />
      </>
    );
  }

  return (
    <>
      <style>{CSS}</style>

      {/* NAV */}
      <nav className={scrolled?"nav solid":"nav"}>
        <span className="logo" onClick={()=>navigate("home")}><span className="logo-k">K</span>ayxmedia</span>
        <ul className="nav-links">
          {[["About","about"],["Works","works"],["Services","services"],["Experience","experience"],["Contact","social"]].map(([label,id])=>(
            <li key={id}><a onClick={()=>scrollTo(id)}>{label}</a></li>
          ))}
        </ul>
        <button onClick={()=>navigate("booking")} className="nav-cta">Book Now</button>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-bg">
          <img src={kayxPhoto}  className="hero-bg-photo"   alt="" aria-hidden="true" />
          <img src={kayxPhoto2} className="hero-bg-photo-2" alt="" aria-hidden="true" />
        </div>
        <div className="hero-bg-overlay" />
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-glow2" />
        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-eyebrow">Videographer · Creator · @kayxmedia_ · @n.kayx</div>
            <h1 className="hero-h1">KAYX<span className="gold">✦</span><br /><span className="outline">MEDIA</span></h1>
            <div className="hero-bottom">
              <p className="hero-desc">
                <strong>4K cinematic productions</strong> that move audiences and build brands.
                Music videos, brand films, and event coverage — paired with an engaged community of over 30K across all platforms.
              </p>
              <div className="hero-btns">
                <button onClick={()=>navigate("booking")} className="btn-gold">Book a Shoot →</button>
                <button onClick={()=>scrollTo("works")} className="btn-ghost">View Work</button>
              </div>
            </div>
            <div className="hero-stats">
              {[["30K","<em>+</em> Followers"],["8.4","<em>%</em> Engagement"],["50<em>+</em>","Projects"],["4K","<em>/</em>ProRes"]].map(([v,l],i)=>(
                <div key={i}>
                  <div className="sv" dangerouslySetInnerHTML={{__html:v}} />
                  <div className="sl" dangerouslySetInnerHTML={{__html:l}} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="hero-scroll"><div className="hero-scroll-bar" /><span>Scroll</span></div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-track">
          {[...TICKER_ITEMS,...TICKER_ITEMS,...TICKER_ITEMS].map((t,i)=>(
            <div key={i} className="ti">{t}<span>✦</span></div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about">
        <div className="about-inner">
          <div className="about-grid">
            <div className="about-photo-wrap">
              <div className="about-photo-frame">
                <img src={kayxPhoto} className="about-photo" alt="Aaron Yankson — Nana Kayx" />
              </div>
              <div className="about-photo-badge">
                <div className="about-photo-badge-val">5+</div>
                <div className="about-photo-badge-label">Years in<br/>Cinema</div>
              </div>
            </div>
            <div className="about-text">
              <div>
                <div className="sec-label" style={{color:GOLD}}>About</div>
                <h2 className="sec-title" style={{color:"#f0ede8"}}>The Mind <em>Behind</em><br />the Lens</h2>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,fontStyle:"italic",color:"rgba(240,237,232,.45)",letterSpacing:".08em",marginTop:8}}>
                  Aaron Yankson — Creative Director &amp; Cinematographer
                </div>
              </div>
              <p className="about-bio" style={{fontSize:15,fontWeight:300,color:"rgba(240,237,232,.72)",lineHeight:1.95,borderLeft:`2px solid ${GOLD}`,paddingLeft:24}}>
                Behind every unforgettable visual is a precise blend of strategy and cinematic art. Led by <strong>Creative Director and Cinematographer Aaron Yankson</strong>, popularly known as <strong>Nana Kayx</strong>, our dedicated creative team focuses on producing high-end, 4K mobile-optimized content and cinematic visualizers.
                <br /><br />
                We don't just shoot video — we <strong>engineer digital experiences</strong>. By pairing advanced color grading and fluid, professional-grade stabilization with authentic storytelling, Nana Kayx helps global brands and artists connect deeply with their audiences.
              </p>
              <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                {["Creative Direction","4K Cinematography","Colour Grading","Brand Strategy","Visual Storytelling","UGC & Reels"].map(tag=>(
                  <span key={tag} style={{fontSize:10,fontWeight:700,letterSpacing:".18em",textTransform:"uppercase",padding:"8px 18px",border:"1px solid rgba(150,150,150,.22)",color:"rgba(240,237,232,.5)",transition:"all .2s",cursor:"default"}}>
                    {tag}
                  </span>
                ))}
              </div>
              <button onClick={()=>navigate("booking")} className="btn-gold" style={{alignSelf:"flex-start",marginTop:8}}>
                Let's Build Something Iconic →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{background:"#f5f4f2"}}>
        <div className="exp-inner">
          <div className="sec-label">Track Record</div>
          <h2 className="sec-title">Experience &amp; <em>Journey</em></h2>
          <div className="exp-grid">
            {/* Left: achievements */}
            <div className="exp-aside">
              <h3 className="exp-aside-title">Numbers that <em>speak</em></h3>
              <p className="exp-aside-desc">10+ local and international brand collaborations. A career built on results, not just aesthetics.</p>
              <div className="achievements">
                {ACHIEVEMENTS.map((a,i)=>(
                  <div key={i} className="ach-card">
                    <div className="ach-val">{a.value}</div>
                    <div className="ach-label">{a.label}</div>
                    <div className="ach-desc">{a.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right: timeline */}
            <div className="exp-timeline">
              {EXPERIENCE.map((e,i)=>(
                <div key={i} className="exp-card">
                  <div className="exp-period">{e.period}</div>
                  <div className="exp-role">{e.role}</div>
                  <div className="exp-focus">{e.focus}</div>
                  <ul className="exp-points">
                    {e.points.map((p,j)=><li key={j}>{p}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section id="brands" style={{background:"#111110",padding:"80px 64px"}}>
        <div style={{maxWidth:1340,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:24,marginBottom:52}}>
            <div>
              <div className="sec-label" style={{color:GOLD}}>Collaborations</div>
              <h2 className="sec-title" style={{color:"#f0ede8",marginBottom:0}}>Brands We've <em>Worked With</em></h2>
            </div>
            <p style={{fontSize:14,color:"rgba(240,237,232,.35)",lineHeight:1.7,maxWidth:280,textAlign:"right"}}>
              10+ brands. 100M+ collective views. Local and international reach.
            </p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:2}}>
            {BRANDS.map((b,i)=>(
              <div key={i} style={{padding:"28px 20px",background:"rgba(255,255,255,.04)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:600,letterSpacing:".06em",color:"rgba(240,237,232,.35)",textAlign:"center",border:"1px solid rgba(255,255,255,.04)",transition:"all .25s",cursor:"default"}}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.09)";e.currentTarget.style.color="#f0ede8";e.currentTarget.style.borderColor="rgba(150,150,150,.25)";}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.04)";e.currentTarget.style.color="rgba(240,237,232,.35)";e.currentTarget.style.borderColor="rgba(255,255,255,.04)";}}>
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKS */}
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
          {isConfigured && <behold-widget feed-id={BEHOLD_FEED_ID} />}
          {!isConfigured && (
            <>
              <div className="ph-grid">
                {PLACEHOLDERS.map((p,i)=>(
                  <div key={i} className={`ph-card${p.type==="video"?" video":""}`}>
                    <div className="ph-inner" style={{background:p.bg}}>{p.emoji}</div>
                    <div className="ph-overlay"><div className="ph-title">@kayxmedia_</div><div className="ph-meta">{p.label}</div></div>
                    {p.type==="video" && <div className="ph-play">▶</div>}
                    <div className="ph-badge">{p.type==="video"?"▶ Video":"◼ Photo"}</div>
                  </div>
                ))}
              </div>
              <div className="load-more-wrap">
                <a href="https://instagram.com/kayxmedia_" target="_blank" rel="noreferrer" className="btn-load">View All on Instagram →</a>
              </div>
            </>
          )}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services">
        <div className="srv-inner">
          <div className="sec-label">What I Offer</div>
          <h2 className="sec-title" style={{color:"#111"}}>Services &amp; <em>Packages</em></h2>
          <div className="srv-grid">
            {SERVICES.map((s,i)=>(
              <div key={i} className="srv-card">
                <div className="srv-num">{s.num}</div>
                <span className="srv-icon">{s.icon}</span>
                <div className="srv-name">{s.name}</div>
                <div className="srv-desc">{s.desc}</div>
                {s.packages ? (
                  <ul className="pkg-list">
                    {s.packages.map(([n,p])=>(
                      <li key={n} className="pkg">
                        <span>{n}</span>
                        <span className="pkg-price" style={p==="Let\'s Talk →"?{color:"#333",fontSize:13,fontWeight:700,letterSpacing:".1em"}:{}}>{p}</span>
                      </li>
                    ))}
                    {i===2 && (
                      <li style={{marginTop:16,padding:"14px 16px",background:"#f9f7f4",borderLeft:"3px solid #888",fontSize:13,color:"#666",lineHeight:1.75}}>
                        <span><strong style={{color:"#333",display:"block",marginBottom:4}}>📐 Real Estate Film — pricing depends on:</strong>
                        Property size &amp; number of rooms · Indoor/outdoor scope · Drone requirements · Styling &amp; staging needed · Turnaround time · Usage (listing, social, commercial)</span>
                      </li>
                    )}
                  </ul>
                ) : (
                  <div style={{display:"flex",flexDirection:"column",gap:8}}>
                    {SHOOT_PACKAGES.map((pkg,j)=>(
                      <ShootPackageCard key={j} pkg={pkg} navigate={navigate} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials">
        <div style={{maxWidth:1440,margin:"0 auto"}}>
          <div className="sec-label">Social Proof</div>
          <h2 className="sec-title">Client <em>Stories</em></h2>
        </div>
        <div className="t-grid">
          {TESTIMONIALS.map((t,i)=>(
            <div key={i} className="tcard">
              <div className="stars">★★★★★</div>
              <p className="ttext">"{t.text}"</p>
              <div className="tauthor">
                <div className="tavatar">{t.initial}</div>
                <div><div className="tname">{t.name}</div><div className="trole">{t.role}</div></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SOCIAL */}
      <section id="social" style={{padding:"100px 64px"}}>
        <div className="soc-inner">
          <div className="soc-head">
            <div>
              <div className="sec-label" style={{color:GOLD}}>Follow the Journey</div>
              <h2 className="soc-title">Stay <em>Inspired</em></h2>
            </div>
            <div className="soc-right">
              <p className="soc-sub">Daily content drops, behind the scenes, and collab announcements — all on Instagram.</p>
              <a href="https://instagram.com/kayxmedia_" target="_blank" rel="noreferrer" className="ig-link">Follow @kayxmedia_ →</a>
            </div>
          </div>
          <div className="nl-wrap">
            <h3>Follow Our <em style={{fontStyle:"italic",color:GOLD}}>Updates</em></h3>
            <p>Subscribe to receive the hottest news, project drops, and future event information!</p>
            {nlDone ? (
              <p className="nl-done">✦ You're on the list — thank you!</p>
            ) : (
              <div className="nl-form">
                <input className="nl-in" placeholder="Your email *" value={nlEmail} onChange={e=>setNlEmail(e.target.value)} />
                <button className="nl-btn" onClick={()=>{if(nlEmail)setNlDone(true);}}>Subscribe</button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer scrollTo={scrollTo} navigate={navigate} />
    </>
  );
}

/* ─── FOOTER COMPONENT ──────────────────────────────────────────── */
function Footer({ scrollTo, navigate }) {
  return (
    <footer>
      <div className="ft-inner">
        <div className="ft-top">
          <div>
            <span className="ft-logo" onClick={()=>navigate("home")}><em>K</em>ayxmedia</span>
            <p className="ft-bio">Cinematic storytelling for brands and artists who refuse to be ordinary. Based in Ghana. Shooting worldwide.</p>
          </div>
          <div>
            <div className="ft-heading">Services</div>
            <ul className="ft-links">
              {["Music Videos","Event Coverage","Brand Films","Sponsored Content","UGC Creation"].map(l=>(
                <li key={l}><a onClick={()=>scrollTo("services")}>{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="ft-heading">Navigate</div>
            <ul className="ft-links">
              <li><a onClick={()=>scrollTo("about")}>About</a></li>
              <li><a onClick={()=>scrollTo("experience")}>Experience</a></li>
              <li><a onClick={()=>scrollTo("works")}>Portfolio</a></li>
              <li><a href="https://instagram.com/kayxmedia_" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="https://tiktok.com/@n.kayx" target="_blank" rel="noreferrer">TikTok</a></li>
            </ul>
          </div>
          <div>
            <div className="ft-heading">Contact</div>
            <ul className="ft-links">
              <li><a onClick={()=>navigate("booking")}>Book a Shoot</a></li>
              <li><a onClick={()=>navigate("booking")}>Brand Partnerships</a></li>
              <li><a onClick={()=>navigate("booking")}>Press Inquiries</a></li>
              <li><a href="https://wa.me/233597617967" target="_blank" rel="noreferrer">WhatsApp: +233 597 617 967</a></li>
            </ul>
          </div>
        </div>
        <div className="ft-bottom">
          <p className="ft-copy">© 2026 Kayxmedia. All rights reserved.</p>
          <div className="socials">
            <a href="https://instagram.com/kayxmedia_" target="_blank" rel="noreferrer" className="slink" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://tiktok.com/@n.kayx" target="_blank" rel="noreferrer" className="slink" aria-label="TikTok">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="slink" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="https://wa.me/233597617967" target="_blank" rel="noreferrer" className="slink" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
