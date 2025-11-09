export type MealType = "breakfast" | "lunch" | "dinner";

export interface Meal {
  id: string;
  name: string;
  date: string;
  type: MealType;
  ingredients: string[];
  tags?: string[]; // ? - opcjonalne
}
