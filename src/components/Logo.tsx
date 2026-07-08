import vmgLogo from "../assets/vmg-logo.png";

export function Logo({ variant = "dark", className = "h-14" }: { variant?: "dark" | "light"; className?: string }) {
  return (
    <img
      src={vmgLogo}
      alt="VMG English"
      className={`${className} w-auto object-contain ${variant === "light" ? "brightness-0 invert" : ""}`}
    />
  );
}
