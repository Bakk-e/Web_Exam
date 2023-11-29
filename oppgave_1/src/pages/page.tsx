import Answer from "@/components/Answer"
import Header from "@/components/Header"
import Progress from "@/components/Progress"
import Task from "@/components/Task"
import Tasks from "@/components/Tasks"
import TaskText from "@/components/Text"
import React, {useEffect, useState} from "react";
import {AnswerProps, OpperationErrors, Type} from "@/types";
import Button from "@/components/Button";
import {response} from "msw";

export default function Home() {
    const [tasks, setTasks] = useState<any>(null);
    const [currentTask, setCurrentTask] = useState(0);
    const [count, setCount] = useState(10)
    const [showResults , setShowResults] = useState(false)
    const [opperationFails, setOpperationFails] =
        useState<OpperationErrors>({add:0, subtract:0, multiply:0, divide:0})
    const [score, setScore] = useState(0)

    const handleSubmit = () => {
        setShowResults(true)
    }

    const handleCorrectAnswer = () =>{
        setScore((prevScore) => prevScore + 1)
    }

    const handleWrongAnswer = (operationType : Type) => {
        setOpperationFails(prevErrors => ({
            ...prevErrors,
            [operationType] : prevErrors[operationType] + 1
        }))
    }


    useEffect( () => {
        async function fetchData(){
            const params = new URLSearchParams({count : `${count}` })
            try {
                const tasksResponse = await fetch(`http://localhost:3000/api/restapi/tasks?${params}`, {
                    method: "get",
                })
                const tasksData = await tasksResponse.json()
                setTasks(tasksData)
            }catch (error){
                console.log("Error getting data: ", error)
            }
        }
        async function resetAttempts (){
            try {
                const resetAttemptsResponse = await fetch(`http://localhost:3000/api/restapi`, {
                    method : 'POST'
                })
            }catch (error){
                console.log("Error resting result ", error)
            }
        }
        fetchData();
        resetAttempts();
    }, [])
    if (tasks === null){
        return <div>Loading....</div>
    }

    if (showResults){
        return (
            <main>
                <h1>Resultater</h1>
                <div>
                    <p>Correct: {score}</p>
                    <p>Wrong add: {opperationFails.add}</p>
                    <p>Wrong divide: {opperationFails.divide}</p>
                    <p>Wrong multiply: {opperationFails.multiply}</p>
                    <p>Wrong subtract: {opperationFails.subtract}</p></div>
                <button onClick={() => window.location.reload()}>Prøv på nytt</button>
            </main>
        )

    }

    return (
        <main>
            {/*JSON.stringify(tasks)*/}
            {/*<Tasks tasks={tasks.data} >
                </Tasks>*/}

            <Header
                task={tasks.data[currentTask]}
            />
            {tasks && tasks.data && tasks.data.length > 0 &&(
                <Task
                    task={tasks.data[currentTask]}
                    onCorrectAnswer={handleCorrectAnswer}
                    onOperationFail={handleWrongAnswer}
                />
            )}
            <TaskText
                text={"Hva blir resultatet av regneoperasjonen?"}
            />
            {tasks && tasks.data &&
                <Progress
                    tasks={tasks.data}
                    // onStateChange={setCurrentTask}
                    currentStateIndex={currentTask}
                    setCurrentState={setCurrentTask}
                    onSubmit={handleSubmit}
                />}
            {/*(currentTask + 1  === tasks.data.length) &&
                <button onClick={() => window.location.reload()}>Prøv på nytt</button>*/}
        </main>
    )


}
