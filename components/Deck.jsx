"use client";
import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "../lib/content";

const Svg = ({ fill, children }) => (
  <svg viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke={fill ? "none" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
);
const Play = () => <Svg fill><path d="M8 5v14l11-7z" /></Svg>;
const Pause = () => <Svg fill><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></Svg>;
const Sound = () => <Svg><path d="M4 9v6h4l5 4V5L8 9z" /><path d="M16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12" /></Svg>;
const Muted = () => <Svg><path d="M4 9v6h4l5 4V5L8 9z" /><path d="M16 9l5 6M21 9l-5 6" /></Svg>;
const Full = () => <Svg><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></Svg>;

export default function Deck() {
  const deck = useRef(null), rig = useRef(null), vids = useRef([]), layoutRef = useRef(null);
  const [sel, setSel] = useState(-1);
  const [hov, setHov] = useState(-1);
  const [vs, setVs] = useState({});

  const layout = () => {
    if (!deck.current || !rig.current) return;
    const cards = [...rig.current.children], n = cards.length, cw = cards[0].offsetWidth;
    const r = deck.current.getBoundingClientRect();
    const s = 0.15 + 0.85 * Math.max(0, Math.min(1, 1 - Math.abs(r.top + r.height / 2 - innerHeight / 2) / (innerHeight * 0.7)));
    const gap = Math.min(cw * 0.95, (innerWidth - cw - 30) / (n - 1));
    cards.forEach((c, i) => {
      const t = i - (n - 1) / 2, S = i === sel, h = i === hov && !S;
      const push = sel >= 0 && !S ? Math.sign(i - sel) * cw * 0.3 : 0;
      c.style.transform = `translateX(${S ? 0 : t * gap * s + push}px) translateZ(${S ? 150 : h ? 90 : -Math.abs(t) * 100 * s}px) rotateY(${S ? 0 : -t * 19 * s}deg) rotateZ(${S ? 0 : t * 5 * s}deg) scale(${S ? 1.14 : h ? 1.05 : 1})`;
    });
  };
  layoutRef.current = layout;

  const syncV = (i) => {
    const v = vids.current[i];
    if (v) setVs((s) => ({ ...s, [i]: { paused: v.paused, muted: v.muted } }));
  };

  useEffect(() => {
    layout();
    const f = () => layoutRef.current();
    const fs = () => vids.current.forEach((v, j) => { if (v) { v.controls = document.fullscreenElement === v; syncV(j); } });
    addEventListener("scroll", f, { passive: true });
    addEventListener("resize", f);
    document.addEventListener("fullscreenchange", fs);
    vids.current.forEach((_, j) => syncV(j));
    return () => { removeEventListener("scroll", f); removeEventListener("resize", f); document.removeEventListener("fullscreenchange", fs); };
  }, []);
  useEffect(() => { layout(); }, [sel, hov]);

  const act = (i, a) => {
    const v = vids.current[i];
    if (!v) return;
    if (a === "play") v.paused ? v.play() : v.pause();
    if (a === "mute") v.muted = !v.muted;
    if (a === "full") { const f = v.requestFullscreen || v.webkitRequestFullscreen || v.webkitEnterFullscreen; f && f.call(v); }
    setTimeout(() => syncV(i), 60);
  };
  const pick = (i) => {
    vids.current.forEach((v, j) => {
      if (v && j !== i) {
        v.pause();
        v.muted = true;
        syncV(j);
      }
    });
    const video = vids.current[i];
    if (video) {
      video.muted = false;
      if (video.paused) video.play();
      syncV(i);
    }
    setSel(i);
  };
  const handleCardKeyDown = (e, i) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      pick(i);
    }
  };
  const navigate = (direction) => {
    setSel((current) => (current + direction + PROJECTS.length) % PROJECTS.length);
  };
  const tilt = (e) => {
    const r = deck.current.getBoundingClientRect();
    rig.current.style.transform = `rotateY(${((e.clientX - r.left) / r.width - 0.5) * 30}deg) rotateX(${-((e.clientY - r.top) / r.height - 0.5) * 12}deg)`;
  };
  const stop = (e) => e.stopPropagation();

  return (
    <section id="work" className="sec" style={{ "--img": "var(--bg-work)" }}>
      <div className="wrap">
        <h2>Selected work</h2>
        <p className="sub">Select a video to play it, or open a project link directly.</p>
      </div>
      <div className="deck" ref={deck} onPointerMove={tilt} onMouseLeave={() => setHov(-1)} onClick={(e) => { if (!e.target.closest(".card")) setSel(-1); }}>
        <div className="rig" ref={rig}>
          {PROJECTS.map((p, i) => {
            const st = vs[i] || { paused: false, muted: true };
            const Card = p.video || !p.url ? "div" : "a";
            return (
              <Card key={p.title} className={"card" + (p.video ? " video-card" : "") + (sel === i ? " sel" : "")}
                style={{ "--g": p.g }} href={!p.video ? p.url || undefined : undefined}
                target={!p.video && p.url ? "_blank" : undefined} rel={!p.video && p.url ? "noopener noreferrer" : undefined}
                aria-label={p.video ? `Play ${p.title} video` : p.url ? `Open ${p.title} on Instagram` : undefined}
                role={p.video ? "button" : undefined} tabIndex={p.video ? 0 : undefined}
                onMouseEnter={() => setHov(i)} onClick={p.video ? () => pick(i) : undefined}
                onKeyDown={p.video ? (e) => handleCardKeyDown(e, i) : undefined}>
                {p.video ? <video ref={(el) => (vids.current[i] = el)} src={p.video} autoPlay muted loop playsInline /> : p.thumb ? <img src={p.thumb} alt="" /> : null}
                <div className="cap">
                  <small>{p.role}</small>
                  <h3>{p.title}</h3>
                  {p.video ? null : <span className="go">{p.url ? "Watch on Instagram" : "Coming soon"}</span>}
                </div>
                <div className="ctl">
                  {p.video ? (
                    <>
                      <button aria-label="Play or pause" onClick={(e) => { stop(e); act(i, "play"); }}>{st.paused ? <Play /> : <Pause />}</button>
                      <button aria-label="Sound on or off" onClick={(e) => { stop(e); act(i, "mute"); }}>{st.muted ? <Muted /> : <Sound />}</button>
                      <button aria-label="Full screen" onClick={(e) => { stop(e); act(i, "full"); }}><Full /></button>
                      {p.url && <a href={p.url} target="_blank" rel="noopener noreferrer" aria-label="Open on Instagram" onClick={stop}><Play /></a>}
                    </>
                  ) : null}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
      <div className="carousel-controls" aria-label="Work carousel controls">
        <button type="button" className="carousel-arrow" aria-label="Previous project" onClick={() => navigate(-1)}>‹</button>
        <div className="carousel-dots">
          {PROJECTS.map((p, i) => (
            <button key={p.title} type="button" aria-label={`Show project ${i + 1}: ${p.title}`}
              aria-current={sel === i ? "true" : undefined} className={sel === i ? "active" : ""}
              onClick={() => setSel(i)} />
          ))}
        </div>
        <button type="button" className="carousel-arrow" aria-label="Next project" onClick={() => navigate(1)}>›</button>
      </div>
    </section>
  );
}
