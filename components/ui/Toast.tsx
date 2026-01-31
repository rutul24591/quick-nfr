"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { toastVariants } from "@/lib/animations/presets";
import type { ToastVariant } from "@/types/ui";

// Toast item interface
interface ToastItem {
  id: string;
  variant: ToastVariant;
  message: string;
  duration?: number;
}

// Context
interface ToastContextValue {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, "id">) => string;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

// Toast Provider
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((toast: Omit<ToastItem, "id">) => {
    const id = Math.random().toString(36).slice(2, 11);
    setToasts((prev) => [...prev, { ...toast, id }]);

    // Auto-remove after duration
    const duration = toast.duration ?? 5000;
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

// Toast Container (renders in portal)
function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (typeof window === "undefined") {
    return null;
  }

  return createPortal(
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
}

// Single Toast Component
const variantStyles: Record<ToastVariant, { bg: string; icon: typeof CheckCircle }> = {
  success: {
    bg: "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800",
    icon: CheckCircle,
  },
  error: {
    bg: "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800",
    icon: AlertCircle,
  },
  warning: {
    bg: "bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800",
    icon: AlertTriangle,
  },
  info: {
    bg: "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800",
    icon: Info,
  },
};

const iconColorStyles: Record<ToastVariant, string> = {
  success: "text-green-600 dark:text-green-400",
  error: "text-red-600 dark:text-red-400",
  warning: "text-yellow-600 dark:text-yellow-400",
  info: "text-blue-600 dark:text-blue-400",
};

interface ToastProps extends ToastItem {
  onClose: () => void;
}

function Toast({ variant, message, onClose }: ToastProps) {
  const { bg, icon: Icon } = variantStyles[variant];

  return (
    <motion.div
      variants={toastVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg border shadow-lg",
        "pointer-events-auto",
        bg
      )}
      role="alert"
    >
      <Icon className={cn("w-5 h-5 flex-shrink-0 mt-0.5", iconColorStyles[variant])} />
      <p className="flex-1 text-sm text-[var(--foreground)]">{message}</p>
      <button
        type="button"
        onClick={onClose}
        className={cn(
          "flex-shrink-0 p-1 rounded",
          "text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
          "transition-colors duration-150"
        )}
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

// Helper hooks for common toast types
export function useSuccessToast() {
  const { addToast } = useToast();
  return useCallback(
    (message: string, duration?: number) =>
      addToast({ variant: "success", message, duration }),
    [addToast]
  );
}

export function useErrorToast() {
  const { addToast } = useToast();
  return useCallback(
    (message: string, duration?: number) =>
      addToast({ variant: "error", message, duration }),
    [addToast]
  );
}

export function useInfoToast() {
  const { addToast } = useToast();
  return useCallback(
    (message: string, duration?: number) =>
      addToast({ variant: "info", message, duration }),
    [addToast]
  );
}
