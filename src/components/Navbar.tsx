"use client";

import Link from "next/link";
import { ArrowUpRightIcon } from "./Icons";

export function Navbar() {
  const links = [
    { href: "#technology", label: "Technology" },
    { href: "#protection", label: "Protection" },
    { href: "#science", label: "Science" },
    { href: "#pilot", label: "Pilot" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="fixed left-0 right-0 top-4 z-50 px-4 md:px-8 lg:px-16">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link
          href="/"
          aria-label="Strata home"
          className="liquid-glass grid h-12 w-12 place-items-center rounded-full text-white"
        >
          <span className="font-heading text-3xl italic leading-none tracking-[-0.04em]">S</span>
        </Link>

        <nav className="liquid-glass hidden items-center gap-1.5 rounded-full px-1.5 py-1.5 font-body md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#060605] transition-transform active:scale-[0.98]"
          >
            Start a Pilot
            <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
        </nav>

        <div className="h-12 w-12" aria-hidden="true" />
      </div>
    </header>
  );
}
