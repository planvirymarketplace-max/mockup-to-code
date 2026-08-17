import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "../components/ui-kit";

export const Route = createFileRoute("/_shell/profile")({
  head: () => ({
    meta: [
      { title: "Profile — MusicOSY" },
      { name: "description", content: "Your member profile: releases, posts, collections and public activity." },
      { property: "og:title", content: "Profile — MusicOSY" },
      { property: "og:description", content: "Your member profile: releases, posts, collections and public activity." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Surface,
});

function Surface() {
  return (
    <div className="mx-auto max-w-[1200px]">
      <PageHeader eyebrow="Identity" title="Profile" description="Your member profile: releases, posts, collections and public activity." />
      <div className="rounded-xl border border-surface-container-highest bg-surface-container-low p-8 font-body-sm text-body-sm text-on-surface-variant">
        This surface is part of the integrated shell: the top rail, context rail and player rail stay
        mounted, so your active session continues here uninterrupted.
      </div>
    </div>
  );
}
