"use client"

import {useEffect, useState} from "react"
import type { MouseEvent } from "react"

import { type Task as TaskType } from "@/types"
import Task from "@/components/Task";

export default function Progress(props: { tasks: TaskType[], onStateChange : (newState : number) => void }) {
  const [state, setState] = useState(0)
  const currentTask = props.tasks[state]

    useEffect(() => {
        props.onStateChange(state)
    }, [state])

  const next = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      if (state < props.tasks.length -1){
          setState(state + 1)
      }
  }

  const prev = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      if (state > 0){
          setState(state - 1)
      }
  }

  if (!props.tasks || props.tasks.length === 0){
      return <p>Ingen tilgjenlige oppgaver</p>
  }

  return (
    <footer className="mt-4 border-t-slate-300">
      <p>{currentTask.text}</p>
      <button onClick={prev} className="bg-purple-700 text-white">
        Forrige
      </button>
      <button onClick={next} className="bg-teal-700 text-white">
        Neste
      </button>
    </footer>
  )
}
