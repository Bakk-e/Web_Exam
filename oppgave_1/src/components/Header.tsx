import {Task as TaskType, Task} from "@/types";
import {ReactNode} from "react";

type TaskProps = {
  task: TaskType
}

export default function Header(task: TaskProps) {
  console.log(task.task.text)
  return <h1>{task.task.text}</h1>
}
