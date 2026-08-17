import { createFileRoute } from "@tanstack/react-router";
import { ALL_OBJECTS, CREATORS, EVENTS } from "../data/demo";
import { PageHeader, RowItem, SectionHeader } from "../components/ui-kit";
import { useShell } from "../state/app-shell";
import { useState } from "react";

export const Route = createFileRoute("/_shell/search")({
  head: () => ({
    meta: [
      { title: "Search — MusicOSY" },
      { name: "description", content: "Universal search across MusicOSY members, music, episodes, live rooms, events and collections." },
      { property: "og:title", content: "Search — MusicOSY" },
      { property: "og:description", content: "One search across every object type in MusicOSY." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SearchSurface,
});

const TABS = ["All", "Music", "Podcasts", "Live", "People", "Events"];

function SearchSurface() {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("All");
  const { followed, toggleFollow } = useShell();
  const results = ALL_OBJECTS.filter(
    (o) =>
      (q === "" || `${o.title} ${o.creator}`.toLowerCase().includes(q.toLowerCase())) &&
      (tab === "All" ||
        (tab === "Music" && o.objectType === "track") ||
        (tab === "Podcasts" && o.objectType === "podcast_episode") ||
        (tab === "Live" && o.objectType === "live_stream")),
  );

  return (
    <div className="mx-auto max-w-[900px]">
      <PageHeader eyebrow="Universal search" title="Search" description="Searching never stops your active media session." />

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search everything…"
        className="mb-4 w-full rounded-lg border border-surface-container-highest bg-surface-container-low px-4 py-3 font-body-lg text-body-lg text-on-surface placeholder:text-on-surface-variant focus:border-primary-container focus:outline-none"
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-lg border px-3 py-2 font-mono-data text-mono-data uppercase ${
              tab === t ? "border-primary-container text-primary-container" : "border-surface-container-highest text-on-surface-variant"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {(tab === "All" || tab === "Music" || tab === "Podcasts" || tab === "Live") && (
        <section className="mb-10">
          <SectionHeader title="Objects" hint={`${results.length} results`} />
          {results.length === 0 ? (
            <p className="rounded-xl border border-surface-container-highest bg-surface-container-low p-6 font-body-sm text-body-sm text-on-surface-variant">
              No results. Try a different term or filter.
            </p>
          ) : (
            <div className="rounded-xl border border-surface-container-highest bg-surface-container-low">
              {results.map((o, i) => (
                <RowItem key={o.objectId} object={o} index={i} />
              ))}
            </div>
          )}
        </section>
      )}

      {(tab === "All" || tab === "People") && (
        <section className="mb-10">
          <SectionHeader title="People" />
          <div className="grid gap-3 md:grid-cols-2">
            {CREATORS.map((c) => (
              <div key={c.handle} className="flex items-center gap-3 rounded-xl border border-surface-container-highest bg-surface-container-low p-3">
                <img src={c.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-body-sm text-body-sm text-on-surface">{c.name}</p>
                  <p className="font-mono-data text-mono-data text-on-surface-variant">@{c.handle}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleFollow(c.handle)}
                  className={`rounded-lg border px-2 py-1 font-mono-data text-mono-data uppercase ${
                    followed[c.handle] ? "border-primary-container text-primary-container" : "border-surface-container-highest text-on-surface-variant"
                  }`}
                >
                  {followed[c.handle] ? "Following" : "Follow"}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {(tab === "All" || tab === "Events") && (
        <section>
          <SectionHeader title="Events" />
          <div className="grid gap-3 md:grid-cols-3">
            {EVENTS.map((e) => (
              <article key={e.objectId} className="rounded-xl border border-surface-container-highest bg-surface-container-low p-3">
                <p className="font-mono-data text-mono-data uppercase text-primary-container">{e.date}</p>
                <p className="font-headline-sm text-headline-sm text-on-surface">{e.title}</p>
                <p className="font-mono-data text-mono-data text-on-surface-variant">{e.city}</p>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
