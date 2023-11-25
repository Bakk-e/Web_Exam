import React, { type ReactNode } from "react"

import { type Task as TaskType } from "@/types"
import Task from "@/components/Task";
import task from "@/components/Task";
type TasksProps = {
  tasks: TaskType[];
  children : ReactNode;
}

const Tasks: React.FC<TasksProps> = ({ tasks, children })  => {
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
