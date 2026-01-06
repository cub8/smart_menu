"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function NewShoppingListPage() {
  const router = useRouter()
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")

  async function handleGenerate() {
    if (!start || !end) {
      alert("Wybierz zarówno datę początkową, jak i końcową")
      return
    }

    try {
      const res = await fetch("/api/shopping-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ start, end }),
        cache: "no-store",
      })

      if (!res.ok) {
        throw new Error("Nie udało się wygenerować listy zakupów")
      }

      router.push("/shopping-list")
    } catch (err) {
      console.error(err)
      alert("Wystąpił błąd przy tworzeniu listy zakupów")
    }
  }

  return (
    <div className="mx-auto max-w-xl p-10">
      <h1 className="text-2xl font-semibold mb-4 text-violet-600">
        Nowa lista zakupów
      </h1>

      {/* Proste wprowadzanie dat*/}
      <div className="flex flex-col gap-4 border p-4 rounded-lg">
        <input
          type="date"
          value={start}
          onChange={e => setStart(e.target.value)}
        />
        <input
          type="date"
          value={end}
          onChange={e => setEnd(e.target.value)}
        />

        <button onClick={handleGenerate}>
          Generuj listę
        </button>
      </div>
    </div>
  )
}
