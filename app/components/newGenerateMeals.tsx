// glowny plik komponentu do generowania posilkow na podstawie preferencji tygodniowych

"use client";
import MealsPanel from "../week-preferences/components/MealsPanel";
import SidebarDays from "../week-preferences/components/SidebarDays";
import { Day } from "../week-preferences/types";
import useWeeklyPreferences from "../week-preferences/useWeeklyPreferences";
import { useState } from "react";

interface WeeklyPreferencesModalProps {
  onClose: () => void;
}

export default function WeeklyPreferencesModal({ onClose }: WeeklyPreferencesModalProps) {
  const {
    loading,
    error,
    tags,
    selectedByDay,
    useTemplateByDay,
    weekLabel,
    weekStart,
    toggleTag,
    removeTag,
    handlePrevWeek,
    handleNextWeek,
    handleToggleTemplate,
    handleSubmit,
  } = useWeeklyPreferences(onClose);


const [selectedDay, setSelectedDay] = useState<Day | null>(null);

return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2">
    <div className="max-w-5xl w-full rounded-2xl bg-white shadow-xl">


      {/* HEADER */}
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

    {/* GLOWNY WIDOK */}
    <div className="flex">

      {/* Wybor dni */}
      <SidebarDays selectedDay={selectedDay} onSelectDay={setSelectedDay} />

      {/* Panel posilkow po prawo */}
      <MealsPanel
        selectedDay={selectedDay}
      />
        
    </div>    

      {/* Generuj */}
      <div className="flex column items-center justify-center border-t bg-gray-50 p-4">
        <button
          type="button"
          className="rounded-xl bg-purple-600 text-white hover:bg-purple-800 hover:text-gray-200 px-5 py-2 text-xl font-medium cursor-pointer"
          onClick={handleSubmit}
        >
          🪄 Generuj
        </button>
      </div>

    </div>
  </div>
);

}
