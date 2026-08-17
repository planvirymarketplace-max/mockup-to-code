import { createFileRoute } from "@tanstack/react-router";
import { LIVE_NOW, EVENTS } from "../data/demo";
import { Icon, PageHeader, SectionHeader } from "../components/ui-kit";
import { useShell } from "../state/app-shell";

export const Route = createFileRoute("/_shell/live")({
  head: () => ({
    meta: [
      { title: "Live — MusicOSY" },
      { name: "description", content: "Live rooms, scheduled broadcasts and replays on MusicOSY with chat, participants and requests." },
      { property: "og:title", content: "Live — MusicOSY" },
      { property: "og:description", content: "Join live rooms with chat and participants in the context rail." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LiveSurface,
});

function LiveSurface() {
  const { playObject, focusObject, openOverlay } = useShell();
  return (
    <div className="mx-auto max-w-[1200px]">
      <PageHeader
        eyebrow="Real time"
        title="Live"
        description="Joining a live room replaces the active session; chat and participants open in the context rail."
        actions={
          <button
            type="button"
            onClick={() => openOverlay("golive")}
            className="rounded-lg bg-primary-container px-3 py-2 font-label-caps text-label-caps uppercase tracking-widest text-on-primary-container active:scale-95"
          >
            Go live
          </button>
        }
      />

      <section className="mb-10">
        <SectionHeader title="Live now" hint="Realtime presence" />
        <div className="grid gap-4 md:grid-cols-2">
          {LIVE_NOW.map((l) => (
            <article key={l.objectId} className="overflow-hidden rounded-xl border border-surface-container-highest bg-surface-container-low">
              <div className="relative">
                <img src={l.artwork} alt="" className="h-48 w-full object-cover" />
                <span className="absolute left-3 top-3 rounded bg-primary-container px-2 py-1 font-mono-data text-mono-data uppercase text-on-primary-container">
                  Live · {l.notes} in chat
                </span>
              </div>
              <div className="flex items-center gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-headline-md text-headline-md text-on-surface">{l.title}</p>
                  <p className="font-mono-data text-mono-data text-on-surface-variant">{l.creator}</p>
                </div>
                <button
                  type="button"
                  onClick={() => focusObject(l, "participants")}
                  aria-label="Participants"
                  className="rounded-lg border border-surface-container-highest p-2 text-on-surface-variant"
                >
                  <Icon name="group" size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => playObject(l, "chat")}
                  className="rounded-lg bg-primary-container px-3 py-2 font-label-caps text-label-caps uppercase tracking-widest text-on-primary-container active:scale-95"
                >
                  Join
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Scheduled programming" />
        <div className="rounded-xl border border-surface-container-highest bg-surface-container-low">
          {EVENTS.map((e) => (
            <div key={e.objectId} className="flex items-center gap-4 border-b border-surface-container-highest p-4 last:border-0">
              <span className="font-mono-data text-mono-data uppercase text-primary-container">{e.date}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-body-sm text-body-sm text-on-surface">{e.title}</p>
                <p className="font-mono-data text-mono-data text-on-surface-variant">{e.city}</p>
              </div>
              <button
                type="button"
                onClick={() => openOverlay("collection")}
                className="rounded-lg border border-surface-container-highest px-3 py-2 font-mono-data text-mono-data uppercase text-on-surface-variant"
              >
                Remind me
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
