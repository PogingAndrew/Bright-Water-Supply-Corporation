import React, { useState, useEffect, useRef } from "react";
import brightLogo from "./assets/brightlogo.png";

// Helper to pass the --i CSS custom property (used for staggered "waterfall"
// reveal delays through TypeScript's stricter CSSProperties typing.
const stagger = (i: number): React.CSSProperties => ({ ["--i" as any]: i });

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "process", label: "How It Works" },
  { id: "careers", label: "Careers" },
  { id: "contact", label: "Contact" },
];

const VALUES = [
  { label: "Integrity", note: "We operate honestly, in the open" },
  { label: "Reliability", note: "Water, on schedule, every time" },
  { label: "Excellence", note: "Precision in every process stage" },
  { label: "Customer Service", note: "Responsive to every household" },
  { label: "Sustainability", note: "Resources managed for the long run" },
  { label: "Safety", note: "Protecting crews, sites, and supply" },
  { label: "Accountability", note: "Owning outcomes, not excuses" },
  { label: "Innovation", note: "Better systems, continuously" },
];

const SERVICES = [
  { label: "EXAMPLE", desc: "Clean, safe drinking water delivered to homes and businesses." },
  { label: "EXAMPLE", desc: "Facility operations that purify raw water to potable standard." },
  { label: "EXAMPLE", desc: "Network management that moves treated water reliably outward." },
  { label: "EXAMPLE", desc: "Day-to-day running of intake, treatment, and delivery systems." },
  { label: "EXAMPLE", desc: "Inspection, repair, and upkeep of the distribution network." },
  { label: "EXAMPLE", desc: "Engineering support across treatment and delivery infrastructure." },
  { label: "EXAMPLE", desc: "Scheduled servicing that heads off failures before they happen." },
  { label: "EXAMPLE", desc: "Expansion and upgrades to serve growing communities." },
  { label: "EXAMPLE", desc: "On-call engineering and operations expertise." },
];

const INDUSTRIES = [
  {
    label: "Residential Communities",
    detail: "Households and subdivisions connected to a steady, potable water supply — from individual homes to multi-unit residential blocks.",
  },
  {
    label: "Commercial Establishments",
    detail: "Retail centers, offices, and commercial complexes that need dependable, uninterrupted supply to keep daily operations running.",
  },
  {
    label: "Industrial Facilities",
    detail: "Manufacturing and industrial sites requiring consistent volume and treated water quality for production processes.",
  },
  {
    label: "Local Communities",
    detail: "Barangays and municipalities served through community-wide distribution infrastructure and system monitoring.",
  },
  {
    label: "Property Developments",
    detail: "New subdivisions and developments with water infrastructure planned and integrated from the ground up.",
  },
];

const CAREERS = [
  { role: "Water Engineers", area: "Engineering" },
  { role: "Utilities Engineers", area: "Engineering" },
  { role: "Operations Personnel", area: "Operations" },
  { role: "Maintenance Personnel", area: "Operations" },
  { role: "Accounting Professionals", area: "Corporate" },
];

const WHY = [
  "Commitment to water quality",
  "Reliable utility operations",
  "Experienced engineering support",
  "Focus on system efficiency",
  "Continuous maintenance and monitoring",
  "Customer-oriented service",
];

const STAGES = [
  { n: "01", title: "Intake", body: "Raw water is drawn from source and screened before it moves further into the system." },
  { n: "02", title: "Treatment", body: "Water is filtered and treated at the facility until it meets potable standards." },
  { n: "03", title: "Distribution", body: "Treated water is pushed through the pipeline network across service areas." },
  { n: "04", title: "Delivery", body: "Water reaches homes, businesses, and facilities — monitored the whole way." },
];

function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setShown(true)),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, shown] = useReveal();
  return (
    <div
      ref={ref}
      className={`bw-reveal ${shown ? "bw-reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function FlowRule() {
  return (
    <div className="bw-flowrule" aria-hidden="true">
      <svg viewBox="0 0 1200 24" preserveAspectRatio="none">
        <line x1="0" y1="12" x2="1200" y2="12" className="bw-flowline" />
      </svg>
    </div>
  );
}

function Waterfall({ count = 14 }) {
  const drops = React.useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: Math.round((i / count) * 100 + (((i * 37) % 10) - 5)),
        duration: 2.4 + ((i * 53) % 18) / 10,
        delay: -((i * 71) % 24) / 10,
        height: 60 + ((i * 29) % 60),
        opacity: 0.12 + ((i * 17) % 20) / 100,
      })),
    [count]
  );
  return (
    <div className="bw-waterfall" aria-hidden="true">
      {drops.map((d, i) => (
        <span
          key={i}
          className="bw-drop"
          style={{
            left: `${d.left}%`,
            height: `${d.height}px`,
            opacity: d.opacity,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [openIndustry, setOpenIndustry] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Placeholder address — swap for the company's real inbox once provided.
  const CONTACT_EMAIL = "example@brightwatersupply.com";

  const handleInquire = () => {
    const subject = encodeURIComponent("Inquiry — Bright Water Supply Corporation");
    const body = encodeURIComponent(
      "Hello Bright Water Supply team,\n\nI'd like to inquire about your services.\n\n"
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    setShowToast(true);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setShowToast(false), 4000);
  };


  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      setScrolled(y > 40);
      const doc = document.documentElement;
      const max = (doc.scrollHeight || 1) - doc.clientHeight;
      setScrollProgress(max > 0 ? Math.min(1, y / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const go = (id: string) => {
    setNavOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bw-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        /* Override Vite's default scaffold styles (index.css / App.css) so they
           can't leak into this design via inheritance or global selectors. */
        #root {
          max-width: none !important;
          margin: 0 !important;
          padding: 0 !important;
          text-align: left !important;
          width: 100% !important;
        }
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          display: block !important;
          place-items: unset !important;
          min-width: 0 !important;
          background: #F7F4EE !important;
          scroll-behavior: smooth;
        }
        .bw-root a {
          color: inherit;
          font-weight: inherit;
          text-decoration: none;
        }

        .bw-root {
          text-align: left;
          --ink: #0B2E42;
          --ink-soft: #234759;
          --teal: #1B7A8C;
          --teal-deep: #14606F;
          --sand: #E8E2D4;
          --paper: #F7F4EE;
          --rust: #C4622D;
          --text: #14232B;
          --line: rgba(11,46,66,0.14);
          --white: #FFFFFF;
          --ease: cubic-bezier(0.16, 1, 0.3, 1);
          --ease-soft: cubic-bezier(0.4, 0, 0.2, 1);
          font-family: 'IBM Plex Sans', sans-serif;
          color: var(--text);
          background: var(--paper);
          width: 100%;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }
        .bw-root * { box-sizing: border-box; }
        .bw-display { font-family: 'Space Grotesk', sans-serif; }
        .bw-mono { font-family: 'IBM Plex Mono', monospace; }

        .bw-reveal {
          opacity: 0; transform: translateY(22px) scale(0.99);
          transition: opacity 0.8s var(--ease), transform 0.8s var(--ease);
          will-change: opacity, transform;
        }
        .bw-reveal-in { opacity: 1; transform: translateY(0) scale(1); }
        @media (prefers-reduced-motion: reduce) {
          .bw-reveal { opacity: 1; transform: none; transition: none; }
        }

        /* Waterfall stagger: items cascade in sequence once their parent
           Reveal wrapper enters view. Each item sets --i to its own index.
           Uses animation (not transition) so it never collides with an
           element's own hover transitions. */
        .bw-cascade { opacity: 0; transform: translateY(16px); }
        .bw-reveal-in .bw-cascade {
          animation: bwCascadeIn 0.7s var(--ease) calc(var(--i, 0) * 70ms) both;
        }
        @keyframes bwCascadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bw-cascade { opacity: 1; transform: none; animation: none; }
        }

        /* HEADER */
        .bw-progress {
          position: fixed; top: 0; left: 0; height: 3px; z-index: 60;
          background: linear-gradient(90deg, var(--teal), var(--rust));
          transform-origin: left; transition: transform 0.12s linear;
          pointer-events: none;
        }
        #home, #about, #services, #process, #careers, #contact {
          scroll-margin-top: 100px;
        }
        .bw-header {
          position: sticky; top: 0; z-index: 50;
          background: rgba(247,244,238,0.86);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--line);
          transition: box-shadow 0.4s var(--ease), border-color 0.4s var(--ease);
        }
        .bw-header.is-scrolled {
          box-shadow: 0 8px 24px -12px rgba(11,46,66,0.18);
          border-bottom-color: rgba(11,46,66,0.2);
        }
        .bw-header-inner {
          max-width: 1180px; margin: 0 auto; padding: 16px 24px;
          display: flex; align-items: center; justify-content: space-between;
          transition: padding 0.35s var(--ease);
        }
        .bw-header.is-scrolled .bw-header-inner { padding: 9px 24px; }
        .bw-logo { display: flex; align-items: center; gap: 10px; cursor: pointer; }
        .bw-logo-img { height: 72px; width: auto; display: block; transition: height 0.35s var(--ease); }
        .bw-header.is-scrolled .bw-logo-img { height: 50px; }
        .bw-logo-img-footer { height: 84px; }

        .bw-nav { display: flex; gap: 4px; align-items: center; position: relative; }
        .bw-nav button {
          position: relative; background: none; border: none; cursor: pointer; padding: 8px 14px;
          font-family: 'IBM Plex Sans', sans-serif; font-size: 13.5px; font-weight: 500;
          color: var(--ink-soft); border-radius: 999px; z-index: 1;
          transition: color 0.35s var(--ease);
        }
        .bw-nav button:hover { color: var(--ink); }
        .bw-nav button::before {
          content: ""; position: absolute; inset: 0; border-radius: 999px;
          background: var(--sand); opacity: 0; transform: scale(0.85);
          transition: opacity 0.25s var(--ease), transform 0.25s var(--ease);
          z-index: -1;
        }
        .bw-nav button:hover::before { opacity: 1; transform: scale(1); }
        .bw-nav button.on { color: var(--white); }
        .bw-nav button.on::before { opacity: 1; transform: scale(1); background: var(--ink); }
        .bw-cta {
          font-family: 'IBM Plex Sans', sans-serif; font-weight: 600; font-size: 13.5px;
          background: var(--rust); color: var(--white); border: none; padding: 10px 18px;
          border-radius: 999px; cursor: pointer; transition: filter 0.3s var(--ease), transform 0.3s var(--ease), box-shadow 0.3s var(--ease);
        }
        .bw-cta:hover { filter: brightness(1.08); transform: translateY(-2px); box-shadow: 0 10px 20px -8px rgba(196,98,45,0.55); }
        .bw-cta:active { transform: translateY(0); }

        .bw-burger {
          display: none; background: none; border: none; cursor: pointer; padding: 6px;
          width: 34px; height: 34px; position: relative;
        }
        .bw-burger span {
          display: block; position: absolute; left: 6px; width: 22px; height: 2px; background: var(--ink);
          border-radius: 2px; transition: transform 0.35s var(--ease), opacity 0.25s var(--ease), top 0.35s var(--ease);
        }
        .bw-burger span:nth-child(1) { top: 11px; }
        .bw-burger span:nth-child(2) { top: 17px; }
        .bw-burger span:nth-child(3) { top: 23px; }
        .bw-burger.is-open span:nth-child(1) { top: 17px; transform: rotate(45deg); }
        .bw-burger.is-open span:nth-child(2) { opacity: 0; }
        .bw-burger.is-open span:nth-child(3) { top: 17px; transform: rotate(-45deg); }


        /* HERO */
        .bw-hero {
          max-width: 1180px; margin: 0 auto; padding: 64px 24px 40px;
          display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 48px; align-items: center;
        }
        .bw-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11.5px; letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--teal-deep); font-weight: 500; margin-bottom: 18px;
        }
        .bw-eyebrow::before {
          content: ""; width: 7px; height: 7px; border-radius: 50%; background: var(--rust);
          box-shadow: 0 0 0 3px rgba(196,98,45,0.18);
        }
        .bw-h1 {
          font-size: clamp(2.4rem, 4.6vw, 3.6rem); line-height: 1.04; font-weight: 700;
          letter-spacing: -0.01em; margin: 0 0 20px;
        }
        .bw-h1 em { font-style: normal; color: var(--teal); }
        .bw-lede { font-size: 17px; line-height: 1.6; color: var(--ink-soft); max-width: 46ch; margin-bottom: 30px; }
        .bw-hero-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 34px; }
        .bw-btn-ghost {
          font-family: 'IBM Plex Sans', sans-serif; font-weight: 600; font-size: 13.5px;
          background: transparent; color: var(--ink); border: 1.5px solid var(--ink); padding: 10px 20px;
          border-radius: 999px; cursor: pointer;
          transition: background 0.35s var(--ease), color 0.35s var(--ease), transform 0.35s var(--ease);
        }
        .bw-btn-ghost:hover { background: var(--ink); color: var(--white); transform: translateY(-2px); }
        .bw-btn-ghost:active { transform: translateY(0); }
        .bw-btn-solid {
          font-family: 'IBM Plex Sans', sans-serif; font-weight: 600; font-size: 13.5px;
          background: var(--ink); color: var(--white); border: none; padding: 10px 20px;
          border-radius: 999px; cursor: pointer;
          transition: filter 0.35s var(--ease), transform 0.35s var(--ease), box-shadow 0.35s var(--ease);
        }
        .bw-btn-solid:hover { filter: brightness(1.2); transform: translateY(-2px); box-shadow: 0 10px 20px -10px rgba(11,46,66,0.5); }
        .bw-btn-solid:active { transform: translateY(0); }

        .bw-hero-tags { display: flex; gap: 22px; flex-wrap: wrap; }
        .bw-hero-tag { font-size: 12px; color: var(--ink-soft); display: flex; align-items: center; gap: 7px; }
        .bw-hero-tag .dot { width: 5px; height: 5px; border-radius: 50%; background: var(--teal); }

        /* HERO SCHEMATIC (signature) */
        .bw-schematic {
          background: var(--ink); border-radius: 22px; padding: 30px 24px;
          position: relative; overflow: hidden;
        }
        .bw-schematic::before {
          content: ""; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(circle at 80% 0%, rgba(27,122,140,0.35), transparent 55%);
        }
        .bw-schem-label {
          font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(255,255,255,0.55); margin-bottom: 20px; position: relative;
        }
        .bw-schem-nodes { position: relative; display: flex; flex-direction: column; gap: 0; }

        /* WATERFALL: decorative falling water streaks on dark panels */
        .bw-waterfall {
          position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0;
        }
        .bw-drop {
          position: absolute; top: -20%; width: 2px;
          background: linear-gradient(to bottom, transparent, rgba(140,214,225,0.9) 55%, transparent);
          animation-name: bwdrop; animation-timing-function: linear; animation-iteration-count: infinite;
          border-radius: 2px; filter: blur(0.2px);
        }
        @keyframes bwdrop {
          0% { transform: translateY(-20%); }
          100% { transform: translateY(420px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bw-waterfall { display: none; }
        }
        .bw-schem-node { display: flex; align-items: flex-start; gap: 14px; position: relative; padding-bottom: 30px; }
        .bw-schem-node:last-child { padding-bottom: 0; }
        .bw-schem-node .pipe {
          position: absolute; left: 13px; top: 28px; bottom: -2px; width: 2px;
          background: repeating-linear-gradient(to bottom, rgba(27,122,140,0.9) 0 6px, transparent 6px 12px);
          background-size: 2px 24px;
          animation: bwflow 1.1s linear infinite;
        }
        .bw-schem-node:last-child .pipe { display: none; }
        @keyframes bwflow { to { background-position: 0 24px; } }
        .bw-schem-num {
          width: 27px; height: 27px; border-radius: 50%; background: var(--teal);
          color: var(--white); font-size: 11px; font-weight: 600; display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; position: relative; z-index: 1;
        }
        .bw-schem-copy .tt { color: var(--white); font-weight: 600; font-size: 14.5px; margin-bottom: 2px; }
        .bw-schem-copy .dd { color: rgba(255,255,255,0.6); font-size: 12.5px; line-height: 1.5; }

        /* SECTIONS */
        .bw-section { max-width: 1180px; margin: 0 auto; padding: 88px 24px; }
        .bw-section.tight { padding-top: 60px; }
        .bw-kicker {
          font-size: 11.5px; letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--teal-deep); font-weight: 600; margin-bottom: 12px;
        }
        .bw-h2 { font-size: clamp(1.7rem, 3vw, 2.3rem); font-weight: 700; letter-spacing: -0.01em; margin: 0 0 16px; }
        .bw-sub { font-size: 15.5px; color: var(--ink-soft); max-width: 62ch; line-height: 1.65; margin-bottom: 46px; }

        .bw-flowrule { width: 100%; height: 24px; margin: 0 auto; max-width: 1180px; padding: 0 24px; }
        .bw-flowrule svg { width: 100%; height: 24px; display: block; }
        .bw-flowline {
          stroke: var(--line); stroke-width: 2;
          stroke-dasharray: 2 10; stroke-linecap: round;
          stroke-dashoffset: 0;
          animation: bwFlowDash 5s linear infinite;
        }
        @keyframes bwFlowDash { to { stroke-dashoffset: -24; } }
        @media (prefers-reduced-motion: reduce) {
          .bw-flowline { animation: none; }
        }

        /* ABOUT */
        .bw-about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .bw-card {
          background: var(--white); border: 1px solid var(--line); border-radius: 18px; padding: 28px;
        }
        .bw-card .k { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--rust); font-weight: 600; margin-bottom: 12px; }
        .bw-card p { font-size: 15px; line-height: 1.65; color: var(--ink-soft); margin: 0; }
        .bw-about-copy { font-size: 15.5px; line-height: 1.7; color: var(--ink-soft); margin-bottom: 30px; }

        .bw-values-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px;
          background: var(--line); border: 1px solid var(--line); border-radius: 18px; overflow: hidden;
        }
        .bw-value {
          background: var(--paper); padding: 24px 20px;
          transition: background 0.3s var(--ease);
        }
        .bw-value:hover { background: var(--white); }
        .bw-value .vt { font-weight: 600; font-size: 14.5px; margin-bottom: 6px; }
        .bw-value .vd { font-size: 12.5px; color: var(--ink-soft); line-height: 1.5; }

        /* SERVICES */
        .bw-services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .bw-service {
          background: var(--white); border: 1px solid var(--line); border-radius: 16px; padding: 22px;
          transition: border-color 0.35s var(--ease), box-shadow 0.35s var(--ease), transform 0.35s var(--ease);
        }
        .bw-service:hover { border-color: var(--teal); transform: translateY(-4px); box-shadow: 0 16px 28px -18px rgba(11,46,66,0.35); }
        .bw-service .st { font-weight: 600; font-size: 15px; margin-bottom: 8px; }
        .bw-service .sd { font-size: 13px; color: var(--ink-soft); line-height: 1.55; }

        /* PROCESS (full width) */
        .bw-process-wrap { background: var(--ink); position: relative; overflow: hidden; }
        .bw-process { max-width: 1180px; margin: 0 auto; padding: 88px 24px; position: relative; z-index: 1; }
        .bw-process .bw-kicker { color: var(--teal); }
        .bw-process .bw-h2, .bw-process .bw-sub { color: var(--white); }
        .bw-process .bw-sub { color: rgba(255,255,255,0.65); }
        .bw-stages { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; position: relative; }
        .bw-stage { position: relative; padding: 0 18px 0 0; }
        .bw-stage-top { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
        .bw-stage-num {
          font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: var(--teal);
          border: 1px solid rgba(27,122,140,0.5); border-radius: 999px; padding: 4px 10px;
        }
        .bw-stage-line { flex: 1; height: 2px; background: repeating-linear-gradient(to right, var(--teal) 0 6px, transparent 6px 12px); background-size: 24px 2px; animation: bwflowh 1.1s linear infinite; }
        .bw-stage:last-child .bw-stage-line { display: none; }
        @keyframes bwflowh { to { background-position: 24px 0; } }
        .bw-stage-title { color: var(--white); font-weight: 600; font-size: 17px; margin-bottom: 8px; }
        .bw-stage-body { color: rgba(255,255,255,0.62); font-size: 13.5px; line-height: 1.6; }

        /* WHY / INDUSTRIES */
        .bw-split { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }
        .bw-why-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 14px; }
        .bw-why-list li {
          display: flex; align-items: flex-start; gap: 12px; font-size: 15px; color: var(--text);
          padding-bottom: 14px; border-bottom: 1px solid var(--line);
        }
        .bw-why-list li:last-child { border-bottom: none; }
        .bw-check {
          width: 20px; height: 20px; border-radius: 50%; background: var(--teal); flex-shrink: 0;
          display: flex; align-items: center; justify-content: center; margin-top: 1px;
        }
        .bw-check svg { width: 11px; height: 11px; }

        .bw-accordion { display: flex; flex-direction: column; gap: 10px; }
        .bw-acc-item {
          background: var(--sand); border-radius: 14px; overflow: hidden;
          border: 1px solid transparent; transition: border-color 0.35s var(--ease);
        }
        .bw-acc-item.is-open { border-color: var(--teal); }
        .bw-acc-trigger {
          width: 100%; display: flex; align-items: center; gap: 14px;
          background: none; border: none; cursor: pointer; padding: 18px 20px;
          font-family: 'IBM Plex Sans', sans-serif; text-align: left;
        }
        .bw-acc-num { font-size: 12px; color: var(--teal-deep); flex-shrink: 0; }
        .bw-acc-label { flex: 1; font-weight: 600; font-size: 14.5px; color: var(--text); }
        .bw-acc-chevron {
          width: 22px; height: 22px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          color: var(--ink); background: rgba(11,46,66,0.06);
          transition: transform 0.4s var(--ease), background 0.35s var(--ease), color 0.35s var(--ease);
        }
        .bw-acc-chevron svg { width: 13px; height: 13px; }
        .bw-acc-item.is-open .bw-acc-chevron { transform: rotate(180deg); background: var(--teal); color: var(--white); }
        .bw-acc-panel {
          display: grid; grid-template-rows: 0fr;
          transition: grid-template-rows 0.4s var(--ease);
        }
        .bw-acc-item.is-open .bw-acc-panel { grid-template-rows: 1fr; }
        .bw-acc-panel-inner { overflow: hidden; }
        .bw-acc-panel-inner p {
          margin: 0; padding: 0 20px 20px 54px; font-size: 13.5px; line-height: 1.6; color: var(--ink-soft);
        }

        /* CAREERS */
        .bw-careers-wrap { background: var(--sand); border-radius: 24px; padding: 48px; }
        .bw-careers-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 30px; }
        .bw-career-row {
          display: flex; align-items: center; justify-content: space-between;
          background: var(--white); border-radius: 12px; padding: 16px 20px; border: 1px solid var(--line);
          transition: border-color 0.35s var(--ease), transform 0.35s var(--ease), box-shadow 0.35s var(--ease);
        }
        .bw-career-row:hover {
          border-color: var(--teal); transform: translateX(4px);
          box-shadow: 0 10px 20px -14px rgba(11,46,66,0.3);
        }
        .bw-career-row .role { font-weight: 600; font-size: 14.5px; }
        .bw-career-row .area {
          font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--teal-deep);
          background: rgba(27,122,140,0.1); padding: 4px 10px; border-radius: 999px; font-weight: 600;
        }

        /* CONTACT */
        .bw-contact-wrap {
          background: var(--ink); border-radius: 26px; padding: 56px; position: relative; overflow: hidden;
        }
        .bw-contact-wrap::after {
          content: ""; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(circle at 90% 100%, rgba(27,122,140,0.4), transparent 55%);
        }
        .bw-contact-inner-simple {
          position: relative; display: flex; align-items: center; justify-content: space-between;
          gap: 40px; flex-wrap: wrap;
        }
        .bw-contact-copy-block { flex: 1; min-width: 260px; }
        .bw-contact-wrap .bw-h2 { color: var(--white); }
        .bw-contact-copy { color: rgba(255,255,255,0.65); font-size: 15px; line-height: 1.7; max-width: 44ch; }
        .bw-contact-action { display: flex; flex-direction: column; align-items: flex-start; gap: 14px; }
        .bw-cta-lg { padding: 16px 34px; font-size: 15px; }

        /* TOAST */
        .bw-toast {
          position: fixed; left: 50%; bottom: 28px; z-index: 90;
          display: flex; align-items: flex-start; gap: 12px;
          background: var(--ink); color: var(--white); border-radius: 14px;
          padding: 16px 18px; max-width: 340px; box-shadow: 0 20px 40px -14px rgba(11,46,66,0.5);
          border: 1px solid rgba(255,255,255,0.1);
          transform: translate(-50%, 16px) scale(0.97); opacity: 0; pointer-events: none;
          transition: transform 0.4s var(--ease), opacity 0.4s var(--ease);
        }
        .bw-toast.is-shown { transform: translate(-50%, 0) scale(1); opacity: 1; pointer-events: auto; }
        .bw-toast-icon {
          width: 26px; height: 26px; border-radius: 50%; background: var(--teal); flex-shrink: 0;
          display: flex; align-items: center; justify-content: center; margin-top: 1px;
        }
        .bw-toast-icon svg { width: 14px; height: 14px; }
        .bw-toast-title { font-weight: 600; font-size: 14px; margin-bottom: 2px; }
        .bw-toast-body { font-size: 12.5px; color: rgba(255,255,255,0.65); line-height: 1.45; }
        .bw-toast-close {
          margin-left: auto; background: none; border: none; color: rgba(255,255,255,0.5);
          font-size: 18px; line-height: 1; cursor: pointer; padding: 0 2px; flex-shrink: 0;
          transition: color 0.25s var(--ease);
        }
        .bw-toast-close:hover { color: var(--white); }
        @media (max-width: 480px) {
          .bw-toast { left: 16px; right: 16px; transform: translateY(16px) scale(0.97); max-width: none; }
          .bw-toast.is-shown { transform: translateY(0) scale(1); }
        }

        /* FOOTER */
        .bw-footer { border-top: 1px solid var(--line); padding: 40px 24px; }
        .bw-footer-inner {
          max-width: 1180px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 20px;
        }
        .bw-footer-links { display: flex; gap: 18px; flex-wrap: wrap; }
        .bw-footer-links button {
          background: none; border: none; cursor: pointer; font-size: 12.5px; color: var(--ink-soft);
          font-family: 'IBM Plex Sans', sans-serif;
        }
        .bw-footer-links button:hover { color: var(--ink); }
        .bw-footer-fine { font-size: 11.5px; color: var(--ink-soft); opacity: 0.7; }

        @media (max-width: 880px) {
          .bw-nav { display: none; }
          .bw-burger { display: block; }
          .bw-hero { grid-template-columns: 1fr; padding-top: 40px; }
          .bw-about-grid { grid-template-columns: 1fr; }
          .bw-values-grid { grid-template-columns: repeat(2, 1fr); }
          .bw-services-grid { grid-template-columns: 1fr 1fr; }
          .bw-stages { grid-template-columns: 1fr; gap: 26px; }
          .bw-stage-line { display: none; }
          .bw-split { grid-template-columns: 1fr; }
          .bw-careers-grid { grid-template-columns: 1fr; }
          .bw-contact-inner-simple { flex-direction: column; align-items: flex-start; }
          .bw-careers-wrap, .bw-contact-wrap { padding: 32px 22px; }
        }
        @media (max-width: 560px) {
          .bw-services-grid { grid-template-columns: 1fr; }
          .bw-values-grid { grid-template-columns: 1fr 1fr; }
        }

        .bw-mobile-menu-wrap {
          display: grid; grid-template-rows: 0fr;
          background: var(--paper); border-bottom: 1px solid transparent;
          transition: grid-template-rows 0.4s var(--ease), border-color 0.4s var(--ease);
        }
        .bw-mobile-menu-wrap.is-open { grid-template-rows: 1fr; border-bottom-color: var(--line); }
        .bw-mobile-menu { overflow: hidden; }
        .bw-mobile-menu-inner {
          display: flex; flex-direction: column; gap: 2px; padding: 8px 24px 18px;
        }
        .bw-mobile-menu button {
          text-align: left; background: none; border: none; padding: 10px 4px; font-size: 15px;
          color: var(--ink); font-family: 'IBM Plex Sans', sans-serif; border-bottom: 1px solid var(--line);
          opacity: 0; transform: translateX(-8px);
          transition: opacity 0.35s var(--ease), transform 0.35s var(--ease);
          transition-delay: calc(var(--i, 0) * 45ms);
        }
        .bw-mobile-menu-wrap.is-open button { opacity: 1; transform: translateX(0); }
        .bw-mobile-menu button:last-child { border-bottom: none; }
      `}</style>

      {/* SCROLL PROGRESS */}
      <div className="bw-progress" style={{ transform: `scaleX(${scrollProgress})` }} />

      {/* HEADER */}
      <header className={`bw-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="bw-header-inner">
          <div className="bw-logo" onClick={() => go("home")}>
            <img src={brightLogo} alt="Bright Water Supply Corporation" className="bw-logo-img" />
          </div>
          <nav className="bw-nav">
            {NAV.map((n) => (
              <button key={n.id} className={active === n.id ? "on" : ""} onClick={() => go(n.id)}>
                {n.label}
              </button>
            ))}
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button className="bw-cta" onClick={() => go("contact")}>Contact Us</button>
            <button
              className={`bw-burger ${navOpen ? "is-open" : ""}`}
              onClick={() => setNavOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={navOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
        <div className={`bw-mobile-menu-wrap ${navOpen ? "is-open" : ""}`}>
          <div className="bw-mobile-menu">
            <div className="bw-mobile-menu-inner">
              {NAV.map((n, idx) => (
                <button key={n.id} style={stagger(idx)} onClick={() => go(n.id)}>{n.label}</button>
              ))}
            </div>
          </div>
        </div>
      </header>


      {/* HERO */}
      <section id="home" className="bw-hero">
        <Reveal>
          <div className="bw-eyebrow">Philippine Water Utility</div>
          <h1 className="bw-h1 bw-display">
            From source to tap,<br /><em>water you can rely on.</em>
          </h1>
          <p className="bw-lede">
            Bright Water Supply Corporation develops, operates, and maintains water supply
            systems that deliver safe, potable water to communities — backed by dependable
            treatment, distribution, and engineering.
          </p>
          <div className="bw-hero-actions">
            <button className="bw-btn-solid" onClick={() => go("services")}>Explore Our Services</button>
            <button className="bw-btn-ghost" onClick={() => go("about")}>About the Company</button>
          </div>
          <div className="bw-hero-tags">
            <div className="bw-hero-tag"><span className="dot" />Water Treatment</div>
            <div className="bw-hero-tag"><span className="dot" />Distribution Networks</div>
            <div className="bw-hero-tag"><span className="dot" />Utility Engineering</div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="bw-schematic">
            <Waterfall count={10} />
            <div className="bw-schem-label bw-mono">intake-to-tap system</div>
            <div className="bw-schem-nodes">
              {STAGES.map((s, idx) => (
                <div className="bw-schem-node bw-cascade" style={stagger(idx)} key={s.n}>
                  <div className="pipe" />
                  <div className="bw-schem-num bw-mono">{s.n}</div>
                  <div className="bw-schem-copy">
                    <div className="tt bw-display">{s.title}</div>
                    <div className="dd">{s.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <FlowRule />

      {/* ABOUT */}
      <section id="about" className="bw-section">
        <Reveal>
          <div className="bw-kicker">About Us</div>
          <h2 className="bw-h2 bw-display">Operating the systems communities depend on</h2>
          <p className="bw-about-copy">
            Bright Water Supply Corporation is committed to providing safe and dependable water
            services through efficient water supply solutions. We focus on operating and
            maintaining water systems while supporting sustainable infrastructure for every
            community we serve — from treatment facilities to the pipeline reaching your door.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="bw-about-grid">
            <div className="bw-card">
              <div className="k">Mission</div>
              <p>To deliver safe, clean, and reliable water services through efficient operations, responsible resource management, and continuous improvement.</p>
            </div>
            <div className="bw-card">
              <div className="k">Vision</div>
              <p>To be a trusted provider of sustainable water supply solutions that improve the quality of life in every community we serve.</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div style={{ marginTop: "56px" }}>
            <div className="bw-kicker">Core Values</div>
            <h2 className="bw-h2 bw-display" style={{ marginBottom: "28px" }}>What guides our operations</h2>
            <div className="bw-values-grid">
              {VALUES.map((v, idx) => (
                <div className="bw-value bw-cascade" style={stagger(idx)} key={v.label}>
                  <div className="vt">{v.label}</div>
                  <div className="vd">{v.note}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <FlowRule />

      {/* SERVICES */}
      <section id="services" className="bw-section">
        <Reveal>
          <div className="bw-kicker">Our Services</div>
          <h2 className="bw-h2 bw-display">Full-cycle water utility services</h2>
          <p className="bw-sub">
            From raw water intake through to the tap, our teams manage every stage of the
            water supply chain.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="bw-services-grid">
            {SERVICES.map((s, idx) => (
              <div className="bw-service bw-cascade" style={stagger(idx)} key={s.label}>
                <div className="st">{s.label}</div>
                <div className="sd">{s.desc}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* PROCESS */}
      <div id="process" className="bw-process-wrap">
        <Waterfall count={22} />
        <div className="bw-process">
          <Reveal>
            <div className="bw-kicker">How It Works</div>
            <h2 className="bw-h2 bw-display">How water reaches you</h2>
            <p className="bw-sub">
              Every drop passes through four monitored stages before it reaches a community.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="bw-stages">
              {STAGES.map((s, idx) => (
                <div className="bw-stage bw-cascade" style={stagger(idx)} key={s.n}>
                  <div className="bw-stage-top">
                    <div className="bw-stage-num">{s.n}</div>
                    <div className="bw-stage-line" />
                  </div>
                  <div className="bw-stage-title bw-display">{s.title}</div>
                  <div className="bw-stage-body">{s.body}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* WHY + INDUSTRIES */}
      <section className="bw-section">
        <div className="bw-split">
          <Reveal>
            <div className="bw-kicker">Why Choose Us</div>
            <h2 className="bw-h2 bw-display">Built for dependable service</h2>
            <ul className="bw-why-list">
              {WHY.map((w, idx) => (
                <li className="bw-cascade" style={stagger(idx)} key={w}>
                  <span className="bw-check">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {w}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <div className="bw-kicker">Industries Served</div>
            <h2 className="bw-h2 bw-display">Who we deliver for</h2>
            <div className="bw-accordion">
              {INDUSTRIES.map((ind, idx) => {
                const isOpen = openIndustry === idx;
                return (
                  <div className={`bw-acc-item bw-cascade ${isOpen ? "is-open" : ""}`} style={stagger(idx)} key={ind.label}>
                    <button
                      className="bw-acc-trigger"
                      onClick={() => setOpenIndustry(isOpen ? -1 : idx)}
                      aria-expanded={isOpen}
                    >
                      <span className="bw-acc-num bw-mono">{String(idx + 1).padStart(2, "0")}</span>
                      <span className="bw-acc-label">{ind.label}</span>
                      <span className="bw-acc-chevron" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </button>
                    <div className="bw-acc-panel">
                      <div className="bw-acc-panel-inner">
                        <p>{ind.detail}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <FlowRule />

      {/* CAREERS */}
      <section id="careers" className="bw-section">
        <Reveal>
          <div className="bw-careers-wrap">
            <div className="bw-kicker">Careers</div>
            <h2 className="bw-h2 bw-display" style={{ marginBottom: "12px" }}>Build water infrastructure with us</h2>
            <p className="bw-sub" style={{ marginBottom: "0" }}>
              We're generally hiring across engineering and utility operations. Reach out to
              ask about current openings.
            </p>
            <div className="bw-careers-grid">
              {CAREERS.map((c, idx) => (
                <div className="bw-career-row bw-cascade" style={stagger(idx)} key={c.role}>
                  <div className="role">{c.role}</div>
                  <div className="area">{c.area}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "26px" }}>
              <button className="bw-btn-solid" onClick={() => go("contact")}>Inquire About Openings</button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bw-section tight">
        <Reveal>
          <div className="bw-contact-wrap">
            <div className="bw-contact-inner-simple">
              <div className="bw-contact-copy-block">
                <div className="bw-kicker" style={{ color: "var(--teal)" }}>Contact Us</div>
                <h2 className="bw-h2 bw-display">Get in touch with our team</h2>
                <p className="bw-contact-copy">
                  Whether it's a service inquiry, a careers question, or a general request,
                  our team is ready to help.
                </p>
              </div>
              <div className="bw-contact-action">
                <button type="button" className="bw-cta bw-cta-lg" onClick={handleInquire}>
                  Inquire Now
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="bw-footer">
        <div className="bw-footer-inner">
          <div className="bw-logo">
            <img src={brightLogo} alt="Bright Water Supply Corporation" className="bw-logo-img bw-logo-img-footer" />
          </div>
          <div className="bw-footer-links">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => go(n.id)}>{n.label}</button>
            ))}
          </div>
        </div>
        <div className="bw-footer-inner" style={{ marginTop: "18px" }}>
          <div className="bw-footer-fine">© {new Date().getFullYear()} Bright Water Supply Corporation. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}