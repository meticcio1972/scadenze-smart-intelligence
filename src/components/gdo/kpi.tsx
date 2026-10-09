import { cn } from "@/lib/utils";

const ITEMS = [
  { key: "scaduti", label: "Scaduti", tone: "danger" },
  { key: "entro3", label: "Entro 3 giorni", tone: "danger" },
  { key: "entro7", label: "Entro 7 giorni", tone: "warn" },
  { key: "entro10", label: "Entro 10 giorni", tone: "warn" },
  { key: "entro15", label: "Entro 15 giorni", tone: "ok" },
  { key: "totale", label: "Referenze", tone: "neutral" },
] as const;

type Kpi = {
  scaduti: number;
  entro3: number;
  entro7: number;
  entro10: number;
  entro15: number;
  totale: number;
};

export function KpiStrip({ data, onSelect }: { data: Kpi; onSelect?: (k: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
      {ITEMS.map((item) => (
        <button
          key={item.key}
          type="button"
          onClick={() => onSelect?.(item.key)}
          className="rounded-xl border border-border bg-surface px-3 py-4 text-left"
        >
          <p className="text-[11px] tracking-wide text-muted uppercase">{item.label}</p>
          <p
            className={cn(
              "mt-1 font-mono text-2xl font-medium tabular-nums",
              item.tone === "danger" && "text-danger",
              item.tone === "warn" && "text-warn",
              item.tone === "ok" && "text-ok",
            )}
          >
            {data[item.key]}
          </p>
        </button>
      ))}
    </div>
  );
}
