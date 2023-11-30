export type Task = {
  id: string
  text: string
  type: "add" | "divide" | "multiply" | "subtract"
  data: `${number}|${number}`
  attempts : number
}

export type Type = "add" | "subtract" | "multiply" | "divide"

export type AnswerProps = {
  correctAnswer: number | null
  onCheckAnswer: (userAnswer : number | null) => boolean
  onCorrect : () => void
  onWrong : (opperationType : Type) => void
  task : Task
}

export type ProgressProps = {
  tasks: Task[]
  currentStateIndex : number
  setCurrentState : (index : number) => void
  onSubmit : () => void
}

export type OpperationErrors = {
  add : number
  subtract: number
  multiply : number
  divide : number
}

export type PutRequestBody = {
  taskId : string
  isCorrect : boolean
}

export type GetAnswerResponse = {
  success : boolean
  data : Record<Task["id"], {attempts : number}>
}

export type AnswerResponse = {
  success : boolean
  data : {
    [key : string] : {attempts : number}
  }
}

export type StateProps = {
  data : {
    [key : string] : {attempts : number}
  }
  isComplete : boolean

}

