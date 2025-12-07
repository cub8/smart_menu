import { useState } from 'react'
import { AlertTriangle, X } from 'lucide-react';
import { type FailedToCreate } from '../api/meal-plan-generator/services';

export default function FlashNotice({ flashNotice }: { flashNotice: FailedToCreate }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null

  const message = `Nie udało się wygenerować posiłku dla dnia ${flashNotice.weekday}, ${flashNotice.date}, typu posiłku: ${flashNotice.mealType} i preferencji: ${flashNotice.tags}`

  return (
    <div className="mx-auto my-4 w-3/4">
        <div
          role="alert"
          className="relative flex items-center justify-between p-4 text-sm font-medium text-red-100 bg-red-900 border border-red-700 rounded-lg shadow-lg"
        >
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 mr-3 text-red-300 shrink-0" />
            
            <span className="sr-only">Danger</span>
            <div>{message}</div>
          </div>

          <button
            onClick={() => setIsVisible(false)}
            aria-label="Close alert"
            className="ml-4 p-1 rounded-full text-red-200 hover:bg-red-800 transition-colors duration-150"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
    </div>
  )
}
