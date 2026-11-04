"use client";
import { useState } from "react";

const LINKS = [["about","About"],["skills","Skills"],["services","Services"],["work","Work"],["experience","Experience"],["faq","FAQ"],["contact","Contact"]];

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav>
      <div className="wrap">
        <a className="logo" href="#home">Hashim’s <b>Portfolio</b></a>
        <div className={"links" + (open ? " open" : "")} onClick={() => setOpen(false)}>
          {LINKS.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </div>
        <button className="burger" aria-label="Menu" onClick={() => setOpen(!open)}>Menu</button>
      </div>
    </nav>
  );
}
