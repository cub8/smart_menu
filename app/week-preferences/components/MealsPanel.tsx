"use client";

interface MealsPanelProps {
  selectedDay: string | null;
}

export default function MealsPanel({ selectedDay }: MealsPanelProps) {
  if (!selectedDay) {
    return (
      <div className="flex flex-1 justify-center items-center p-4">
        <p className="text-gray-500 text-m">
          Wybierz dzień, aby przypisać preferencje.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col p-4">
      <div className="flex gap-3">
        {["Śniadanie", "Obiad", "Kolacja", "Deser"].map((meal) => (
          <button
            key={meal}
            className="px-4 py-2 bg-purple-100 text-purple-900 rounded-3xl hover:bg-purple-200"
          >
            {meal}
          </button>
        ))}
      </div>
    </div>
  );
}