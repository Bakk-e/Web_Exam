"use client"

import {useEffect, useState} from "react"
import type { FormEvent, MouseEvent } from "react"
import {AnswerProps} from "@/types";

export default function Answer({correctAnswer, onCheckAnswer} : AnswerProps) {
    const [answer, setAnswer] = useState<number | null>(null)
    const [correct, setCorrect] = useState<boolean | null>(false)
    const [attempts, setAttempts] = useState<number | 0>(0)

  const send = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    console.log(answer)
      const isCorrect = onCheckAnswer(answer)
      setCorrect(isCorrect)
      if (!isCorrect && attempts < 3){
          setAttempts(attempts+1)
      }
  }

    useEffect(() => {
        setAnswer(null)
        setCorrect(false)
        setAttempts(0)
    }, [correctAnswer]);

  const update = (event: FormEvent<HTMLInputElement>) => {
    setAnswer(event.currentTarget.valueAsNumber)
  }

  return (
    <div>
      <label htmlFor="answer">Svar</label>
      <input
        name="answer"
        type="number"
        placeholder="Sett svar her"
        onInput={update}
        value={answer || ""}
      />
      <button onClick={send}>Send</button>
        <p>
            {attempts > 0 && `${attempts} av 3 forsøk brukt`}
            {correct === true ? "Bra jobba, Riktig svar!" : null}
        </p>
    </div>
  )
}
