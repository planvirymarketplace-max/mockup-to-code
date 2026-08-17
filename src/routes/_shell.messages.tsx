import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "../components/ui-kit";

export const Route = createFileRoute("/_shell/messages")({
  head: () => ({
    meta: [
      { title: "Messages — MusicOSY" },
      { name: "description", content: "Direct conversations and shared objects that play inline in the persistent player." },
      { property: "og:title", content: "Messages — MusicOSY" },
      { property: "og:description", content: "Direct conversations and shared objects that play inline in the persistent player." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Surface,
});

function Surface() {
  return (
    <div className="mx-auto max-w-[1200px]">
      <PageHeader eyebrow="Inbox" title="Messages" description="Direct conversations and shared objects that play inline in the persistent player." />
      <div className="rounded-xl border border-surface-container-highest bg-surface-container-low p-8 font-body-sm text-body-sm text-on-surface-variant">
        This surface is part of the integrated shell: the top rail, context rail and player rail stay
        mounted, so your active session continues here uninterrupted.
      </div>
    </div>
  );
}
