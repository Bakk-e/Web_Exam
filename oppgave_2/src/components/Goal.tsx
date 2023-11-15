import { Goal } from "@/types";
import { DateToString } from "./Functions";

type goalProps = {
    goal: Goal,
    toggleEditGoal: any
}

export default function Goal(props: goalProps) {
    const {goal, toggleEditGoal} = props;

    return (
        <div className="athlete-page-goals-card">
            <div className="athlete-page-goals-card-header">
                <p className="athlete-page-goals-card-title">{goal.title}</p>
                <p className="athlete-page-goals-card-date">{DateToString(goal.date)}</p>
            </div>
            <p className="athlete-page-goals-card-goal">Mål: {goal.goal}</p>
            <p className="athlete-page-goals-card-comment">Kommentar: {goal.comment}</p>
            <div className="athlete-page-goals-card-button-spacer">
                <button className="athlete-page-goals-card-button" onClick={toggleEditGoal}>Edit</button>
            </div>
        </div>
    )
}