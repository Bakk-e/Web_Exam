"use client"

import {useEffect, useState} from "react"
import type { MouseEvent } from "react"

import { type Task as TaskType, StateProps, ProgressProps} from "@/types"
import {state} from "sucrase/dist/types/parser/traverser/base";
import tasks from "@/components/Tasks";



export default function Progress({ tasks, currentStateIndex, setCurrentState, onSubmit} : ProgressProps) {
   // const [currentStateIndex, setCurrentStateIndex] = useState(1)
    const [complete, setComplete] = useState(false)
   // const currentTask = props.tasks[currentStateIndex-1]
   const currentTask = tasks[currentStateIndex]
    const isLastTask = currentStateIndex === tasks.length - 1

    /*useEffect(() => {
        tasks.onStateChange(currentStateIndex -1)

        console.log("currentStateIndex ",currentStateIndex)
        console.log("props.tasks.length", props.tasks.length)
    }, [currentStateIndex])*/



  const next = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()

      if (!isLastTask ){
       // setCurrentStateIndex(currentStateIndex + 1)
         setCurrentState(currentStateIndex +1)
      }else {
          onSubmit()
      }
      /*if (currentStateIndex == props.tasks.length){
      }*/
  }

  const prev = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      if (currentStateIndex  > 0){
          //setCurrentStateIndex(currentStateIndex - 1)
          setCurrentState(currentStateIndex - 1)
      }
  }

    /*if (!props.tasks || props.tasks.length === 0){
        return <div>No tasks are available</div>
    }*/
    if (!tasks || tasks.length === 0){
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
    </footer>
  )
}
