import Answer from "@/components/Answer"
import Header from "@/components/Header"
import Progress from "@/components/Progress"
import Task from "@/components/Task"
import Tasks from "@/components/Tasks"
import TaskText from "@/components/Text"
import {useEffect, useState} from "react";
import {AnswerProps} from "@/types";
import Button from "@/components/Button";

export default function Home() {
    const [tasks, setTasks] = useState<any>(null);
    const [currentTask, setCurrentTask] = useState(0);
    const [count, setCount] = useState(10)


    useEffect( () => {
        async function fetchData(){
            const params = new URLSearchParams({count : `${count}` })
            try {
                const response = await fetch(`http://localhost:3000/api/restapi?${params}`, {
                    method: "get",
                })
                const result = await response.json()
                console.log(result)
                setTasks(result)
                console.log("tasks in page", tasks)
            }catch (error){
                console.log("Error getting data: ", error)
            }
        }
        fetchData();
    }, [])
    if (tasks === null){
        return <div>Loading....</div>
    }



  return (
    <main>
      {JSON.stringify(tasks)}
      <Tasks tasks={tasks.data} >
      </Tasks>

        <Header task={tasks.data[currentTask]}/>
        {tasks && tasks.data && tasks.data.length > 0 &&(
            <Task task={tasks.data[currentTask]}/>
        )}
      <TaskText text={"Hva blir resultatet av regneoperasjonen?"} />
        {tasks && tasks.data &&
            <Progress tasks={tasks.data} onStateChange={setCurrentTask} />}
        {(currentTask + 1  === tasks.data.length) &&
            <button onClick={() => window.location.reload()}>Prøv på nytt</button>}
    </main>
  )
}
