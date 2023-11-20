"use client"

import {useEffect, useState} from "react"
import type { FormEvent, MouseEvent } from "react"
import {Simulate} from "react-dom/test-utils";
import {AnswerProps} from "@/types";
import error = Simulate.error;

export default function Answer({correctAnswer, onCheckAnswer} : AnswerProps) {
  const [answer, setAnswer] = useState<number | null>(null)
    const [correct, setCorrect] = useState<boolean | null>(false)
    const [attempts, setAttempts] = useState<number | 0>(0)

  const send = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    console.log(answer)
      //checkAnswer()
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
        <div>
            <input
                name="answer"
                type="number"
                placeholder="Sett svar her"
                onInput={update}
                value={answer || ""}
            />
            <button onClick={send}>Send</button>
        </div>
        <p>
            {attempts > 0 && `${attempts} av 3 forsøk brukt`}
            {correct === true ? "Bra jobba, Riktig svar!" : null}
        </p>
    </div>
  )
}
