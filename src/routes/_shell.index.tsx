import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CREATORS,
  EPISODES,
  EVENTS,
  LIVE_NOW,
  PLAYLISTS,
  TRACKS,
  formatTime,
} from "../data/demo";
import { Icon, MediaCard, PageHeader, SectionHeader, TileLink } from "../components/ui-kit";
import { useShell } from "../state/app-shell";

export const Route = createFileRoute("/_shell/")({
  head: () => ({
    meta: [
      { title: "Home — MusicOSY" },
      {
        name: "description",
        content:
          "Your MusicOSY home: feed, continue listening, live now, new releases, collections and next actions in one integrated surface.",
      },
      { property: "og:title", content: "Home — MusicOSY" },
      {
        property: "og:description",
        content: "Feed, continuation, discovery, collections and creator actions in one member surface.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomeSurface,
});

function HomeSurface() {
  const { playObject, focusObject, position, active, followed, toggleFollow } = useShell();

  return (
    <div className="mx-auto max-w-[1200px]">
      <PageHeader
        eyebrow="IS-001 · Home integrated surface"
        title="Home"
        description="Everything continues where you left it. Moving between surfaces never stops your session."
      />

      {/* Continue and quick access */}
      <section className="mb-12">
        <SectionHeader title="Continue" hint="Resume is durable" />
        <div className="grid gap-3 md:grid-cols-2">
          {[active, EPISODES[0]!].map((o, i) => (
            <button
              key={o.objectId + i}
              type="button"
              onClick={() => playObject(o)}
              className="flex items-center gap-4 rounded-xl border border-surface-container-highest bg-surface-container-low p-3 text-left transition-colors hover:bg-surface-container"
            >
              <img src={o.artwork} alt="" className="h-16 w-16 rounded object-cover" />
              <div className="min-w-0 flex-1">
                <p className="font-mono-data text-mono-data uppercase text-primary-container">
                  {i === 0 ? "Continue listening" : "Continue watching"}
                </p>
                <p className="truncate font-headline-sm text-headline-sm text-on-surface">
                  {o.title}
                </p>
                <div className="mt-2 h-[2px] w-full bg-surface-container-highest">
                  <div
                    className="h-full bg-primary-container"
                    style={{ width: `${i === 0 ? (position / o.duration) * 100 : 38}%` }}
                  />
                </div>
                <p className="mt-1 font-mono-data text-mono-data text-on-surface-variant">
                  {formatTime(i === 0 ? position : 1220)} / {formatTime(o.duration)}
                </p>
              </div>
              <Icon name="play_arrow" size={26} filled className="text-primary-container" />
            </button>
          ))}
        </div>
      </section>

      {/* Feed */}
      <section className="mb-12">
        <SectionHeader title="New releases in your genres" hint="Updated 4m ago" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {TRACKS.slice(0, 4).map((t) => (
            <MediaCard key={t.objectId} object={t} />
          ))}
        </div>
      </section>

      {/* Live now */}
      <section className="mb-12">
        <SectionHeader title="Live now" hint="Join without losing your queue" />
        <div className="grid gap-4 md:grid-cols-2">
          {LIVE_NOW.map((l) => (
            <div
              key={l.objectId}
              className="flex items-center gap-4 rounded-xl border border-surface-container-highest bg-surface-container-low p-3"
            >
              <img src={l.artwork} alt="" className="h-16 w-16 rounded object-cover" />
              <div className="min-w-0 flex-1">
                <p className="font-mono-data text-mono-data uppercase text-primary-container">
                  Live · {l.notes} in chat
                </p>
                <p className="truncate font-headline-sm text-headline-sm text-on-surface">
                  {l.title}
                </p>
                <p className="truncate font-mono-data text-mono-data text-on-surface-variant">
                  {l.creator}
                </p>
              </div>
              <button
                type="button"
                onClick={() => playObject(l, "chat")}
                className="rounded-lg bg-primary-container px-3 py-2 font-label-caps text-label-caps uppercase tracking-widest text-on-primary-container active:scale-95"
              >
                Join
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Collections */}
      <section className="mb-12">
        <SectionHeader title="My playlists" hint="Personal context" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {PLAYLISTS.map((p) => (
            <Link
              key={p.objectId}
              to="/library"
              className="group flex flex-col gap-2 rounded-xl border border-surface-container-highest bg-surface-container-low p-3"
            >
              <img
                src={p.artwork}
                alt=""
                className="aspect-square w-full rounded object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <p className="truncate font-headline-sm text-headline-sm text-on-surface">{p.title}</p>
              <p className="font-mono-data text-mono-data text-on-surface-variant">
                {p.count} items
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Suggested creators */}
      <section className="mb-12">
        <SectionHeader title="Suggested creators" />
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {CREATORS.map((c) => (
            <div
              key={c.handle}
              className="flex items-center gap-3 rounded-xl border border-surface-container-highest bg-surface-container-low p-3"
            >
              <img src={c.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-body-sm text-body-sm text-on-surface">{c.name}</p>
                <p className="font-mono-data text-mono-data text-on-surface-variant">
                  {c.role} · {c.followers}
                </p>
              </div>
              <button
                type="button"
                onClick={() => toggleFollow(c.handle)}
                className={`rounded-lg border px-2 py-1 font-mono-data text-mono-data uppercase ${
                  followed[c.handle]
                    ? "border-primary-container text-primary-container"
                    : "border-surface-container-highest text-on-surface-variant"
                }`}
              >
                {followed[c.handle] ? "Following" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Nearby events */}
      <section className="mb-12">
        <SectionHeader title="Nearby musical events" />
        <div className="grid gap-3 md:grid-cols-3">
          {EVENTS.map((e) => (
            <article
              key={e.objectId}
              className="overflow-hidden rounded-xl border border-surface-container-highest bg-surface-container-low"
            >
              <img src={e.artwork} alt="" className="h-32 w-full object-cover" />
              <div className="p-3">
                <p className="font-mono-data text-mono-data uppercase text-primary-container">
                  {e.date} · {e.city}
                </p>
                <p className="mt-1 font-headline-sm text-headline-sm text-on-surface">{e.title}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Actions hub */}
      <section className="mb-8">
        <SectionHeader title="Actions hub" hint="Create center" />
        <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-4">
          <TileLink to="/create" icon="post_add" label="Create a post" hint="Draft-first composer" />
          <TileLink to="/create" icon="upload" label="Upload a song" hint="Transcode + rights check" />
          <TileLink to="/create" icon="mic" label="Start a recording" hint="Session capture" />
          <TileLink to="/library" icon="playlist_add" label="Make a playlist" hint="Collections" />
          <TileLink to="/live" icon="sensors" label="Go live" hint="Broadcast health" />
          <TileLink to="/create" icon="folder_open" label="Open a project" hint="Workspace context" />
          <TileLink to="/create" icon="group_add" label="Invite a collaborator" hint="Roles + access" />
          <button
            type="button"
            onClick={() => focusObject(TRACKS[3]!, "activity")}
            className="flex flex-col gap-2 rounded-xl border border-surface-container-highest bg-surface-container-low p-4 text-left transition-colors hover:bg-surface-container"
          >
            <Icon name="bolt" size={22} className="text-primary-container" />
            <span className="font-headline-sm text-headline-sm text-on-surface">Recent activity</span>
            <span className="font-mono-data text-mono-data text-on-surface-variant">
              Opens the context rail
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}
