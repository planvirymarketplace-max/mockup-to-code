import { createFileRoute } from "@tanstack/react-router";
import { EPISODES, PLAYLISTS, TRACKS } from "../data/demo";
import { PageHeader, RowItem, SectionHeader, MediaCard } from "../components/ui-kit";
import { useShell } from "../state/app-shell";

export const Route = createFileRoute("/_shell/listen")({
  head: () => ({
    meta: [
      { title: "Listen — MusicOSY" },
      { name: "description", content: "Music, podcast and video listening on MusicOSY with queue, lyrics, transcript and durable resume." },
      { property: "og:title", content: "Listen — MusicOSY" },
      { property: "og:description", content: "Play tracks, episodes and videos with one persistent media session." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ListenSurface,
});

function ListenSurface() {
  const { playObject, addToQueue } = useShell();
  return (
    <div className="mx-auto max-w-[1200px]">
      <PageHeader
        eyebrow="Streaming"
        title="Listen"
        description="Start a deliberate session here. It survives every route change until you replace it."
        actions={
          <>
            <button
              type="button"
              onClick={() => playObject(TRACKS[0]!)}
              className="rounded-lg bg-primary-container px-3 py-2 font-label-caps text-label-caps uppercase tracking-widest text-on-primary-container active:scale-95"
            >
              Play all
            </button>
            <button
              type="button"
              onClick={() => TRACKS.slice(1).forEach(addToQueue)}
              className="rounded-lg border border-surface-container-highest px-3 py-2 font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant"
            >
              Queue all
            </button>
          </>
        }
      />

      <section className="mb-10">
        <SectionHeader title="Tracks" hint={`${TRACKS.length} items`} />
        <div className="rounded-xl border border-surface-container-highest bg-surface-container-low">
          {TRACKS.map((t, i) => (
            <RowItem key={t.objectId} object={t} index={i} />
          ))}
        </div>
      </section>

      <section className="mb-10">
        <SectionHeader title="Podcasts" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {EPISODES.map((e) => (
            <MediaCard key={e.objectId} object={e} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Stations and collections" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {PLAYLISTS.map((p) => (
            <div key={p.objectId} className="rounded-xl border border-surface-container-highest bg-surface-container-low p-3">
              <img src={p.artwork} alt="" className="aspect-square w-full rounded object-cover" />
              <p className="mt-2 font-headline-sm text-headline-sm text-on-surface">{p.title}</p>
              <p className="font-mono-data text-mono-data text-on-surface-variant">{p.count} items</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
