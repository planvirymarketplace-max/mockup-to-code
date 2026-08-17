export type ObjectType =
  | "track"
  | "podcast_episode"
  | "video"
  | "live_stream"
  | "playlist"
  | "release"
  | "event"
  | "post"
  | "member_profile";

export interface MediaObject {
  objectType: ObjectType;
  objectId: string;
  slug: string;
  title: string;
  creator: string;
  artwork: string;
  duration: number; // seconds, 0 = live
  genre?: string;
  live?: boolean;
  loves: number;
  notes: number;
}

const art = (seed: string) =>
  `https://picsum.photos/seed/${seed}/600/600`;

export const TRACKS: MediaObject[] = [
  { objectType: "track", objectId: "t1", slug: "silent-stage", title: "Silent Stage", creator: "Ava Mirren", artwork: art("silentstage"), duration: 245, genre: "Ambient", loves: 12840, notes: 312 },
  { objectType: "track", objectId: "t2", slug: "north-signal", title: "North Signal", creator: "Kobo Lane", artwork: art("northsignal"), duration: 198, genre: "Electronic", loves: 8210, notes: 144 },
  { objectType: "track", objectId: "t3", slug: "paper-lungs", title: "Paper Lungs", creator: "Hollow Choir", artwork: art("paperlungs"), duration: 271, genre: "Indie", loves: 5390, notes: 96 },
  { objectType: "track", objectId: "t4", slug: "midnight-transit", title: "Midnight Transit", creator: "Sable Room", artwork: art("midnighttransit"), duration: 312, genre: "Downtempo", loves: 21044, notes: 508 },
  { objectType: "track", objectId: "t5", slug: "glass-orchard", title: "Glass Orchard", creator: "Ilya Verne", artwork: art("glassorchard"), duration: 226, genre: "Neo-classical", loves: 3110, notes: 41 },
  { objectType: "track", objectId: "t6", slug: "rust-and-ribbon", title: "Rust & Ribbon", creator: "Marta Quinn", artwork: art("rustribbon"), duration: 189, genre: "Alt", loves: 7702, notes: 130 },
];

export const EPISODES: MediaObject[] = [
  { objectType: "podcast_episode", objectId: "e1", slug: "design-systems-weekly-42", title: "EP 42 — The Silent Stage", creator: "Design Systems Weekly", artwork: art("dsw42"), duration: 4500, loves: 980, notes: 77 },
  { objectType: "podcast_episode", objectId: "e2", slug: "studio-notes-11", title: "EP 11 — Studio Notes", creator: "Room Tone", artwork: art("studionotes"), duration: 3220, loves: 512, notes: 33 },
];

export const LIVE_NOW: MediaObject[] = [
  { objectType: "live_stream", objectId: "l1", slug: "late-desk-session", title: "Late Desk Session", creator: "Kobo Lane", artwork: art("latedesk"), duration: 0, live: true, loves: 402, notes: 219 },
  { objectType: "live_stream", objectId: "l2", slug: "open-mix-room", title: "Open Mix Room", creator: "Sable Room", artwork: art("openmix"), duration: 0, live: true, loves: 188, notes: 96 },
];

export const PLAYLISTS = [
  { objectId: "p1", slug: "night-driving", title: "Night Driving", count: 42, artwork: art("nightdriving") },
  { objectId: "p2", slug: "monochrome-focus", title: "Monochrome Focus", count: 18, artwork: art("monochrome") },
  { objectId: "p3", slug: "resings-2026", title: "Resings 2026", count: 31, artwork: art("resings") },
  { objectId: "p4", slug: "field-recordings", title: "Field Recordings", count: 12, artwork: art("field") },
];

export const CREATORS = [
  { handle: "avamirren", name: "Ava Mirren", role: "Producer", avatar: art("ava"), followers: "24.1k" },
  { handle: "kobolane", name: "Kobo Lane", role: "Live artist", avatar: art("kobo"), followers: "11.8k" },
  { handle: "hollowchoir", name: "Hollow Choir", role: "Band", avatar: art("hollow"), followers: "8.2k" },
  { handle: "sableroom", name: "Sable Room", role: "DJ", avatar: art("sable"), followers: "42.9k" },
];

export const EVENTS = [
  { objectId: "ev1", slug: "warehouse-nine", title: "Warehouse Nine", city: "Chicago, IL", date: "Aug 22", artwork: art("warehouse") },
  { objectId: "ev2", slug: "quiet-rooms-tour", title: "Quiet Rooms Tour", city: "Detroit, MI", date: "Sep 04", artwork: art("quietrooms") },
  { objectId: "ev3", slug: "signal-fest", title: "Signal Fest", city: "Austin, TX", date: "Sep 19", artwork: art("signalfest") },
];

export const POSTS = [
  { objectId: "po1", author: "Ava Mirren", handle: "avamirren", avatar: art("ava"), body: "Mixed the outro three times tonight. The third one keeps the room noise in.", media: TRACKS[0], loves: 231, notes: 18, ago: "12m" },
  { objectId: "po2", author: "Kobo Lane", handle: "kobolane", avatar: art("kobo"), body: "Going live in 20 with the modular rack. Bring requests.", media: LIVE_NOW[0], loves: 88, notes: 41, ago: "1h" },
  { objectId: "po3", author: "Marta Quinn", handle: "martaquinn", avatar: art("marta"), body: "New single is up. Vocals recorded in one pass, no comping.", media: TRACKS[5], loves: 604, notes: 73, ago: "4h" },
];

export const CONVERSATIONS = [
  { id: "c1", name: "Ava Mirren", avatar: art("ava"), last: "Sent the stems — check the 2:14 mark.", ago: "3m", unread: 2 },
  { id: "c2", name: "Signal Fest Booking", avatar: art("signalfest"), last: "Contract attached for review.", ago: "2h", unread: 1 },
  { id: "c3", name: "Hollow Choir", avatar: art("hollow"), last: "Rehearsal moved to Thursday.", ago: "1d", unread: 0 },
];

export const NOTIFICATIONS = [
  { id: "n1", kind: "love", text: "Sable Room loved your note on Midnight Transit", ago: "8m", unread: true },
  { id: "n2", kind: "follow", text: "Ilya Verne started following you", ago: "40m", unread: true },
  { id: "n3", kind: "resing", text: "Marta Quinn resang Silent Stage", ago: "3h", unread: true },
  { id: "n4", kind: "live", text: "Kobo Lane is live now: Late Desk Session", ago: "5h", unread: false },
];

export const NOTES = [
  { id: "nt1", author: "Sable Room", avatar: art("sable"), at: "02:14", body: "That low pass sweep is the whole track." },
  { id: "nt2", author: "Ilya Verne", avatar: art("ilya"), at: "03:02", body: "Room noise left in — deliberate and correct." },
  { id: "nt3", author: "Hollow Choir", avatar: art("hollow"), at: "01:08", body: "Would love an instrumental cut of this." },
];

export const TRANSCRIPT = [
  { at: "00:00", body: "Intro: the minimalist approach to media tooling." },
  { at: "15:30", body: "Dieter Rams and the discipline of removal." },
  { at: "42:15", body: "Monochrome typography as a structural device." },
  { at: "58:00", body: "Tools of the trade, and what we stopped using." },
];

export const LYRICS = [
  "Hold the room still",
  "let the tape run long",
  "nothing here needs saying twice",
  "the silence is the song",
];

export const ALL_OBJECTS = [...TRACKS, ...EPISODES, ...LIVE_NOW];

export const formatTime = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};
