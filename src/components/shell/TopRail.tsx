import { Link, type LinkProps } from "@tanstack/react-router";
import { useShell } from "../../state/app-shell";
import { Icon } from "../ui-kit";
import { CONVERSATIONS, NOTIFICATIONS } from "../../data/demo";

const PRIMARY: { to: LinkProps["to"]; label: string; icon: string }[] = [
  { to: "/", label: "Home", icon: "home" },
  { to: "/create", label: "Create", icon: "add_circle" },
  { to: "/scroll", label: "Scroll", icon: "swipe_vertical" },
  { to: "/discover", label: "Discover", icon: "explore" },
  { to: "/listen", label: "Listen", icon: "graphic_eq" },
  { to: "/live", label: "Live", icon: "sensors" },
  { to: "/library", label: "Library", icon: "library_music" },
];

export function TopRail() {
  const { searchOpen, setSearchOpen, memberContext, setMemberContext } = useShell();
  const unreadInbox = CONVERSATIONS.reduce((n, c) => n + c.unread, 0);
  const unreadAlerts = NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-rail-top-height items-center gap-4 border-b border-surface-container-highest bg-surface-container px-gutter">
      <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="MusicOSY home">
        <span className="flex h-8 w-8 items-center justify-center rounded bg-primary-container font-mono-data text-mono-data font-bold text-on-primary-container">
          M
        </span>
        <span className="hidden font-headline-md text-headline-md tracking-tighter text-on-surface lg:block">
          MusicOSY
        </span>
      </Link>

      {/* Universal Search — opens the palette without stopping media (IS-MOVE-001) */}
      <button
        type="button"
        onClick={() => setSearchOpen(!searchOpen)}
        className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-lg border border-surface-container-highest bg-surface-container-low px-3 text-on-surface-variant transition-colors hover:border-primary-container md:max-w-64"
      >
        <Icon name="search" size={16} />
        <span className="truncate font-label-caps text-label-caps uppercase tracking-widest">
          Search
        </span>
        <span className="ml-auto hidden font-mono-data text-mono-data md:block">/</span>
      </button>

      <nav className="hidden items-center gap-1 xl:flex">
        {PRIMARY.map((d) => (
          <Link
            key={d.label}
            to={d.to}
            className="flex h-rail-top-height items-center gap-2 border-b-2 border-transparent px-3 font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant transition-colors hover:bg-surface-bright hover:text-on-surface"
            activeOptions={{ exact: d.to === "/" }}
            activeProps={{
              className:
                "text-primary-container border-b-2 border-primary-container font-bold bg-surface-container-low",
            }}
          >
            <Icon name={d.icon} size={18} />
            {d.label}
          </Link>
        ))}
      </nav>

      <div className="ml-auto flex shrink-0 items-center gap-1">
        {/* IS-MOVE-005 — context is explicit and always visible */}
        <button
          type="button"
          onClick={() => setMemberContext(memberContext === "personal" ? "workspace" : "personal")}
          className="hidden items-center gap-2 rounded-lg border border-surface-container-highest px-3 py-1.5 font-mono-data text-mono-data uppercase text-on-surface-variant transition-colors hover:text-on-surface md:flex"
        >
          <Icon name="swap_horiz" size={16} />
          {memberContext === "personal" ? "Personal" : "Studio Nine"}
        </button>

        <Link
          to="/messages"
          aria-label="Messages"
          className="relative rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
          activeProps={{ className: "text-primary-container" }}
        >
          <Icon name="forum" />
          {unreadInbox > 0 ? <Badge count={unreadInbox} /> : null}
        </Link>
        <Link
          to="/notifications"
          aria-label="Notifications"
          className="relative rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
          activeProps={{ className: "text-primary-container" }}
        >
          <Icon name="notifications" />
          {unreadAlerts > 0 ? <Badge count={unreadAlerts} /> : null}
        </Link>
        <Link to="/profile" aria-label="My profile" className="ml-1">
          <img
            src="https://picsum.photos/seed/member/80/80"
            alt="Your profile"
            className="h-8 w-8 rounded-full border border-surface-container-highest object-cover"
          />
        </Link>
        <Link
          to="/more"
          aria-label="More"
          className="rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
          activeProps={{ className: "text-primary-container" }}
        >
          <Icon name="more_horiz" />
        </Link>
      </div>
    </header>
  );
}

function Badge({ count }: { count: number }) {
  return (
    <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary-container px-1 font-mono-data text-[9px] font-bold text-on-primary-container">
      {count}
    </span>
  );
}

/** Reduced-width movement: Search, Home, Create, playback, Inbox and Profile stay reachable. */
export function MobileRail() {
  return (
    <nav className="fixed inset-x-0 bottom-rail-bottom-height z-40 flex items-center justify-around border-t border-surface-container-highest bg-surface-container-low py-2 xl:hidden">
      {PRIMARY.map((d) => (
        <Link
          key={d.label}
          to={d.to}
          aria-label={d.label}
          activeOptions={{ exact: d.to === "/" }}
          activeProps={{ className: "text-primary-container" }}
          className="flex flex-col items-center gap-0.5 px-2 text-on-surface-variant"
        >
          <Icon name={d.icon} size={20} />
          <span className="font-mono-data text-[9px] uppercase">{d.label}</span>
        </Link>
      ))}
    </nav>
  );
}
