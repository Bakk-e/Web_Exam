"use client"

import { useState } from "react"
import type { FormEvent, MouseEvent } from "react"
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export default function Answer() {
  const [answer, setAnswer] = useState<number | null>(null)

  const send = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    console.log(answer)
  }

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
      />
      {9 + 2 === answer ? "Bra jobbet!" : null}
      <button onClick={send}>Send</button>
    </div>
  )
}
