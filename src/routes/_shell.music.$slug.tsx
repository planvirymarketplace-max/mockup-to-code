import { createFileRoute, useParams } from "@tanstack/react-router";
import { ALL_OBJECTS } from "../data/demo";
import { PageHeader } from "../components/ui-kit";
import { useShell } from "../state/app-shell";

export const Route = createFileRoute("/_shell/music/$slug")({
  head: () => ({
    meta: [
      { title: "Object — MusicOSY" },
      { name: "description", content: "Object detail page for a MusicOSY track, episode, live room or collection." },
      { property: "og:title", content: "Object — MusicOSY" },
      { property: "og:description", content: "Object detail page with actions, details and related items." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ObjectPage,
});

function ObjectPage() {
  const { slug } = useParams({ from: "/_shell/music/$slug" });
  const { playObject, focusObject } = useShell();
  const object = ALL_OBJECTS.find((o) => o.objectId === slug) ?? ALL_OBJECTS[0]!;

  return (
    <div className="mx-auto max-w-[1000px]">
      <PageHeader eyebrow={object.objectType.replace("_", " ")} title={object.title} description={object.creator} />
      <div className="grid gap-6 md:grid-cols-[280px_1fr]">
        <img src={object.artwork} alt="" className="aspect-square w-full rounded-xl border border-surface-container-highest object-cover" />
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => playObject(object)}
              className="rounded-lg bg-primary-container px-4 py-2 font-label-caps text-label-caps uppercase tracking-widest text-on-primary-container active:scale-95"
            >
              Play
            </button>
            <button
              type="button"
              onClick={() => focusObject(object, "details")}
              className="rounded-lg border border-surface-container-highest px-4 py-2 font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant"
            >
              Details
            </button>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Playback started here continues across every surface until you replace it.
          </p>
        </div>
      </div>
    </div>
  );
}
