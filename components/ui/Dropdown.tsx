"use client";

import { useState, useRef, useEffect, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { dropdownVariants } from "@/lib/animations/presets";
import type { DropdownItem } from "@/types/ui";

export interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  onSelect: (value: string) => void;
  selected?: string;
  align?: "left" | "right";
  className?: string;
}

export function Dropdown({
  trigger,
  items,
  onSelect,
  selected,
  align = "left",
  className,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
          e.preventDefault();
          setIsOpen(true);
          setFocusedIndex(0);
        }
        return;
      }

      switch (e.key) {
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((prev) =>
            prev < items.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (focusedIndex >= 0 && !items[focusedIndex].disabled) {
            onSelect(items[focusedIndex].value);
            setIsOpen(false);
          }
          break;
        case "Tab":
          setIsOpen(false);
          break;
      }
    },
    [isOpen, focusedIndex, items, onSelect]
  );

  const handleSelect = useCallback(
    (value: string) => {
      onSelect(value);
      setIsOpen(false);
    },
    [onSelect]
  );

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      {/* Trigger */}
      <div
        role="button"
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="cursor-pointer"
      >
        {trigger}
      </div>

      {/* Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            role="listbox"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              "absolute z-50 mt-2 min-w-[180px]",
              "bg-[var(--card)] border border-[var(--border)]",
              "rounded-lg shadow-lg overflow-hidden",
              align === "right" ? "right-0" : "left-0"
            )}
          >
            {items.map((item, index) => (
              <button
                key={item.value}
                role="option"
                aria-selected={selected === item.value}
                disabled={item.disabled}
                onClick={() => !item.disabled && handleSelect(item.value)}
                onMouseEnter={() => setFocusedIndex(index)}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 text-sm text-left",
                  "transition-colors duration-150",
                  focusedIndex === index && "bg-[var(--muted)]",
                  selected === item.value
                    ? "text-primary-600 dark:text-primary-400"
                    : "text-[var(--foreground)]",
                  item.disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                <span className="flex-1">{item.label}</span>
                {selected === item.value && (
                  <Check className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Simple select dropdown
export interface SelectProps {
  options: { label: string; value: string }[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function Select({
  options,
  value,
  onChange,
  placeholder = "Select...",
  className,
}: SelectProps) {
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <Dropdown
      trigger={
        <div
          className={cn(
            "flex items-center justify-between gap-2",
            "px-3 py-2 rounded-lg border border-[var(--border)]",
            "bg-[var(--background)] hover:border-[var(--muted-foreground)]",
            "transition-colors duration-200",
            className
          )}
        >
          <span
            className={cn(
              "text-sm",
              selectedOption ? "text-[var(--foreground)]" : "text-[var(--muted-foreground)]"
            )}
          >
            {selectedOption?.label || placeholder}
          </span>
          <svg
            className="w-4 h-4 text-[var(--muted-foreground)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      }
      items={options}
      selected={value}
      onSelect={onChange}
    />
  );
}
