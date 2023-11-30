import {type Task as TaskType, AnswerProps, OpperationErrors, Type, AnswerResponse} from "@/types";
import React, {ReactNode, useEffect, useState} from "react";
import Answer from "@/components/Answer";

type TaskProps = {
    task: TaskType
    onOperationFail : (operationType : Type) => void
    onCorrectAnswer : () => void
}


const Task: React.FC<TaskProps> = ({ task, onOperationFail, onCorrectAnswer } ) => {
    const [correctAnswer, setCorrectAnswer] = useState<number | null>(null)
    const [score, setScore] = useState(0)
    const [attempts, setAttempts] = useState(0)
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

    const handleCorrectAnswer = () => {
        onCorrectAnswer()
        //setScore(score + 1)
    }

    const handleWrongAnswer = (operationType : Type) => {
        onOperationFail(operationType)
    }



    return(
        <article>
            <p>Spørsmål : {data[0]} {convertTypeToString(type)} {data[1]}</p>
            <Answer
                correctAnswer = {correctAnswer}
                onCheckAnswer = {checkAnswer}
                onCorrect={handleCorrectAnswer}
                onWrong={handleWrongAnswer}
                task={task}/>
        </article>
    )

}
export default Task