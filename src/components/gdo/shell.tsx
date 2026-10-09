import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Tag, Bot, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGdoStore } from "@/lib/gdo/store";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/autonomia", label: "Autonomia", icon: Bot },
  { to: "/offerte", label: "Offerte", icon: Tag },
] as const;

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const resetDemo = useGdoStore((s) => s.resetDemo);

  return (
    <div className="min-h-svh bg-bg text-fg">
      <div className="mx-auto flex min-h-svh max-w-[1440px] flex-col md:flex-row">
        <aside className="border-b border-border bg-surface md:w-56 md:shrink-0 md:border-b-0 md:border-r">
          <div className="flex items-center justify-between gap-3 px-4 py-4 md:flex-col md:items-start md:px-5 md:py-6">
            <div>
              <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
                Enterprise
              </p>
              <h1 className="text-lg font-semibold tracking-tight">
                Scadenze Smart
              </h1>
              <p className="text-xs text-muted">GDO · Controllo rotazione</p>
            </div>
            <button
              type="button"
              onClick={() => resetDemo()}
              className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border px-3 text-xs text-muted hover:text-fg"
            >
              <RotateCcw className="size-3.5" />
              Reset demo
            </button>
          </div>
          <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:px-3 md:pb-6">
            {NAV.map((item) => {
              const active =
                item.to === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-sm whitespace-nowrap",
                    active
                      ? "bg-surface-2 text-fg"
                      : "text-muted hover:bg-surface-2/60 hover:text-fg",
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="min-w-0 flex-1 px-4 py-5 md:px-8 md:py-7">{children}</main>
      </div>
    </div>
  );
}
