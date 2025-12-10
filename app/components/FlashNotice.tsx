"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { type FailedToCreate } from "../api/meal-plan-generator/services";

type Props = {
  flashNotice: FailedToCreate | null;
};

export default function FlashNotice({ flashNotice }: Props) {
  const [isVisible, setIsVisible] = useState<boolean>(!!flashNotice);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (!flashNotice) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);
    setIsFadingOut(false);
    const timer = setTimeout(() => {
      startFadeOut();
    }, 4000);

    return () => clearTimeout(timer);
  }, [flashNotice]);

  const startFadeOut = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 1200);
  };

  if (!flashNotice || !isVisible) return null;

  const message = `Nie udało się wygenerować posiłku dla dnia ${flashNotice.weekday}, ${flashNotice.date}, typu posiłku: ${flashNotice.mealType} i preferencji: ${flashNotice.tags}`;

  return (
    <div
      className={`
        mx-auto my-4 w-3/4
        transition-opacity duration-[1200ms] 
        ${isFadingOut ? "opacity-0" : "opacity-100"}
      `}
    >
      <div
        role="alert"
        className="relative flex items-center justify-between p-4 text-sm font-medium text-red-100 bg-red-900 border border-red-700 rounded-lg shadow-lg"
      >
        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 mr-3 text-red-300 shrink-0" />
          <div>{message}</div>
        </div>

        <button
          onClick={startFadeOut}
          aria-label="Close alert"
          className="ml-4 p-1 rounded-full text-red-200 hover:bg-red-800 transition-colors duration-150"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
