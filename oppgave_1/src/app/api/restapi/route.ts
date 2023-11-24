import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import crypto from "crypto"

import { type Task, Type } from "@/types"

const generateRandomNumber = (min = 1, max = 100) => {
  return Math.floor(Math.random() * (max - min +1) + min)
}

const generateRandomData = () => {
  const number1 = generateRandomNumber()
  const number2 = generateRandomNumber()

  return `${number1}|${number2}`
}

const generateRandomType = (): Type => {
  const types :Type[] = ["add", "subtract", "multiply", "divide"]
  const randomIndex = Math.floor(Math.random() * types.length)
  return types[randomIndex]
}

const createRandomTasks = (count : number, tasksArray : Task[]) =>{
  tasksArray.length = 0
  for (let i = 1; i <= count; i++){
    tasksArray.push({
      id: crypto.randomUUID(),
      text: `Oppgave ${i}`,
      type: generateRandomType(),
      data: generateRandomData() as `${number}|${number}`
    })
  }
}

const tasks: Task[] = []

// TODO: Denne skal brukes til å "samle" svarene (om du ikke bruker database)
const answers = new Map<Task["id"], { attempts: number }>()

export function PUT(request: NextRequest) {
  let count = request.nextUrl.searchParams.get("count")
  if (!count)
    return NextResponse.json({ success: false, error: "Invalid count" })
  return NextResponse.json({ success: true, data: tasks }, { status: 207 })
}

export function GET(request: NextRequest) {
  let count = parseInt(request.nextUrl.searchParams.get("count") || "-1")
  if (count < 1 || count > 10)
    return NextResponse.json({ success: false, error: "Invalid count" })
  createRandomTasks(count,tasks)
  return NextResponse.json({ success: true, data: tasks }, { status: 200 })
}
