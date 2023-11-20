import React, {useEffect, useState} from 'react';
import { type Task as TaskType} from "@/types"
import TaskText from "@/components/Text";

type TaskProps = {
    task : TaskType
}

const Task: React.FC<TaskProps> = ({ task }) =>{
    const [correctAnswer, setCorrectAnswer] = useState<number | null>(null)

    let taskText = task.text
    let data = task.data.split("|")
    let type = task.type
    useEffect(() => {
        setCorrectAnswer(parseInt(data[0]) + parseInt(data[1]))
        if (type === "add"){
            setCorrectAnswer(parseInt(data[0]) + parseInt(data[1]))
        }
        else if (type === "divide"){
            setCorrectAnswer(parseInt(data[0]) / parseInt(data[1]))
        }
        else if (type === "multiply"){
            setCorrectAnswer(parseInt(data[0]) * parseInt(data[1]))
        }
        else if (type === "subtract"){
            setCorrectAnswer(parseInt(data[0]) - parseInt(data[1]))
        }
    }, [task])
    function convertTypeToString(type: String){
        if (type === "add"){
         //   setCorrectAnswer(parseInt(data[0]) + parseInt(data[1]))
            return "+"
        }
        else if (type === "divide"){
         //   setCorrectAnswer(parseInt(data[0]) / parseInt(data[1]))
            return "/"
        }
        else if (type === "multiply"){
          //  setCorrectAnswer(parseInt(data[0]) * parseInt(data[1]))
            return "*"
        }
        else if (type === "subtract"){
          // setCorrectAnswer(parseInt(data[0]) - parseInt(data[1]))
            return "-"
        }
    }


    return(
    <article>
        <h3>{taskText}</h3>
        <TaskText text={"Hva blir resultatet av regneoperasjonen?"}/>
        <p>Question : {data[0]} {convertTypeToString(type)} {data[1]}</p>
        <p>Correct Answer: {correctAnswer} </p>
    </article>
    )
}
export default Task;