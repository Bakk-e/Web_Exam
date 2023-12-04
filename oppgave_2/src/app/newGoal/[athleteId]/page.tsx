"use client"

import Notifications from "@/components/Notifications"
import Link from "next/link"
import "@/styles/NewGoalPageStyle.css"
import { useEffect, useState } from "react";
import { Goal } from "@/types";
import { useRouter } from "next/navigation";

export default function NewGoal({params}: {params: {athleteId: string}}) {
    const [currentdate, setCurrentdate] = useState("");
    const [text, setText] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [goal, setGoal] = useState<number>(0);
    const [comment, setComment] = useState<string>("");

    const router = useRouter();

    useEffect(() => {
        setCurrentdate(new Date().toISOString().split("T")[0]);
    })

    const putGoal = async (goal: Goal) => {
        try {
            const response = await fetch(`/api/goal/${params.athleteId}`,{
                method: 'post',
                headers: {'Content-Type': 'application/json',
                },
                body: JSON.stringify(goal)
            })
            if (!response.ok) throw new Error("Network response failed")
        } catch (error) {
            console.error("failed to create goal", error)
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

    function handleGoalChange(e: any) {
        const update: number = parseInt(e.target.value);
        setGoal(update);
    }

    function handleCommentChange(e: any) {
        const update: string = e.target.value;
        setComment(update);
    }

    function handleSaveButton(e: any) {
        e.preventDefault();
        const newGoal: Goal = {
            title: text, date: new Date(date),
            goal: goal, comment: comment
        }
        putGoal(newGoal);
        router.push(`/athlete/${params.athleteId}`);
    }

    return (
        <div id="new-goal-page">
            <header id="new-goal-page-header">
                <Link legacyBehavior href="/"><a id="new-goal-page-logo">Logo</a></Link>
                <nav id="new-goal-page-nav">
                    <Link legacyBehavior href="/athlete/[athleteId]" as={`/athlete/${params.athleteId}`}><a id="new-goal-page-back">Tilbake</a></Link>
                    <Notifications></Notifications>
                </nav>
            </header>
            <div id="new-goal-page-content">
                <p id="new-goal-page-title">Nytt mål</p>
                <div id="new-goal-page-table">
                    <div className="new-goal-page-create-point">
                        <p className="new-goal-page-create-point-title">Titel: </p>
                        <input className="new-goal-page-create-point-input"
                        type="text"
                        onChange={handleTitelChange}/>
                    </div>
                    <div className="new-goal-page-create-point">
                        <p className="new-goal-page-create-point-title">Dato: </p>
                        <input className="new-goal-page-create-point-input"
                        type="date"
                        min={currentdate}
                        onChange={handleDateChange}/>
                    </div>
                    <div className="new-goal-page-create-point">
                        <p className="new-goal-page-create-point-title">Mål: </p>
                        <input className="new-goal-page-create-point-input"
                        type="number"
                        onChange={handleGoalChange}/>
                    </div>
                    <div className="new-goal-page-create-point">
                        <p className="new-goal-page-create-point-title">Kommentar: </p>
                        <textarea className="new-goal-page-create-point-textarea"
                        typeof="text"
                        onChange={handleCommentChange}></textarea>
                    </div>
                </div>
            </div>
            <div id="new-goal-page-save">
                <button id="new-goal-page-save-button" onClick={handleSaveButton}>Lagre</button>
            </div>
        </div>
    )
}