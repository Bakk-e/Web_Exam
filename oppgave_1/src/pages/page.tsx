import Answer from "@/components/Answer"
import Header from "@/components/Header"
import Progress from "@/components/Progress"
import Task from "@/components/Task"
import Tasks from "@/components/Tasks"
import TaskText from "@/components/Text"
import {useEffect, useState} from "react";
import {AnswerProps} from "@/types";
import Button from "@/components/Button";
import {response} from "msw";

export default function Home() {
    const [tasks, setTasks] = useState<any>(null);
    const [currentTask, setCurrentTask] = useState(0);
    const [count, setCount] = useState(10)
    const [showResults , setShowResults] = useState(false)

    const handleSubmit = () => {
        setShowResults(true)
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
                <div></div>
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
