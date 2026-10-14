export function toCsv(rows: Record<string, unknown>[], columns: string[]): string {
  const escape = (input: unknown) => {
    let value = typeof input === "object" && input !== null ? JSON.stringify(input) : String(input ?? "");
    // Prevent spreadsheet applications executing untrusted cells as formulas.
    const prefix = [...value].findIndex(char => char.charCodeAt(0) > 32 && !/\s/.test(char));
    if ((prefix >= 0 && "=+@-".includes(value[prefix])) || /^[\t\r\n]/.test(value)) value = `'${value}`;
    return `"${value.replace(/"/g, '""')}"`;
  };
  return [columns.map(escape).join(","), ...rows.map(row => columns.map(key => escape(row[key])).join(","))].join("\r\n");
}
