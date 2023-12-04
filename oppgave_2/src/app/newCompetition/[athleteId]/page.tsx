"use client"

import Notifications from "@/components/Notifications"
import Link from "next/link"
import "@/styles/NewCompetitionPageStyle.css"
import { useEffect, useState } from "react";
import { Competition } from "@/types";

export default function NewCompetition({params}: {params: {athleteId: string}}) {
    const [currentdate, setCurrentdate] = useState("");
    const [newCompetition, setNewCompetition] = useState<Competition>();
    const [text, setText] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [goal, setGoal] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const [priority, setPriority] = useState<string>("");

    useEffect(() => {
        setCurrentdate(new Date().toISOString().split("T")[0]);
    })

        const setComp =async (comp: Competition) => {
            try {
            const response = await fetch(`/api/competition/${params.athleteId}`, {
                method: "post",
                headers: { "Content-Type": "application/json",
                },
                body: JSON.stringify(comp),
            })
            if (!response.ok) 
                throw new Error("Network response failed")
        } catch (error) {
            console.error("Failed to create competition", error)
        }
            }
        
    function handleTitelChange(e: any) {
        const update: string = e.target.value;
        setText(update);
    }

    function handleDateChange(e: any) {
        const update: string = e.target.value;
        setDate(update);
    }

    function handleLocationChange(e: any) {
        const update: string = e.target.value;
        setLocation(update);
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
        const update: string = e.target.value;
        setPriority(update);
    }

    function handleCommentChange(e: any) {
        const update: string = e.target.value;
        setComment(update);
    }

    function handleSaveButton(e: any) {
        e.preventDefault();
        if (priority == "A" || priority == "B" || priority == "C") {
            const newComptetition: Competition = {
            title: text, date: new Date(date),
            location: location, goal: goal,
            type: type, priority: priority,
            comment: comment
            }
            setComp(newComptetition);
        }
    }

    return (
        <div id="new-competition-page">
            <header id="new-competition-page-header">
                <Link legacyBehavior href="/"><a id="new-competition-page-logo">Logo</a></Link>
                <nav id="new-competition-page-nav">
                <Link legacyBehavior href="/athlete/[athleteId]" as={`/athlete/${params.athleteId}`}><a id="new-competition-page-back">Tilbake</a></Link>
                    <Notifications></Notifications>
                </nav>
            </header>
            <div id="new-competition-page-content">
                <p id="new-competition-page-title">Ny Konkuranse</p>
                <div id="new-competition-page-table">
                    <div className="new-competition-page-create-point">
                        <p className="new-competition-page-create-point-title">Titel: </p>
                        <input className="new-competition-page-create-point-input"
                        type="text"
                        onChange={handleTitelChange}/>
                    </div>
                    <div className="new-competition-page-create-point">
                        <p className="new-competition-page-create-point-title">Dato: </p>
                        <input className="new-competition-page-create-point-input"
                        type="date"
                        min={currentdate}
                        onChange={handleDateChange}/>
                    </div>
                    <div className="new-competition-page-create-point">
                        <p className="new-competition-page-create-point-title">Sted: </p>
                        <input className="new-competition-page-create-point-input"
                        type="text"
                        onChange={handleLocationChange}/>
                    </div>
                    <div className="new-competition-page-create-point">
                        <p className="new-competition-page-create-point-title">Mål: </p>
                        <textarea className="new-competition-page-create-point-textarea"
                        typeof="text"
                        onChange={handleGoalChange}></textarea>
                    </div>
                    <div className="new-competition-page-create-point">
                        <p className="new-competition-page-create-point-title">Type: </p>
                        <input className="new-competition-page-create-point-input"
                        type="text"
                        onChange={handleTypeChange}/>
                    </div>
                    <div className="new-competition-page-create-point">
                        <p className="new-competition-page-create-point-title">Prioritet: </p>
                        <select className="new-competition-page-create-point-select"
                        onChange={handlePriorityChange}>
                            <option key="A">A</option>
                            <option key="B">B</option>
                            <option key="C">C</option>
                        </select>
                    </div>
                    <div className="new-competition-page-create-point">
                        <p className="new-competition-page-create-point-title">Kommentar: </p>
                        <textarea className="new-competition-page-create-point-textarea"
                        typeof="text"
                        onChange={handleCommentChange}></textarea>
                    </div>
                </div>
            </div>
            <div id="new-competition-page-save">
                <button id="new-competition-page-save-button" onClick={handleSaveButton}>Lagre</button>
            </div>
        </div>
    )
}