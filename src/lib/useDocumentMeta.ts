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

    const upsertMeta = (selector: string, attribute: "name" | "property", key: string, content: string) => {
      let element = document.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    const canonicalUrl = new URL(window.location.pathname, "https://vmgenglish.edu.vn").toString();
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    upsertMeta('meta[property="og:title"]', "property", "og:title", title);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    upsertMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);

    return () => {
      document.title = prevTitle;
      if (meta && prevDescription !== null) meta.setAttribute("content", prevDescription);
    };
  }, [title, description]);
}
