"use client"

import {useEffect, useState} from "react"
import type { MouseEvent } from "react"

import { type Task as TaskType, StateProps, ProgressProps} from "@/types"




export default function Progress({ tasks, currentStateIndex, setCurrentState, onSubmit} : ProgressProps) {
    const [complete, setComplete] = useState(false)
   const currentTask = tasks[currentStateIndex]
    const isLastTask = currentStateIndex === tasks.length -1



  const next = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()

      if (!isLastTask ){
         setCurrentState(currentStateIndex +1)
      }else {
          onSubmit()
      }
  }

  const prev = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      if (currentStateIndex  > 0){
          setCurrentState(currentStateIndex - 1)
      }
  }

    if (!tasks || tasks.length === 0){
        return <div>No tasks are available</div>
    }

  return (
    <footer className="mt-4 border-t-slate-300">
        {currentTask? (
            <p>{}</p>
        ) : (
            <p>Task not found</p>
        )}

        {<button onClick={prev} className="bg-purple-700 text-white">
        Forrige
      </button>}
        <button onClick={next} className="bg-teal-700 text-white">
            {isLastTask ? "Send inn" : "Neste"}
      </button>
    </footer>
  )
}
