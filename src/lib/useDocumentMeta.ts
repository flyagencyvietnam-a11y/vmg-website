import { useEffect } from "react";

// Per-page <title> + meta description, per CLAUDE.md §7 SEO requirement.
// No react-helmet dependency in this project - plain DOM mutation is enough
// since these are static per-mount values, not something that needs to diff/batch.
export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    let meta = document.querySelector('meta[name="description"]');
    const prevDescription = meta?.getAttribute("content") ?? null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);

    return () => {
      document.title = prevTitle;
      if (meta && prevDescription !== null) meta.setAttribute("content", prevDescription);
    };
  }, [title, description]);
}
