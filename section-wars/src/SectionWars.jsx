import { useEffect, useRef, useState } from "react";

/* ============================================================
   SECTION WARS '26 — Single Page
   Intro (intertitle → fullscreen standoff → logo) scrolls
   directly into the landing content. No "Enter the War" button.
   ============================================================ */

const BASE = "#150A0E";
const SURF = "#1E1015";
const LINE = "#33191F";
const MAROON = "#8A1538";
const GOLD = "#E6A63C";
const CREAM = "#EDE4D6";
const MUTED = "#9C8890";
const INK_CREAM = "#EFE7D6";
const RED = "#A6262B";
const FLASH = "#FFD976";

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

/* ================= INTRO PIECES ================= */

function MuzzleFlash({ x, y, delay = 0 }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <path
        className="mf"
        style={{ animationDelay: `${delay}s` }}
        d="M0,-15 L4,-4 L16,0 L4,4 L0,15 L-4,4 L-16,0 L-4,-4 Z"
        fill={FLASH}
      />
      <circle className="mf" style={{ animationDelay: `${delay}s` }} r="4" fill="#FFF6DC" />
    </g>
  );
}

function Gangster({ x, s = 1, flip = false, variant = "gun", fall = false, fire = false, fireDelay = 0 }) {
  return (
    <g transform={`translate(${x},356) scale(${flip ? -s : s},${s})`}>
      <g className={fall ? "fall" : undefined} fill="#060606">
        <ellipse cx="2" cy="-184" rx="28" ry="5" />
        <path d="M-16,-184 L-13,-206 Q2,-213 17,-206 L20,-184 Z" />
        <path d="M-12,-179 Q-14,-158 -4,-152 L8,-152 Q15,-156 14,-165 L20,-168 L14,-172 L14,-179 Z" />
        <path d="M-20,-149 L22,-149 L29,-92 L25,-88 L27,-34 L-25,-34 L-23,-88 L-27,-92 Z" />
        <rect x="-18" y="-36" width="15" height="34" />
        <rect x="6" y="-36" width="15" height="34" />
        <rect x="-21" y="-7" width="23" height="7" rx="2" />
        <rect x="4" y="-7" width="23" height="7" rx="2" />
        {variant === "gun" && (
          <>
            <rect x="4" y="-145" width="54" height="11" rx="5" />
            <rect x="52" y="-148" width="54" height="8" rx="2" />
            <rect x="66" y="-141" width="9" height="19" rx="2" />
            <circle cx="88" cy="-128" r="10" />
            {fire && <MuzzleFlash x={112} y={-144} delay={fireDelay} />}
          </>
        )}
      </g>
    </g>
  );
}

/* -------- The shootout — fills the whole screen -------- */
function StandoffScene() {
  return (
    <svg className="sceneFull" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="soft2"><feGaussianBlur stdDeviation="3" /></filter>
      </defs>

      {/* moon */}
      <circle cx="655" cy="72" r="30" fill={INK_CREAM} opacity="0.10" />
      <circle cx="655" cy="72" r="46" fill={INK_CREAM} opacity="0.04" filter="url(#soft2)" />

      {/* skyline */}
      <g fill="#0f0e0c">
        <rect x="0" y="286" width="70" height="70" />
        <rect x="80" y="306" width="46" height="50" />
        <rect x="140" y="270" width="58" height="86" />
        <rect x="210" y="300" width="40" height="56" />
        <rect x="560" y="296" width="52" height="60" />
        <rect x="622" y="272" width="64" height="84" />
        <rect x="700" y="308" width="46" height="48" />
        <rect x="756" y="288" width="44" height="68" />
      </g>
      <rect x="0" y="356" width="800" height="44" fill="#0d0c0a" />

      {/* tracer rounds */}
      <rect className="tracer tl" x="255" y="216" width="26" height="2.5" rx="1" fill={FLASH} style={{ animationDelay: "0.55s" }} />
      <rect className="tracer tl" x="255" y="223" width="26" height="2.5" rx="1" fill={FLASH} style={{ animationDelay: "1.45s" }} />
      <rect className="tracer tr" x="540" y="210" width="26" height="2.5" rx="1" fill={FLASH} style={{ animationDelay: "0.95s" }} />

      {/* left crew */}
      <Gangster x={120} s={0.92} variant="gun" fire fireDelay={0.5} />
      <Gangster x={205} s={1.04} variant="gun" fire fireDelay={1.3} />

      {/* right crew — one takes the hit */}
      <Gangster x={596} s={1.02} flip variant="gun" fire fireDelay={0.9} />
      <Gangster x={688} s={0.94} flip variant="gun" fall />

      {/* street fog */}
      <ellipse className="fog" cx="400" cy="380" rx="420" ry="44" fill="#2a251f" opacity="0.25" filter="url(#soft2)" />
    </svg>
  );
}

/* -------- bullet hole decal -------- */
function BulletHole({ left, top, delay }) {
  return (
    <div className="hole" style={{ left, top, animationDelay: `${delay}s` }}>
      <svg width="46" height="46" viewBox="-23 -23 46 46">
        <g stroke="#39322a" strokeWidth="1.5">
          <line x1="8" y1="3" x2="20" y2="8" />
          <line x1="1" y1="-8" x2="3" y2="-21" />
          <line x1="-7" y1="-4" x2="-19" y2="-11" />
          <line x1="-6" y1="6" x2="-14" y2="15" />
          <line x1="5" y1="-7" x2="12" y2="-17" />
          <line x1="-2" y1="8" x2="-5" y2="20" />
        </g>
        <circle r="9" fill="#000" stroke="#4a4137" strokeWidth="2" />
        <circle r="4.5" fill="#171310" />
      </svg>
    </div>
  );
}

function Intertitle({ eyebrow, main }) {
  return (
    <div className="card fadeIn">
      {eyebrow && <div className="cardEyebrow">{eyebrow}</div>}
      <div className="cardMain">{main}</div>
    </div>
  );
}

const LOAD_TEXT = ["SETTING THE SCENE", "EXCHANGING FIRE", "CASE FILE READY"];

/* ================= LANDING PIECES ================= */

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

/* ================= MAIN — one page, intro scrolls into landing ================= */

export default function SectionWars() {
  const [stage, setStage] = useState(0); // 0 intertitle · 1 standoff · 2 logo / done
  const [progress, setProgress] = useState(0);
  const timers = useRef([]);
  const year = "2026";
  const introDone = stage === 2;

  useEffect(() => {
    const t = (fn, ms) => timers.current.push(setTimeout(fn, ms));
    t(() => setStage(1), 2300);
    t(() => { setStage(2); setProgress(100); }, 6300);
    const iv = setInterval(() => {
      setProgress((p) => Math.min(100, p + 1.0 + Math.random() * 0.4));
    }, 65);
    return () => {
      timers.current.forEach(clearTimeout);
      clearInterval(iv);
    };
  }, []);

  /* lock scrolling until the intro is done */
  useEffect(() => {
    document.body.style.overflow = introDone ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [introDone]);

  const skip = () => {
    timers.current.forEach(clearTimeout);
    setStage(2);
    setProgress(100);
  };

  return (
    <div className="sw">
      <style>{css}</style>

      {/* ================= INTRO (top of the page) ================= */}
      <section className="intro" id="intro">
        {stage === 0 && (
          <Intertitle eyebrow="MAXI PRESENTS" main="SEVEN CARTELS. ONE CITY." />
        )}

        {stage === 1 && (
          <div className="fullScene fadeIn">
            <StandoffScene />
            <div className="fireFlash" />
          </div>
        )}

        {stage === 2 && (
          <div className="logoWrap fadeInSlow">
            <div className="eyebrow">MAXI PRESENTS</div>
            <h1 className="logo">SECTION WARS</h1>
            <div className="rule">
              <span />
              <em>{year}</em>
              <span />
            </div>
            <div className="tagline">LOYALTY &nbsp;&middot;&nbsp; RIVALRY &nbsp;&middot;&nbsp; VICTORY</div>
            <button className="scrollHint" onClick={scrollToId("invite")}>
              SCROLL
              <span className="chev">&#9662;</span>
            </button>
          </div>
        )}

        {/* ---- bullet holes on logo reveal ---- */}
        {stage === 2 && (
          <>
            <BulletHole left="16%" top="20%" delay={0.35} />
            <BulletHole left="80%" top="30%" delay={0.75} />
            <BulletHole left="28%" top="74%" delay={1.15} />
          </>
        )}

        {stage < 2 && (
          <button className="skip" onClick={skip}>
            SKIP INTRO &#9656;
          </button>
        )}

        {stage < 2 && (
          <div className="loadBar">
            <div className="loadLabel">
              <span>{LOAD_TEXT[stage]}&hellip;</span>
              <span>{Math.floor(progress)}%</span>
            </div>
            <div className="track">
              <div className="fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
      </section>

      {/* ================= LANDING (scrolls in below) ================= */}
      {introDone && (
        <nav className="nav fadeInSlow">
          <a className="mark" href="#top" onClick={scrollToId("top")}>MAXI</a>
          <div className="links">
            <a href="#invite" onClick={scrollToId("invite")}>Invite</a>
            <a href="#cartels" onClick={scrollToId("cartels")}>Cartels</a>
            <a href="#events" onClick={scrollToId("events")}>Events</a>
            <a href="#gallery" onClick={scrollToId("gallery")}>Gallery</a>
          </div>
        </nav>
      )}

      {/* hero */}
      {/* <header className="hero" id="top">
        <div className="heroInner">
          <p className="heroKicker">MAXI presents</p>
          <h1 className="heroTitle">Section<br />Wars</h1>
          <div className="heroFoot">
            <span className="heroYear">{year}</span>
            <span className="heroTag">Loyalty · Rivalry · Victory</span>
          </div>
        </div>
      </header> */}

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

/* ================= styles ================= */

const css = `
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@300;400;500;600&family=Special+Elite&display=swap');

*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
.sw{
  background:${BASE};color:${CREAM};
  font-family:'Oswald',sans-serif;font-weight:300;
  min-height:100vh;position:relative;overflow-x:hidden;
  -webkit-font-smoothing:antialiased;
}
a{color:inherit;text-decoration:none}

/* ================= intro ================= */
.intro{
  position:relative;height:100vh;height:100svh;
  background:#0B0A08;overflow:hidden;
  display:flex;align-items:center;justify-content:center;
  animation:flicker 4s infinite;
}
/* film grain */
.intro::after{
  content:'';position:absolute;inset:0;pointer-events:none;z-index:8;opacity:.07;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='140' height='140' filter='url(%23n)' opacity='0.55'/></svg>");
  animation:grainShift .45s steps(2) infinite;
}
/* vignette */
.intro::before{
  content:'';position:absolute;inset:0;pointer-events:none;z-index:7;
  background:radial-gradient(ellipse at center, transparent 52%, rgba(0,0,0,.78) 100%);
}

/* fullscreen standoff scene */
.fullScene{position:absolute;inset:0}
.sceneFull{position:absolute;inset:0;width:100%;height:100%;display:block}

/* ---- intertitle ---- */
.card{
  position:relative;z-index:2;
  text-align:center;color:#CFC5AE;padding:34px 46px;max-width:82vw;
  border:2px solid #CFC5AE;box-shadow:0 0 0 6px #0B0A08, 0 0 0 7px #6b6250;
  font-family:'Oswald',sans-serif;
}
.cardEyebrow{font-size:12px;letter-spacing:6px;color:#8d8471;margin-bottom:14px}
.cardMain{font-family:'Special Elite',monospace;font-size:clamp(20px,4.2vw,40px);line-height:1.3}

/* ---- logo ---- */
.logoWrap{text-align:center;padding:0 20px;position:relative;z-index:2}
.eyebrow{font-size:11px;letter-spacing:6px;color:#8d8471;margin-bottom:14px}
.logo{
  font-family:'Anton',sans-serif;color:${INK_CREAM};font-weight:400;
  font-size:clamp(52px,13vw,150px);line-height:1;margin:0;letter-spacing:2px;
  text-shadow:0 4px 0 rgba(0,0,0,.6);
}
.rule{display:flex;align-items:center;gap:14px;max-width:560px;margin:18px auto 0}
.rule span{flex:1;height:2px;background:#CFC5AE;opacity:.5}
.rule em{font-style:normal;font-weight:600;color:${RED};letter-spacing:4px;font-size:15px}
.tagline{margin-top:16px;color:#B7AD97;font-size:clamp(12px,2vw,17px);letter-spacing:7px;font-weight:400}
.scrollHint{
  margin-top:38px;background:transparent;border:none;cursor:pointer;
  display:inline-flex;flex-direction:column;align-items:center;gap:6px;
  color:#9a917d;font-family:'Oswald',sans-serif;font-size:12px;letter-spacing:5px;
  transition:color .25s;
}
.scrollHint:hover{color:${INK_CREAM}}
.scrollHint:focus-visible{outline:2px solid ${FLASH};outline-offset:4px}
.chev{font-size:20px;line-height:1;animation:bob 1.6s ease-in-out infinite}

/* ---- bullet holes ---- */
.hole{position:absolute;z-index:6;animation:holePop .18s both}
@keyframes holePop{from{transform:scale(0)}to{transform:scale(1)}}

/* ---- skip + loading bar ---- */
.skip{
  position:absolute;top:18px;right:20px;z-index:9;background:transparent;color:#9a917d;
  border:1px solid #4a4438;font-family:'Special Elite',monospace;font-size:11px;
  letter-spacing:2px;padding:7px 14px;cursor:pointer;transition:all .2s;
}
.skip:hover{color:${INK_CREAM};border-color:#9a917d}
.loadBar{position:absolute;left:0;right:0;bottom:0;z-index:9;padding:0 clamp(16px,5vw,60px) 18px}
.loadLabel{
  display:flex;justify-content:space-between;font-family:'Special Elite',monospace;
  font-size:11px;letter-spacing:2px;color:#8d8471;margin-bottom:7px;
}
.track{height:3px;background:#241f19}
.fill{height:100%;background:${RED};transition:width .12s linear}

/* ---- intro scene animation classes ---- */
.fog{animation:fogDrift 9s ease-in-out infinite alternate}
.mf{transform-box:fill-box;transform-origin:center;opacity:0;animation:mfBurst 2.2s infinite}
.tracer.tl{opacity:0;animation:tracerFly 2.2s linear infinite}
.tracer.tr{opacity:0;animation:tracerFlyR 2.2s linear infinite}
.fall{transform-box:fill-box;transform-origin:50% 100%;animation:fallDown .55s cubic-bezier(.55,-.15,.85,.5) 2.1s forwards}
.fireFlash{position:absolute;inset:0;background:#FFEDBB;opacity:0;pointer-events:none;animation:ff 2.2s infinite;z-index:3}

/* ---- intro keyframes ---- */
@keyframes flicker{0%,100%{opacity:1}96%{opacity:1}97%{opacity:.94}98%{opacity:1}}
@keyframes grainShift{0%{transform:translate(0,0)}50%{transform:translate(-6px,4px)}100%{transform:translate(4px,-6px)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.fadeIn{animation:fadeIn .7s ease both}
.fadeInSlow{animation:fadeIn 1.1s ease both}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}
@keyframes fogDrift{from{transform:translateX(-24px)}to{transform:translateX(24px)}}
@keyframes mfBurst{
  0%,100%{opacity:0;transform:scale(.6)}
  4%{opacity:1;transform:scale(1.15)}
  9%{opacity:0;transform:scale(.7)}
  52%{opacity:1;transform:scale(1)}
  57%{opacity:0;transform:scale(.6)}
}
@keyframes tracerFly{
  0%{transform:translateX(0);opacity:0}
  4%{opacity:.95}
  15%{transform:translateX(335px);opacity:0}
  100%{transform:translateX(335px);opacity:0}
}
@keyframes tracerFlyR{
  0%{transform:translateX(0);opacity:0}
  4%{opacity:.95}
  15%{transform:translateX(-335px);opacity:0}
  100%{transform:translateX(-335px);opacity:0}
}
@keyframes fallDown{to{transform:rotate(84deg)}}
@keyframes ff{0%,100%{opacity:0}4%{opacity:.10}9%{opacity:0}52%{opacity:.07}57%{opacity:0}}

/* ================= landing ================= */

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
  position:relative;overflow:hidden;
  min-height:92vh;display:flex;align-items:center;
  padding:120px clamp(22px,6vw,80px) 60px;
  background:#0B0A08;
}
/* film grain */
.hero::after{
  content:'';position:absolute;inset:0;pointer-events:none;z-index:1;opacity:.07;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='140' height='140' filter='url(%23n)' opacity='0.55'/></svg>");
  animation:grainShift .45s steps(2) infinite;
}
/* vignette */
.hero::before{
  content:'';position:absolute;inset:0;pointer-events:none;z-index:1;
  background:radial-gradient(ellipse at center, transparent 52%, rgba(0,0,0,.78) 100%);
}
.heroInner{position:relative;z-index:2;max-width:1200px;width:100%;margin:0 auto}
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

/* reveal — basic fade in only (no slide) */
.reveal{opacity:0;transition:opacity .9s ease}
.reveal.in{opacity:1}

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
  .intro, .intro *, .intro::after{animation:none !important;transition:none !important}
  .hero::after{animation:none !important}
  .sw *{transition:none !important}
  .reveal{opacity:1}
  .cInner,.eInner{transition:transform .35s ease !important}
}
`;