export function parseDocPath(filePathStem) {
  // filePathStem: "/01-introduction/01-getting-started" | "/01-introduction/index" | "/index"
  const parts = filePathStem.split("/").filter(Boolean);
  if (parts.length < 2) return null;               // not inside a subfolder -> not a doc

  const folder = parts[0];                          // "01-introduction"
  const fileBase = parts[parts.length - 1];         // "01-getting-started" | "index"

  const folderMatch = folder.match(/^(\d+)-(.+)$/);
  if (!folderMatch) return null;                    // unnumbered folder -> not a doc section

  const fileMatch = fileBase.match(/^(\d+)-(.+)$/); // index.md won't match
  return {
    folder,
    categorySlug: folderMatch[2],                   // "introduction"
    categoryOrder: Number(folderMatch[1]),          // 1
    isIndex: fileBase === "index",
    fileSlug: fileMatch ? fileMatch[2] : fileBase,  // "getting-started"
    fileOrder: fileMatch ? Number(fileMatch[1]) : 0,
  };
}

// Prev/next within the current page's OWN category, so "next" never
// crosses into the following section.
export function neighborsInCategory(data) {
  const meta = parseDocPath(data.page.filePathStem);
  if (!meta || meta.isIndex) return { prev: null, next: null };
  const inCategory = (data.collections.docs || []).filter(
    (d) => parseDocPath(d.page.filePathStem)?.categorySlug === meta.categorySlug
  );
  const i = inCategory.findIndex((d) => d.page.inputPath === data.page.inputPath);
  return {
    prev: i > 0 ? inCategory[i - 1] : null,
    next: i >= 0 && i < inCategory.length - 1 ? inCategory[i + 1] : null,
  };
}


export function humanize(slug) {
  return slug.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
}
