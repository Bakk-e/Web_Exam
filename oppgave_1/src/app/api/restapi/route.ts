import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { type Task } from "@/types"

const tasks: Task[] = [
  {
    id: crypto.randomUUID(),
    text: "Dette er API oppgave 1",
    type: "add",
    data: "9|0",
  },
  {
    id: crypto.randomUUID(),
    text: "Dette er API oppgave 2",
    type: "subtract",
    data: "3245|100",
  },
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
  let count = -1
  if (!count)
    return NextResponse.json({ success: false, error: "Invalid count" })
  return NextResponse.json({ success: true, data: tasks }, { status: 200 })
}
