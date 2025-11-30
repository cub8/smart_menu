"use client";

interface GenerateMealsHeaderProps {
  weekLabel: string;
  handlePrevWeek: () => void;
  handleNextWeek: () => void;
  onClose: () => void;
}

export default function GenerateMealsHeader({
  weekLabel,
  handlePrevWeek,
  handleNextWeek,
  onClose,
}: GenerateMealsHeaderProps) {
  return (
    <>
      {/* Tytul */}
      <div className="flex items-center justify-between border-b px-5 py-3">
        <h2 className="text-lg font-semibold text-purple-800">
          Generuj posiłki na cały tydzień według preferencji.
        </h2>

        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-gray-300 px-4 py-1.5 text-m font-medium text-gray-700 hover:bg-red-400"
        >
          X
        </button>
      </div>

      {/* Przyciski zmiany tygodnia */}
      <div className="flex items-center justify-between border-b bg-purple-50 px-5 py-2 text-sm">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrevWeek}
            className="rounded-full border border-purple-200 px-2 py-1 text-xs text-purple-700 hover:bg-purple-100"
          >
            -1 tydzień
          </button>
          <span className="font-medium text-purple-900">{weekLabel}</span>
          <button
            type="button"
            onClick={handleNextWeek}
            className="rounded-full border border-purple-200 px-2 py-1 text-xs text-purple-700 hover:bg-purple-100"
          >
            +1 tydzień
          </button>
        </div>
      </div>
    </>
  );
}
