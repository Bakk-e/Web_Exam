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
        meta: {
            maxHeartRate : "",
            thresholdWattage : "",
            thresholdSpeed : "",
        }
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name in athlete.meta) {
            setAthlete({
                ...athlete,
                meta: {
                    ...athlete.meta,
                    [name]: value
                }
            });
        } else {
            setAthlete({
                ...athlete,
                [name]: value
            });
        }
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
                <div id="new-athlete-page-create-table">
                    <div className="new-athlete-page-create-point">
                        <p className="new-athlete-page-create-point-title">
                            Fornavn:
                        </p>
                        <input
                            name="firstName"
                            value={athlete.firstName}
                            onChange={handleChange}
                            className="new-athlete-page-create-point-input"/>
                    </div>
                    <div className="new-athlete-page-create-point">
                        <p className="new-athlete-page-create-point-title">
                            Etternavn:
                        </p>
                        <input
                            name="lastName"
                            value={athlete.lastName}
                            onChange={handleChange}
                            className="new-athlete-page-create-point-input"/>
                    </div>
                    <div className="new-athlete-page-create-point">
                        <p className="new-athlete-page-create-point-title">
                            Kjønn:
                        </p>
                        <input
                            name="gender"
                            value={athlete.gender}
                            onChange={handleChange}
                            className="new-athlete-page-create-point-input"/>
                    </div>
                    <div className="new-athlete-page-create-point">
                        <p className="new-athlete-page-create-point-title">
                            Sport:
                        </p>
                        <input
                            name="sport"
                            value={athlete.sport}
                            onChange={handleChange}
                            className="new-athlete-page-create-point-input"/>
                    </div>
                    <div className="new-athlete-page-create-point">
                        <p className="new-athlete-page-create-point-title">
                            Maks puls:
                        </p>
                            <input
                                name="maxHeartRate"
                                value={athlete.meta.maxHeartRate}
                                onChange={handleChange}
                                className="new-athlete-page-create-point-input"/>
                    </div>
                    <div className="new-athlete-page-create-point">
                        <p className="new-athlete-page-create-point-title">
                            Terskel watt:
                        </p>
                            <input
                                name="thresholdWattage"
                                value={athlete.meta.thresholdWattage}
                                onChange={handleChange}
                                className="new-athlete-page-create-point-input"/>
                    </div>
                    <div className="new-athlete-page-create-point">
                        <p className="new-athlete-page-create-point-title">
                            Terskel fart:
                        </p>
                            <input
                                name="thresholdSpeed"
                                value={athlete.meta.thresholdSpeed}
                                onChange={handleChange}
                                className="new-athlete-page-create-point-input"/>
                    </div>
                </div>
                <div id="new-athlete-page-save-section">
                    <button type ="submit" id="new-athlete-page-save-button">Save</button>
                </div>
            </form>
        </div>
    )
}