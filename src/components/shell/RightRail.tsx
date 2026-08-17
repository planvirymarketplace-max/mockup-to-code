import { useShell, type RailPanel } from "../../state/app-shell";
import { Icon } from "../ui-kit";
import { LYRICS, NOTES, TRANSCRIPT, formatTime } from "../../data/demo";

const TABS: { id: RailPanel; label: string; icon: string }[] = [
  { id: "notes", label: "Notes", icon: "chat_bubble" },
  { id: "queue", label: "Queue", icon: "queue_music" },
  { id: "lyrics", label: "Lyrics", icon: "lyrics" },
  { id: "transcript", label: "Transcript", icon: "subtitles" },
  { id: "chat", label: "Chat", icon: "forum" },
  { id: "participants", label: "People", icon: "group" },
  { id: "details", label: "Details", icon: "info" },
  { id: "activity", label: "Activity", icon: "bolt" },
];

export function RightRail() {
  const {
    focused,
    panel,
    setPanel,
    railCollapsed,
    toggleRail,
    queue,
    removeFromQueue,
    playObject,
    loved,
    toggleLove,
  } = useShell();

  if (railCollapsed) {
    return (
      <button
        type="button"
        onClick={toggleRail}
        aria-label="Expand context rail"
        className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 rounded-l-lg border border-r-0 border-surface-container-highest bg-surface-container-low p-2 text-on-surface-variant hover:text-on-surface lg:block"
      >
        <Icon name="chevron_left" />
      </button>
    );
  }

  return (
    <aside className="fixed bottom-rail-bottom-height right-0 top-rail-top-height z-40 hidden w-rail-right-width flex-col overflow-hidden border-l border-surface-container-highest bg-surface-container-low lg:flex">
      <div className="flex items-start gap-3 border-b border-surface-container-highest p-4">
        <img
          src={focused.artwork}
          alt=""
          className="h-10 w-10 rounded border border-surface-container-highest object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate font-headline-sm text-headline-sm text-on-surface">
            {focused.title}
          </p>
          <p className="truncate font-mono-data text-mono-data uppercase text-on-surface-variant">
            {focused.objectType.replace("_", " ")} · {focused.creator}
          </p>
        </div>
        <button
          type="button"
          onClick={toggleRail}
          aria-label="Collapse context rail"
          className="rounded p-1 text-on-surface-variant hover:text-on-surface"
        >
          <Icon name="chevron_right" size={18} />
        </button>
      </div>

      <div className="flex flex-wrap gap-1 border-b border-surface-container-highest p-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setPanel(t.id)}
            className={`flex items-center gap-1 rounded px-2 py-1 font-mono-data text-mono-data uppercase transition-colors ${
              panel === t.id
                ? "bg-surface-container-high text-primary-container"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <Icon name={t.icon} size={14} />
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {panel === "notes" || panel === "chat" ? (
          <div className="flex flex-col gap-4">
            {NOTES.map((n) => (
              <div key={n.id} className="flex gap-3">
                <img src={n.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
                <div className="min-w-0">
                  <p className="font-mono-data text-mono-data text-on-surface-variant">
                    {n.author} · <span className="text-primary-container">{n.at}</span>
                  </p>
                  <p className="mt-1 font-body-sm text-body-sm text-on-surface">{n.body}</p>
                </div>
              </div>
            ))}
            <form
              className="mt-2 flex flex-col gap-2"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <textarea
                rows={2}
                placeholder={panel === "chat" ? "Message the room…" : "Add a note at 01:12…"}
                className="w-full resize-none rounded-lg border border-surface-container-highest bg-surface-container p-3 font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant focus:border-primary-container focus:outline-none"
              />
              <button
                type="submit"
                className="self-end rounded-lg bg-primary-container px-3 py-2 font-label-caps text-label-caps uppercase tracking-widest text-on-primary-container active:scale-95"
              >
                Post
              </button>
            </form>
          </div>
        ) : null}

        {panel === "queue" ? (
          <div className="flex flex-col">
            <p className="mb-3 font-mono-data text-mono-data uppercase text-on-surface-variant">
              Up next · {queue.length} items
            </p>
            {queue.length === 0 ? (
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Queue is empty. Add items from any surface.
              </p>
            ) : null}
            {queue.map((q) => (
              <div key={q.objectId} className="flex items-center gap-3 py-2">
                <button type="button" onClick={() => playObject(q)} aria-label={`Play ${q.title}`}>
                  <img src={q.artwork} alt="" className="h-9 w-9 rounded object-cover" />
                </button>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-body-sm text-body-sm text-on-surface">{q.title}</p>
                  <p className="truncate font-mono-data text-mono-data text-on-surface-variant">
                    {q.creator}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label={`Remove ${q.title}`}
                  onClick={() => removeFromQueue(q.objectId)}
                  className="text-on-surface-variant hover:text-primary-container"
                >
                  <Icon name="close" size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : null}

        {panel === "lyrics" ? (
          <div className="flex flex-col gap-3">
            {LYRICS.map((line, i) => (
              <p
                key={line}
                className={`font-body-lg text-body-lg ${
                  i === 1 ? "text-primary-container" : "text-on-surface-variant"
                }`}
              >
                {line}
              </p>
            ))}
          </div>
        ) : null}

        {panel === "transcript" || panel === "chapters" ? (
          <ul className="flex flex-col gap-3">
            {TRANSCRIPT.map((t) => (
              <li key={t.at} className="flex gap-2 font-body-sm text-body-sm text-on-surface-variant">
                <span className="font-mono-data text-mono-data text-primary-container">{t.at}</span>
                {t.body}
              </li>
            ))}
          </ul>
        ) : null}

        {panel === "participants" ? (
          <div className="flex flex-col gap-3">
            {NOTES.map((n) => (
              <div key={n.id} className="flex items-center gap-3">
                <img src={n.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
                <p className="font-body-sm text-body-sm text-on-surface">{n.author}</p>
                <span className="ml-auto font-mono-data text-mono-data text-on-surface-variant">
                  Listening
                </span>
              </div>
            ))}
          </div>
        ) : null}

        {panel === "details" ? (
          <dl className="flex flex-col gap-3 font-mono-data text-mono-data">
            <Detail k="Object type" v={focused.objectType} />
            <Detail k="Object ID" v={focused.objectId} />
            <Detail k="Canonical URL" v={`/music/${focused.slug}`} />
            <Detail k="Creator" v={focused.creator} />
            <Detail k="Duration" v={focused.live ? "LIVE" : formatTime(focused.duration)} />
            <Detail k="Genre" v={focused.genre ?? "—"} />
            <Detail k="Loves" v={focused.loves.toLocaleString()} />
            <Detail k="Notes" v={String(focused.notes)} />
            <Detail k="Availability" v="Available in your territory" />
            <button
              type="button"
              onClick={() => toggleLove(focused)}
              className={`mt-2 flex items-center gap-2 self-start rounded-lg border border-surface-container-highest px-3 py-2 uppercase ${
                loved[focused.objectId] ? "text-primary-container" : "text-on-surface-variant"
              }`}
            >
              <Icon name="favorite" size={16} filled={!!loved[focused.objectId]} />
              {loved[focused.objectId] ? "Loved" : "Love"}
            </button>
          </dl>
        ) : null}

        {panel === "activity" || panel === "collaborators" ? (
          <ul className="flex flex-col gap-3 font-body-sm text-body-sm text-on-surface-variant">
            <li>Sable Room added this to Night Driving · 4m</li>
            <li>Ilya Verne noted at 03:02 · 22m</li>
            <li>Marta Quinn resang this object · 3h</li>
            <li>412 members played this today</li>
          </ul>
        ) : null}
      </div>
    </aside>
  );
}

function Detail({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-surface-container-highest pb-2">
      <dt className="uppercase text-on-surface-variant">{k}</dt>
      <dd className="truncate text-on-surface">{v}</dd>
    </div>
  );
}
