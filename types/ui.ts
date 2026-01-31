// UI Component Type Definitions

import type { ReactNode, ComponentPropsWithoutRef } from "react";

// Button Types
export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

// Card Types
export type CardVariant = "default" | "elevated" | "bordered" | "interactive";

export interface CardProps extends ComponentPropsWithoutRef<"div"> {
  variant?: CardVariant;
  padding?: "none" | "sm" | "md" | "lg";
  hoverable?: boolean;
}

// Badge Types
export type BadgeVariant =
  | "default"
  | "category"
  | "difficulty"
  | "tag"
  | "status";
export type BadgeColor =
  | "gray"
  | "blue"
  | "green"
  | "yellow"
  | "red"
  | "purple"
  | "cyan";

export interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
  variant?: BadgeVariant;
  color?: BadgeColor;
  size?: "sm" | "md";
}

// Input Types
export interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

// Modal Types
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

// Toast Types
export type ToastVariant = "success" | "error" | "warning" | "info";

export interface ToastProps {
  id: string;
  variant: ToastVariant;
  message: string;
  duration?: number;
  onClose: () => void;
}

// Tabs Types
export interface TabsProps {
  defaultValue: string;
  children: ReactNode;
  className?: string;
  onChange?: (value: string) => void;
}

export interface TabTriggerProps extends ComponentPropsWithoutRef<"button"> {
  value: string;
}

export interface TabContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

// Accordion Types
export interface AccordionItemProps {
  value: string;
  trigger: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}

export interface AccordionProps {
  type?: "single" | "multiple";
  children: ReactNode;
  className?: string;
}

// Dropdown Types
export interface DropdownItem {
  label: string;
  value: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  onSelect: (value: string) => void;
  align?: "left" | "right";
}

// SearchBox Types
export interface SearchBoxProps extends Omit<InputProps, "type"> {
  onSearch?: (query: string) => void;
  showClearButton?: boolean;
}

// Spinner Types
export interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "white" | "gray";
}

// Breadcrumb Types
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}
