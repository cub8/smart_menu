"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MealType } from "@/app/generated/prisma/enums";

interface Tag {
  id: number;
  name: string;
}

interface Props {
  tags: Tag[];
}

const mealTypeLabels: Record<MealType, string> = {
  BREAKFAST: "Śniadanie",
  LUNCH: "Obiad",
  DINNER: "Kolacja",
  DESSERT: "Deser",
};

export default function NewMealForm({ tags }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState<{ name: string; amount: string }[]>([
    { name: "", amount: "" },
  ]);
  const [recipeSteps, setRecipeSteps] = useState<string[]>([""]);
  const [selectedMealTypes, setSelectedMealTypes] = useState<MealType[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "" }]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index: number, field: "name" | "amount", value: string) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  const addRecipeStep = () => {
    setRecipeSteps([...recipeSteps, ""]);
  };

  const removeRecipeStep = (index: number) => {
    setRecipeSteps(recipeSteps.filter((_, i) => i !== index));
  };

  const updateRecipeStep = (index: number, value: string) => {
    const updated = [...recipeSteps];
    updated[index] = value;
    setRecipeSteps(updated);
  };

  const toggleMealType = (mealType: MealType) => {
    if (selectedMealTypes.includes(mealType)) {
      setSelectedMealTypes(selectedMealTypes.filter((t) => t !== mealType));
    } else {
      setSelectedMealTypes([...selectedMealTypes, mealType]);
    }
  };

  const toggleTag = (tagId: number) => {
    if (selectedTagIds.includes(tagId)) {
      setSelectedTagIds(selectedTagIds.filter((id) => id !== tagId));
    } else {
      setSelectedTagIds([...selectedTagIds, tagId]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Nazwa posiłku jest wymagana");
      return;
    }

    if (selectedMealTypes.length === 0) {
      setError("Wybierz przynajmniej jeden typ posiłku");
      return;
    }

    const validIngredients = ingredients.filter(
      (ing) => ing.name.trim() && ing.amount.trim()
    );

    if (validIngredients.length === 0) {
      setError("Dodaj przynajmniej jeden składnik");
      return;
    }

    const ingredientsObj: Record<string, number> = {};
    for (const ing of validIngredients) {
      const amount = parseFloat(ing.amount);
      if (isNaN(amount) || amount <= 0) {
        setError(`Nieprawidłowa ilość dla składnika: ${ing.name}`);
        return;
      }
      ingredientsObj[ing.name.trim()] = amount;
    }

    const validRecipeSteps = recipeSteps.filter((step) => step.trim());

    setLoading(true);

    try {
      const res = await fetch("/api/meals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim() || undefined,
          ingredients: ingredientsObj,
          recipe: validRecipeSteps.length > 0 ? validRecipeSteps : undefined,
          suggestedMealType: selectedMealTypes,
          tagIds: selectedTagIds,
        }),
      });

      if (res.ok) {
        router.push("/meals");
      } else {
        const data = await res.json();
        setError(data.error || "Nie udało się dodać posiłku");
      }
    } catch (err) {
      console.error("Error submitting meal:", err);
      setError("Wystąpił błąd podczas dodawania posiłku");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-lg border border-red-800 bg-red-900/20 p-4 text-red-300">
          {error}
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-zinc-200 mb-2">
          Nazwa posiłku <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900/60 px-4 py-2 text-zinc-100 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          placeholder="np. Spaghetti Carbonara"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-zinc-200 mb-2">
          Opis
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900/60 px-4 py-2 text-zinc-100 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          placeholder="Krótki opis posiłku..."
          rows={3}
        />
      </div>

      {/* Meal Types */}
      <div>
        <label className="block text-sm font-medium text-zinc-200 mb-2">
          Typ posiłku <span className="text-red-400">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(mealTypeLabels).map(([type, label]) => (
            <button
              key={type}
              type="button"
              onClick={() => toggleMealType(type as MealType)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedMealTypes.includes(type as MealType)
                  ? "bg-purple-600 text-white border-2 border-purple-500"
                  : "bg-zinc-800 text-zinc-300 border-2 border-zinc-700 hover:bg-zinc-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-zinc-200 mb-2">Tagi</label>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => toggleTag(tag.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedTagIds.includes(tag.id)
                  ? "bg-emerald-600 text-white border border-emerald-500"
                  : "bg-zinc-800 text-zinc-400 border border-zinc-700 hover:bg-zinc-700"
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>

      {/* Ingredients */}
      <div>
        <label className="block text-sm font-medium text-zinc-200 mb-2">
          Składniki <span className="text-red-400">*</span>
        </label>
        <div className="space-y-2">
          {ingredients.map((ing, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={ing.name}
                onChange={(e) => updateIngredient(index, "name", e.target.value)}
                className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900/60 px-4 py-2 text-zinc-100 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                placeholder="Nazwa składnika"
              />
              <input
                type="number"
                step="0.1"
                value={ing.amount}
                onChange={(e) => updateIngredient(index, "amount", e.target.value)}
                className="w-32 rounded-lg border border-zinc-700 bg-zinc-900/60 px-4 py-2 text-zinc-100 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                placeholder="g"
              />
              {ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="px-3 py-2 rounded-lg bg-red-900/40 text-red-300 hover:bg-red-900/60 transition-colors"
                >
                  Usuń
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addIngredient}
          className="mt-2 px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors text-sm"
        >
          + Dodaj składnik
        </button>
      </div>

      {/* Recipe */}
      <div>
        <label className="block text-sm font-medium text-zinc-200 mb-2">
          Przepis (kroki)
        </label>
        <div className="space-y-2">
          {recipeSteps.map((step, index) => (
            <div key={index} className="flex gap-2 items-start">
              <span className="text-zinc-400 text-sm mt-2 w-8">{index + 1}.</span>
              <textarea
                value={step}
                onChange={(e) => updateRecipeStep(index, e.target.value)}
                className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900/60 px-4 py-2 text-zinc-100 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                placeholder={`Krok ${index + 1}`}
                rows={2}
              />
              {recipeSteps.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRecipeStep(index)}
                  className="px-3 py-2 rounded-lg bg-red-900/40 text-red-300 hover:bg-red-900/60 transition-colors"
                >
                  Usuń
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addRecipeStep}
          className="mt-2 px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors text-sm"
        >
          + Dodaj krok
        </button>
      </div>

      {/* Submit */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Dodawanie..." : "Dodaj posiłek"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/meals")}
          className="px-6 py-3 rounded-lg bg-zinc-800 text-zinc-300 font-medium hover:bg-zinc-700 transition-colors"
        >
          Anuluj
        </button>
      </div>
    </form>
  );
}
