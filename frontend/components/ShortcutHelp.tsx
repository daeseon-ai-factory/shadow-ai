"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useShortcuts } from "@/lib/use-shortcuts";

export interface ShortcutGroup {
  title: string;
  items: { keys: string[]; description: string }[];
}

export function ShortcutHelp({ groups }: { groups: ShortcutGroup[] }) {
  const [open, setOpen] = useState(false);

  useShortcuts([
    { key: "?", action: () => setOpen((v) => !v), description: "단축키 도움말" },
  ]);

  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => setOpen(true)} className="text-xs">
        단축키 ?
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>키보드 단축키</DialogTitle>
            <DialogDescription>입력 필드 외 모든 곳에서 동작합니다.</DialogDescription>
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
