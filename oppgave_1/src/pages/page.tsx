import Answer from "@/components/Answer"
import Header from "@/components/Header"
import Progress from "@/components/Progress"
import Task from "@/components/Task"
import Tasks from "@/components/Tasks"
import TaskText from "@/components/Text"
import { ApiResponse,Task as TaskType } from "@/types";
import {GetStaticProps} from "next";
export const getStaticProps: GetStaticProps = async () => {
    try {
        const response = await fetch("http://localhost:3002/api/restapi");
        const json = (await response.json()) as ApiResponse;
        return { props: { tasks: json.tasks } };
    } catch (e) {
        console.error("Fetching tasks error", e);
        return { props: { tasks: [] } }; // Return empty tasks in case of error
    }
};

export default ({tasks}: { tasks: TaskType[] }) => {
    const handleComplete = (taskId: string) => {

    };
    return (
        <main>
            <Header />
            <Tasks>
                <Answer />
            </Tasks>
            {}
            {tasks.length > 0 && (
                <Task
                    task={tasks[0]}
                    onComplete={handleComplete}
                />
            )}
            <TaskText text={"Hva blir resultatet av regneoperasjonen?"} />
            <Progress tasks={tasks} />
        </main>
    )
}
