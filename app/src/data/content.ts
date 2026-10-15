export interface Artist {
  id: string;
  index: string;
  name: string;
  role: string;
  tagline: string;
  bio: string;
  image: string;
  alt: string;
  latest: string;
}

export const ARTISTS: Artist[] = [
  {
    id: "zeon",
    index: "01",
    name: "ZEON",
    role: "Recording Artist",
    tagline: "The Sonic Architect",
    bio: "Zeon doesn't make songs — he builds rooms you can live in. Trap drums laid like concrete, orchestral strings poured over the top like gold leaf. His debut album 'Super Nova' turned street confessionals into cinema, and he mixed every bar like it cost him something. Because it did.",
    image: "/images/artist-zeon.jpg",
    alt: "Portrait of Zeon in a black tailored jacket with a gold chain, lit by golden spotlight against darkness",
    latest: "Super Nova — Album",
  },
  {
    id: "nara",
    index: "02",
    name: "NARA VOSS",
    role: "Recording Artist",
    tagline: "Velvet Over Concrete",
    bio: "Nara Voss sings like the city at 3 a.m. — velvet voice over concrete drums, every note placed with intention. 'Midnight Standard' made her the label's quiet storm: no gimmicks, no noise, just control. When Nara holds a note, the room holds its breath.",
    image: "/images/artist-nara.jpg",
    alt: "Portrait of Nara Voss with gold-cuffed braids in red backlight and haze",
    latest: "Midnight Standard — EP",
  },
  {
    id: "marrow",
    index: "03",
    name: "KID MARROW",
    role: "Recording Artist",
    tagline: "Pressure From Below",
    bio: "Kid Marrow came up from the underground with nothing but pressure. Raw, unfiltered trap that hits like a siren in a tunnel — 'Redline' put the whole scene on notice. He doesn't chase the sound. The sound keeps up with him.",
    image: "/images/artist-marrow.jpg",
    alt: "Portrait of Kid Marrow in a black hoodie under a golden beam against a concrete wall",
    latest: "Redline — Single",
  },
  {
    id: "sable",
    index: "04",
    name: "SABLE",
    role: "Producer / DJ",
    tagline: "Architect of the Sound",
    bio: "Every 3168 record passes through Sable's hands. Half the label's signature — the low end that feels expensive, the silence between hits — is hers. In the booth or behind the board, she treats frequency like material: cut it, polish it, set it in gold.",
    image: "/images/artist-sable.jpg",
    alt: "Portrait of Sable at a glowing mixing console in a dark studio",
    latest: "Concrete Royalty — Compilation",
  },
];

export interface Release {
  id: string;
  title: string;
  artist: string;
  type: string;
  year: string;
  image: string;
  alt: string;
  audio?: string;
}

export const RELEASES: Release[] = [
  {
    id: "supernova",
    title: "SUPER NOVA",
    artist: "ZEON",
    type: "Album",
    year: "2026",
    image: "/images/release-supernova.jpg",
    alt: "Super Nova album artwork — a gold cosmic explosion across black space with red embers",
  },
  {
    id: "royalty",
    title: "CONCRETE ROYALTY",
    artist: "3168",
    type: "Compilation",
    year: "2025",
    image: "/images/release-royalty.jpg",
    alt: "Concrete Royalty artwork — a gold crown on cracked concrete under a spotlight",
  },
  {
    id: "midnight",
    title: "MIDNIGHT STANDARD",
    artist: "NARA VOSS",
    type: "EP",
    year: "2025",
    image: "/images/release-midnight.jpg",
    alt: "Midnight Standard artwork — a night skyline through a rain-streaked window",
  },
  {
    id: "redline",
    audio: "/audio/otf-mastered.mp3",
    title: "REDLINE",
    artist: "KID MARROW",
    type: "Single",
    year: "2026",
    image: "/images/release-redline.jpg",
    alt: "Redline artwork — gold and red light lines racing across wet black asphalt",
  },
];

export interface Product {
  id: string;
  name: string;
  price: string;
  detail: string;
  image: string;
  alt: string;
  edition: string;
  category: "Tees" | "Hoodies" | "Headwear" | "Vinyl";
  collection: "Gold Line" | "Tag Line";
  badge?: "LTD" | "NEW";
}

export const PRODUCTS: Product[] = [
  {
    id: "tag-tee-black",
    name: "Tag Tee — Black",
    price: "$45",
    detail: "Heavyweight 240gsm cotton, red tag print across the chest.",
    image: "/images/merch-tag-tee-black.jpg",
    alt: "Black t-shirt with the red 3168 tag logo across the chest",
    edition: "Open edition",
    category: "Tees",
    collection: "Tag Line",
    badge: "NEW",
  },
  {
    id: "tag-tee-white",
    name: "Tag Tee — White",
    price: "$45",
    detail: "Heavyweight 240gsm cotton, red tag print across the chest.",
    image: "/images/merch-tag-tee-white.jpg",
    alt: "White t-shirt with the red 3168 tag logo across the chest",
    edition: "Open edition",
    category: "Tees",
    collection: "Tag Line",
    badge: "NEW",
  },
  {
    id: "hoodie",
    name: "3168 Gold Logo Hoodie",
    price: "$180",
    detail: "Heavyweight 480gsm brushed fleece. Gold thread embroidery, cut and sewn in limited runs. Numbered, never restocked.",
    image: "/images/merch-hoodie.jpg",
    alt: "Black hoodie with a small gold embroidered 3168 logo on the chest",
    edition: "Edition of 300",
    category: "Hoodies",
    collection: "Gold Line",
  },
  {
    id: "tag-cap",
    name: "Tag 5-Panel Cap",
    price: "$40",
    detail: "Black five-panel snapback with the red embroidered tag on the front.",
    image: "/images/merch-tag-cap.jpg",
    alt: "Black five-panel cap with the red 3168 tag logo embroidered on the front",
    edition: "Open edition",
    category: "Headwear",
    collection: "Tag Line",
  },
  {
    id: "sampler-lp",
    name: "3168 Sampler LP",
    price: "$32",
    detail: "12\" black vinyl in a tag sleeve. Limited to 500.",
    image: "/images/merch-sampler-lp.jpg",
    alt: "White record sleeve with the red 3168 tag logo and a black vinyl record beside it",
    edition: "Edition of 500",
    category: "Vinyl",
    collection: "Tag Line",
    badge: "LTD",
  },
  {
    id: "tee",
    name: "3168 Statement Tee",
    price: "$85",
    detail: "Oversized drop-shoulder cut. Metallic gold print with a single red underline — the label's signature strike.",
    image: "/images/merch-tee.jpg",
    alt: "Black oversized t-shirt with a gold 3168 print and red underline",
    edition: "Edition of 500",
    category: "Tees",
    collection: "Gold Line",
  },
  {
    id: "cap",
    name: "3168 Snapback",
    price: "$95",
    detail: "Structured six-panel in midnight black wool. Gold emblem, red under-visor stitch — the detail only you know is there.",
    image: "/images/merch-cap.jpg",
    alt: "Black snapback cap with a gold embroidered 3168 emblem",
    edition: "Edition of 500",
    category: "Headwear",
    collection: "Gold Line",
  },
  {
    id: "vinyl",
    name: "Super Nova — Gold Label Vinyl",
    price: "$120",
    detail: "180g double LP, gold center label, gatefold sleeve in soft-touch black. Zeon's debut, pressed the way it was meant to be heard.",
    image: "/images/merch-vinyl.jpg",
    alt: "Black vinyl record with a gold 3168 center label under dramatic lighting",
    edition: "Edition of 1,000",
    category: "Vinyl",
    collection: "Gold Line",
    badge: "LTD",
  },
];

export const STATS = [
  { value: "04", label: "Signed Artists" },
  { value: "12", label: "Releases" },
  { value: "38M", label: "Streams" },
  { value: "01", label: "Standard" },
];

export const NAV_ITEMS = [
  { label: "Artists", href: "/artists" },
  { label: "Releases", href: "/releases" },
  { label: "Merch", href: "/merch" },
  { label: "Manifesto", href: "/manifesto" },
  { label: "Contact", href: "/contact" },
];

export const CONTACT_TYPES = [
  { value: "demo", label: "Demo Submission" },
  { value: "booking", label: "Booking" },
  { value: "press", label: "Press" },
  { value: "general", label: "General" },
] as const;

export type ContactType = (typeof CONTACT_TYPES)[number]["value"];

export const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "DMCA", href: "/dmca" },
  { label: "Accessibility", href: "/accessibility" },
];
