import { Building2, House, Package, Refrigerator, Sofa, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export const contact = {
  phone: "+267 71 234 567",
  phoneHref: "tel:+26771234567",
  email: "hello@moveright.bw",
  emailHref: "mailto:hello@moveright.bw",
  location: "Gaborone, Botswana",
  hours: "Mon–Sat: 7am – 6pm",
};

export type Service = {
  slug: string;
  title: string;
  icon: LucideIcon;
  /** Short summary used on cards */
  summary: string;
  tagline: string;
  desc: string;
  includes: string[];
  ideal: string;
};

export const services: Service[] = [
  {
    slug: "residential",
    title: "Residential Moving",
    icon: House,
    summary: "Full-service home moves for studios, apartments, and houses. We handle everything from packing to placement at your new address.",
    tagline: "Your home, handled with care.",
    desc: "Whether you're moving across the street or across Gaborone, our residential moving service covers the full journey. We bring the crew, the truck, and all the care your home deserves.",
    includes: ["Loading and unloading", "Furniture wrapping and protection", "Item placement at destination", "Single-room to full-house moves"],
    ideal: "Families, individuals, and anyone moving between homes.",
  },
  {
    slug: "office",
    title: "Office Relocation",
    icon: Building2,
    summary: "Minimise downtime with our professional office move service. We plan, pack, and set up your workspace efficiently.",
    tagline: "Minimal downtime. Maximum efficiency.",
    desc: "Office moves require precision. We work around your schedule — evenings, weekends — to get your workspace relocated with minimal disruption to your business.",
    includes: ["Workstation disassembly and reassembly", "IT equipment handling", "Document and file transport", "Weekend and after-hours moves available"],
    ideal: "Small businesses, startups, and corporate offices.",
  },
  {
    slug: "furniture",
    title: "Furniture Delivery",
    icon: Sofa,
    summary: "Single-item or full-room furniture transport. We move sofas, beds, dining sets, and more with care.",
    tagline: "One piece or a whole room.",
    desc: "Bought new furniture and need it moved from the store or between properties? Our furniture delivery service handles single-item and multi-item moves efficiently.",
    includes: ["Sofas, beds, wardrobes, dining sets", "Careful wrapping before transport", "Placement in the room of your choice", "Assembly assistance available"],
    ideal: "Anyone buying or relocating furniture without a full house move.",
  },
  {
    slug: "appliances",
    title: "Appliance Moving",
    icon: Refrigerator,
    summary: "Refrigerators, washing machines, stoves — handled by trained movers with the right equipment.",
    tagline: "Heavy equipment, handled safely.",
    desc: "Large appliances need specialist handling. We use the right equipment to move refrigerators, washing machines, stoves, and more without damage.",
    includes: ["Refrigerators and chest freezers", "Washing machines and dryers", "Stoves and ovens", "Safe securing during transport"],
    ideal: "Anyone moving a home with appliances or buying/selling second-hand.",
  },
  {
    slug: "packing",
    title: "Packing Services",
    icon: Package,
    summary: "Let us do the packing. We supply materials and wrap every item securely before it enters the truck.",
    tagline: "Let us do the packing.",
    desc: "Packing is often the most time-consuming part of a move. Our team supplies quality materials and wraps every item — fragile or otherwise — before it enters the truck.",
    includes: ["Packing materials supplied", "Room-by-room packing", "Fragile item specialist wrapping", "Labelling and inventory"],
    ideal: "Busy families and anyone who wants to arrive at their new home without packing stress.",
  },
  {
    slug: "labour",
    title: "Labour Only",
    icon: Users,
    summary: "Have a truck but need muscle? Our trained movers provide loading and unloading help on demand.",
    tagline: "Your truck. Our muscle.",
    desc: "If you have your own transport and just need trained movers to load and unload, we offer flexible labour-only packages by the hour.",
    includes: ["Loading and unloading crew", "Furniture carrying and placement", "Hourly or fixed rates available", "Flexible scheduling"],
    ideal: "People hiring their own truck who need professional loading/unloading support.",
  },
];

export const serviceAreas = [
  "Gaborone CBD",
  "Mogoditshane",
  "Tlokweng",
  "Phakalane",
  "Block 8",
  "Broadhurst",
  "Gaborone West",
  "Long distance on request",
];
