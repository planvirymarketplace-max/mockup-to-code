import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ORBIT Mockups - 12 Screen Click-Through" },
      {
        name: "description",
        content:
          "Click-through index of the 12 ORBIT podcast platform screen mockups, converted exactly from the original HTML.",
      },
      { property: "og:title", content: "ORBIT Mockups - 12 Screen Click-Through" },
      {
        property: "og:description",
        content:
          "Click-through index of the 12 ORBIT podcast platform screen mockups, converted exactly from the original HTML.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const screens = Array.from({ length: 12 }, (_, i) => i + 1);

function Index() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] px-8 py-16 text-[#e5e2e1]">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tighter">ORBIT — Screen Mockups</h1>
        <p className="mt-2 text-sm text-[#c6c6c7]">
          Unmodified conversions of your 12 HTML screens. Click any screen to open it.
        </p>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {screens.map((n) => (
            <li key={n}>
              <a
                href={`/mockups/screen-${n}.html`}
                className="block rounded-lg border border-[#353534] bg-[#201f1f] px-4 py-5 text-sm font-medium transition-colors hover:border-[#ff5722] hover:bg-[#2a2a2a]"
              >
                Screen {n}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
