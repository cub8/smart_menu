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

export type Day = (typeof DAYS)[number];

export type Tag = {
  id: number;
  name: string;
};

export const MEAL_LABELS = {
  BREAKFAST: "Śniadanie",
  LUNCH: "Obiad",
  DINNER: "Kolacja",
  DESSERT: "Deser",
} as const;

export type MealType = keyof typeof MEAL_LABELS;

export const MEALS: MealType[] = Object.keys(MEAL_LABELS) as MealType[];


