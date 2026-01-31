"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { accordionVariants } from "@/lib/animations/presets";

// Context for Accordion
interface AccordionContextValue {
  type: "single" | "multiple";
  openItems: string[];
  toggleItem: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion compound components must be used within Accordion.Root");
  }
  return context;
}

// Context for individual item
interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

function useAccordionItemContext() {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error("AccordionTrigger/Content must be used within Accordion.Item");
  }
  return context;
}

// Accordion Root
export interface AccordionRootProps {
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  children: ReactNode;
  className?: string;
}

function AccordionRoot({
  type = "single",
  defaultValue,
  children,
  className,
}: AccordionRootProps) {
  const [openItems, setOpenItems] = useState<string[]>(() => {
    if (!defaultValue) return [];
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  });

  const toggleItem = useCallback(
    (value: string) => {
      setOpenItems((prev) => {
        if (type === "single") {
          return prev.includes(value) ? [] : [value];
        }
        return prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value];
      });
    },
    [type]
  );

  return (
    <AccordionContext.Provider value={{ type, openItems, toggleItem }}>
      <div className={cn("divide-y divide-[var(--border)]", className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

// Accordion Item
export interface AccordionItemProps {
  value: string;
  children: ReactNode;
  className?: string;
}

function AccordionItem({ value, children, className }: AccordionItemProps) {
  const { openItems } = useAccordionContext();
  const isOpen = openItems.includes(value);

  return (
    <AccordionItemContext.Provider value={{ value, isOpen }}>
      <div className={cn("py-2", className)}>{children}</div>
    </AccordionItemContext.Provider>
  );
}

// Accordion Trigger
export interface AccordionTriggerProps {
  children: ReactNode;
  className?: string;
}

function AccordionTrigger({ children, className }: AccordionTriggerProps) {
  const { toggleItem } = useAccordionContext();
  const { value, isOpen } = useAccordionItemContext();

  return (
    <button
      type="button"
      onClick={() => toggleItem(value)}
      aria-expanded={isOpen}
      aria-controls={`accordion-content-${value}`}
      className={cn(
        "flex w-full items-center justify-between py-3 text-left",
        "font-medium text-[var(--foreground)]",
        "transition-colors duration-200",
        "hover:text-primary-600 dark:hover:text-primary-400",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
        className
      )}
    >
      {children}
      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className="ml-2 flex-shrink-0"
      >
        <ChevronDown className="w-5 h-5" />
      </motion.span>
    </button>
  );
}

// Accordion Content
export interface AccordionContentProps {
  children: ReactNode;
  className?: string;
}

function AccordionContent({ children, className }: AccordionContentProps) {
  const { value, isOpen } = useAccordionItemContext();

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          id={`accordion-content-${value}`}
          role="region"
          aria-labelledby={`accordion-trigger-${value}`}
          initial="collapsed"
          animate="expanded"
          exit="collapsed"
          variants={accordionVariants}
          className="overflow-hidden"
        >
          <div className={cn("pb-4 text-[var(--muted-foreground)]", className)}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Export as compound component
export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
};
