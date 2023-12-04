"use client"

import {useEffect, useState} from "react"
import type { FormEvent, MouseEvent } from "react"
import {AnswerProps, AnswerResponse} from "@/types";


export default function Answer({correctAnswer, onCheckAnswer, onCorrect, onWrong,  task,/* getAttempts*/} : AnswerProps) {
    const [answer, setAnswer] = useState<number | null>(null)
    const [correct, setCorrect] = useState<boolean | null>(false)
    const [attempts , setAttempts] = useState<number>(0)
    const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false)
    let opperationType = task.type

  const send = async (event: MouseEvent<HTMLButtonElement>) => {
        setShowCorrectAnswer(false)
        const taskId = task.id
      event.preventDefault()
      const isCorrect = onCheckAnswer(answer)
      setCorrect(isCorrect)
      try {
          const response = await fetch(`http://localhost:3000/api/restapi?`, {
              method : 'PUT',
              headers : {'Content-Type' : 'Application/json'},
              body: JSON.stringify({
                  taskId,
                  isCorrect
              })
          })
      }catch (error){
        console.error("Feil i PUT" , error)
      }
       if (isCorrect){
          onCorrect()
      }
      else if (!isCorrect){
          onWrong(opperationType)
      }


  }
    async function fetchAttempts(){
        try {
            const answersResponse = await fetch(`http://localhost:3000/api/restapi`, {
                method : 'GET'
            })
            const answerData = await answersResponse.json() as AnswerResponse
            setAttempts( answerData.data[task.id]?.attempts || 0)
            console.log("answerData.data", answerData.data)
            console.log("attemptsForTask",  answerData.data[task.id]?.attempts || 0)
        }catch (error){
            console.log("Error getting data: ", error)
        }
    }
    if (task.id){
        fetchAttempts();
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
        { task.attempts !== 3 || correct? (
            <div>
                <label htmlFor="answer">Svar</label>
                <input
                    name="answer"
                    type="number"
                    placeholder="Sett svar her"
                    onInput={update}
                    value={answer || ""}
                />
                {attempts < 3 &&<button onClick={send}>Send</button>}

            </div>
        ): null}
        <div>
            {!correct && attempts >= 0 && `${attempts} av 3 forsøk brukt`}
            {correct ? "Bra jobba, Riktig svar!" : null}
            {!correct && attempts ===3 && (
                <div>
                    <button onClick={() => setShowCorrectAnswer(!showCorrectAnswer)}>
                        {showCorrectAnswer? "Skjul Svaret" : "Se Svaret"}
                    </button>
                    {showCorrectAnswer && <p>Riktig svar er: {correctAnswer}</p>}
                </div>
            )}
        </div>
    </div>
  )
}
