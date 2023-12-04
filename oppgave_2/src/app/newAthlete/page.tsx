"use client"

import Notifications from "@/components/Notifications"
import "@/styles/NewAthletePageStyle.css"
import Link from "next/link"
import {useState} from "react";

export default function NewAthletePage() {
    const [athlete, setAthlete] = useState({
        firstName : "",
        lastName : "",
        gender : "",
        sport : "",
        maxHeartRate : "",
        thresholdWattage : "",
        thresholdSpeed : "",
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setAthlete({...athlete, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log("ATHLETE:" ,athlete)

        try {
            const response = await fetch('/api/athletes',{
                method : 'POST',
                headers : { 'Content-Type': 'application/json',
                },
                body : JSON.stringify(athlete)
            })
            if (!response.ok) throw new Error("Network response failed")
        }catch (error){
            console.error("Failed to create athelete", error)
        }
    }
    return (
        <div id="new-athlete-page">
            <header id="new-athlete-page-header">
                <Link legacyBehavior href="/"><a id="new-athlete-page-logo">Logo</a></Link>
                <nav id="new-athlete-page-nav">
                    <Link legacyBehavior href="/"><a id="new-athlete-page-back">Tilbake</a></Link>
                    <Notifications></Notifications>
                </nav>
            </header>

            <form id="new-athlete-page-create" onSubmit={handleSubmit}>
                <p id="new-athlete-page-title">Ny utøver</p>
                <table id="new-athlete-page-create-table">
                    <tr className="new-athlete-page-create-point">
                        <td className="new-athlete-page-create-point-title">
                            Fornavn:
                        </td>
                        <td>
                            <input
                                name="firstName"
                                value={athlete.firstName}
                                onChange={handleChange}
                                className="new-athlete-page-create-point-input"/>
                        </td>
                    </tr>
                    <tr className="new-athlete-page-create-point">
                        <td className="new-athlete-page-create-point-title">
                            Etternavn:
                        </td>
                        <td>
                            <input
                                name="lastName"
                                value={athlete.lastName}
                                onChange={handleChange}
                                className="new-athlete-page-create-point-input"/>
                        </td>
                    </tr>
                    <tr className="new-athlete-page-create-point">
                        <td className="new-athlete-page-create-point-title">
                            Kjønn:
                        </td>
                        <td>
                            <input
                                name="gender"
                                value={athlete.gender}
                                onChange={handleChange}
                                className="new-athlete-page-create-point-input"/>
                        </td>
                    </tr>
                    <tr className="new-athlete-page-create-point">
                        <td className="new-athlete-page-create-point-title">
                            Sport:
                        </td>
                        <td>
                            <input
                                name="sport"
                                value={athlete.sport}
                                onChange={handleChange}
                                className="new-athlete-page-create-point-input"/>
                        </td>
                    </tr>
                    <tr className="new-athlete-page-create-point">
                        <td className="new-athlete-page-create-point-title">
                            Maks puls:
                        </td>
                        <td>
                            <input
                                name="maxHeartRate"
                                value={athlete.maxHeartRate}
                                onChange={handleChange}
                                className="new-athlete-page-create-point-input"/>
                        </td>
                    </tr>
                    <tr className="new-athlete-page-create-point">
                        <td className="new-athlete-page-create-point-title">
                            Terskel watt:
                        </td>
                        <td>
                            <input
                                name="thresholdWattage"
                                value={athlete.thresholdWattage}
                                onChange={handleChange}
                                className="new-athlete-page-create-point-input"/>
                        </td>
                    </tr>
                    <tr className="new-athlete-page-create-point">
                        <td className="new-athlete-page-create-point-title">
                            Terskel fart:
                        </td>
                        <td>
                            <input
                                name="thresholdSpeed"
                                value={athlete.thresholdSpeed}
                                onChange={handleChange}
                                className="new-athlete-page-create-point-input"/>
                        </td>
                    </tr>
                </table>
                <div id="new-athlete-page-save-section">
                    <button type ="submit" id="new-athlete-page-save-button">Save</button>
                </div>
            </form>
        </div>
    )
}