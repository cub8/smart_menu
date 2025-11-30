// funkcje pomocnicze do obsługi dat

export function getMonday(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay(); 
  const diff = (day === 0 ? -6 : 1) - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
  });
}

export function formatDateYMD(date: Date) {
  return date.toLocaleDateString("sv-SE"); // YYYY-MM-DD 
}
