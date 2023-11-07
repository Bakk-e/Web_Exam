"use client"

import EditAthlete from "@/components/EditAthlete";
import "@/styles/AthletePageStyle.css"
import Link from "next/link"
import { useState } from "react"

const initialState = {editOpen: false};

export default function AthletePage({ params }: { params: { id: string }}) {
    const [isEditOpen, setIsEditOpen] = useState(initialState.editOpen);

    function toggleEdit() {
        setIsEditOpen(!isEditOpen);
    }

    return (
        <div id="athlete-page">
            <header id="athlete-page-header">
                <a id="athlete-page-logo">Logo</a>
                <p id="athlete-page-id">{params.id}</p>
                <Link legacyBehavior href="/"><a id="athlete-page-back">Tilbake</a></Link>
            </header>
            <div id="athlete-page-info">
                <p id="athlete-page-info-gender">Kjønn: male</p>
                <p id="athlete-page-info-sport">Sport: cycling</p>
                <p id="athlete-page-info-heartrate">Maks puls: 120</p>
                <p id="athlete-page-info-wattage">Terskel watt: 23</p>
                <p id="athlete-page-info-speed">Terskel fart: 32kmh</p>
                <div id="athlete-page-inteval-zones">
                    <p id="athlete-page-inteval-zones-title">Intervall soner:</p>
                    <table id="athlete-page-inteval-zones-table">
                        <tr>
                            <th></th>
                            <th>50%</th>
                            <th>60%</th>
                            <th>70%</th>
                            <th>80%</th>
                            <th>90%</th>
                        </tr>
                        <tr>
                            <th>Puls</th>
                            <td>44</td>
                            <td>44</td>
                            <td>44</td>
                            <td>44</td>
                            <td>44</td>
                        </tr>
                        <tr>
                            <th>Watt</th>
                            <td>44</td>
                            <td>44</td>
                            <td>44</td>
                            <td>44</td>
                            <td>44</td>
                        </tr>
                        <tr>
                            <th>Fart</th>
                            <td>44</td>
                            <td>44</td>
                            <td>44</td>
                            <td>44</td>
                            <td>44</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div id="athlete-page-edit-section">
                <button id="athlete-page-edit-button" onClick={toggleEdit}>Edit</button>
            </div>
            <EditAthlete id={params.id} isEditOpen={isEditOpen} toggleEdit={toggleEdit}></EditAthlete>
        </div>
    )
}