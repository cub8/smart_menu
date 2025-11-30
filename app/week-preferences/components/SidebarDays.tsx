// kolumna dni po lewej stronie

"use client";
import { DAYS, DAY_LABELS, Day } from "../types";

interface SidebarDaysProps {
  selectedDay: Day | null;
  onSelectDay: (day: Day) => void;
}

export default function SidebarDays({ selectedDay, onSelectDay }: SidebarDaysProps) {
  return (
    <div className="flex flex-col border-r bg-purple-50 w-32">
      {DAYS.map((day) => (
        <span
          key={day}
          onClick={() => onSelectDay(day)}
          className={`w-full p-4 text-sm cursor-pointer
            ${selectedDay === day ? "bg-purple-200 font-semibold" : "hover:bg-purple-100"}
          `}
        >
          {DAY_LABELS[day]}
        </span>
      ))}
    </div>
  );
}