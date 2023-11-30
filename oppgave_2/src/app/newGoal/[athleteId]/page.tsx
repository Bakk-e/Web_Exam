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
                <table id="new-goal-page-table">
                    <tr className="new-goal-page-create-point">
                        <td className="new-goal-page-create-point-titel">Titel: </td>
                        <td><input className="new-goal-page-create-point-input"/></td>
                    </tr>
                    <tr className="new-goal-page-create-point">
                        <td className="new-goal-page-create-point-titel">Dato: </td>
                        <td><input className="new-goal-page-create-point-input"
                        type="date"
                        min={currentdate}/></td>
                    </tr>
                    <tr className="new-goal-page-create-point">
                        <td className="new-goal-page-create-point-titel">Mål: </td>
                        <td><input className="new-goal-page-create-point-input"
                        type="number"/></td>
                    </tr>
                    <tr className="new-goal-page-create-point">
                        <td className="new-goal-page-create-point-titel">Kommentar: </td>
                        <td><textarea className="new-goal-page-create-point-textarea"></textarea></td>
                    </tr>
                </table>
                
            </div>
            <div id="new-goal-page-save">
                <button id="new-goal-page-save-button">Lagre</button>
            </div>
        </div>
    )
}