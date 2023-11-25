"use client"

import {useEffect, useState} from "react"
import type { MouseEvent } from "react"

import { type Task as TaskType} from "@/types"
import {state} from "sucrase/dist/types/parser/traverser/base";
import tasks from "@/components/Tasks";


export default function Progress(props: { tasks: TaskType[], onStateChange : (newState : number) => void }) {
  const [currentStateIndex, setCurrentStateIndex] = useState(0)
    const currentTask = props.tasks[currentStateIndex]

    useEffect(() => {
        props.onStateChange(currentStateIndex)
    }, [currentStateIndex])


  const next = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      if (currentStateIndex < props.tasks.length -1){
        setCurrentStateIndex(currentStateIndex + 1)
      }
  }

  const prev = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      if (currentStateIndex > 0){
          setCurrentStateIndex(currentStateIndex - 1)
      }
  }

    if (!props.tasks || props.tasks.length === 0){
        return <div>No tasks are available</div>
    }


  return (
    <footer className="mt-4 border-t-slate-300">
        {currentTask? (
            <p>{currentTask.id}</p>
        ) : (
            <p>Task not found</p>
        )}

      <button onClick={prev} className="bg-purple-700 text-white">
        Forrige
      </button>
      <button onClick={next} className="bg-teal-700 text-white">
        Neste
      </button>

        <p></p>
    </footer>
  )
}
