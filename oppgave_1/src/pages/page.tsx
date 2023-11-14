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
            const response = await fetch("http://localhost:3000/api/restapi");
            const json = await response.json()
            setTasks(json);
        }
        fetchData()
    }, []);
    //console.log(tasks.data[0].text)


  return (
      <main>
          {JSON.stringify(tasks)}
          <Header />
          <h2>All Tasks</h2>
          {tasks && tasks.data &&(
              <Tasks tasks={tasks.data}>
              <Answer />
          </Tasks>
          )}

          <h2>Single Task</h2>
          {tasks && tasks.data && tasks.data.length > 0 &&(
              <Task task={tasks.data[1]}/>
          )}
          <Answer />
          <TaskText text={"Hva blir resultatet av regneoperasjonen?"} />
          { /*<Progress tasks={result} />*/}
    </main>
  )
}
