"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function NewShoppingListPage() {
  const router = useRouter()

  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")

  function handleGenerate() {
    router.push(
      `/shopping-list?start=${start}&end=${end}`
    )
  }

  return (
    <div className="mx-auto max-w-xl p-10">
      <h1 className="text-2xl font-semibold mb-4 text-violet-600">
        Nowa lista zakupów
      </h1>

      <div className="flex flex-col gap-4">
        <input
          type="date"
          value={start}
          onChange={e => setStart(e.target.value)}
          className="rounded border p-2"
        />

        <input
          type="date"
          value={end}
          onChange={e => setEnd(e.target.value)}
          className="rounded border p-2"
        />

        <button
          onClick={handleGenerate}
          className="rounded bg-violet-600 py-2 text-white hover:bg-violet-700"
        >
          Generuj listę
        </button>
      </div>
    </div>
  )
}
