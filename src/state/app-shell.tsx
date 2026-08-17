import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { MediaObject } from "../data/demo";
import { TRACKS } from "../data/demo";

export type RailPanel =
  | "notes"
  | "queue"
  | "lyrics"
  | "transcript"
  | "chapters"
  | "chat"
  | "participants"
  | "details"
  | "activity"
  | "collaborators";

export type MemberContext = "personal" | "workspace";

interface ShellState {
  /* playbackState */
  active: MediaObject;
  isPlaying: boolean;
  position: number;
  queue: MediaObject[];
  volume: number;
  /* shellState */
  panel: RailPanel;
  railCollapsed: boolean;
  searchOpen: boolean;
  overlay: string | null;
  memberContext: MemberContext;
  /* relationshipState */
  loved: Record<string, boolean>;
  saved: Record<string, boolean>;
  followed: Record<string, boolean>;
  /* actions */
  playObject: (o: MediaObject, panel?: RailPanel) => void;
  focusObject: (o: MediaObject, panel?: RailPanel) => void;
  togglePlay: () => void;
  next: () => void;
  previous: () => void;
  seek: (seconds: number) => void;
  setVolume: (v: number) => void;
  addToQueue: (o: MediaObject) => void;
  playNext: (o: MediaObject) => void;
  removeFromQueue: (id: string) => void;
  setPanel: (p: RailPanel) => void;
  toggleRail: () => void;
  setSearchOpen: (v: boolean) => void;
  openOverlay: (id: string) => void;
  closeOverlay: () => void;
  setMemberContext: (c: MemberContext) => void;
  toggleLove: (o: MediaObject) => void;
  toggleSave: (o: MediaObject) => void;
  toggleFollow: (handle: string) => void;
  focused: MediaObject;
}

const ShellContext = createContext<ShellState | null>(null);

export function AppShellProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<MediaObject>(TRACKS[0]);
  const [focused, setFocused] = useState<MediaObject>(TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(72);
  const [queue, setQueue] = useState<MediaObject[]>(TRACKS.slice(1, 5));
  const [volume, setVolume] = useState(70);
  const [panel, setPanel] = useState<RailPanel>("notes");
  const [railCollapsed, setRailCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [overlay, setOverlay] = useState<string | null>(null);
  const [memberContext, setMemberContext] = useState<MemberContext>("personal");
  const [loved, setLoved] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [followed, setFollowed] = useState<Record<string, boolean>>({});

  // IS-PLAYER-001 — explicit play establishes the session; routes never clear it.
  const playObject = useCallback((o: MediaObject, p?: RailPanel) => {
    setActive(o);
    setFocused(o);
    setPosition(0);
    setIsPlaying(true);
    if (p) setPanel(p);
  }, []);

  // IS-RIGHT-002 — focusing an object cannot change the playing item.
  const focusObject = useCallback((o: MediaObject, p?: RailPanel) => {
    setFocused(o);
    if (p) setPanel(p);
    setRailCollapsed(false);
  }, []);

  const next = useCallback(() => {
    setQueue((q) => {
      if (q.length === 0) return q;
      const [head, ...rest] = q;
      setActive((prev) => {
        setFocused(head);
        return head ? head : prev;
      });
      setPosition(0);
      setIsPlaying(true);
      return rest;
    });
  }, []);

  const previous = useCallback(() => setPosition(0), []);

  const value = useMemo<ShellState>(
    () => ({
      active,
      focused,
      isPlaying,
      position,
      queue,
      volume,
      panel,
      railCollapsed,
      searchOpen,
      overlay,
      memberContext,
      loved,
      saved,
      followed,
      playObject,
      focusObject,
      togglePlay: () => setIsPlaying((p) => !p),
      next,
      previous,
      seek: setPosition,
      setVolume,
      addToQueue: (o) => setQueue((q) => [...q, o]),
      playNext: (o) => setQueue((q) => [o, ...q]),
      removeFromQueue: (id) => setQueue((q) => q.filter((i) => i.objectId !== id)),
      setPanel,
      toggleRail: () => setRailCollapsed((c) => !c),
      setSearchOpen,
      openOverlay: setOverlay,
      closeOverlay: () => setOverlay(null),
      setMemberContext,
      toggleLove: (o) => setLoved((l) => ({ ...l, [o.objectId]: !l[o.objectId] })),
      toggleSave: (o) => setSaved((s) => ({ ...s, [o.objectId]: !s[o.objectId] })),
      toggleFollow: (h) => setFollowed((f) => ({ ...f, [h]: !f[h] })),
    }),
    [
      active,
      focused,
      isPlaying,
      position,
      queue,
      volume,
      panel,
      railCollapsed,
      searchOpen,
      overlay,
      memberContext,
      loved,
      saved,
      followed,
      playObject,
      focusObject,
      next,
      previous,
    ],
  );

  return <ShellContext.Provider value={value}>{children}</ShellContext.Provider>;
}

export function useShell() {
  const ctx = useContext(ShellContext);
  if (!ctx) throw new Error("useShell must be used inside AppShellProvider");
  return ctx;
}
