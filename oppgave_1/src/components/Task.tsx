import React from 'react';
import { type Task as TaskType} from "@/types"

type TaskProps = {
    task : TaskType
}

const Task: React.FC<TaskProps> = ({ task }) =>{
    // her kan legges inn logikk for å håndtere forskjellige oppgavetyper
    // For eksempel, beregning av resultatet basert på `task.type` og `task.data`
    let taskText = task.text
    let data = task.data.split("|")
    let type = task.type
    function convertType(type: String){
        if (type === "add"){
            return "+"
        }
        else if (type === "divide"){
            return "/"
        }
        else if (type === "multiply"){
            return "*"
        }
        else if (type === "subtract"){
            return "-"
        }
    }

    return(
    <article>
        <h3>{taskText}</h3>
        <p>Type: {convertType(type)}</p>
        <p>Question : {data[0]} {convertType(type)} {data[1]}</p>
        <p>Data: {data}</p>
    </article>
    )
}
export default Task;