import React from 'react';
import { type Task as TaskType } from "@/types";
//import react from "@vitejs/plugin-react";

type TaskProps = {
    task : TaskType,
    onComplete : (taskId : string) => void;
}

const Task : React.FC<TaskProps> = ({task, onComplete}) =>{
    return(
        <div className="task">
            <h3>{task.text}</h3>
            <button onClick={() => onComplete(task.id)}>Complete Task</button>
        </div>
    );
};
export default Task;