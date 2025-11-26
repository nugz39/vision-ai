export type CharacterStyle = "realistic" | "anime" | "stylised";
export type CharacterGender = "female" | "male" | "other" | "any";

export interface Character {
  id: string;
  name: string;
  style: CharacterStyle;
  gender: CharacterGender;
  category: string;
  chats: number;
  createdAt: number; // mock timestamp for "Newest"
  image: string;     // /public path
  tags: string[];    // for tag filter (combines with other filters)
  // advanced filters (optional but functional)
  height?: "petite" | "average" | "tall";
  hairColor?: "black" | "blonde" | "brunette" | "pink" | "white" | "blue";
  bodyShape?: "slim" | "curvy" | "athletic";
  personalityTags?: string[];
  bio?: string; // detail page
}

const ts = (d: string) => new Date(d).getTime();

// ✅ PRIMARY 8 — exact order/info
export const PRIMARY_CHARACTERS: Character[] = [
  { id:"nova",   name:"Nova",   style:"realistic", gender:"female", category:"Popular",   chats: 9100000,  createdAt: ts("2025-11-20"), image:"/assets/gallery/nova.jpg",   tags:["Popular","realistic","female","Neon Studio"], bio:"realistic • female" },
  { id:"luxe",   name:"Luxe",   style:"stylised",  gender:"female", category:"Soft Neon", chats: 5100000,  createdAt: ts("2025-11-18"), image:"/assets/gallery/luxe.jpg",   tags:["Soft Neon","stylised","female","Glamour"],    bio:"stylised • female" },
  { id:"cipher", name:"Cipher", style:"anime",     gender:"female", category:"Mystery",   chats: 3200000,  createdAt: ts("2025-11-16"), image:"/assets/gallery/cipher.jpg", tags:["Mystery","anime","female","Magic"],          bio:"anime • female" },
  { id:"aria",   name:"Aria",   style:"stylised",  gender:"female", category:"Popular",   chats:10400000,  createdAt: ts("2025-11-22"), image:"/assets/gallery/aria.jpg",   tags:["Popular","stylised","female","Warm Glow"],    bio:"stylised • female" },
  { id:"vega",   name:"Vega",   style:"realistic", gender:"female", category:"Cosmic",    chats: 2700000,  createdAt: ts("2025-11-14"), image:"/assets/gallery/vega.jpg",   tags:["Cosmic","realistic","female","Celestial"] ,  bio:"realistic • female" },
  { id:"ember",  name:"Ember",  style:"stylised",  gender:"female", category:"Warm",      chats: 4100000,  createdAt: ts("2025-11-19"), image:"/assets/gallery/ember.jpg",  tags:["Warm","stylised","female","Cyber Glam"],      bio:"stylised • female" },
  { id:"onyx",   name:"Onyx",   style:"realistic", gender:"female", category:"Shadow",    chats: 1900000,  createdAt: ts("2025-11-12"), image:"/assets/gallery/onyx.jpg",   tags:["Shadow","realistic","female","Dark"],         bio:"realistic • female" },
  { id:"seraph", name:"Seraph", style:"anime",     gender:"female", category:"Ethereal",  chats: 6200000,  createdAt: ts("2025-11-21"), image:"/assets/gallery/seraph.jpg", tags:["Ethereal","anime","female","Soft Pink"],      bio:"anime • female" },
];

// ✅ MORE CHARACTERS (Load More section) — exact order
// Images 9–16: use your existing gallery assets; keep as prompt-09..16 for now.
export const MORE_CHARACTERS: Character[] = [
  { id:"dahlia", name:"Dahlia", style:"stylised",  gender:"female", category:"Velvet",   chats: 1400000, createdAt: ts("2025-11-10"), image:"/assets/gallery/prompt-09.png", tags:["Velvet","stylised","female","Vampire"],      personalityTags:["dominant","velvet","mysterious"] },
  { id:"nyx",    name:"Nyx",    style:"anime",     gender:"female", category:"Mystery",  chats: 2200000, createdAt: ts("2025-11-09"), image:"/assets/gallery/prompt-10.png", tags:["Mystery","anime","female","Gothic"],         personalityTags:["dark","flirty","chaotic"] },
  { id:"solaris",name:"Solaris",style:"realistic", gender:"female", category:"Cosmic",   chats: 1800000, createdAt: ts("2025-11-08"), image:"/assets/gallery/prompt-11.png", tags:["Cosmic","realistic","female","Golden"],       personalityTags:["calm","radiant","wise"] },
  { id:"faye",   name:"Faye",   style:"stylised",  gender:"female", category:"Ethereal", chats: 1500000, createdAt: ts("2025-11-07"), image:"/assets/gallery/prompt-12.png", tags:["Ethereal","stylised","female","Pastel"],      personalityTags:["sweet","playful","soft"] },
  { id:"riven",  name:"Riven",  style:"realistic", gender:"female", category:"Cyber",    chats: 2000000, createdAt: ts("2025-11-06"), image:"/assets/gallery/prompt-13.png", tags:["Cyber","realistic","female","Assassin"],      personalityTags:["intense","focused","dangerous"] },
  { id:"astra",  name:"Astra",  style:"anime",     gender:"female", category:"Soft Neon",chats: 1700000, createdAt: ts("2025-11-05"), image:"/assets/gallery/prompt-14.png", tags:["Soft Neon","anime","female","Idol"],          personalityTags:["bright","confident","sparkly"] },
  { id:"echo",   name:"Echo",   style:"stylised",  gender:"female", category:"Cyber",    chats: 1600000, createdAt: ts("2025-11-04"), image:"/assets/gallery/prompt-15.png", tags:["Cyber","stylised","female","Glitch"],         personalityTags:["weird","hypnotic","glitchy"] },
  { id:"marrow", name:"Marrow", style:"anime",     gender:"female", category:"Shadow",   chats: 1300000, createdAt: ts("2025-11-03"), image:"/assets/gallery/prompt-16.png", tags:["Shadow","anime","female","Horror"],          personalityTags:["cold","predatory","silent"] },
];

export const ALL_CHARACTERS: Character[] = [...PRIMARY_CHARACTERS, ...MORE_CHARACTERS];

export function getCharacterById(id: string) {
  return ALL_CHARACTERS.find((c) => c.id === id);
}
