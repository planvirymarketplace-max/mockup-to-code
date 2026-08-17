import { Link } from "@tanstack/react-router";
import { useShell } from "../../state/app-shell";
import { Icon } from "../ui-kit";
import { formatTime } from "../../data/demo";

export function PlayerRail() {
  const {
    active,
    isPlaying,
    position,
    togglePlay,
    next,
    previous,
    seek,
    volume,
    setVolume,
    loved,
    saved,
    toggleLove,
    toggleSave,
    focusObject,
    setPanel,
    openOverlay,
    railCollapsed,
    toggleRail,
  } = useShell();

  const progress = active.live ? 100 : Math.min(100, (position / active.duration) * 100);

  return (
    <footer className="fixed inset-x-0 bottom-0 z-50 h-rail-bottom-height border-t border-surface-container-highest bg-surface-container-high">
      {/* Scrubber */}
      <label className="sr-only" htmlFor="scrubber">
        Seek
      </label>
      <input
        id="scrubber"
        type="range"
        min={0}
        max={active.live ? 100 : active.duration}
        value={active.live ? 100 : position}
        onChange={(e) => seek(Number(e.target.value))}
        disabled={!!active.live}
        className="absolute -top-1 left-0 h-2 w-full cursor-pointer appearance-none bg-transparent accent-primary-container"
      />
      <div className="absolute top-0 h-[2px] w-full bg-surface-container-highest">
        <div className="h-full bg-primary-container" style={{ width: `${progress}%` }} />
      </div>

      <div className="flex h-full items-center justify-between gap-4 px-gutter">
        {/* Active object identity */}
        <div className="flex w-1/3 min-w-0 items-center gap-3">
          <Link
            to="/music/$slug"
            params={{ slug: active.slug }}
            aria-label="Open active object"
            className="shrink-0"
          >
            <img
              src={active.artwork}
              alt=""
              className="h-12 w-12 rounded border border-surface-container-highest object-cover"
            />
          </Link>
          <div className="min-w-0">
            <Link
              to="/music/$slug"
              params={{ slug: active.slug }}
              className="block truncate font-headline-sm text-headline-sm text-on-surface hover:text-primary-container"
            >
              {active.title}
            </Link>
            <p className="truncate font-mono-data text-mono-data text-on-surface-variant">
              {active.live ? "LIVE · " : ""}
              {active.creator}
            </p>
          </div>
        </div>

        {/* Transport */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous"
            onClick={previous}
            className="rounded-lg p-2 text-on-surface hover:bg-surface-container-highest"
          >
            <Icon name="skip_previous" size={26} filled />
          </button>
          <button
            type="button"
            aria-label={isPlaying ? "Pause" : "Play"}
            onClick={togglePlay}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-container text-on-primary-container shadow-[0_0_15px_rgba(255,87,34,0.3)] transition-transform hover:scale-105 active:scale-90"
          >
            <Icon name={isPlaying ? "pause" : "play_arrow"} size={30} filled />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={next}
            className="rounded-lg p-2 text-on-surface hover:bg-surface-container-highest"
          >
            <Icon name="skip_next" size={26} filled />
          </button>
          <span className="hidden font-mono-data text-mono-data text-on-surface-variant md:block">
            {active.live ? "LIVE" : `${formatTime(position)} / ${formatTime(active.duration)}`}
          </span>
        </div>

        {/* Object actions + rail controls */}
        <div className="flex w-1/3 items-center justify-end gap-1 text-on-surface-variant">
          <button
            type="button"
            aria-label="Love"
            onClick={() => toggleLove(active)}
            className={`rounded-lg p-2 hover:bg-surface-container-highest ${
              loved[active.objectId] ? "text-primary-container" : ""
            }`}
          >
            <Icon name="favorite" size={18} filled={!!loved[active.objectId]} />
          </button>
          <button
            type="button"
            aria-label="Note"
            onClick={() => focusObject(active, "notes")}
            className="rounded-lg p-2 hover:bg-surface-container-highest"
          >
            <Icon name="chat_bubble" size={18} />
          </button>
          <button
            type="button"
            aria-label="Resing"
            onClick={() => openOverlay("resing")}
            className="hidden rounded-lg p-2 hover:bg-surface-container-highest md:block"
          >
            <Icon name="cached" size={18} />
          </button>
          <button
            type="button"
            aria-label="Save"
            onClick={() => toggleSave(active)}
            className={`hidden rounded-lg p-2 hover:bg-surface-container-highest md:block ${
              saved[active.objectId] ? "text-primary-container" : ""
            }`}
          >
            <Icon name="bookmark" size={18} filled={!!saved[active.objectId]} />
          </button>
          <button
            type="button"
            aria-label="Queue"
            onClick={() => {
              if (railCollapsed) toggleRail();
              focusObject(active, "queue");
              setPanel("queue");
            }}
            className="rounded-lg p-2 hover:bg-surface-container-highest"
          >
            <Icon name="queue_music" size={18} />
          </button>
          <button
            type="button"
            aria-label="Lyrics or transcript"
            onClick={() =>
              focusObject(active, active.objectType === "podcast_episode" ? "transcript" : "lyrics")
            }
            className="hidden rounded-lg p-2 hover:bg-surface-container-highest md:block"
          >
            <Icon name="subtitles" size={18} />
          </button>
          <div className="hidden items-center gap-2 pl-2 md:flex">
            <Icon name="volume_up" size={18} />
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              aria-label="Volume"
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-20 accent-primary-container"
            />
          </div>
          <button
            type="button"
            aria-label="Device"
            onClick={() => openOverlay("device")}
            className="hidden rounded-lg p-2 hover:bg-surface-container-highest lg:block"
          >
            <Icon name="devices" size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
