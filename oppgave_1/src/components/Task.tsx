import {type Task as TaskType, AnswerProps} from "@/types";
import React, {ReactNode, useEffect, useState} from "react";
import Answer from "@/components/Answer";

type TaskProps = {
    task: TaskType
}

const Task: React.FC<TaskProps> = ({ task } ) => {
    const [correctAnswer, setCorrectAnswer] = useState<number | null>(null)
    let taskText = task.text
    let data = task.data.split("|")
    let type = task.type
    useEffect(() => {
        switch (type){
            case "add":
                setCorrectAnswer(parseInt(data[0]) + parseInt(data[1]))
                break
            case "divide":
                setCorrectAnswer(parseInt(data[0]) / parseInt(data[1]))
                break
            case "multiply":
                setCorrectAnswer(parseInt(data[0]) * parseInt(data[1]))
                break
            case "subtract":
                setCorrectAnswer(parseInt(data[0]) - parseInt(data[1]))
                break
            default:
                console.error("Invalid operation")
        }
    }, [task])
    function convertTypeToString(type: String){
        switch (type) {
            case "add":
                return "+"
            case "divide":
                return "/"
            case "multiply":
                return "*"
            case "subtract":
                return "-"
        }
    }
    const checkAnswer : AnswerProps["onCheckAnswer"]= (userAnswer) => {
        return userAnswer == correctAnswer
    }

    return(
        <article>
            <h3>Task : {task.text}</h3>
            <p>Type : {task.type}</p>
            <p>Question : {data[0]} {convertTypeToString(type)} {data[1]}</p>
            <p>Correct Answer: {correctAnswer} </p>
            <Answer correctAnswer = {correctAnswer} onCheckAnswer = {checkAnswer} />
        </article>
    )

}
export default Task