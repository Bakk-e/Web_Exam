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
                <div id="new-competition-page-table">
                    <div className="new-competition-page-create-point">
                        <p className="new-competition-page-create-point-title">Titel: </p>
                        <input className="new-competition-page-create-point-input"/>
                    </div>
                    <div className="new-competition-page-create-point">
                        <p className="new-competition-page-create-point-title">Dato: </p>
                        <input className="new-competition-page-create-point-input"
                        type="date"
                        min={currentdate}/>
                    </div>
                    <div className="new-competition-page-create-point">
                        <p className="new-competition-page-create-point-title">Sted: </p>
                        <input className="new-competition-page-create-point-input"/>
                    </div>
                    <div className="new-competition-page-create-point">
                        <p className="new-competition-page-create-point-title">Mål: </p>
                        <textarea className="new-competition-page-create-point-textarea"></textarea>
                    </div>
                    <div className="new-competition-page-create-point">
                        <p className="new-competition-page-create-point-title">Type: </p>
                        <input className="new-competition-page-create-point-input"/>
                    </div>
                    <div className="new-competition-page-create-point">
                        <p className="new-competition-page-create-point-title">Prioritet: </p>
                        <select className="new-competition-page-create-point-select">
                            <option key="A">A</option>
                            <option key="B">B</option>
                            <option key="C">C</option>
                        </select>
                    </div>
                    <div className="new-competition-page-create-point">
                        <p className="new-competition-page-create-point-title">Kommentar: </p>
                        <textarea className="new-competition-page-create-point-textarea"></textarea>
                    </div>
                </div>
                
            </div>
            <div id="new-competition-page-save">
                <button id="new-competition-page-save-button">Lagre</button>
            </div>
        </div>
    )
}