import { Goal } from "@/types"
import { useEffect, useState } from "react";
import { DateToStringAlternate } from "./Functions";

type editGoalProps = {
    isEditGoalOpen: boolean,
    toggleEditGoal: any,
    editingGoal: Goal
}

export default function EditGoal(params: editGoalProps) {
    const {isEditGoalOpen, toggleEditGoal, editingGoal} = params;
    const [currentdate, setCurrentdate] = useState("");
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [goal, setGoal] = useState(0);
    const [comment, setComment] = useState("");

    useEffect(() => {
        setCurrentdate(new Date().toISOString().split("T")[0]);
    })

    const putGoal = async (goal: Goal) => {
    }

    function handleTitleChange(e: any) {
        const update: string = e.target.value;
        setTitle(update);
    }

    function handleDateChange(e: any) {
        const update: string = e.target.value;
        setDate(update);
    }

    function handleGoalChange(e: any) {
        const update: number = e.target.value;
        setGoal(update);
    }

    function handleCommentChange(e: any) {
        const update: string = e.target.value;
        setComment(update);
    }

    function handleSaveButton(e: any) {
        e.preventDefault();
        const updatedGoal: Goal = {
            title: title, date: new Date(date),
            goal: goal, comment: comment
        }
        putGoal(updatedGoal);
    }

    return (
        <>
            <div className={`athlete-page-edit-goal-overlay ${isEditGoalOpen ? 'open' : ''}`} onClick={toggleEditGoal}></div>
            <div className={`athlete-page-edit-goal ${isEditGoalOpen ? 'open' : ''}`}>
                <div id="athlete-page-edit-goal-header">
                    <button id="athlete-page-edit-goal-header-exit" onClick={toggleEditGoal}>X</button>
                </div>
                <div id="athlete-page-edit-goal-list">
                    <div className="athlete-page-edit-goal-point">
                        <p className="athlete-page-edit-goal-point-title">Navn: </p>
                        <input className="athlete-page-edit-goal-point-input"
                        type="text"
                        defaultValue={editingGoal?.title}
                        onChange={handleTitleChange}/>
                    </div>
                    <div className="athlete-page-edit-goal-point">
                        <p className="athlete-page-edit-goal-point-title">Dato: </p>
                        <input className="athlete-page-edit-goal-point-input"
                        min={currentdate}
                        defaultValue={editingGoal.date && DateToStringAlternate(editingGoal?.date)}
                        type="date"
                        onChange={handleDateChange}/>
                    </div>
                    <div className="athlete-page-edit-goal-point">
                        <p className="athlete-page-edit-goal-point-title">Mål: </p>
                        <input className="athlete-page-edit-goal-point-input"
                        type="number"
                        defaultValue={editingGoal?.goal}
                        onChange={handleGoalChange}/>
                    </div>
                    <div className="athlete-page-edit-goal-point">
                        <p className="athlete-page-edit-goal-point-title">Kommentar: </p>
                        <textarea className="athlete-page-edit-goal-point-textarea"
                        typeof="text"
                        defaultValue={editingGoal?.comment}
                        onChange={handleCommentChange}></textarea>
                    </div>
                </div>
                <div id="athlete-page-edit-goal-footer">
                    <button id="athlete-page-edit-goal-footer-save" onClick={(e) => handleSaveButton(e)}>Save</button>
                </div>
            </div>
        </>
    )
}