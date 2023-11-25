import {type Task as TaskType, AnswerProps, OpperationErrors, Type} from "@/types";
import React, {ReactNode, useEffect, useState} from "react";
import Answer from "@/components/Answer";

type TaskProps = {
    task: TaskType
}


const Task: React.FC<TaskProps> = ({ task } ) => {
    const [correctAnswer, setCorrectAnswer] = useState<number | null>(null)
    const [score, setScore] = useState(0)
    const [opperationFails, setOpperationFails] =
        useState<OpperationErrors>({add:0, subtract:0, multiply:0, divide:0})
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
        setScore(score + 1)
    }

    const handleWrongAnswer = (operationType : Type) => {
        setOpperationFails(prevErrors => ({
            ...prevErrors,
            [operationType] : prevErrors[operationType] + 1
        }))
    }



    return(
        <article>
            <p>Type : {task.type}</p>
            <p>Question : {data[0]} {convertTypeToString(type)} {data[1]}</p>
            <p>Correct Answer: {correctAnswer} </p>
            <Answer
                correctAnswer = {correctAnswer}
                onCheckAnswer = {checkAnswer}
                onCorrect={handleCorrectAnswer}
                onWrong={handleWrongAnswer}
                opperationType={task.type}/>
            <p>Correct: {score}</p>
            <p>Wrong add: {opperationFails.add}</p>
            <p>Wrong divide: {opperationFails.divide}</p>
            <p>Wrong multiply: {opperationFails.multiply}</p>
            <p>Wrong subtract: {opperationFails.subtract}</p>
        </article>
    )

}
export default Task