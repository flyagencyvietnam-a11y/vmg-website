export function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-block w-fit text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${className || "bg-brand/10 text-brand"}`}>
      {children}
    </span>
  );
}
