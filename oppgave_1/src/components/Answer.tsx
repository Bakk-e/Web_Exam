"use client"

import {useEffect, useState} from "react"
import type { FormEvent, MouseEvent } from "react"
import {AnswerProps} from "@/types";
import {switchCase} from "@babel/types";
import {Integer} from "type-fest";

export default function Answer({correctAnswer, onCheckAnswer, onCorrect, onWrong, opperationType} : AnswerProps) {
    const [answer, setAnswer] = useState<number | null>(null)
    const [correct, setCorrect] = useState<boolean | null>(false)
    const [attempts, setAttempts] = useState<number >(0)
    const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false)

  const send = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
      const isCorrect = onCheckAnswer(answer)
      setCorrect(isCorrect)
      if (!isCorrect && attempts < 3){
          setAttempts(attempts+1)
      }
      if (isCorrect){
          onCorrect()
      }
      else if (!isCorrect){
          onWrong(opperationType)
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
        {attempts !== 3 || correct? (
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
            </div>
        ): null}
        <p>
            {attempts >= 0 && `${attempts} av 3 forsøk brukt`}
            {correct ? "Bra jobba, Riktig svar!" : null}
            {!correct && attempts ===3 && (
                <button onClick={() => setShowCorrectAnswer(!showCorrectAnswer)}>
                    {showCorrectAnswer? "Skjul Svaret" : "Se Svaret"}
            </button>)}
            {showCorrectAnswer && <p>Riktig svar er: {correctAnswer}</p>}

        </p>
    </div>
  )
}
