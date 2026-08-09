const ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/** Escapa texto do catálogo antes de interpolar em HTML/atributos. */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, char => ESCAPE_MAP[char] ?? char);
}
