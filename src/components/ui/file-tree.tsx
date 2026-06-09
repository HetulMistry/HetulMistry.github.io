"use client";

import { AnimatePresence, m } from "framer-motion";
import {
  ChevronRight,
  FileIcon,
  FolderIcon,
  FolderOpenIcon,
} from "lucide-react";
import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { cn } from "@/lib/utils";

export interface TreeViewElement {
  id: string;
  name: string;
  isSelectable?: boolean;
  children?: TreeViewElement[];
  type?: "file" | "folder";
}

interface TreeContextValue {
  selectedId: string | undefined;
  expandedItems: string[];
  indicator: boolean;
  openIcon: React.ReactNode;
  closeIcon: React.ReactNode;
  handleExpand: (id: string) => void;
  selectItem: (id: string) => void;
}

const TreeContext = createContext<TreeContextValue>({
  selectedId: undefined,
  expandedItems: [],
  indicator: true,
  openIcon: null,
  closeIcon: null,
  handleExpand: () => {},
  selectItem: () => {},
});

function useTree() {
  return useContext(TreeContext);
}

export interface TreeProps extends React.HTMLAttributes<HTMLDivElement> {
  initialSelectedId?: string;
  indicator?: boolean;
  elements?: TreeViewElement[];
  initialExpandedItems?: string[];
  openIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  onSelectChange?: (id: string | undefined) => void;
  sort?:
    | "default"
    | "none"
    | ((a: TreeViewElement, b: TreeViewElement) => number);
  dir?: "rtl" | "ltr";
}

export function Tree({
  initialSelectedId,
  indicator = true,
  elements,
  initialExpandedItems = [],
  openIcon,
  closeIcon,
  onSelectChange,
  sort = "none",
  dir = "ltr",
  className,
  children,
  ...props
}: TreeProps) {
  const [selectedId, setSelectedId] = useState<string | undefined>(
    initialSelectedId,
  );
  const [expandedItems, setExpandedItems] =
    useState<string[]>(initialExpandedItems);

  const selectItem = useCallback(
    (id: string) => {
      setSelectedId(id);
      onSelectChange?.(id);
    },
    [onSelectChange],
  );

  const handleExpand = useCallback((id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  }, []);

  const ctx = useMemo(
    () => ({
      selectedId,
      expandedItems,
      indicator,
      openIcon: openIcon ?? (
        <FolderOpenIcon className="size-4 text-sky-400/70" />
      ),
      closeIcon: closeIcon ?? <FolderIcon className="size-4 text-sky-400/70" />,
      handleExpand,
      selectItem,
    }),
    [
      selectedId,
      expandedItems,
      indicator,
      openIcon,
      closeIcon,
      handleExpand,
      selectItem,
    ],
  );

  const body =
    elements != null ? <DataTree elements={elements} sort={sort} /> : children;

  return (
    <TreeContext.Provider value={ctx}>
      <div
        dir={dir}
        className={cn("select-none text-sm", className)}
        role="tree"
        {...props}
      >
        <ul role="group" className="space-y-0.5">
          {body}
        </ul>
      </div>
    </TreeContext.Provider>
  );
}

function sortElements(
  els: TreeViewElement[],
  mode: TreeProps["sort"],
): TreeViewElement[] {
  if (mode === "none") return els;
  if (typeof mode === "function") return [...els].sort(mode);
  return [...els].sort((a, b) => {
    const aIsFolder = !!(a.children || a.type === "folder");
    const bIsFolder = !!(b.children || b.type === "folder");
    if (aIsFolder !== bIsFolder) return aIsFolder ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
}

function DataTree({
  elements,
  sort,
}: {
  elements: TreeViewElement[];
  sort: TreeProps["sort"];
}) {
  const sorted = sortElements(elements, sort);
  return (
    <>
      {sorted.map((el) => {
        const isFolder = !!(el.children || el.type === "folder");
        if (isFolder) {
          return (
            <Folder
              key={el.id}
              value={el.id}
              element={el.name}
              isSelectable={el.isSelectable ?? true}
            >
              {el.children && el.children.length > 0 && (
                <DataTree elements={el.children} sort={sort} />
              )}
            </Folder>
          );
        }
        return (
          <File
            key={el.id}
            value={el.id}
            isSelectable={el.isSelectable ?? true}
          >
            <span>{el.name}</span>
          </File>
        );
      })}
    </>
  );
}

export interface FolderProps extends React.HTMLAttributes<HTMLDivElement> {
  element: string;
  value: string;
  isSelectable?: boolean;
  isSelect?: boolean;
}

export function Folder({
  element,
  value,
  isSelectable = true,
  isSelect,
  className,
  children,
  ...props
}: FolderProps) {
  const {
    handleExpand,
    expandedItems,
    openIcon,
    closeIcon,
    indicator,
    selectedId,
  } = useTree();

  const isOpen = expandedItems.includes(value);
  const isSelected = isSelect ?? selectedId === value;

  return (
    <li role="treeitem" aria-expanded={isOpen} aria-selected={isSelected}>
      <button
        type="button"
        disabled={!isSelectable}
        onClick={() => {
          handleExpand(value);
        }}
        className={cn(
          "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-slate-400",
          "transition-colors hover:bg-white/4 hover:text-slate-200",
          isSelected && "bg-sky-400/10 text-white",
          !isSelectable && "cursor-default opacity-50",
          className,
        )}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        <ChevronRight
          className={cn(
            "size-3.5 shrink-0 text-slate-600 transition-transform duration-150",
            isOpen && "rotate-90",
          )}
        />
        {isOpen ? openIcon : closeIcon}
        <span className="truncate font-mono text-xs">{element}</span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && children && (
          <m.ul
            role="group"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "ml-5 overflow-hidden space-y-0.5",
              indicator && "border-l border-white/8 pl-2",
            )}
          >
            {children}
          </m.ul>
        )}
      </AnimatePresence>
    </li>
  );
}

export interface FileProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string;
  isSelectable?: boolean;
  isSelect?: boolean;
  fileIcon?: React.ReactNode;
}

export const File = forwardRef<HTMLButtonElement, FileProps>(
  (
    {
      value,
      isSelectable = true,
      isSelect,
      fileIcon,
      className,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    const { selectItem, selectedId } = useTree();
    const isSelected = isSelect ?? selectedId === value;

    return (
      <li role="treeitem" aria-selected={isSelected}>
        <button
          ref={ref}
          type="button"
          disabled={!isSelectable}
          onClick={(e) => {
            if (isSelectable) selectItem(value);
            onClick?.(e);
          }}
          className={cn(
            "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm",
            "transition-colors hover:bg-white/4",
            isSelected
              ? "bg-sky-400/10 text-white"
              : "text-slate-400 hover:text-slate-200",
            !isSelectable && "cursor-default opacity-50",
            className,
          )}
          {...props}
        >
          {fileIcon ?? (
            <FileIcon
              className={cn(
                "size-3.5 shrink-0",
                isSelected ? "text-sky-400" : "text-slate-600",
              )}
            />
          )}
          <span className="truncate font-mono text-xs">{children}</span>
          {isSelected && (
            <span className="ml-auto size-1.5 shrink-0 rounded-full bg-sky-400" />
          )}
        </button>
      </li>
    );
  },
);
File.displayName = "File";

export interface CollapseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  elements?: TreeViewElement[];
  expandAll?: boolean;
}

export function CollapseButton({ children, ...props }: CollapseButtonProps) {
  return (
    <button type="button" {...props}>
      {children}
    </button>
  );
}
