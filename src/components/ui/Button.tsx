import { type ComponentPropsWithoutRef, type ElementType } from "react";

type Variant = "primary" | "outline" | "ghost" | "dark";
type Size = "sm" | "md";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  outline: "bg-white border-2 border-brand text-brand hover:bg-brand hover:text-white",
  ghost: "bg-white/15 text-white hover:bg-white/25",
  dark: "bg-plum text-white hover:bg-plum/90",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
};

// Design rule (VMG Website Design System v1): every button is a pill (rounded-full).
// No square or lightly-rounded buttons anywhere on the site.
type ButtonProps<T extends ElementType> = {
  as?: T;
  variant?: Variant;
  size?: Size;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

export function Button<T extends ElementType = "button">({
  as, variant = "primary", size = "md", className = "", ...props
}: ButtonProps<T>) {
  const Component = as || "button";
  return (
    <Component
      className={`inline-flex items-center justify-center gap-2 rounded-full font-bold transition-colors disabled:opacity-60 ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
      {...props}
    />
  );
}
