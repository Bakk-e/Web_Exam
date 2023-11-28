import { Goal } from "@/types";
import { DateToString } from "./Functions";

type goalProps = {
    goal: Goal,
    toggleEditGoal: any,
    setEditingGoal: any
}

export default function GoalCard(props: goalProps) {
    const {goal, toggleEditGoal, setEditingGoal} = props;

    function handleEditClick() {
        setEditingGoal(goal)
        toggleEditGoal()
    }

    return (
        <div className="athlete-page-goals-card">
            <div className="athlete-page-goals-card-header">
                <p className="athlete-page-goals-card-title">{goal.title}</p>
                <p className="athlete-page-goals-card-date">{goal && goal.date && DateToString(goal.date.toString())}</p>
            </div>
            <p className="athlete-page-goals-card-goal">Mål: {goal.goal}</p>
            <p className="athlete-page-goals-card-comment">Kommentar: {goal.comment}</p>
            <div className="athlete-page-goals-card-button-spacer">
                <button className="athlete-page-goals-card-button-remove">Fjern</button>
                <button className="athlete-page-goals-card-button" onClick={handleEditClick}>Edit</button>
            </div>
        </div>
    )
}