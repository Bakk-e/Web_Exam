"use client"

import { useState } from "react"
import type { MouseEvent } from "react"

import { type Task } from "@/types"

export default function Progress({tasks}: { tasks: Task[] }) {
  const [currentStateIndex, setCurrentStateIndex] = useState(0)

    if (!tasks || tasks.length === 0){
        return <div>No tasks are avalible</div>
    }
  const currentTask = tasks[currentStateIndex]
    console.log("task in progress",currentTask)

  const next = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(event)
    setCurrentStateIndex(currentStateIndex + 1)
  }

  const prev = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(event)
    setCurrentStateIndex(currentStateIndex - 1)
  }


  return (
    <footer className="mt-4 border-t-slate-300">
        {currentTask? (
            <p>{currentTask.id}</p>
        ) : (
            <p>Task not found</p>
        )}

      <button onClick={next} className="bg-purple-700 text-white">
        Forrige
      </button>
      <button onClick={prev} className="bg-teal-700 text-white">
        Neste
      </button>
    </footer>
  )
}
