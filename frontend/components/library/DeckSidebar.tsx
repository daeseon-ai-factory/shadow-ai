"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { decksApi, type Deck } from "@/lib/api/decks";
import { ApiError } from "@/lib/api/client";

export type DeckFilter = "ALL" | "INBOX" | string;

interface Props {
  filter: DeckFilter;
  onSelect: (filter: DeckFilter) => void;
  /** When provided, every row gets a ▶ Play button that starts a deck queue. */
  onPlayDeck?: (filter: DeckFilter) => void;
}

export function DeckSidebar({ filter, onSelect, onPlayDeck }: Props) {
  const t = useTranslations("library");
  const queryClient = useQueryClient();

  const { data: decks = [] } = useQuery({
    queryKey: ["decks"],
    queryFn: () => decksApi.list(),
  });

  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);

  const createMutation = useMutation({
    mutationFn: (name: string) => decksApi.create({ name }),
    onSuccess: () => {
      toast.success(t("deckCreated"));
      setNewName("");
      setCreating(false);
      queryClient.invalidateQueries({ queryKey: ["decks"] });
    },
    onError: (e) => toast.error(e instanceof ApiError ? e.message : "Failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: (deckId: string) => decksApi.delete(deckId),
    onSuccess: () => {
      toast.success(t("deckDeleted"));
      queryClient.invalidateQueries({ queryKey: ["decks"] });
      queryClient.invalidateQueries({ queryKey: ["clips"] });
      onSelect("ALL");
    },
  });

  const handleDelete = (d: Deck) => {
    if (!window.confirm(t("deckDeleteConfirm"))) return;
    deleteMutation.mutate(d.id);
  };

  return (
    <aside className="space-y-2" data-testid="deck-sidebar">
      <h2 className="px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {t("decksTitle")}
      </h2>

      <ul className="space-y-0.5">
        <SidebarRow
          active={filter === "ALL"}
          onClick={() => onSelect("ALL")}
          label={t("deckAll")}
          onPlay={onPlayDeck ? () => onPlayDeck("ALL") : undefined}
        />
        <SidebarRow
          active={filter === "INBOX"}
          onClick={() => onSelect("INBOX")}
          label={t("deckInbox")}
          onPlay={onPlayDeck ? () => onPlayDeck("INBOX") : undefined}
        />
        {decks.map((d) => (
          <SidebarRow
            key={d.id}
            active={filter === d.id}
            onClick={() => onSelect(d.id)}
            label={d.name}
            count={d.clipCount}
            onDelete={() => handleDelete(d)}
            onPlay={onPlayDeck ? () => onPlayDeck(d.id) : undefined}
          />
        ))}
      </ul>

      {!creating ? (
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          onClick={() => setCreating(true)}
          data-testid="deck-new-button"
        >
          {t("deckNew")}
        </Button>
      ) : (
        <form
          className="flex gap-1 px-1"
          onSubmit={(e) => {
            e.preventDefault();
            if (newName.trim()) createMutation.mutate(newName.trim());
          }}
        >
          <Input
            autoFocus
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder={t("deckCreatePlaceholder")}
            className="h-8 text-sm"
            data-testid="deck-create-input"
          />
          <Button type="submit" size="sm" disabled={!newName.trim() || createMutation.isPending}>
            {t("deckCreate")}
          </Button>
        </form>
      )}
    </aside>
  );
}

function SidebarRow({
  active, onClick, label, count, onDelete, onPlay,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count?: number;
  onDelete?: () => void;
  onPlay?: () => void;
}) {
  return (
    <li>
      <div
        className={`flex items-center justify-between gap-1 rounded-md px-2 py-1.5 text-sm transition-colors ${
          active ? "bg-secondary font-medium" : "hover:bg-muted text-muted-foreground hover:text-foreground"
        }`}
      >
        <button type="button" onClick={onClick} className="flex-1 truncate text-left">
          {label}
          {typeof count === "number" && <span className="ml-1 text-xs opacity-60">({count})</span>}
        </button>
        {onPlay && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onPlay(); }}
            className="text-xs text-muted-foreground hover:text-primary"
            aria-label="play deck"
            data-testid="deck-play"
            title="Play"
          >
            ▶
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="text-xs text-muted-foreground hover:text-destructive"
            aria-label="delete deck"
          >
            ×
          </button>
        )}
      </div>
    </li>
  );
}
