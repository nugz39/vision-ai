"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href:"/", label:"Home" },
  { href:"/studio", label:"Generate Now" },
  { href:"/pricing", label:"Pricing" },
  { href:"/gallery", label:"Gallery" },
  { href:"/about", label:"About" },
  { href:"/support", label:"Support" },
];

export default function Nav(){
  const pathname = usePathname() || "/";
  return (
    <nav className="nav">
      <Link href="/" aria-label="Vision AI — Home" className="logoLink">
        <Image src="/logo.svg" alt="Vision AI" width={140} height={36} priority />
      </Link>
      <div className="navLinks">
        {links.map((l)=>{
          const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
          return (
            <Link key={l.href} href={l.href} className={`navLink${active ? " active" : ""}`}>
              {l.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}