export type Task = {
  id: string
  text: string
  type: "add" | "divide" | "multiply" | "subtract"
  data: `${number}|${number}`
}

export type Type = "add" | "subtract" | "multiply" | "divide"

export type AnswerProps = {
  correctAnswer: number | null
  onCheckAnswer: (userAnswer : number | null) => boolean
  onCorrect : () => void
  onWrong : (opperationType : Type) => void
  opperationType : Type
}

export type OpperationErrors = {
  add : number
  subtract: number
  multiply : number
  divide : number
}

