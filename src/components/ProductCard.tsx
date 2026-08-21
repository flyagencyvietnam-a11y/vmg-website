import { ArrowUpRight } from "lucide-react";
import { FORMAT_LABEL, type Product } from "../data/products";
import { getProductVisual } from "../data/productVisuals";

export function ProductCard({ p, basePath = "/hoc-online" }: { p: Product; basePath?: string }) {
  const visual = getProductVisual(p.code);
  return (
    <a href={`${basePath}/${p.slug}`} className="editorial-card group relative isolate aspect-[3/4] overflow-hidden rounded-3xl bg-neutral-900 shadow-lg shadow-black/10 transition duration-500 hover:-translate-y-2 hover:shadow-2xl">
      <img
        src={visual.src}
        alt={visual.alt}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
        style={{ objectPosition: visual.position ?? "center" }}
        loading="lazy"
      />
      <div
        className="absolute inset-0 mix-blend-multiply"
        style={{ backgroundImage: `linear-gradient(to bottom, transparent 42%, color-mix(in srgb, ${visual.tint} 45%, transparent) 62%, ${visual.tint} 82%, color-mix(in srgb, ${visual.tint} 82%, black) 100%)` }}
      />
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full border border-white/25 bg-white/10 transition duration-500 group-hover:scale-150" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10" />
      <div className="relative flex h-full flex-col justify-between p-5 text-white">
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full border border-white/25 bg-black/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur">{FORMAT_LABEL[p.format]}</span>
          <span className="grid h-9 w-9 place-items-center rounded-full border border-white/25 bg-white/10 text-xs font-display font-extrabold backdrop-blur">{p.code}</span>
        </div>
        <div>
          <h3 className="max-w-[90%] text-xl font-display font-extrabold leading-tight">{p.name}</h3>
          <p className="mt-2 text-sm leading-5 text-white/85">{p.desc}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold">Khám phá <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
        </div>
      </div>
    </a>
  );
}
