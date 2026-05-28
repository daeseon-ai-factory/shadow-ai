"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useShortcuts } from "@/lib/use-shortcuts";

export interface ShortcutGroup {
  title: string;
  items: { keys: string[]; description: string }[];
}

export function ShortcutHelp({ groups }: { groups: ShortcutGroup[] }) {
  const t = useTranslations("shortcuts");
  const [open, setOpen] = useState(false);

  useShortcuts([
    { key: "?", action: () => setOpen((v) => !v), description: t("button") },
  ]);

  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => setOpen(true)} className="text-xs">
        {t("button")}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("title")}</DialogTitle>
            <DialogDescription>{t("subtitle")}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {groups.map((g) => (
              <section key={g.title}>
                <h3 className="mb-2 text-sm font-medium text-muted-foreground">{g.title}</h3>
                <ul className="space-y-1.5 text-sm">
                  {g.items.map((it, i) => (
                    <li key={i} className="flex items-center justify-between">
                      <span>{it.description}</span>
                      <div className="flex gap-1">
                        {it.keys.map((k) => (
                          <kbd
                            key={k}
                            className="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs"
                          >
                            {k}
                          </kbd>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
