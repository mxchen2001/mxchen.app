/** Normalize "2024", "2024-03", "2024-03-15" → sortable "2024-03-15" */
export function normalizeDate(d: string): string {
  const parts = d.split("-");
  const y = parts[0];
  const m = parts[1] ?? "01";
  const day = parts[2] ?? "01";
  return `${y}-${m.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

/** Extract year string from a date */
export function dateYear(d: string): string {
  return d.split("-")[0];
}
