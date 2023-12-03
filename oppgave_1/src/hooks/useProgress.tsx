import { useState, useMemo } from "react"

import { type Task } from "@/types"

export default function useProgress({ tasks }: { tasks: Task[] }) {
  const [count, setCount] = useState(0)
  const current = useMemo(() => {
    return tasks[count]
  }, [count, tasks])

  const next = () => {
    setCount((prevCount) => (prevCount < tasks.length - 1 ? prevCount + 1 : prevCount))
  }
  const prev = () => {
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : prevCount))
  }

  return { count, current, next, prev }
}
