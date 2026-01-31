"use client";

import { forwardRef, useState, useCallback } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { SearchBoxProps } from "@/types/ui";

export const SearchBox = forwardRef<HTMLInputElement, SearchBoxProps>(
  (
    {
      onSearch,
      showClearButton = true,
      placeholder = "Search...",
      className,
      value: controlledValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState("");
    const value = controlledValue !== undefined ? String(controlledValue) : internalValue;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (controlledValue === undefined) {
          setInternalValue(newValue);
        }
        onChange?.(e);
        onSearch?.(newValue);
      },
      [controlledValue, onChange, onSearch]
    );

    const handleClear = useCallback(() => {
      if (controlledValue === undefined) {
        setInternalValue("");
      }
      // Create a synthetic event for onChange
      const syntheticEvent = {
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(syntheticEvent);
      onSearch?.("");
    }, [controlledValue, onChange, onSearch]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Escape") {
          handleClear();
        }
      },
      [handleClear]
    );

    return (
      <div className={cn("relative", className)}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
        <input
          ref={ref}
          type="search"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-lg border bg-[var(--background)]",
            "pl-10 pr-10 py-2.5 text-base",
            "placeholder:text-[var(--muted-foreground)]",
            "transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
            "border-[var(--border)] hover:border-[var(--muted-foreground)]",
            // Hide default search cancel button
            "[&::-webkit-search-cancel-button]:hidden"
          )}
          {...props}
        />
        {showClearButton && value && (
          <button
            type="button"
            onClick={handleClear}
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2",
              "p-0.5 rounded-full",
              "text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
              "hover:bg-[var(--muted)]",
              "transition-colors duration-150"
            )}
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }
);

SearchBox.displayName = "SearchBox";
