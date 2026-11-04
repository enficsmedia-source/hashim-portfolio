"use client";
import { useState } from "react";
import { SERVICES, WA, EMAIL } from "../lib/content";

export default function Services() {
  const [sel, setSel] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const text = `Hi Hashim, I’d like to enquire about: ${sel || "a video project"}.\nName: ${name.trim() || "-"}\nRequirements: ${msg.trim() || "-"}`;
  const wa = `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
  const mail = `mailto:${EMAIL}?subject=${encodeURIComponent("Enquiry: " + (sel || "Video project"))}&body=${encodeURIComponent(text)}`;
  return (
    <section id="services" className="sec" style={{ "--img": "var(--bg-services)" }}>
      <div className="wrap">
        <h2>Services</h2>
        <p className="sub">Pick a service, describe your idea, and send it straight to me on WhatsApp or email.</p>
        <div className="grid">
          {SERVICES.map(([title, desc]) => (
            <button key={title} className="svc" aria-pressed={sel === title} onClick={() => setSel(title)}>
              <h3>{title}</h3><p>{desc}</p>
            </button>
          ))}
        </div>
        <div className="enq">
          <div>Selected service: <b style={{ color: "var(--blue)" }}>{sel || "None yet"}</b></div>
          <label>Your name<input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" /></label>
          <label>Project requirements
            <textarea rows={4} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="What are you making, when do you need it, and where is it shot?" />
          </label>
          <div className="row">
            <a className="btn wa" href={wa} target="_blank" rel="noopener noreferrer">Send on WhatsApp</a>
            <a className="btn ghost" href={mail}>Send by email</a>
          </div>
        </div>
      </div>
    </section>
  );
}
