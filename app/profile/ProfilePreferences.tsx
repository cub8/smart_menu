"use client";

import { useState } from "react";

type Tag = {
  id: number;
  name: string;
};

interface Props {
  tags: Tag[];
  initialSelected: number[];
}

export default function ProfilePreferences({ tags, initialSelected }: Props) {
  const [selected, setSelected] = useState<Set<number>>(
    new Set(initialSelected)
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function toggleTag(id: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  async function savePreferences() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tagIds: Array.from(selected) }),
      });

      if (!res.ok) {
        throw new Error("Failed to save");
      }

      setMessage("Preferencje zapisane.");
    } catch (e) {
      setMessage("Nie udało się zapisać preferencji. Spróbuj ponownie.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isSelected = selected.has(tag.id);
          return (
            <button
              key={tag.id}
              type="button"
              onClick={() => toggleTag(tag.id)}
              className={`px-3 py-1 rounded-full border text-sm transition ${
                isSelected
                  ? "bg-purple-600 text-white border-purple-700"
                  : "bg-white text-purple-800 border-purple-200 hover:bg-purple-50"
              }`}
            >
              {tag.name}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={savePreferences}
        disabled={saving}
        className="mt-2 rounded-xl border px-4 py-2 font-medium bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-60"
      >
        {saving ? "Zapisywanie..." : "Zapisz preferencje"}
      </button>

      {message && (
        <p className="text-sm text-gray-700 mt-2">
          {message}
        </p>
      )}
    </div>
  );
}