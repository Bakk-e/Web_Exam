"use client"

import Competition from "@/components/Competition";
import EditAthlete from "@/components/EditAthlete";
import EditCompetition from "@/components/EditCompetition";
import EditGoal from "@/components/EditGoal";
import Goal from "@/components/Goal";
import Session from "@/components/Session";
import "@/styles/AthletePageStyle.css"
import Link from "next/link"
import { useState } from "react"

const initialState = {open: false};

export default function AthletePage({ params }: { params: { id: string }}) {
    const [isEditOpen, setIsEditOpen] = useState(initialState.open);
    const [isEditCompetitionOpen, setIsCompetitionOpen] = useState(initialState.open);
    const [isEditGoalOpen, setIsEditGoalOpen] = useState(initialState.open);

    function toggleEdit() {
        setIsEditOpen(!isEditOpen);
    }

    function toggleEditCompetition() {
        setIsCompetitionOpen(!isEditCompetitionOpen);
    }

    function toggleEditGoal() {
        setIsEditGoalOpen(!isEditGoalOpen);
    }

    return (
        <div id="athlete-page">
            <header id="athlete-page-header">
                <Link legacyBehavior href="/"><a id="athlete-page-logo">Logo</a></Link>
                <p id="athlete-page-id">{params.id}</p>
                <nav id="athlete-page-nav">
                    <Link legacyBehavior href="/"><a id="athlete-page-back">Tilbake</a></Link>
                    <Link legacyBehavior href="/newSession"><a id="athlete-page-new-session">Ny økt</a></Link>
                </nav>
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
            <div id="athlete-page-competitions-and-goals">
                <p id="athlete-page-competitions-title">Konkuranser: </p>
                <div id="athlete-page-competitions">
                    <Competition competitionId="Abc-123-456" toggleEditCompetition={toggleEditCompetition}></Competition>
                    <Competition competitionId="Abc-123-456" toggleEditCompetition={toggleEditCompetition}></Competition>
                    <Competition competitionId="Abc-123-456" toggleEditCompetition={toggleEditCompetition}></Competition>
                </div>
                <p id="athlete-page-goals-title">Mål: </p>
                <div id="athlete-page-goals">
                    <Goal goalId="Abc-123-456" toggleEditGoal={toggleEditGoal}></Goal>
                    <Goal goalId="Abc-123-456" toggleEditGoal={toggleEditGoal}></Goal>
                    <Goal goalId="Abc-123-456" toggleEditGoal={toggleEditGoal}></Goal>
                </div>
            </div>
            <div id="athlete-page-sessions-spacer">
                <div id="athlete-page-sessions">
                    <p id="athlete-page-sessions-title">Økter: </p>
                    <table id="athlete-page-sessions-table">
                        <tr>
                            <th>Dato</th>
                            <th>Navn</th>
                            <th>Type</th>
                            <th>Tags</th>
                            <th>Status</th>
                            <th>Last ned</th>
                            <th>Dupliser</th>
                            <th>Edit</th>
                            <th>Slett</th>
                        </tr>
                        <Session sessionId="Abc-123-456"></Session>
                        <Session sessionId="Abc-123-456"></Session>
                        <Session sessionId="Abc-123-456"></Session>
                    </table>
                </div>
            </div>

            <EditAthlete id={params.id} isEditOpen={isEditOpen} toggleEdit={toggleEdit}></EditAthlete>
            <EditCompetition competitionId="Abc-123-456" isEditCompetitionOpen={isEditCompetitionOpen} toggleEditCompetition={toggleEditCompetition}></EditCompetition>
            <EditGoal goalId="Abc-123-456" isEditGoalOpen={isEditGoalOpen} toggleEditGoal={toggleEditGoal}></EditGoal>
        </div>
    )
}