"use client"

import Notifications from "@/components/Notifications"
import Link from "next/link"
import "@/styles/NewGoalPageStyle.css"
import { useEffect, useState } from "react";

export default function NewGoal({params}: {params: {athleteId: string}}) {
    const [currentdate, setCurrentdate] = useState("");

    useEffect(() => {
        setCurrentdate(new Date().toISOString().split("T")[0]);
    })

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
                        <input className="new-goal-page-create-point-input"/>
                    </div>
                    <div className="new-goal-page-create-point">
                        <p className="new-goal-page-create-point-title">Dato: </p>
                        <input className="new-goal-page-create-point-input"
                        type="date"
                        min={currentdate}/>
                    </div>
                    <div className="new-goal-page-create-point">
                        <p className="new-goal-page-create-point-title">Mål: </p>
                        <input className="new-goal-page-create-point-input"
                        type="number"/>
                    </div>
                    <div className="new-goal-page-create-point">
                        <p className="new-goal-page-create-point-title">Kommentar: </p>
                        <textarea className="new-goal-page-create-point-textarea"></textarea>
                    </div>
                </div>
            </div>
            <div id="new-goal-page-save">
                <button id="new-goal-page-save-button">Lagre</button>
            </div>
        </div>
    )
}