"use client";
import { useEffect, useRef } from "react";
import { WA, EMAIL, INSTAGRAM, LINKEDIN } from "../lib/content";

const svg = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" };

export default function Contact() {
  const sec = useRef(null), lets = useRef(null);
  useEffect(() => {
    const zoom = () => {
      if (!sec.current || !lets.current) return;
      const r = sec.current.getBoundingClientRect();
      const d = Math.min(1, (Math.abs(r.top + r.height / 2 - innerHeight / 2) / innerHeight) * 1.4);
      lets.current.style.setProperty("--zs", (1.1 - d * 0.4).toFixed(3));
    };
    zoom();
    addEventListener("scroll", zoom, { passive: true });
    addEventListener("resize", zoom);
    return () => { removeEventListener("scroll", zoom); removeEventListener("resize", zoom); };
  }, []);
  const move = (e) => {
    const r = sec.current.getBoundingClientRect();
    lets.current.style.setProperty("--rx", ((e.clientX - r.left) / r.width - 0.5) * 30);
    lets.current.style.setProperty("--ry", -((e.clientY - r.top) / r.height - 0.5) * 20);
  };
  return (
    <section id="contact" className="sec contact" ref={sec} onPointerMove={move} style={{ "--img": "var(--bg-contact)" }}>
      <div className="wrap">
        <h2 className="lets" ref={lets}><b>{"LET'S CREATE"}</b><b>SOMETHING</b><b>UNIQUE</b></h2>
        <p className="sub">Tell me about your project and I’ll reply personally.</p>
        <div className="row">
          <a className="ic wa" href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" title="WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.78a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.89 9.88M20.46 3.49A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.9 11.9 0 0 0 5.69 1.45c6.55 0 11.89-5.34 11.9-11.9 0-3.18-1.24-6.17-3.49-8.41" /></svg>
          </a>
          <a className="ic" href={`mailto:${EMAIL}`} aria-label="Email" title="Email">
            <svg {...svg} strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
          </a>
          <a className="ic" href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">
            <svg {...svg} strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" /></svg>
          </a>
          <a className="ic" href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
            <svg {...svg} strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-7M12 13a3 3 0 0 1 6 0v4" /></svg>
          </a>
        </div>
        <p className="sub" style={{ marginTop: 22 }}>+91 95396 27536<br />{EMAIL}</p>
      </div>
    </section>
  );
}
