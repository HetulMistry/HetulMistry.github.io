import { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  action: () => void;
  section: "navigation" | "actions" | "links";
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  items: CommandItem[];
}

export function CommandPalette({
  isOpen,
  onClose,
  items,
}: CommandPaletteProps) {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredItems = items.filter(
    (item) =>
      item.label.toLowerCase().includes(search.toLowerCase()) ||
      (item.description &&
        item.description.toLowerCase().includes(search.toLowerCase())),
  );

  // Reset selection when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((i) => (i < filteredItems.length - 1 ? i + 1 : i));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((i) => (i > 0 ? i - 1 : i));
          break;
        case "Enter":
          e.preventDefault();
          if (filteredItems[selectedIndex]) {
            filteredItems[selectedIndex].action();
            setSearch("");
            onClose();
          }
          break;
        case "Escape":
          e.preventDefault();
          setSearch("");
          onClose();
          break;
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[role="dialog"]') === null) {
        setSearch("");
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  // Group items by section
  const groupedItems = filteredItems.reduce(
    (acc, item) => {
      const section = item.section;
      if (!acc[section]) acc[section] = [];
      acc[section].push(item);
      return acc;
    },
    {} as Record<string, CommandItem[]>,
  );

  const sectionOrder: Array<"navigation" | "actions" | "links"> = [
    "navigation",
    "actions",
    "links",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSearch("");
              onClose();
            }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <m.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed left-1/2 top-20 z-50 w-full max-w-2xl -translate-x-1/2"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-hidden rounded-lg border border-white/8 bg-dark-900/95 shadow-2xl backdrop-blur">
              {/* Search Input */}
              <div className="border-b border-white/8 px-4 py-3">
                <div className="flex items-center gap-3">
                  <Search size={18} className="text-slate-600" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search commands, projects, or actions..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 bg-transparent text-sm text-white placeholder-slate-600 outline-none"
                  />
                  <div className="flex gap-1 text-xs text-slate-600">
                    <kbd className="rounded border border-white/8 bg-white/4 px-1.5 py-0.5">
                      ↑↓
                    </kbd>
                    <kbd className="rounded border border-white/8 bg-white/4 px-1.5 py-0.5">
                      Enter
                    </kbd>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="max-h-96 overflow-y-auto">
                {filteredItems.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-slate-600">
                    No commands found.
                  </div>
                ) : (
                  <>
                    {sectionOrder.map((sectionKey) => {
                      const sectionItems = groupedItems[sectionKey];
                      if (!sectionItems) return null;

                      const sectionLabels = {
                        navigation: "Navigate",
                        actions: "Actions",
                        links: "Links",
                      };

                      return (
                        <div key={sectionKey}>
                          <div className="border-b border-white/5 px-4 py-2 text-xs font-semibold text-slate-600 uppercase tracking-wide">
                            {sectionLabels[sectionKey]}
                          </div>
                          <div className="px-2 py-2">
                            {sectionItems.map((item) => {
                              const itemIndex = filteredItems.indexOf(item);
                              const isSelected = selectedIndex === itemIndex;

                              return (
                                <m.button
                                  key={item.id}
                                  onClick={() => {
                                    item.action();
                                    onClose();
                                  }}
                                  className={`w-full text-left rounded-md px-3 py-2.5 text-sm transition-colors duration-75 ${
                                    isSelected
                                      ? "bg-white/8 text-white"
                                      : "text-slate-400 hover:bg-white/4 hover:text-white"
                                  }`}
                                  whileHover={{
                                    backgroundColor: "rgba(255,255,255,0.04)",
                                  }}
                                  whileTap={{ scale: 0.99 }}
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0 flex-1">
                                      <div className="font-medium text-white">
                                        {item.label}
                                      </div>
                                      {item.description && (
                                        <div className="mt-0.5 text-xs text-slate-600">
                                          {item.description}
                                        </div>
                                      )}
                                    </div>
                                    {item.icon && (
                                      <div className="shrink-0 text-slate-600">
                                        {item.icon}
                                      </div>
                                    )}
                                  </div>
                                </m.button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>

              {/* Footer Hint */}
              <div className="border-t border-white/5 bg-white/2 px-4 py-2.5 text-center text-xs text-slate-700">
                Use <kbd className="rounded bg-white/8 px-1 py-0.5">↑↓</kbd> to
                navigate,{" "}
                <kbd className="rounded bg-white/8 px-1 py-0.5">Enter</kbd> to
                select,{" "}
                <kbd className="rounded bg-white/8 px-1 py-0.5">Esc</kbd> to
                close
              </div>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
