import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import crypto from "crypto"

import { type Task, Type, PutRequestBody, GetAnswerResponse} from "@/types"

// TODO: Denne skal brukes til å "samle" svarene (om du ikke bruker database)
let answers = new Map<Task["id"], { attempts: number }>()

export async function PUT(request: NextRequest) {
  const body = await request.json() as PutRequestBody
  const {taskId, isCorrect} = body
  const currentAttempts = answers.get(taskId) || {attempts : 0}
  if (!isCorrect){
    currentAttempts.attempts +=1
  }
  answers.set(taskId,currentAttempts)
  return NextResponse.json({success : true, attempts : currentAttempts.attempts})
}

export function GET(request : NextRequest){
  const answerObject = Object.fromEntries(answers)
  return NextResponse.json({success : true, data : answerObject}, {status : 200})

}

export function POST(request : NextRequest){
  answers.clear()
  return NextResponse.json({success : true, data : answers, message : "Answers have been reset"})
}
