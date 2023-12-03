import { Competition } from "@/types";
import { useEffect, useState } from "react";
import { DateToStringAlternate } from "./Functions";

type editCompetitionProps = {
    isEditCompetitionOpen: boolean,
    toggleEditCompetition: any,
    editingCompetition: Competition
}

export default function EditCompetition(params: editCompetitionProps) {
    const {isEditCompetitionOpen, toggleEditCompetition, editingCompetition} = params
    const [currentdate, setCurrentdate] = useState("");
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [goal, setGoal] = useState("");
    const [type, setType] = useState("");
    const [priority, setPriority] = useState<"A" | "B" | "C">();
    const [comment, setComment] = useState("");

    useEffect(() => {
        setCurrentdate(new Date().toISOString().split("T")[0]);
        
    })
    
    const putCompetition = async (competition: Competition) => {
    }

    function handleTitleChange(e: any) {
        const update: string = e.target.value;
        setTitle(update);
    }

    function handleLocationChange(e: any) {
        const update: string = e.target.value;
        setLocation(update);
    }

    function handleDateChange(e: any) {
        const update: string = e.target.value;
        setDate(update);
    }

    function handleGoalChange(e: any) {
        const update: string = e.target.value;
        setGoal(update);
    }

    function handleTypeChange(e: any) {
        const update: string = e.target.value;
        setType(update);
    }

    function handlePriorityChange(e: any) {
        const update: "A" | "B" | "C" = e.target.value;
        setPriority(update);
    }

    function handleCommentChange(e: any) {
        const update: string = e.target.value;
        setComment(update);
    }

    function handleSaveButton(e: any) {
        e.preventDefault();
        const updatedCompetition: Competition = {
            title: title, location: location,
            date: new Date(date), goal: goal,
            type: type, priority: priority,
            comment: comment
        }
        putCompetition(updatedCompetition);
    }

    return (
        <>
            <div className={`athlete-page-edit-competition-overlay ${isEditCompetitionOpen ? 'open' : ''}`} onClick={toggleEditCompetition}></div>
            <div className={`athlete-page-edit-competition ${isEditCompetitionOpen ? 'open' : ''}`}>
                <div id="athlete-page-edit-competition-header">
                    <button id="athlete-page-edit-competition-header-exit" onClick={toggleEditCompetition}>X</button>
                </div>
                <div id="athlete-page-edit-competition-list">
                    <div className="athlete-page-edit-competition-point">
                        <p className="athlete-page-edit-competition-point-title">Navn: </p>
                        <input className="athlete-page-edit-competition-point-input"
                        type="text"
                        defaultValue={editingCompetition?.title}
                        onChange={handleTitleChange}/>
                    </div>
                    <div className="athlete-page-edit-competition-point">
                        <p className="athlete-page-edit-competition-point-title">Sted: </p>
                        <input className="athlete-page-edit-competition-point-input"
                        type="text"
                        defaultValue={editingCompetition?.location}
                        onChange={handleLocationChange}/>
                    </div>
                    <div className="athlete-page-edit-competition-point">
                        <p className="athlete-page-edit-competition-point-title">Dato: </p>
                        <input className="athlete-page-edit-competition-point-input"
                        type="date"
                        min={currentdate}
                        defaultValue={editingCompetition?.date && DateToStringAlternate(editingCompetition?.date)}
                        onChange={handleDateChange}/>
                    </div>
                    <div className="athlete-page-edit-competition-point">
                        <p className="athlete-page-edit-competition-point-title">Mål: </p>
                        <textarea className="athlete-page-edit-competition-point-textarea"
                        typeof="text"
                        defaultValue={editingCompetition?.goal}
                        onChange={handleGoalChange}></textarea>
                    </div>
                    <div className="athlete-page-edit-competition-point">
                        <p className="athlete-page-edit-competition-point-title">Type: </p>
                        <input className="athlete-page-edit-competition-point-input"
                        type="text"
                        defaultValue={editingCompetition?.type}
                        onChange={handleTypeChange}/>
                    </div>
                    <div className="athlete-page-edit-competition-point">
                        <p className="athlete-page-edit-competition-point-title">Prioritet: </p>
                        <select className="athlete-page-edit-competition-point-select"
                        defaultValue={editingCompetition?.priority}
                        onChange={handlePriorityChange}>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </select>
                    </div>
                    <div className="athlete-page-edit-competition-point">
                        <p className="athlete-page-edit-competition-point-title">Kommentar: </p>
                        <textarea className="athlete-page-edit-competition-point-textarea"
                        typeof="text"
                        defaultValue={editingCompetition?.comment}
                        onChange={handleCommentChange}></textarea>
                    </div>
                </div>
                <div id="athlete-page-edit-competition-footer">
                    <button id="athlete-page-edit-competition-footer-save" onClick={(e) => handleSaveButton(e)}>Save</button>
                </div>
            </div>
        </>
    )
}