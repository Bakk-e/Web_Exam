import React from 'react';
import { type Task as TaskType} from "@/types"

type TaskProps = {
    task : TaskType
}

export default function Task({ task }:TaskProps){
    // her kan legges inn logikk for å håndtere forskjellige oppgavetyper
    // For eksempel, beregning av resultatet basert på `task.type` og `task.data`

    return(
    <article>
        <h3>{task.text}</h3>
        <p>Type: {task.type}</p>
        <p>Data: {task.data}</p>
    </article>
    )
}