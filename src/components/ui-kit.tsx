import type { ReactNode } from "react";
import { Link, type LinkProps } from "@tanstack/react-router";
import { useShell } from "../state/app-shell";
import { formatTime, type MediaObject } from "../data/demo";

export function Icon({
  name,
  size = 20,
  filled = false,
  className = "",
}: {
  name: string;
  size?: number;
  filled?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`material-symbols-outlined leading-none ${className}`}
      style={{ fontSize: `${size}px`, fontVariationSettings: filled ? "'FILL' 1" : undefined }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-surface-container-highest pb-6">
      <div>
        <p className="font-mono-data text-mono-data uppercase tracking-widest text-primary-container">
          {eyebrow}
        </p>
        <h1 className="mt-2 font-headline-md text-headline-md text-on-surface">{title}</h1>
        {description ? (
          <p className="mt-2 max-w-2xl font-body-sm text-body-sm text-on-surface-variant">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </header>
  );
}

export function SectionHeader({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface">
        {title}
      </h2>
      {hint ? (
        <span className="font-mono-data text-mono-data text-on-surface-variant">{hint}</span>
      ) : null}
    </div>
  );
}

export function Button({
  children,
  onClick,
  variant = "ghost",
  icon,
}: {
  children?: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "outline";
  icon?: string;
}) {
  const styles = {
    primary: "bg-primary-container text-on-primary-container hover:opacity-90",
    ghost: "bg-surface-container-high text-on-surface hover:bg-surface-container-highest",
    outline:
      "border border-surface-container-highest text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high",
  }[variant];
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 font-label-caps text-label-caps uppercase tracking-widest transition-all active:scale-95 ${styles}`}
    >
      {icon ? <Icon name={icon} size={18} /> : null}
      {children}
    </button>
  );
}

/** IS-CANVAS-004 — object actions are local and never leave the route. */
export function ObjectActions({ object }: { object: MediaObject }) {
  const { loved, saved, toggleLove, toggleSave, addToQueue, focusObject, openOverlay } = useShell();
  return (
    <div className="flex items-center gap-1 text-on-surface-variant">
      <button
        type="button"
        aria-label="Love"
        onClick={() => toggleLove(object)}
        className={`rounded-lg p-2 transition-colors hover:bg-surface-container-highest ${
          loved[object.objectId] ? "text-primary-container" : ""
        }`}
      >
        <Icon name="favorite" size={18} filled={!!loved[object.objectId]} />
      </button>
      <button
        type="button"
        aria-label="Note"
        onClick={() => focusObject(object, "notes")}
        className="rounded-lg p-2 transition-colors hover:bg-surface-container-highest"
      >
        <Icon name="chat_bubble" size={18} />
      </button>
      <button
        type="button"
        aria-label="Resing"
        onClick={() => openOverlay("resing")}
        className="rounded-lg p-2 transition-colors hover:bg-surface-container-highest"
      >
        <Icon name="cached" size={18} />
      </button>
      <button
        type="button"
        aria-label="Save"
        onClick={() => toggleSave(object)}
        className={`rounded-lg p-2 transition-colors hover:bg-surface-container-highest ${
          saved[object.objectId] ? "text-primary-container" : ""
        }`}
      >
        <Icon name="bookmark" size={18} filled={!!saved[object.objectId]} />
      </button>
      <button
        type="button"
        aria-label="Add to queue"
        onClick={() => addToQueue(object)}
        className="rounded-lg p-2 transition-colors hover:bg-surface-container-highest"
      >
        <Icon name="queue_music" size={18} />
      </button>
      <button
        type="button"
        aria-label="Share"
        onClick={() => openOverlay("share")}
        className="rounded-lg p-2 transition-colors hover:bg-surface-container-highest"
      >
        <Icon name="share" size={18} />
      </button>
    </div>
  );
}

export function MediaCard({ object }: { object: MediaObject }) {
  const { playObject, focusObject, active, isPlaying } = useShell();
  const isActive = active.objectId === object.objectId;
  return (
    <article className="group flex flex-col gap-3 rounded-xl border border-surface-container-highest bg-surface-container-low p-3 transition-colors hover:bg-surface-container">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <img
          src={object.artwork}
          alt={`${object.title} by ${object.creator}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          type="button"
          onClick={() => playObject(object, object.live ? "chat" : "notes")}
          aria-label={`Play ${object.title}`}
          className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary-container text-on-primary-container opacity-0 shadow-[0_0_15px_rgba(255,87,34,0.35)] transition-all group-hover:opacity-100 active:scale-90"
        >
          <Icon name={isActive && isPlaying ? "pause" : "play_arrow"} size={24} filled />
        </button>
        {object.live ? (
          <span className="absolute left-2 top-2 rounded bg-primary-container px-2 py-1 font-mono-data text-mono-data uppercase text-on-primary-container">
            Live
          </span>
        ) : null}
      </div>
      <div className="flex items-start justify-between gap-2">
        <button
          type="button"
          onClick={() => focusObject(object, "details")}
          className="min-w-0 text-left"
        >
          <h3 className="truncate font-headline-sm text-headline-sm text-on-surface">
            {object.title}
          </h3>
          <p className="truncate font-mono-data text-mono-data text-on-surface-variant">
            {object.creator}
          </p>
        </button>
        <span className="shrink-0 font-mono-data text-mono-data text-on-surface-variant">
          {object.live ? "LIVE" : formatTime(object.duration)}
        </span>
      </div>
      <ObjectActions object={object} />
    </article>
  );
}

export function RowItem({ object, index }: { object: MediaObject; index: number }) {
  const { playObject, active } = useShell();
  const isActive = active.objectId === object.objectId;
  return (
    <div
      className={`flex items-center gap-4 border-b border-surface-container-highest px-3 py-3 transition-colors hover:bg-surface-container ${
        isActive ? "bg-surface-container" : ""
      }`}
    >
      <span className="w-6 font-mono-data text-mono-data text-on-surface-variant">
        {String(index + 1).padStart(2, "0")}
      </span>
      <button type="button" onClick={() => playObject(object)} aria-label={`Play ${object.title}`}>
        <img
          src={object.artwork}
          alt=""
          loading="lazy"
          className="h-10 w-10 rounded border border-surface-container-highest object-cover"
        />
      </button>
      <div className="min-w-0 flex-1">
        <p
          className={`truncate font-body-sm text-body-sm ${
            isActive ? "text-primary-container" : "text-on-surface"
          }`}
        >
          {object.title}
        </p>
        <p className="truncate font-mono-data text-mono-data text-on-surface-variant">
          {object.creator}
        </p>
      </div>
      <span className="hidden font-mono-data text-mono-data text-on-surface-variant md:block">
        {object.genre ?? object.objectType.replace("_", " ")}
      </span>
      <ObjectActions object={object} />
    </div>
  );
}

export function TileLink({
  to,
  icon,
  label,
  hint,
}: {
  to: LinkProps["to"];
  icon: string;
  label: string;
  hint: string;
}) {
  return (
    <Link
      to={to}
      className="flex flex-col gap-2 rounded-xl border border-surface-container-highest bg-surface-container-low p-4 transition-colors hover:bg-surface-container"
    >
      <Icon name={icon} size={22} className="text-primary-container" />
      <span className="font-headline-sm text-headline-sm text-on-surface">{label}</span>
      <span className="font-mono-data text-mono-data text-on-surface-variant">{hint}</span>
    </Link>
  );
}
