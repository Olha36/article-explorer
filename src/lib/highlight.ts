export function highlight(text: string, keywords: string[]) {
  if (!keywords.length) return text;

  const escaped = keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  const pattern = new RegExp(`(${escaped.join("|")})`, "gi");

  return text.replace(pattern, "<mark>$1</mark>");
}
