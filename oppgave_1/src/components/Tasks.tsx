import { type ReactNode } from "react"

import { type Task as TaskType } from "@/types"
import Task from "@/components/Task"

type TasksProps = {
  tasks: TaskType[];
  children : ReactNode;
}
export default function Tasks({ tasks, children }:  TasksProps ) {

  return (
    <section>
      {tasks.map((task) => (
          <Task key={task.id} task={task} />
      ))}

      {children}
    </section>
  )
}
