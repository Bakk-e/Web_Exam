import Answer from "@/components/Answer"
import Header from "@/components/Header"

import Progress from "@/components/Progress"
import Task from "@/components/Task"
import Tasks from "@/components/Tasks"
import TaskText from "@/components/Text"
import {useEffect, useState} from "react";
import {response} from "msw";


export default function Home() {
    const [tasks, setTasks] = useState<any>(null);
    useEffect(() => {
        async function fetchData(){
            const response = await fetch("http://localhost:3000/api/restapi"//, {
                //method: "get",
           /* }*/);
            const json = await response.json()
            setTasks(json);
        }
        fetchData()
    }, []);
    console.log(tasks.data)


  return (
      <main>
      {JSON.stringify(tasks)}
      <Header />
        {<Tasks tasks={tasks.data}>
        <Answer />
      </Tasks>}
        <p>{}</p>

        {/*<Task task={tasks[0]} />*/}
      <TaskText text={"Hva blir resultatet av regneoperasjonen?"} />
        { /*<Progress tasks={result} />*/}
    </main>
  )
}
