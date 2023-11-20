import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { type Task } from "@/types"

const tasks: Task[] = [
  {
    id: crypto.randomUUID(),
    text: "Dette er API oppgave 1",
    type: "add",
    data: "23|45",
  },
  {
    id: crypto.randomUUID(),
    text: "Dette er API oppgave 2",
    type: "subtract",
    data: "3214|1324",
  },{
    id: crypto.randomUUID(),
    text: "Dette er API oppgave 3",
    type: "divide",
    data: "10|4",
  },{
    id: crypto.randomUUID(),
    text: "Dette er API oppgave 4",
    type: "multiply",
    data: "43|11",
  },{
    id: crypto.randomUUID(),
    text: "Dette er API oppgave 5",
    type: "add",
    data: "412|643",
  },{
    id: crypto.randomUUID(),
    text: "Dette er API oppgave 6",
    type: "divide",
    data: "2|100",
  },{
    id: crypto.randomUUID(),
    text: "Dette er API oppgave 7",
    type: "multiply",
    data: "11|22",
  },{
    id: crypto.randomUUID(),
    text: "Dette er API oppgave 8",
    type: "subtract",
    data: "43|11",
  },{
    id: crypto.randomUUID(),
    text: "Dette er API oppgave 9",
    type: "multiply",
    data: "43|11",
  },{
    id: crypto.randomUUID(),
    text: "Dette er API oppgave 10",
    type: "multiply",
    data: "43|11",
  }
]

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

  return NextResponse.json({ success: true, data: tasks.slice(0,count)}, { status: 200 })
}
