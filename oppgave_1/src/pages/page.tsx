import Answer from "@/components/Answer"
import Header from "@/components/Header"

import Progress from "@/components/Progress"
import Task from "@/components/Task"
import Tasks from "@/components/Tasks"
import TaskText from "@/components/Text"
import {useEffect, useState} from "react";
import {response} from "msw";


/*export async function getServerSideProps(){
    const response = await fetch("http://localhost:3000/api/restapi", {
        method: "get",
    });
    const data = await response.json()
    return{props: {data} }
}*/
export default function Home() {

    const [result, setResult] = useState<any>(null);
    useEffect(() => {
        async function fetchData(){
            const response = await fetch("http://localhost:3000/api/restapi", {
                method: "get",
            });
            const json = await response.json()
            setResult (json);
        }
        fetchData()
    }, []);



    /* const response = await fetch("http://localhost:3000/api/restapi", {
    method: "get",
  })
  const result = await response.json()*/

  return (
    <main>
      {JSON.stringify(result)}
      <Header />
      <Tasks>
        <Answer />
      </Tasks>
        {/*<Task task={} />*/}
      <TaskText text={"Hva blir resultatet av regneoperasjonen?"} />
        { /*<Progress tasks={result} />*/}
    </main>

  )
}
