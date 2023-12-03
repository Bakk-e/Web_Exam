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
                <table id="new-competition-page-table">
                    <tr className="new-competition-page-create-point">
                        <td className="new-competition-page-create-point-title">Titel: </td>
                        <td className="new-competition-page-create-point-input"><input/></td>
                    </tr>
                    <tr className="new-competition-page-create-point">
                        <td className="new-competition-page-create-point-title">Dato: </td>
                        <td><input className="new-competition-page-create-point-input"
                        type="date"
                        min={currentdate}/></td>
                    </tr>
                    <tr className="new-competition-page-create-point">
                        <td className="new-competition-page-create-point-title">Sted: </td>
                        <td><input className="new-competition-page-create-point-input"/></td>
                    </tr>
                    <tr className="new-competition-page-create-point">
                        <td className="new-competition-page-create-point-title">Mål: </td>
                        <td><textarea className="new-competition-page-create-point-input"></textarea></td>
                    </tr>
                    <tr className="new-competition-page-create-point">
                        <td className="new-competition-page-create-point-title">Type: </td>
                        <td><input className="new-competition-page-create-point-input"/></td>
                    </tr>
                    <tr className="new-competition-page-create-point">
                        <td className="new-competition-page-create-point-title">Prioritet: </td>
                        <td>
                            <select className="new-competition-page-create-point-select">
                                <option>A</option>
                                <option>B</option>
                                <option>C</option>
                            </select>
                        </td>
                    </tr>
                    <tr className="new-competition-page-create-point">
                        <td className="new-competition-page-create-point-title">Kommentar: </td>
                        <td><textarea className="new-competition-page-create-point-"></textarea></td>
                    </tr>
                </table>
                <div id="new-competition-page-save">
                    <button id="new-competition-page-save-button">Lagre</button>
                </div>
            </div>
        </div>
    )
}