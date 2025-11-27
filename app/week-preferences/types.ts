// typy i stałe używane w preferencjach tygodniowych

export const DAYS: Array<
  "MONDAY" |
  "TUESDAY" |
  "WEDNESDAY" |
  "THURSDAY" |
  "FRIDAY" |
  "SATURDAY" |
  "SUNDAY"
> = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

export const DAY_LABELS: Record<(typeof DAYS)[number], string> = {
  MONDAY: "Poniedziałek",
  TUESDAY: "Wtorek",
  WEDNESDAY: "Środa",
  THURSDAY: "Czwartek",
  FRIDAY: "Piątek",
  SATURDAY: "Sobota",
  SUNDAY: "Niedziela",
};

export type Tag = {
  id: number;
  name: string;
};

export type MealType =
  | "BREAKFAST"
  | "LUNCH"
  | "DINNER";


