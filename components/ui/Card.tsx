"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { cardInteraction } from "@/lib/animations/interactionAnimations";
import type { CardVariant } from "@/types/ui";

export interface CardProps extends HTMLMotionProps<"div"> {
  variant?: CardVariant;
  padding?: "none" | "sm" | "md" | "lg";
  hoverable?: boolean;
  as?: "div" | "article" | "section";
}

const variantStyles: Record<CardVariant, string> = {
  default: "bg-[var(--card)] border border-[var(--border)]",
  elevated: "bg-[var(--card)] shadow-md",
  bordered: "bg-transparent border-2 border-[var(--border)]",
  interactive:
    "bg-[var(--card)] border border-[var(--border)] cursor-pointer",
};

const paddingStyles: Record<string, string> = {
  none: "",
  sm: "p-3",
  md: "p-4 md:p-5",
  lg: "p-6 md:p-8",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "default",
      padding = "md",
      hoverable = false,
      as: Component = "div",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const MotionComponent = motion[Component];

    return (
      <MotionComponent
        ref={ref}
        className={cn(
          "rounded-xl",
          "text-[var(--card-foreground)]",
          variantStyles[variant],
          paddingStyles[padding],
          className
        )}
        {...(hoverable && cardInteraction)}
        {...props}
      >
        {children}
      </MotionComponent>
    );
  }
);

Card.displayName = "Card";

// Card Header
export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5", className)}
      {...props}
    />
  )
);

CardHeader.displayName = "CardHeader";

// Card Title
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ as: Component = "h3", className, ...props }, ref) => (
    <Component
      ref={ref}
      className={cn("text-xl font-semibold leading-tight tracking-tight", className)}
      {...props}
    />
  )
);

CardTitle.displayName = "CardTitle";

// Card Description
export type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-[var(--muted-foreground)]", className)}
      {...props}
    />
  )
);

CardDescription.displayName = "CardDescription";

// Card Content
export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("pt-4", className)} {...props} />
  )
);

CardContent.displayName = "CardContent";

// Card Footer
export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center pt-4", className)}
      {...props}
    />
  )
);

CardFooter.displayName = "CardFooter";
