import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "../components/ui-kit";

export const Route = createFileRoute("/_shell/more")({
  head: () => ({
    meta: [
      { title: "More — MusicOSY" },
      { name: "description", content: "Account, playback, privacy, notifications and support settings." },
      { property: "og:title", content: "More — MusicOSY" },
      { property: "og:description", content: "Account, playback, privacy, notifications and support settings." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Surface,
});

function Surface() {
  return (
    <div className="mx-auto max-w-[1200px]">
      <PageHeader eyebrow="Settings" title="More" description="Account, playback, privacy, notifications and support settings." />
      <div className="rounded-xl border border-surface-container-highest bg-surface-container-low p-8 font-body-sm text-body-sm text-on-surface-variant">
        This surface is part of the integrated shell: the top rail, context rail and player rail stay
        mounted, so your active session continues here uninterrupted.
      </div>
    </div>
  );
}
