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

    useEffect(() => {
        setCurrentdate(new Date().toISOString().split("T")[0]);
    })

    return (
        <>
            <div className={`athlete-page-edit-goal-overlay ${isEditGoalOpen ? 'open' : ''}`} onClick={toggleEditGoal}></div>
            <section className={`athlete-page-edit-goal ${isEditGoalOpen ? 'open' : ''}`}>
                <article id="athlete-page-edit-goal-header">
                    <button id="athlete-page-edit-goal-header-exit" onClick={toggleEditGoal}>X</button>
                </article>
                <table id="athlete-page-edit-goal-list">
                    <tr className="athlete-page-edit-goal-point">
                        <td className="athlete-page-edit-goal-point-title">Navn: </td>
                        <td><input className="athlete-page-edit-goal-point-input"
                        type="text"
                        defaultValue={editingGoal?.title}/></td>
                    </tr>
                    <tr className="athlete-page-edit-goal-point">
                        <td className="athlete-page-edit-goal-point-title">Dato: </td>
                        <td><input className="athlete-page-edit-goal-point-input"
                        min={currentdate}
                        defaultValue={editingGoal.date && DateToStringAlternate(editingGoal?.date)}
                        type="date"/></td>
                    </tr>
                    <tr className="athlete-page-edit-goal-point">
                        <td className="athlete-page-edit-goal-point-title">Mål: </td>
                        <td><input className="athlete-page-edit-goal-point-input"
                        type="text"
                        defaultValue={editingGoal?.goal}/></td>
                    </tr>
                    <tr className="athlete-page-edit-goal-point">
                        <td className="athlete-page-edit-goal-point-title">Kommentar: </td>
                        <td><textarea className="athlete-page-edit-goal-point-textarea"
                        typeof="text"
                        defaultValue={editingGoal?.comment}></textarea></td>
                    </tr>
                </table>
                <article id="athlete-page-edit-goal-footer">
                    <button id="athlete-page-edit-goal-footer-save">Save</button>
                </article>
            </section>
        </>
    )
}