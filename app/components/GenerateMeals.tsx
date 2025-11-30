// glowny plik komponentu do generowania posilkow na podstawie preferencji tygodniowych

"use client";
import useWeeklyPreferences from "../week-preferences/useWeeklyPreferences"; //hook
import { useState } from "react";
import { Day } from "../week-preferences/types";
import GenerateMealsHeader from "../week-preferences/components/GenerateMealsHeader";
import SidebarDays from "../week-preferences/components/SidebarDays";
import MealsPanel from "../week-preferences/components/MealsPanel";

interface GenerateMealsProps {
  onClose: () => void;
}

// pobieranie stanu z hooka i przekazywanie do komponentow
export default function GenerateMeals({ onClose }: GenerateMealsProps) {
  const {
    loading,
    error,
    tags,
    selectedByMeal,
    useTemplateByDay,
    weekLabel,
    handlePrevWeek,
    handleNextWeek,
    handleToggleTemplate,
    toggleTag,
    removeTag,
    handleSubmit,
  } = useWeeklyPreferences(onClose);

  const [selectedDay, setSelectedDay] = useState<Day | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2">
      <div className="max-w-5xl w-full rounded-2xl bg-white shadow-xl">
        <GenerateMealsHeader
          weekLabel={weekLabel}
          handlePrevWeek={handlePrevWeek}
          handleNextWeek={handleNextWeek}
          onClose={onClose}
        />

        <div className="flex">
          <SidebarDays
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
          />

          <MealsPanel
            loading={loading}
            error={error} 
            selectedDay={selectedDay} 
            tags={tags}
            selectedByMeal={selectedByMeal}
            toggleTag={toggleTag}
            removeTag={removeTag}
            useTemplateByDay={useTemplateByDay}
            handleToggleTemplate={handleToggleTemplate}
          />
        </div>    

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
