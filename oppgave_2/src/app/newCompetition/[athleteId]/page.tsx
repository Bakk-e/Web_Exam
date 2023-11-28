"use client"

import Notifications from "@/components/Notifications"
import Link from "next/link"
import "@/styles/NewCompetitionPageStyle.css"
import { useEffect, useState } from "react";

export default function NewCompetition({params}: {params: {athleteId: string}}) {
    const [currentdate, setCurrentdate] = useState("");

    useEffect(() => {
        setCurrentdate(new Date().toISOString().split("T")[0]);
    })

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
                        <td>Sted: </td>
                        <td><input/></td>
                    </tr>
                    <tr>
                        <td>Mål: </td>
                        <td><textarea></textarea></td>
                    </tr>
                    <tr>
                        <td>Type: </td>
                        <td><input/></td>
                    </tr>
                    <tr>
                        <td>Prioritet: </td>
                        <td>
                            <select>
                                <option>A</option>
                                <option>B</option>
                                <option>C</option>
                            </select>
                        </td>
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