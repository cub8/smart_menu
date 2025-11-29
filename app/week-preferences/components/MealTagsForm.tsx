// formularz do edycji tagow posilkow dla danego dnia

"use client";

import type { Day, Tag } from "../types";

interface MealTagsFormProps {
  day: Day;
  tags: Tag[];
  selectedTags: Set<number>;
  toggleTag: (day: Day, tagId: number) => void;
  removeTag: (day: Day, tagId: number) => void;
}

export default function MealTagsForm({
  day,
  tags,
  selectedTags,
  toggleTag,
  removeTag,
}: MealTagsFormProps) {
  return (
    <div className="mt-4 flex flex-col gap-2">

      {/* wyswietlanie wybranych tagow */}
      {Array.from(selectedTags).map((tagId) => {
        const tag = tags.find((t) => t.id === tagId);
        if (!tag) return null;
        return (
          <div
            key={tagId}
            className="flex items-center justify-between rounded-lg bg-white px-3 py-1 text-xs shadow-sm"
          >
            <span className="text-purple-900">{tag.name}</span>
            <button
              type="button"
              onClick={() => removeTag(day, tagId)}
              className="ml-2 text-[10px] text-red-500 hover:text-red-700 cursor-pointer"
            >
              Usuń
            </button>
          </div>
        );
      })}

      {/* Dodawanie/edycja tagów */}
      <div className="mt-1">
        <div className="mb-1 text-[11px] font-medium text-purple-700">
          Dodaj/edytuj tagi
        </div>
        <div className="max-h-28 space-y-1 overflow-y-auto rounded-lg border border-purple-200 bg-white p-1">
          {tags.map((tag) => {
            const isSelected = selectedTags.has(tag.id);
            return (
              <button
                key={tag.id}
                type="button"
                onClick={() => toggleTag(day, tag.id)}
                className={`flex w-full items-center justify-between rounded px-2 py-1 text-[11px] text-left transition cursor-pointer ${
                  isSelected
                    ? "bg-purple-600 text-white"
                    : "bg-purple-50 hover:bg-purple-100 text-purple-900"
                }`}
              >
                <span>{tag.name}</span>
                {isSelected && <span className="text-[9px]">✓</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
