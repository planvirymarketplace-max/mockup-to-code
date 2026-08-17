import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "../components/ui-kit";

export const Route = createFileRoute("/_shell/create")({
  head: () => ({
    meta: [
      { title: "Create — MusicOSY" },
      { name: "description", content: "Upload, record, compose and schedule releases without losing your session." },
      { property: "og:title", content: "Create — MusicOSY" },
      { property: "og:description", content: "Upload, record, compose and schedule releases without losing your session." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Surface,
});

function Surface() {
  return (
    <div className="mx-auto max-w-[1200px]">
      <PageHeader eyebrow="Creation" title="Create" description="Upload, record, compose and schedule releases without losing your session." />
      <div className="rounded-xl border border-surface-container-highest bg-surface-container-low p-8 font-body-sm text-body-sm text-on-surface-variant">
        This surface is part of the integrated shell: the top rail, context rail and player rail stay
        mounted, so your active session continues here uninterrupted.
      </div>
    </div>
  );
}
