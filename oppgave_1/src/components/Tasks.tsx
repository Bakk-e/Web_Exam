import React, { type ReactNode } from "react"

import { type Task as TaskType } from "@/types"
import Task from "@/components/Task";
import task from "@/components/Task";
type TasksProps = {
  tasks: TaskType[];
  children : ReactNode;
}

const Tasks: React.FC<TasksProps> = ({ tasks, children })  => {
  /*const tasks: Task[] = [
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

export default Tasks
