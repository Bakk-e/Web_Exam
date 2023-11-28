import {type Task as TaskType, AnswerProps, OpperationErrors, Type, AnswerResponse} from "@/types";
import React, {ReactNode, useEffect, useState} from "react";
import Answer from "@/components/Answer";

type TaskProps = {
    task: TaskType
}


const Task: React.FC<TaskProps> = ({ task } ) => {
    const [correctAnswer, setCorrectAnswer] = useState<number | null>(null)
    const [score, setScore] = useState(0)
    const [attempts, setAttempts] = useState(0)
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

    /*async function getAttempts ()   {
        async function fetchAttempts(){
            try {
                const answersResponse = await fetch(`http://localhost:3000/api/restapi`, {
                    method : 'GET'
                })
                const answerData = await answersResponse.json() as AnswerResponse
               // const attemptsForTask = answerData.data[task.id]?.attempts || 0
                setAttempts( answerData.data[task.id]?.attempts || 0)

                console.log("answerData.data", answerData.data)
                //setAttempts(attemptsForTask)
                console.log("attemptsForTask",  answerData.data[task.id]?.attempts || 0)
            }catch (error){
                console.log("Error getting data: ", error)
            }
        }
        if (task.id){
            fetchAttempts();
        }
    }*/

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
                task={task}/>
            <p>Correct: {score}</p>
            <p>Wrong add: {opperationFails.add}</p>
            <p>Wrong divide: {opperationFails.divide}</p>
            <p>Wrong multiply: {opperationFails.multiply}</p>
            <p>Wrong subtract: {opperationFails.subtract}</p>
        </article>
    )

}
export default Task