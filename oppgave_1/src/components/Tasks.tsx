import { type ReactNode } from "react"

import { type Task as TaskType } from "@/types"
import Task from "@/components/Task"

type TasksProps = {
  tasks: TaskType[];
  children : ReactNode;
}
export default function Tasks({ tasks, children }:  TasksProps ) {
  /*const tasks: TaskType[] = [
    {
      id: "123",
      text: "Skriv resultatet av regneoperasjonen",
      data: "9|2",
      type: "add",
    },
    {
      id: "234",
      text: "Skriv resultatet av regneoperasjonen",
      data: "3|2",
      type: "add",
    },
    {
      id: "356",
      text: "Skriv resultatet av regneoperasjonen",
      data: "3|2",
      type: "multiply",
    },
  ]*/

  return (
    <section>
      {tasks.map((task) => (
          <Task key={task.id} task={task} />
      ))}

      {children}
    </section>
  )
}
