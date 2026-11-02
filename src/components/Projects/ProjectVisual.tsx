import { cn } from "@/lib/utils";

type Variant = "dashboard" | "orders";

type Props = {
  variant: Variant;
  accent: string;
  /** Shown in the fake browser address bar. */
  url: string;
  className?: string;
};

const DASHBOARD_NAV = ["Rooms", "Bookings", "Guests", "Attendance", "Complaints"];
const DASHBOARD_ROWS = [
  { room: "Room 101", status: "Available", tone: "mint" },
  { room: "Room 102", status: "Occupied", tone: "gold" },
  { room: "Room 103", status: "Cleaning", tone: "wine" },
  { room: "Room 104", status: "Available", tone: "mint" },
];

const ORDERS_NAV = ["Orders", "Customers", "Billing", "Tracking", "Delivery"];
const ORDERS_ROWS = [
  { id: "#ORD-001", status: "Picked up", tone: "gold" },
  { id: "#ORD-002", status: "In wash", tone: "wine" },
  { id: "#ORD-003", status: "Ready", tone: "mint" },
  { id: "#ORD-004", status: "Delivered", tone: "muted" },
];

const TONES: Record<string, { text: string; bg: string; border: string }> = {
  mint: { text: "#6ee7b7", bg: "rgba(52,211,153,0.10)", border: "rgba(52,211,153,0.28)" },
  gold: { text: "#ffd27a", bg: "rgba(255,176,32,0.10)", border: "rgba(255,176,32,0.28)" },
  wine: { text: "#ffadb0", bg: "rgba(200,30,74,0.12)", border: "rgba(200,30,74,0.30)" },
  muted: { text: "#c8a494", bg: "rgba(200,164,148,0.08)", border: "rgba(200,164,148,0.22)" },
};

function Dot({ tone }: { tone: string }) {
  const palette = TONES[tone] ?? TONES.muted;
  return (
    <span
      aria-hidden="true"
      className="h-1.5 w-1.5 shrink-0 rounded-full"
      style={{ backgroundColor: palette.text }}
    />
  );
}

function StatusPill({ label, tone }: { label: string; tone: string }) {
  const palette = TONES[tone] ?? TONES.muted;
  return (
    <span
      className="rounded-full border px-1.5 py-0.5 text-[0.45rem] font-medium sm:text-[0.5rem]"
      style={{
        color: palette.text,
        backgroundColor: palette.bg,
        borderColor: palette.border,
      }}
    >
      {label}
    </span>
  );
}

/**
 * A stylised, hand-built UI mock used as the project preview.
 *
 * These are deliberately NOT fake screenshots and contain no invented metrics —
 * they show the actual feature set described for each project, rendered as a
 * believable interface. Swap in a real screenshot any time by setting
 * `image` on the project in src/data/projects.ts.
 */
export function ProjectVisual({ variant, accent, url, className }: Props) {
  const nav = variant === "dashboard" ? DASHBOARD_NAV : ORDERS_NAV;
  const rows = variant === "dashboard" ? DASHBOARD_ROWS : ORDERS_ROWS;
  const heading = variant === "dashboard" ? "Overview" : "Orders";
  const columnLabel = variant === "dashboard" ? "Room" : "Order";

  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-[#0b0504] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)]",
        className,
      )}
    >
      {/* Ambient accent glow inside the mock */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl"
        style={{ backgroundColor: accent, opacity: 0.16 }}
      />

      {/* Browser chrome */}
      <div className="relative flex items-center gap-1.5 border-b border-white/[0.06] px-2.5 py-1.5 sm:px-3 sm:py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]/80" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]/80" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]/80" />
        <div className="ml-2 min-w-0 flex-1 truncate rounded bg-white/[0.045] px-2 py-0.5 font-mono text-[0.45rem] text-dim sm:text-[0.5rem]">
          {url}
        </div>
      </div>

      <div className="relative flex h-[calc(100%-1.75rem)] sm:h-[calc(100%-2rem)]">
        {/* Sidebar */}
        <aside className="hidden w-[27%] shrink-0 flex-col border-r border-white/[0.06] p-2 sm:flex">
          <div className="mb-2 flex items-center gap-1.5 px-1">
            <span
              className="grid h-4 w-4 place-items-center rounded text-[0.4rem] font-bold text-[#080403]"
              style={{ backgroundColor: accent }}
            >
              A
            </span>
            <span className="font-mono text-[0.45rem] uppercase tracking-wider text-white/45">
              Admin
            </span>
          </div>
          {nav.map((item, index) => (
            <div
              key={item}
              className={cn(
                "flex items-center gap-1.5 rounded px-1.5 py-1 text-[0.5rem]",
                index === 0 ? "bg-white/[0.07] text-white/85" : "text-white/35",
              )}
            >
              <span
                aria-hidden="true"
                className="h-1 w-1 rounded-full"
                style={{ backgroundColor: index === 0 ? accent : "rgba(255,255,255,0.18)" }}
              />
              <span className="truncate">{item}</span>
            </div>
          ))}
        </aside>

        {/* Main panel */}
        <div className="min-w-0 flex-1 p-2.5 sm:p-3">
          <div className="flex items-center justify-between gap-2">
            <p className="font-display text-[0.6rem] font-semibold text-white/85 sm:text-[0.7rem]">
              {heading}
            </p>
            <span
              className="rounded px-1.5 py-0.5 text-[0.4rem] font-medium text-[#080403] sm:text-[0.45rem]"
              style={{ backgroundColor: accent }}
            >
              New
            </span>
          </div>

          {/* Three feature cards (not metrics — just labels) */}
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {nav.slice(0, 3).map((item) => (
              <div
                key={item}
                className="rounded-md border border-white/[0.06] bg-white/[0.03] px-1.5 py-1.5"
              >
                <div className="mb-1 h-0.5 w-3 rounded-full" style={{ backgroundColor: accent, opacity: 0.7 }} />
                <p className="truncate text-[0.42rem] text-white/60 sm:text-[0.5rem]">{item}</p>
                <div className="mt-1 h-0.5 w-full rounded-full bg-white/[0.07]">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${58 + ((item.length * 7) % 30)}%`, backgroundColor: accent, opacity: 0.55 }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="mt-2 overflow-hidden rounded-md border border-white/[0.06]">
            <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.025] px-1.5 py-1">
              <span className="font-mono text-[0.4rem] uppercase tracking-wider text-white/30">
                {columnLabel}
              </span>
              <span className="font-mono text-[0.4rem] uppercase tracking-wider text-white/30">
                Status
              </span>
            </div>
            {rows.map((row) => (
              <div
                key={"room" in row ? row.room : row.id}
                className="flex items-center justify-between border-b border-white/[0.04] px-1.5 py-1 last:border-0"
              >
                <span className="flex items-center gap-1 truncate text-[0.45rem] text-white/60 sm:text-[0.52rem]">
                  <Dot tone={row.tone} />
                  {"room" in row ? row.room : row.id}
                </span>
                <StatusPill label={row.status} tone={row.tone} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Glass reflection sweep */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.045)_48%,transparent_60%)]"
      />
    </div>
  );
}
