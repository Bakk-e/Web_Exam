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
                <table>
                    <tr>
                        <td>Titel: </td>
                        <td><input/></td>
                    </tr>
                    <tr>
                        <td>Dato: </td>
                        <td><input type="date"
                        min={currentdate}/></td>
                    </tr>
                    <tr>
                        <td>Mål: </td>
                        <td><input type="number"/></td>
                    </tr>
                    <tr>
                        <td>Kommentar: </td>
                        <td><textarea></textarea></td>
                    </tr>
                </table>
                <div>
                    <button>Lagre</button>
                </div>
            </div>
        </div>
    )
}