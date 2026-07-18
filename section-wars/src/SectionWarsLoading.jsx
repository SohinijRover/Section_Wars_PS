//NOT USING

import { useState, useEffect, useRef } from "react";

/* ============================================================
   SECTION WARS — Cinematic Loading Sequence
   Theme: "The Cartels" — vintage noir, dark, film-grain
   Palette: ink black / aged cream / blood red / muzzle gold
   ============================================================ */

const CREAM = "#EFE7D6";
const RED = "#A6262B";
const FLASH = "#FFD976";

/* ---------------- small SVG pieces ---------------- */

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

/* A noir gangster silhouette. variant: "gun" | "idle" | "point" */
function Gangster({ x, s = 1, flip = false, variant = "gun", fall = false, fire = false, fireDelay = 0 }) {
  return (
    <g transform={`translate(${x},356) scale(${flip ? -s : s},${s})`}>
      <g className={fall ? "fall" : undefined} fill="#060606">
        {/* fedora */}
        <ellipse cx="2" cy="-184" rx="28" ry="5" />
        <path d="M-16,-184 L-13,-206 Q2,-213 17,-206 L20,-184 Z" />
        {/* head, profile w/ nose */}
        <path d="M-12,-179 Q-14,-158 -4,-152 L8,-152 Q15,-156 14,-165 L20,-168 L14,-172 L14,-179 Z" />
        {/* trench coat */}
        <path d="M-20,-149 L22,-149 L29,-92 L25,-88 L27,-34 L-25,-34 L-23,-88 L-27,-92 Z" />
        {/* legs + shoes */}
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
        {variant === "idle" && (
          <>
            <rect x="-27" y="-146" width="10" height="66" rx="5" transform="rotate(5 -22 -146)" />
            <rect x="17" y="-146" width="10" height="66" rx="5" transform="rotate(-5 22 -146)" />
          </>
        )}
        {variant === "point" && (
          <>
            <rect x="-27" y="-146" width="10" height="66" rx="5" transform="rotate(5 -22 -146)" />
            <rect x="4" y="-142" width="56" height="10" rx="5" transform="rotate(30 4 -137)" />
          </>
        )}
      </g>
    </g>
  );
}

/* -------- Scene 1: the plan (safehouse) -------- */
function PlanningScene() {
  return (
    <svg className="scene" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="cone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFE9B0" stopOpacity="0.32" />
          <stop offset="1" stopColor="#FFE9B0" stopOpacity="0" />
        </linearGradient>
        <filter id="soft"><feGaussianBlur stdDeviation="3" /></filter>
      </defs>

      {/* venetian blinds glow */}
      <g opacity="0.07" fill={CREAM}>
        <rect x="70" y="60" width="150" height="12" />
        <rect x="70" y="84" width="150" height="12" />
        <rect x="70" y="108" width="150" height="12" />
      </g>

      <rect x="0" y="356" width="800" height="44" fill="#0d0c0a" />

      {/* swinging lamp + light cone */}
      <g transform="translate(400,0)">
        <g className="swing">
          <line x1="0" y1="0" x2="0" y2="66" stroke="#060606" strokeWidth="3" />
          <path d="M-24,80 L24,80 L12,62 L-12,62 Z" fill="#060606" />
          <circle cx="0" cy="86" r="6" fill="#FFE9B0" filter="url(#soft)" />
          <path d="M-13,86 L-160,336 L160,336 L13,86 Z" fill="url(#cone)" />
        </g>
      </g>

      {/* the crew */}
      <Gangster x={300} variant="point" s={0.98} />
      <Gangster x={520} variant="idle" flip s={1.02} />

      {/* table + city map marked in red */}
      <ellipse cx="400" cy="322" rx="175" ry="24" fill="#141210" />
      <path d="M352,308 L472,308 L452,326 L330,326 Z" fill="#CFC5AE" opacity="0.8" />
      <path d="M362,312 L378,322 M410,310 L398,324 M436,311 L446,321" stroke={RED} strokeWidth="1.6" fill="none" opacity="0.9" />
      <circle cx="378" cy="322" r="2" fill={RED} />
      <circle cx="398" cy="324" r="2" fill={RED} />

      {/* floor fog */}
      <ellipse className="fog" cx="240" cy="372" rx="300" ry="46" fill="#2a251f" opacity="0.28" filter="url(#soft)" />
      <ellipse className="fog2" cx="600" cy="382" rx="320" ry="42" fill="#2a251f" opacity="0.22" filter="url(#soft)" />
    </svg>
  );
}

/* -------- Scene 2: the shootout (old town, midnight) -------- */
function StandoffScene() {
  return (
    <svg className="scene" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
      <defs>
        <filter id="soft2"><feGaussianBlur stdDeviation="3" /></filter>
      </defs>

      {/* moon */}
      <circle cx="655" cy="72" r="30" fill={CREAM} opacity="0.10" />
      <circle cx="655" cy="72" r="46" fill={CREAM} opacity="0.04" filter="url(#soft2)" />

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

/* -------- silent-film intertitle card -------- */
function Intertitle({ eyebrow, main, sub }) {
  return (
    <div className="card fadeIn">
      {eyebrow && <div className="cardEyebrow">{eyebrow}</div>}
      <div className="cardMain">{main}</div>
      {sub && <div className="cardSub">{sub}</div>}
    </div>
  );
}

const LOAD_TEXT = [
  "SETTING THE SCENE",
  "DRAFTING THE PLAN",
  "NEGOTIATIONS FAILING",
  "EXCHANGING FIRE",
  "CASE FILE READY",
];

/* ================= main component ================= */
export default function SectionWarsLoading({ onEnter }) {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [entered, setEntered] = useState(false);
  const timers = useRef([]);

  useEffect(() => {
    const t = (fn, ms) => timers.current.push(setTimeout(fn, ms));
    t(() => setStage(1), 2300);
    t(() => setStage(3), 5600);
    t(() => setStage(4), 8800);
    const iv = setInterval(() => {
      setProgress((p) => Math.min(100, p + 0.65 + Math.random() * 0.3));
    }, 65);
    return () => {
      timers.current.forEach(clearTimeout);
      clearInterval(iv);
    };
  }, []);

  const skip = () => {
    timers.current.forEach(clearTimeout);
    setStage(4);
    setProgress(100);
  };

  if (entered) {
    return (
      <div className="sw-root center">
        <style>{css}</style>
        <div style={{ textAlign: "center", padding: 24 }}>
          <div className="eyebrow">LOADING COMPLETE</div>
          <h2 className="phTitle">MAIN PAGE GOES HERE</h2>
          <p className="phText">
            The intro is done. Describe the next element — hero, cartels,
            events — and we build it next.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`sw-root ${stage === 4 ? "shake" : ""}`}>
      <style>{css}</style>

      {/* ---- stages ---- */}
      <div className="stageArea">
        {stage === 0 && (
          <Intertitle eyebrow="MAXI PRESENTS" main="SEVEN CARTELS. ONE CITY." />
        )}

        {stage === 1 && (
          <div className="sceneWrap fadeIn">
            <PlanningScene />
            <div className="caption">&raquo; SAFEHOUSE NO. 4 — THE PLAN IS SET</div>
          </div>
        )}

        {stage === 3 && (
          <div className="sceneWrap fadeIn">
            <StandoffScene />
            <div className="caption">&raquo; MIDNIGHT. THE WAR BEGINS.</div>
            <div className="fireFlash" />
          </div>
        )}

        {stage === 4 && (
          <div className="logoWrap fadeIn">
            <div className="eyebrow">MAXI PRESENTS</div>
            <h1 className="logo stamp">SECTION WARS</h1>
            <div className="rule">
              <span />
              <em>2026</em>
            </div>
            <div className="tagline">LOYALTY &nbsp;&middot;&nbsp; RIVALRY &nbsp;&middot;&nbsp; VICTORY</div>
            {progress >= 100 && (
              <button
                className="enter"
                onClick={() => (onEnter ? onEnter() : setEntered(true))}
              >
                ENTER THE WAR
              </button>
            )}
          </div>
        )}
      </div>

      {/* ---- bullet holes on logo reveal ---- */}
      {stage === 4 && (
        <>
          <BulletHole left="16%" top="20%" delay={0.35} />
          <BulletHole left="80%" top="30%" delay={0.75} />
          <BulletHole left="28%" top="74%" delay={1.15} />
        </>
      )}

      {/* ---- UI chrome ---- */}
      {stage < 4 && (
        <button className="skip" onClick={skip}>
          SKIP INTRO &#9656;
        </button>
      )}

      {stage < 4 && (
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
    </div>
  );
}

/* ================= styles ================= */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@400;500;600&family=Special+Elite&display=swap');

.sw-root{
  position:relative;
  min-height:100vh;
  background:#0B0A08;
  overflow:hidden;
  font-family:'Oswald',sans-serif;
  animation:flicker 4s infinite;
}
.sw-root.center{display:flex;align-items:center;justify-content:center}

/* film grain */
.sw-root::after{
  content:'';position:absolute;inset:0;pointer-events:none;z-index:8;opacity:.07;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='140' height='140' filter='url(%23n)' opacity='0.55'/></svg>");
  animation:grainShift .45s steps(2) infinite;
}
/* vignette */
.sw-root::before{
  content:'';position:absolute;inset:0;pointer-events:none;z-index:7;
  background:radial-gradient(ellipse at center, transparent 52%, rgba(0,0,0,.78) 100%);
}

.stageArea{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding-bottom:64px}
.sceneWrap{position:relative;width:min(920px,96vw)}
.scene{width:100%;height:auto;display:block}

/* ---- intertitles ---- */
.card{
  text-align:center;color:#CFC5AE;padding:34px 46px;max-width:82vw;
  border:2px solid #CFC5AE;box-shadow:0 0 0 6px #0B0A08, 0 0 0 7px #6b6250;
}
.cardEyebrow{font-family:'Oswald';font-size:12px;letter-spacing:6px;color:#8d8471;margin-bottom:14px}
.cardMain{font-family:'Special Elite',monospace;font-size:clamp(20px,4.2vw,40px);line-height:1.3}
.cardSub{font-family:'Special Elite',monospace;font-size:clamp(11px,1.6vw,14px);color:#8d8471;margin-top:12px;letter-spacing:3px}

.caption{
  position:absolute;left:0;right:0;bottom:-6px;text-align:center;
  font-family:'Special Elite',monospace;font-size:clamp(11px,1.8vw,15px);
  color:#9a917d;letter-spacing:2px;animation:fadeUp .8s .4s both;
}

/* ---- logo ---- */
.logoWrap{text-align:center;padding:0 20px;position:relative;z-index:2}
.eyebrow{font-size:11px;letter-spacing:6px;color:#8d8471;margin-bottom:14px}
.logo{
  font-family:'Anton',sans-serif;color:${"#EFE7D6"};
  font-size:clamp(52px,13vw,150px);line-height:1;margin:0;letter-spacing:2px;
  text-shadow:0 4px 0 rgba(0,0,0,.6);
}
.stamp{animation:stampIn .55s cubic-bezier(.2,1.4,.4,1) both}
.rule{display:flex;align-items:center;gap:14px;max-width:560px;margin:18px auto 0;animation:fadeUp .6s .45s both}
.rule span{flex:1;height:2px;background:#CFC5AE;opacity:.5}
.rule em{font-style:normal;font-family:'Oswald';font-weight:600;color:${"#A6262B"};letter-spacing:4px;font-size:15px}
.tagline{margin-top:16px;color:#B7AD97;font-size:clamp(12px,2vw,17px);letter-spacing:7px;font-weight:400;animation:fadeUp .6s .7s both}
.enter{
  margin-top:34px;padding:13px 38px;background:transparent;color:${"#EFE7D6"};
  border:1.5px solid ${"#EFE7D6"};font-family:'Oswald';font-size:15px;letter-spacing:5px;
  cursor:pointer;animation:fadeUp .6s 1s both;transition:all .25s ease;
}
.enter:hover{background:${"#A6262B"};border-color:${"#A6262B"};color:#fff}
.enter:focus-visible{outline:2px solid ${"#FFD976"};outline-offset:3px}

/* ---- bullet holes ---- */
.hole{position:absolute;z-index:6;animation:holePop .18s both}

/* ---- skip + loading bar ---- */
.skip{
  position:absolute;top:18px;right:20px;z-index:9;background:transparent;color:#9a917d;
  border:1px solid #4a4438;font-family:'Special Elite',monospace;font-size:11px;
  letter-spacing:2px;padding:7px 14px;cursor:pointer;transition:all .2s;
}
.skip:hover{color:${"#EFE7D6"};border-color:#9a917d}
.loadBar{position:absolute;left:0;right:0;bottom:0;z-index:9;padding:0 clamp(16px,5vw,60px) 18px}
.loadLabel{
  display:flex;justify-content:space-between;font-family:'Special Elite',monospace;
  font-size:11px;letter-spacing:2px;color:#8d8471;margin-bottom:7px;
}
.track{height:3px;background:#241f19}
.fill{height:100%;background:${"#A6262B"};transition:width .12s linear}

/* ---- scene animation classes ---- */
.swing{transform-box:fill-box;transform-origin:top center;animation:swing 4.5s ease-in-out infinite}
.fog{animation:fogDrift 9s ease-in-out infinite alternate}
.fog2{animation:fogDrift 11s ease-in-out infinite alternate-reverse}
.mf{transform-box:fill-box;transform-origin:center;opacity:0;animation:mfBurst 2.2s infinite}
.tracer.tl{opacity:0;animation:tracerFly 2.2s linear infinite}
.tracer.tr{opacity:0;animation:tracerFlyR 2.2s linear infinite}
.fall{transform-box:fill-box;transform-origin:50% 100%;animation:fallDown .55s cubic-bezier(.55,-.15,.85,.5) 2.1s forwards}
.fireFlash{position:absolute;inset:0;background:#FFEDBB;opacity:0;pointer-events:none;animation:ff 2.2s infinite;z-index:3}

/* ---- keyframes ---- */
@keyframes flicker{0%,100%{opacity:1}96%{opacity:1}97%{opacity:.94}98%{opacity:1}}
@keyframes grainShift{0%{transform:translate(0,0)}50%{transform:translate(-6px,4px)}100%{transform:translate(4px,-6px)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.fadeIn{animation:fadeIn .7s ease both}
@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes swing{0%,100%{transform:rotate(4deg)}50%{transform:rotate(-4deg)}}
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
@keyframes stampIn{
  0%{transform:scale(2.4) rotate(-5deg);opacity:0}
  60%{transform:scale(.96) rotate(1deg);opacity:1}
  100%{transform:scale(1) rotate(0)}
}
@keyframes holePop{from{transform:scale(0)}to{transform:scale(1)}}
.shake{animation:rootShake 1.5s ease both}
@keyframes rootShake{
  0%,20%,55%,90%,100%{transform:translate(0,0)}
  8%{transform:translate(3px,-2px)}
  40%{transform:translate(-3px,2px)}
  75%{transform:translate(2px,2px)}
}

/* placeholder page */
.phTitle{font-family:'Anton';color:${"#EFE7D6"};font-size:clamp(28px,6vw,54px);letter-spacing:1px;margin:10px 0}
.phText{font-family:'Special Elite',monospace;color:#9a917d;max-width:520px;margin:0 auto;line-height:1.8;font-size:14px}

@media (prefers-reduced-motion: reduce){
  .sw-root, .sw-root *, .sw-root::after{animation:none !important;transition:none !important}
}
`;
