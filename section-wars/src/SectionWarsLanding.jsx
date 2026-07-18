//NOT USING


import { useEffect, useRef, useState } from "react";

/* ============================================================
   SECTION WARS '26 — Landing Page
   Restrained, editorial take on "The Cartels" system.
   Base #150A0E · Surface #221016 · Maroon #8A1538 ·
   Gold #F0A93B (rare) · Cream #EFE7D6
   ============================================================ */

const BASE = "#150A0E";
const SURF = "#1E1015";
const LINE = "#33191F";
const MAROON = "#8A1538";
const GOLD = "#E6A63C";
const CREAM = "#EDE4D6";
const MUTED = "#9C8890";

/* ---------------- data ---------------- */

const CARTELS = [
  { code: "BM-A", name: "Pablo's Pack", color: "#2AA79B", emblem: "plane" },
  { code: "BM-B", name: "Corleone Family", color: "#A63A50", emblem: "knight" },
  { code: "BM-C", name: "Soprano Syndicate", color: "#4A72C8", emblem: "duck" },
  { code: "BM-D", name: "Shelby and Sons", color: "#C2BE3D", emblem: "revolvers" },
  { code: "HRM-A", name: "Chapo Coalition", color: "#DE7A2E", emblem: "rifle" },
  { code: "HRM-B", name: "The Yakuza", color: "#6A4FC9", emblem: "katana" },
  { code: "HRM-C", name: "House of Heisenberg", color: "#1E8A4A", emblem: "flask" },
];

const EVENTS = [
  { title: "Three-Legged Race", tag: "Bound by loyalty", color: "#C2BE3D", art: "threeleg" },
  { title: "Tug of War", tag: "Turf dispute", color: "#DE7A2E", art: "tug" },
  { title: "Caterpillar Race", tag: "The convoy", color: "#2AA79B", art: "caterpillar" },
  { title: "Dodgeball", tag: "Crossfire", color: "#A63A50", art: "dodge" },
];

/* ---------------- emblems ---------------- */

function Emblem({ kind }) {
  const f = "rgba(15,12,6,0.6)";
  switch (kind) {
    case "plane":
      return (
        <svg viewBox="0 0 100 100"><g fill={f}>
          <path d="M10,55 C10,50 20,46 40,46 L78,48 C86,48 90,52 88,56 C86,60 78,60 70,60 L20,62 C14,62 10,60 10,55 Z" />
          <path d="M38,49 L64,49 L57,38 L45,38 Z" /><path d="M76,49 L87,35 L92,37 L85,50 Z" />
          <rect x="6" y="46" width="3" height="18" rx="1.5" />
          <circle cx="34" cy="68" r="5" /><circle cx="58" cy="68" r="5" />
          <rect x="32" y="60" width="4" height="8" /><rect x="56" y="60" width="4" height="8" />
        </g></svg>
      );
    case "knight":
      return (
        <svg viewBox="0 0 100 100"><g fill={f}>
          <path d="M30,88 H70 V80 L61,75 C64,66 67,57 65,47 C63,34 52,25 41,27 L39,34 L31,39 C27,42 26,49 30,51 L38,48 C38,55 34,61 33,67 C32,72 35,76 40,78 L30,82 Z" />
          <rect x="26" y="88" width="48" height="5" />
        </g></svg>
      );
    case "duck":
      return (
        <svg viewBox="0 0 100 100"><g fill={f}>
          <path d="M22,62 C22,48 33,41 45,43 C47,35 41,33 43,26 C45,17 57,15 61,23 C63,28 61,32 59,36 L71,38 C67,44 61,46 55,46 C70,48 81,54 79,64 C77,74 63,80 47,80 C31,80 22,74 22,62 Z" />
          <path d="M18,84 C34,90 66,90 82,84 L82,88 C66,94 34,94 18,88 Z" opacity="0.5" />
        </g></svg>
      );
    case "revolvers":
      return (
        <svg viewBox="0 0 100 100"><g fill={f}>
          <g transform="rotate(28 50 50)"><rect x="10" y="42" width="40" height="7" rx="1" /><rect x="46" y="38" width="14" height="15" rx="3" /><path d="M58,42 L70,42 C74,42 76,46 75,50 L70,66 C69,70 65,72 61,71 L55,69 Z" /></g>
          <g transform="rotate(-28 50 50) translate(100,0) scale(-1,1)"><rect x="10" y="42" width="40" height="7" rx="1" /><rect x="46" y="38" width="14" height="15" rx="3" /><path d="M58,42 L70,42 C74,42 76,46 75,50 L70,66 C69,70 65,72 61,71 L55,69 Z" /></g>
        </g></svg>
      );
    case "rifle":
      return (
        <svg viewBox="0 0 100 100"><g fill={f} transform="rotate(-18 50 50)">
          <rect x="4" y="46" width="30" height="4" /><rect x="10" y="41" width="3" height="6" />
          <rect x="32" y="42" width="36" height="10" rx="1" />
          <path d="M44,52 C42,62 46,70 54,72 L58,64 C52,62 50,58 51,52 Z" />
          <path d="M68,43 L90,40 L92,54 L74,52 L68,51 Z" />
          <rect x="61" y="52" width="7" height="12" rx="2" transform="rotate(14 64 58)" />
        </g></svg>
      );
    case "katana":
      return (
        <svg viewBox="0 0 100 100"><g fill={f} transform="rotate(-42 50 50)">
          <path d="M26,47 L84,47 L92,50 L84,53 L26,53 Z" /><rect x="21" y="40" width="5" height="20" rx="2" />
          <rect x="6" y="46" width="15" height="8" rx="2" />
          <path d="M9,46 L12,54 M14,46 L17,54" stroke="rgba(237,228,214,0.5)" strokeWidth="1.6" />
        </g></svg>
      );
    case "flask":
      return (
        <svg viewBox="0 0 100 100"><g fill={f}>
          <path d="M42,16 H58 V22 H55 V38 L72,68 C75,74 71,80 64,80 H36 C29,80 25,74 28,68 L45,38 V22 H42 Z" />
          <circle cx="44" cy="64" r="3" fill="rgba(237,228,214,0.4)" /><circle cx="55" cy="70" r="2.2" fill="rgba(237,228,214,0.4)" />
          <path d="M18,88 H82 V92 H18 Z" opacity="0.4" />
        </g></svg>
      );
    default:
      return null;
  }
}

/* ---------------- event art ---------------- */

function EventArt({ kind, color }) {
  const ink = "rgba(237,228,214,0.82)";
  const dim = "rgba(237,228,214,0.32)";
  switch (kind) {
    case "threeleg":
      return (
        <svg viewBox="0 0 200 120">
          <g fill={ink}>
            <circle cx="82" cy="30" r="9" /><path d="M74,42 L92,42 L96,72 L86,72 L84,58 L80,58 L78,72 L68,72 Z" />
            <circle cx="118" cy="30" r="9" /><path d="M110,42 L128,42 L132,72 L122,72 L120,58 L116,58 L114,72 L104,72 Z" />
            <rect x="86" y="72" width="8" height="26" rx="3" /><rect x="106" y="72" width="8" height="26" rx="3" /><rect x="96" y="72" width="9" height="26" rx="3" />
          </g>
          <rect x="93" y="80" width="15" height="7" fill={color} />
          <rect x="20" y="102" width="160" height="3" fill={dim} />
        </svg>
      );
    case "tug":
      return (
        <svg viewBox="0 0 200 120">
          <g fill={ink}>
            <circle cx="48" cy="38" r="9" /><path d="M42,48 L60,54 L74,60 L72,68 L56,63 L52,88 L42,86 L44,60 L34,74 L26,68 Z" />
            <circle cx="152" cy="38" r="9" /><path d="M158,48 L140,54 L126,60 L128,68 L144,63 L148,88 L158,86 L156,60 L166,74 L174,68 Z" />
          </g>
          <path d="M66,60 C86,54 114,54 134,60" stroke={ink} strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M97,50 L97,64 L108,60 Z" fill={color} />
          <rect x="16" y="100" width="168" height="3" fill={dim} />
        </svg>
      );
    case "caterpillar":
      return (
        <svg viewBox="0 0 200 120">
          <g fill={ink}>
            <circle cx="42" cy="52" r="9" /><path d="M34,62 Q48,58 56,66 L60,80 L30,80 Z" />
            <circle cx="82" cy="58" r="8" /><path d="M74,68 Q88,64 96,72 L98,84 L70,84 Z" />
            <circle cx="120" cy="62" r="8" /><path d="M112,72 Q126,68 134,76 L136,88 L108,88 Z" />
            <circle cx="157" cy="66" r="8" /><path d="M149,76 Q163,72 171,80 L172,92 L146,92 Z" />
          </g>
          <path d="M36,38 L30,26 M48,38 L52,26" stroke={color} strokeWidth="3" strokeLinecap="round" />
          <rect x="16" y="100" width="168" height="3" fill={dim} />
        </svg>
      );
    case "dodge":
      return (
        <svg viewBox="0 0 200 120">
          <g fill={ink}><circle cx="132" cy="34" r="9" /><path d="M124,44 L142,48 L150,70 L140,74 L134,58 L122,86 L112,82 L124,56 L110,62 L106,54 Z" /></g>
          <circle cx="52" cy="50" r="12" fill={color} />
          <path d="M150,96 C120,104 80,104 50,96" stroke={dim} strokeWidth="3" fill="none" />
        </svg>
      );
    default:
      return null;
  }
}

/* ---------------- helpers ---------------- */

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { el && el.classList.add("in"); return; }
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (el.classList.add("in"), io.disconnect()),
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = "" }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function SectionHead({ index, kicker, title }) {
  return (
    <div className="secHead">
      <span className="secIndex">{index}</span>
      <div>
        <p className="secKicker">{kicker}</p>
        <h2 className="secTitle">{title}</h2>
      </div>
    </div>
  );
}

function scrollToId(id) {
  return (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
}

/* ---------------- flip pieces ---------------- */

function CartelRow({ c }) {
  const [flipped, setFlipped] = useState(false);
  const toggle = () => setFlipped((f) => !f);
  return (
    <div
      className="cRow" role="button" tabIndex={0} aria-pressed={flipped}
      onClick={toggle}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), toggle())}
      style={{ "--c": c.color }}
    >
      <div className={`cInner ${flipped ? "flipped" : ""}`}>
        <div className="cFace cFront">
          <div className="cInfo">
            <p className="cKicker">{c.code}</p>
            <h3 className="cName">{c.name}</h3>
          </div>
          <div className="cCode">{c.code}</div>
          <div className="cArt">
            <div className="cEmblem"><Emblem kind={c.emblem} /></div>
          </div>
        </div>
        <div className="cFace cBack">
          <p className="cCase" style={{ color: c.color }}>Case file — {c.code}</p>
        </div>
      </div>
    </div>
  );
}

function EventRow({ e }) {
  const [flipped, setFlipped] = useState(false);
  const toggle = () => setFlipped((f) => !f);
  return (
    <div
      className="eRow" role="button" tabIndex={0} aria-pressed={flipped}
      onClick={toggle}
      onKeyDown={(ev) => (ev.key === "Enter" || ev.key === " ") && (ev.preventDefault(), toggle())}
      style={{ "--c": e.color }}
    >
      <div className={`eInner ${flipped ? "flipped" : ""}`}>
        <div className="eFace eFront">
          <div className="eArt"><EventArt kind={e.art} color={e.color} /></div>
          <div className="eMeta">
            <span className="eTag">{e.tag}</span>
            <h3 className="eTitle">{e.title}</h3>
          </div>
        </div>
        <div className="eFace eBack">
          <span className="eBackKicker">Result</span>
          <ol className="eRanks">
            <li><span>1</span><i /></li>
            <li><span>2</span><i /></li>
            <li><span>3</span><i /></li>
          </ol>
        </div>
      </div>
    </div>
  );
}

/* ---------------- page ---------------- */

export default function SectionWarsLanding() {
  const [year] = useState("2026");

  return (
    <div className="sw">
      <style>{css}</style>

      <nav className="nav">
        <a className="mark" href="#top" onClick={scrollToId("top")}>MAXI</a>
        <div className="links">
          <a href="#invite" onClick={scrollToId("invite")}>Invite</a>
          <a href="#cartels" onClick={scrollToId("cartels")}>Cartels</a>
          <a href="#events" onClick={scrollToId("events")}>Events</a>
          <a href="#gallery" onClick={scrollToId("gallery")}>Gallery</a>
        </div>
      </nav>

      {/* hero */}
      <header className="hero" id="top">
        <div className="heroInner">
          <p className="heroKicker">MAXI presents</p>
          <h1 className="heroTitle">Section<br />Wars</h1>
          <div className="heroFoot">
            <span className="heroYear">{year}</span>
            <span className="heroTag">Loyalty · Rivalry · Victory</span>
          </div>
        </div>
      </header>

      {/* invitation */}
      <section className="section" id="invite">
        <Reveal><SectionHead index="01" kicker="A word from the desk" title="The Invitation" /></Reveal>
        <Reveal>
          <div className="invite">
            <p>Fellow warriors,</p>
            <p>
              We have fought countless wars together. As a testimony to our solidarity,
              consider this a personal invite to Section Wars {year}. Seven cartels, one
              city, one crown.
            </p>
            <p>
              Your participation is the only thing that will drive this battle. Looking
              forward to some great memories with you all.
            </p>
            <p className="inviteSign">— Team Jr. MAXI</p>
          </div>
        </Reveal>
      </section>

      {/* cartels */}
      <section className="section" id="cartels">
        <Reveal>
          <SectionHead index="02" kicker="Four from BM, three from HRM" title="The Cartels" />
          <p className="secNote">Tap a cartel to open its case file.</p>
        </Reveal>
        <div className="cList">
          {CARTELS.map((c) => (
            <Reveal key={c.code}><CartelRow c={c} /></Reveal>
          ))}
        </div>
      </section>

      {/* events */}
      <section className="section" id="events">
        <Reveal>
          <SectionHead index="03" kicker="Every operation carries points" title="The Operations" />
          <p className="secNote">Tap a card to see who took it.</p>
        </Reveal>
        <div className="eList">
          {EVENTS.map((e) => (
            <Reveal key={e.title}><EventRow e={e} /></Reveal>
          ))}
        </div>
      </section>

      {/* gallery */}
      <section className="section" id="gallery">
        <Reveal>
          <SectionHead index="04" kicker="Moments from the war" title="The Gallery" />
          <p className="secNote">Photographs will be added after each operation.</p>
        </Reveal>
      </section>

      <footer className="foot">
        <span className="footMark">MAXI</span>
        <span className="footTag">Loyalty · Rivalry · Victory</span>
      </footer>
    </div>
  );
}

/* ---------------- styles ---------------- */

const css = `
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@300;400;500;600&display=swap');

*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
.sw{
  background:${BASE};color:${CREAM};
  font-family:'Oswald',sans-serif;font-weight:300;
  min-height:100vh;position:relative;overflow-x:hidden;
  -webkit-font-smoothing:antialiased;
}
a{color:inherit;text-decoration:none}

/* nav */
.nav{
  position:fixed;top:0;left:0;right:0;z-index:40;
  display:flex;align-items:center;justify-content:space-between;
  padding:20px clamp(22px,6vw,80px);
  background:rgba(21,10,14,.72);backdrop-filter:blur(10px);
  border-bottom:1px solid ${LINE};
}
.mark{font-family:'Anton';font-size:18px;letter-spacing:4px}
.links{display:flex;gap:clamp(18px,3vw,40px)}
.links a{
  font-size:12px;font-weight:400;letter-spacing:2px;text-transform:uppercase;color:${MUTED};
  transition:color .2s;
}
.links a:hover{color:${CREAM}}

/* hero */
.hero{
  min-height:92vh;display:flex;align-items:center;
  padding:120px clamp(22px,6vw,80px) 60px;
}
.heroInner{max-width:1200px;width:100%;margin:0 auto}
.heroKicker{
  font-size:13px;font-weight:400;letter-spacing:5px;text-transform:uppercase;color:${MAROON};
  margin-bottom:20px;
}
.heroTitle{
  font-family:'Anton';font-weight:400;
  font-size:clamp(68px,15vw,220px);line-height:.9;letter-spacing:1px;color:${CREAM};
}
.heroFoot{
  display:flex;align-items:baseline;gap:28px;margin-top:34px;
  border-top:1px solid ${LINE};padding-top:22px;max-width:640px;flex-wrap:wrap;
}
.heroYear{font-family:'Anton';font-size:26px;color:${GOLD};letter-spacing:2px}
.heroTag{font-size:14px;font-weight:400;letter-spacing:3px;text-transform:uppercase;color:${MUTED}}

/* sections */
.section{
  max-width:1200px;margin:0 auto;
  padding:clamp(70px,11vh,130px) clamp(22px,6vw,80px);
  scroll-margin-top:72px;
}
.secHead{display:flex;gap:22px;align-items:flex-start}
.secIndex{
  font-family:'Anton';font-size:15px;color:${MAROON};letter-spacing:1px;
  padding-top:6px;
}
.secKicker{
  font-size:12px;font-weight:400;letter-spacing:3px;text-transform:uppercase;color:${MUTED};
  margin-bottom:8px;
}
.secTitle{
  font-family:'Anton';font-weight:400;font-size:clamp(30px,5vw,52px);
  letter-spacing:1px;color:${CREAM};line-height:1;
}
.secNote{
  font-size:14px;font-weight:400;color:${MUTED};letter-spacing:1px;
  margin:16px 0 0;padding-left:37px;
}

/* reveal */
.reveal{opacity:0;transform:translateY(16px);transition:opacity .8s ease,transform .8s ease}
.reveal.in{opacity:1;transform:translateY(0)}

/* invite */
.invite{
  margin-top:40px;max-width:600px;
  font-size:16px;font-weight:300;line-height:1.9;color:#c9bcc0;
}
.invite p{margin-bottom:18px}
.invite p:last-child{margin-bottom:0}
.inviteSign{color:${CREAM};font-weight:400;letter-spacing:1px;margin-top:26px}

/* cartels */
.cList{margin-top:44px;display:flex;flex-direction:column;gap:14px}
.cRow{height:150px;cursor:pointer;perspective:1600px;outline:none}
.cRow:focus-visible .cInner{box-shadow:0 0 0 1px ${GOLD}}
.cInner{
  position:relative;width:100%;height:100%;
  transition:transform .7s cubic-bezier(.4,.1,.2,1);transform-style:preserve-3d;
}
.cInner.flipped{transform:rotateY(180deg)}
.cFace{
  position:absolute;inset:0;overflow:hidden;
  backface-visibility:hidden;-webkit-backface-visibility:hidden;
  display:flex;align-items:stretch;border:1px solid ${LINE};
}
.cFront{background:${SURF}}
.cInfo{
  flex:1;padding:0 34px;display:flex;flex-direction:column;justify-content:center;
  border-left:3px solid var(--c);
}
.cKicker{font-size:11px;font-weight:400;letter-spacing:3px;color:${MUTED};margin-bottom:8px}
.cName{
  font-family:'Anton';font-weight:400;font-size:clamp(22px,3vw,34px);
  letter-spacing:.5px;text-transform:uppercase;color:${CREAM};line-height:1;
}
.cCode{
  display:flex;align-items:center;justify-content:center;padding:0 30px;
  font-family:'Anton';font-size:clamp(40px,6vw,72px);color:rgba(237,228,214,.08);
  letter-spacing:1px;white-space:nowrap;user-select:none;
}
.cArt{
  width:150px;flex-shrink:0;background:var(--c);
  display:flex;align-items:center;justify-content:center;
}
.cEmblem{width:88px;height:88px}
.cEmblem svg{width:100%;height:100%}
.cBack{
  transform:rotateY(180deg);background:${SURF};
  border-left:3px solid var(--c);align-items:center;justify-content:center;
}
.cCase{font-size:14px;font-weight:400;letter-spacing:4px;text-transform:uppercase}

/* events */
.eList{margin-top:44px;display:flex;flex-direction:column;gap:14px}
.eRow{height:132px;cursor:pointer;perspective:1600px;outline:none}
.eRow:focus-visible .eInner{box-shadow:0 0 0 1px ${GOLD}}
.eInner{
  position:relative;width:100%;height:100%;
  transition:transform .7s cubic-bezier(.4,.1,.2,1);transform-style:preserve-3d;
}
.eInner.flipped{transform:rotateY(180deg)}
.eFace{
  position:absolute;inset:0;overflow:hidden;
  backface-visibility:hidden;-webkit-backface-visibility:hidden;
  border:1px solid ${LINE};background:${SURF};
}
.eFront{display:flex;align-items:center;border-left:3px solid var(--c)}
.eArt{
  width:200px;flex-shrink:0;height:100%;
  display:flex;align-items:center;justify-content:center;padding:14px 22px;
  border-right:1px solid ${LINE};
}
.eArt svg{width:100%;max-width:180px;max-height:96px;height:auto}
.eMeta{flex:1;padding:0 34px}
.eTag{font-size:12px;font-weight:400;letter-spacing:2px;text-transform:uppercase;color:var(--c)}
.eTitle{
  font-family:'Anton';font-weight:400;font-size:clamp(22px,3vw,34px);
  letter-spacing:.5px;text-transform:uppercase;color:${CREAM};margin-top:7px;line-height:1;
}
.eBack{
  transform:rotateY(180deg);display:flex;align-items:center;gap:36px;padding:0 34px;
  border-left:3px solid var(--c);
}
.eBackKicker{
  font-size:12px;font-weight:400;letter-spacing:3px;text-transform:uppercase;color:var(--c);
  flex-shrink:0;
}
.eRanks{list-style:none;display:flex;flex:1;gap:40px;margin:0;padding:0}
.eRanks li{display:flex;align-items:center;gap:14px;flex:1}
.eRanks span{font-family:'Anton';font-size:24px;color:rgba(237,228,214,.4)}
.eRanks i{flex:1;height:1px;background:${LINE}}

/* footer */
.foot{
  border-top:1px solid ${LINE};margin-top:40px;
  padding:44px clamp(22px,6vw,80px);
  display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;
  max-width:1200px;margin-left:auto;margin-right:auto;
}
.footMark{font-family:'Anton';font-size:20px;letter-spacing:5px}
.footTag{font-size:12px;font-weight:400;letter-spacing:3px;text-transform:uppercase;color:${MUTED}}

/* responsive */
@media (max-width:720px){
  .cRow{height:120px}
  .cCode{display:none}
  .cArt{width:96px}
  .cEmblem{width:60px;height:60px}
  .cInfo{padding:0 22px}
  .eRow{height:118px}
  .eArt{width:130px;padding:10px 14px}
  .eArt svg{max-height:76px}
  .eMeta{padding:0 20px}
  .eBackKicker{display:none}
  .eBack{gap:20px;padding:0 22px}
  .eRanks{gap:18px}
}
@media (max-width:460px){
  .links{gap:14px}
  .links a{font-size:11px;letter-spacing:1px}
  .eArt{width:96px}
  .eRanks{gap:12px}
}
@media (prefers-reduced-motion: reduce){
  .sw *{transition:none !important}
  .reveal{opacity:1;transform:none}
  .cInner,.eInner{transition:transform .35s ease !important}
}
`;
