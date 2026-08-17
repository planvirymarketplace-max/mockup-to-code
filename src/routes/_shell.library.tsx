import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "../components/ui-kit";

export const Route = createFileRoute("/_shell/library")({
  head: () => ({
    meta: [
      { title: "Library — MusicOSY" },
      { name: "description", content: "Saved music, playlists, follows and downloads in one collection surface." },
      { property: "og:title", content: "Library — MusicOSY" },
      { property: "og:description", content: "Saved music, playlists, follows and downloads in one collection surface." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Surface,
});

function Surface() {
  return (
    <div className="mx-auto max-w-[1200px]">
      <PageHeader eyebrow="Collections" title="Library" description="Saved music, playlists, follows and downloads in one collection surface." />
      <div className="rounded-xl border border-surface-container-highest bg-surface-container-low p-8 font-body-sm text-body-sm text-on-surface-variant">
        This surface is part of the integrated shell: the top rail, context rail and player rail stay
        mounted, so your active session continues here uninterrupted.
      </div>
    </div>
  );
}
