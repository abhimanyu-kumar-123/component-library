"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  DotsSixVertical,
  Info,
  MagnifyingGlass,
  PencilSimple,
  Plus,
  Trash,
} from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { Radio } from "@/components/ui/radio-group";
import { BottomSheet } from "@/components/ui/bottom-sheet";

/* ── Menu tree model ─────────────────────────────────────────────────── */
type Kind = "predefined" | "submenu" | "url" | "collection";
type Item = { id: string; name: string; kind: Kind; children: Item[] };

let _id = 0;
const uid = () => `m${++_id}`;

const INITIAL: Item[] = [
  { id: "home", name: "Home", kind: "predefined", children: [] },
  { id: "new", name: "New Arrivals", kind: "predefined", children: [] },
  { id: "all", name: "All Products", kind: "predefined", children: [] },
  { id: "about", name: "About us", kind: "predefined", children: [] },
];

const COLLECTIONS = [
  "Bohemian Chic Collection",
  "Contemporary Bridal Wear",
  "Handwoven Cotton Kurtas",
  "Classic Chikankari Styles",
  "Designer Anarkali Suits",
  "Traditional Bandhani Textiles",
];

/* insert `item` under `parentId` (null = root, after the first/Home item). */
function insert(list: Item[], parentId: string | null, item: Item): Item[] {
  if (parentId === null) {
    const next = [...list];
    next.splice(1, 0, item); // after Home
    return next;
  }
  return list.map((it) =>
    it.id === parentId
      ? { ...it, children: [...it.children, item] }
      : { ...it, children: insert(it.children, parentId, item) }
  );
}

function remove(list: Item[], id: string): Item[] {
  return list
    .filter((it) => it.id !== id)
    .map((it) => ({ ...it, children: remove(it.children, id) }));
}

function update(list: Item[], id: string, patch: Partial<Item>): Item[] {
  return list.map((it) =>
    it.id === id
      ? { ...it, ...patch }
      : { ...it, children: update(it.children, id, patch) }
  );
}

/* Move `dragId` before `targetId` — only when both are siblings (same list). */
function reorder(list: Item[], dragId: string, targetId: string): Item[] {
  const di = list.findIndex((i) => i.id === dragId);
  const ti = list.findIndex((i) => i.id === targetId);
  if (di !== -1 && ti !== -1) {
    const next = [...list];
    const [moved] = next.splice(di, 1);
    next.splice(
      next.findIndex((i) => i.id === targetId),
      0,
      moved
    );
    return next;
  }
  return list.map((i) => ({ ...i, children: reorder(i.children, dragId, targetId) }));
}

type Dnd = {
  dragId: string | null;
  start: (id: string) => void;
  drop: (id: string) => void;
  end: () => void;
};

export default function MenuScreen() {
  const router = useRouter();
  const [root, setRoot] = React.useState<Item[]>(INITIAL);
  const [dragId, setDragId] = React.useState<string | null>(null);

  const dnd: Dnd = {
    dragId,
    start: setDragId,
    drop: (targetId) => {
      if (dragId && dragId !== targetId) setRoot((r) => reorder(r, dragId, targetId));
      setDragId(null);
    },
    end: () => setDragId(null),
  };

  // add / edit sheet
  const [open, setOpen] = React.useState(false);
  const [parentId, setParentId] = React.useState<string | null>(null);
  const [level, setLevel] = React.useState(1);
  const [editId, setEditId] = React.useState<string | null>(null);
  // form
  const [name, setName] = React.useState("");
  const [mode, setMode] = React.useState<"submenu" | "url" | "collection" | null>(null);
  const [subName, setSubName] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [collection, setCollection] = React.useState<string | null>(null);
  const [query, setQuery] = React.useState("");

  function startAdd(pId: string | null, lvl: number) {
    setParentId(pId);
    setLevel(lvl);
    setEditId(null);
    setName("");
    setMode(null);
    setSubName("");
    setUrl("");
    setCollection(null);
    setQuery("");
    setOpen(true);
  }
  function startEdit(item: Item, lvl: number) {
    setEditId(item.id);
    setLevel(lvl);
    setName(item.name);
    setMode(item.kind === "url" ? "url" : item.kind === "collection" ? "collection" : "submenu");
    setSubName("");
    setUrl("");
    setCollection(null);
    setQuery("");
    setOpen(true);
  }

  function save() {
    if (!mode) return;
    if (editId) {
      setRoot((r) => update(r, editId, { name: name.trim() || "Untitled", kind: mode }));
      if (mode === "submenu" && subName.trim()) {
        setRoot((r) =>
          insert(r, editId, { id: uid(), name: subName.trim(), kind: "submenu", children: [] })
        );
      }
      setOpen(false);
      return;
    }
    const label = name.trim() || (mode === "collection" ? collection ?? "Collection" : "Untitled");
    const item: Item = { id: uid(), name: label, kind: mode, children: [] };
    if (mode === "submenu" && subName.trim()) {
      item.children = [{ id: uid(), name: subName.trim(), kind: "submenu", children: [] }];
    }
    setRoot((r) => insert(r, parentId, item));
    setOpen(false);
  }

  const options =
    level >= 3
      ? (["url", "collection"] as const)
      : (["submenu", "url", "collection"] as const);
  const OPTION_LABEL = {
    submenu: "Add Submenu",
    url: "Add Custom URL",
    collection: "Add Collection",
  } as const;

  const filteredCollections = COLLECTIONS.filter((c) =>
    c.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-surface-app sm:flex sm:min-h-screen sm:items-center sm:justify-center sm:bg-neutral-200 sm:p-6">
      <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-surface-app motion-safe:animate-screen-in sm:h-[852px] sm:w-[393px] sm:rounded-[44px] sm:shadow-2xl">
        {/* The menu editor is presented as a bottom sheet over the store. */}

        {/* ── Main sheet: Edit Navigation Menu ── */}
        <BottomSheet
          open
          onOpenChange={(o) => !o && router.back()}
          title="Edit Navigation Menu"
          footer={
            <Button variant="primary" size="lg" className="w-full" onClick={() => router.back()}>
              Approve
            </Button>
          }
        >
          <div className="flex flex-col gap-2">
            {root.map((item, i) => (
              <React.Fragment key={item.id}>
                <MenuRow
                  item={item}
                  level={1}
                  dnd={dnd}
                  onAdd={startAdd}
                  onEdit={startEdit}
                  onDelete={(id) => setRoot((r) => remove(r, id))}
                />
                {i === 0 && (
                  <AddCta label="Add menu item" onClick={() => startAdd(null, 1)} />
                )}
              </React.Fragment>
            ))}
            {/* footer note — white box */}
            <div className="mt-1 flex items-start gap-2 rounded-lg bg-white px-3 py-3">
              <Info weight="regular" className="mt-0.5 size-4 shrink-0 text-text-secondary" />
              <span className="type-body-2 text-text-secondary">
                Add / edit menu — you can change it later.
              </span>
            </div>
          </div>
        </BottomSheet>

        {/* ── Add / edit item sheet ── */}
        <BottomSheet
          open={open}
          onOpenChange={setOpen}
          title={editId ? "Edit menu item" : "Add new menu item"}
          footer={
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              disabled={!name.trim() || !mode}
              onClick={save}
            >
              Save
            </Button>
          }
        >
          <TextField
            label="Name"
            placeholder="Type name here"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="flex flex-col gap-3 pt-1">
            {options.map((opt) => (
                <React.Fragment key={opt}>
                  <button
                    type="button"
                    onClick={() => setMode(opt)}
                    className="group flex w-full items-center gap-2.5 text-left outline-none"
                  >
                    <Radio checked={mode === opt} />
                    <span className="type-body-1 text-text-primary">
                      {OPTION_LABEL[opt]}
                    </span>
                  </button>

                  {mode === opt && opt === "submenu" && (
                    <div className="pl-[30px]">
                      <TextField
                        placeholder="Type submenu name here"
                        value={subName}
                        onChange={(e) => setSubName(e.target.value)}
                      />
                    </div>
                  )}
                  {mode === opt && opt === "url" && (
                    <div className="pl-[30px]">
                      <TextField
                        placeholder="Enter link here"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                      />
                    </div>
                  )}
                  {mode === opt && opt === "collection" && (
                    <div className="flex flex-col gap-2 pl-[30px]">
                      <label className="flex h-10 items-center gap-2 rounded-lg border border-divider bg-white px-2.5 transition-colors focus-within:border-brand-primary [&_svg]:size-4 [&_svg]:text-text-secondary">
                        <MagnifyingGlass weight="regular" />
                        <input
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder="Search"
                          className="min-w-0 flex-1 bg-transparent type-body-1 text-text-primary outline-none placeholder:text-text-secondary"
                        />
                      </label>
                      <div className="flex max-h-[220px] flex-col overflow-y-auto">
                        {filteredCollections.map((c) => {
                          const sel = collection === c;
                          return (
                            <button
                              key={c}
                              type="button"
                              onClick={() => setCollection(c)}
                              className="flex items-center justify-between gap-2 py-2.5 text-left outline-none"
                            >
                              <span className="type-body-1 text-text-primary">{c}</span>
                              {sel && (
                                <CheckCircle
                                  weight="fill"
                                  className="size-5 shrink-0 text-success"
                                />
                              )}
                            </button>
                          );
                        })}
                        {filteredCollections.length === 0 && (
                          <span className="py-3 type-body-2 text-text-secondary">
                            No collections found
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
        </BottomSheet>
      </div>
    </div>
  );
}

/* ── A menu row + (for submenus) its nested add-CTA and children ─────── */
function MenuRow({
  item,
  level,
  dnd,
  onAdd,
  onEdit,
  onDelete,
}: {
  item: Item;
  level: number;
  dnd: Dnd;
  onAdd: (parentId: string | null, level: number) => void;
  onEdit: (item: Item, level: number) => void;
  onDelete: (id: string) => void;
}) {
  const editable = item.kind !== "predefined";
  const expandable = item.kind === "submenu";

  // branches under a submenu = the "Add menu item to X" CTA + each child
  const branches: { key: string; node: React.ReactNode }[] = [];
  if (expandable) {
    if (level < 3) {
      branches.push({
        key: "add",
        node: (
          <AddCta
            label={`Add menu item to ${item.name}`}
            onClick={() => onAdd(item.id, level + 1)}
          />
        ),
      });
    }
    item.children.forEach((c) =>
      branches.push({
        key: c.id,
        node: (
          <MenuRow
            item={c}
            level={level + 1}
            dnd={dnd}
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ),
      })
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {/* item row — added items are white & draggable; predefined are grey & fixed */}
      <div
        draggable={editable}
        onDragStart={editable ? () => dnd.start(item.id) : undefined}
        onDragEnd={dnd.end}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => dnd.drop(item.id)}
        className={cn(
          "flex items-center gap-2 rounded-lg px-3 py-3 transition-opacity",
          editable ? "bg-white" : "bg-border-divider",
          dnd.dragId === item.id && "opacity-40"
        )}
      >
        {editable && (
          <DotsSixVertical
            weight="bold"
            className="size-4 shrink-0 cursor-grab text-text-disabled active:cursor-grabbing"
          />
        )}
        <span className="min-w-0 flex-1 truncate type-body-2 font-medium text-text-primary">
          {item.name}
        </span>
        {editable && (
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              aria-label="Edit"
              onClick={() => onEdit(item, level)}
              className="text-brand-primary outline-none transition-opacity active:opacity-60 [&_svg]:size-4"
            >
              <PencilSimple weight="regular" />
            </button>
            <button
              type="button"
              aria-label="Delete"
              onClick={() => onDelete(item.id)}
              className="text-danger outline-none transition-opacity active:opacity-60 [&_svg]:size-4"
            >
              <Trash weight="regular" />
            </button>
          </div>
        )}
      </div>

      {expandable && (
        <div className="flex flex-col gap-2 pl-6">
          {branches.map((b, i) => {
            const isFirst = i === 0;
            const isLast = i === branches.length - 1;
            return (
              <div key={b.key} className="relative">
                {/* trunk into this row's centre (extends up to the parent on the first branch) */}
                <span
                  className={cn(
                    "absolute -left-3 w-px bg-border-divider",
                    isFirst ? "-top-2 h-7" : "top-0 h-5"
                  )}
                />
                {/* trunk continuing down to the next sibling */}
                {!isLast && (
                  <span className="absolute -left-3 top-5 -bottom-2 w-px bg-border-divider" />
                )}
                {/* elbow into the child box */}
                <span className="absolute -left-3 top-5 h-px w-3 bg-border-divider" />
                {b.node}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ── "+ Add menu item" link row ──────────────────────────────────────── */
function AddCta({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-2 rounded-lg border border-dashed border-border-divider bg-white px-3 py-3 text-left type-body-2 font-medium text-brand-primary outline-none transition-colors active:bg-surface-muted [&_svg]:size-4 [&_svg]:shrink-0"
    >
      <Plus weight="bold" />
      {label}
    </button>
  );
}
