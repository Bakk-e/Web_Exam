"use client"

import CompetitionCard from "@/components/CompetitionCard";
import EditAthlete from "@/components/EditAthlete";
import EditCompetition from "@/components/EditCompetition";
import EditGoal from "@/components/EditGoal";
import GoalCard from "@/components/GoalCard";
import Notifications from "@/components/Notifications";
import Session from "@/components/Session";
import "@/styles/AthletePageStyle.css"
import { Athlete, Competition, Goal } from "@/types";
import Link from "next/link"
import { useEffect, useState } from "react"

const initialState = {open: false};

export default function AthletePage({ params }: { params: { id: string }}) {
    const [isEditOpen, setIsEditOpen] = useState(initialState.open);
    const [isEditCompetitionOpen, setIsCompetitionOpen] = useState(initialState.open);
    const [isEditGoalOpen, setIsEditGoalOpen] = useState(initialState.open);
    const [editingCompetition, setEditingCompetition] = useState<Competition>({})
    const [editingGoal, setEditingGoal] = useState<Goal>({})
    const [athlete, setAthlete] = useState<Athlete>()

    useEffect(() => {
        const getAthlete = async () => {
          const response = await fetch(`/api/athletes/${params.id}`, {
            method: "get",
          });
          const result = (await response.json()) as {data: Athlete};
          setAthlete(result.data);
        }
        getAthlete();
    }, []);

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
                <nav id="athlete-page-nav">
                    <Link legacyBehavior href="/newSession/[athleteId]" as={`/newSession/${params.id}`}><a id="athlete-page-new-session">Ny Økt</a></Link>
                    <Link legacyBehavior href="/"><a id="athlete-page-back">Tilbake</a></Link>
                    <Notifications></Notifications>
                </nav>
            </header>
            <div id="athlete-page-info">
                <p id="athlete-page-id">{params.id}</p>
                <p id="athlete-page-info-gender">Kjønn: {athlete?.gender}</p>
                <p id="athlete-page-info-sport">Sport: {athlete?.sport}</p>
                <p id="athlete-page-info-heartrate">Maks puls: {athlete?.maxHeartRate}</p>
                <p id="athlete-page-info-wattage">Terskel watt: {athlete?.thresholdWattage}</p>
                <p id="athlete-page-info-speed">Terskel fart: {athlete?.thresholdSpeed}kmh</p>
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
                            {athlete && (
                                <>
                                    <td>{((athlete.maxHeartRate * 0.5).toFixed(0))}</td>
                                    <td>{((athlete.maxHeartRate * 0.6).toFixed(0))}</td>
                                    <td>{((athlete.maxHeartRate * 0.7).toFixed(0))}</td>
                                    <td>{((athlete.maxHeartRate * 0.8).toFixed(0))}</td>
                                    <td>{((athlete.maxHeartRate * 0.9).toFixed(0))}</td>
                                </>
                            )}
                        </tr>
                        <tr>
                            <th>Watt</th>
                            {athlete && (
                                <>
                                    <td>{((athlete.thresholdWattage * 0.5).toFixed(0))}</td>
                                    <td>{((athlete.thresholdWattage * 0.6).toFixed(0))}</td>
                                    <td>{((athlete.thresholdWattage * 0.7).toFixed(0))}</td>
                                    <td>{((athlete.thresholdWattage * 0.8).toFixed(0))}</td>
                                    <td>{((athlete.thresholdWattage * 0.9).toFixed(0))}</td>
                                </>
                            )}
                        </tr>
                        <tr>
                            <th>Fart</th>
                            {athlete && (
                                <>
                                    <td>{((athlete.thresholdSpeed * 0.5).toFixed(1))}</td>
                                    <td>{((athlete.thresholdSpeed * 0.6).toFixed(1))}</td>
                                    <td>{((athlete.thresholdSpeed * 0.7).toFixed(1))}</td>
                                    <td>{((athlete.thresholdSpeed * 0.8).toFixed(1))}</td>
                                    <td>{((athlete.thresholdSpeed * 0.9).toFixed(1))}</td>
                                </>
                            )}
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
                    {athlete?.competitions?.map((competition) => (
                        <CompetitionCard competition={competition} toggleEditCompetition={toggleEditCompetition} setEditingCompetiion={setEditingCompetition}></CompetitionCard>
                    ))}
                    {athlete && athlete.competitions && (
                        athlete.competitions.length < 3 && (
                        <div id="athlete-page-competitions-card-add">
                            <Link legacyBehavior href="/newCompetition/[athleteId]" as={`/newCompetition/${params.id}`}><a id="athlete-page-competitions-card-add-button">Legg til</a></Link>
                        </div>
                        )
                    )}
                </div>
                <p id="athlete-page-goals-title">Mål: </p>
                <div id="athlete-page-goals">
                    {athlete?.goals?.map((goal) => (
                        <GoalCard goal={goal} toggleEditGoal={toggleEditGoal} setEditingGoal={setEditingGoal}></GoalCard>
                    ))}
                    {athlete && athlete.goals && (
                        athlete.goals.length < 3 && (
                            <div id="athlete-page-goals-card-add">
                                <Link legacyBehavior href="/newGoal/[athleteId]" as={`/newGoal/${params.id}`}><a id="athlete-page-goals-card-add-button">Legg til</a></Link>
                            </div>
                        )
                    )}
                </div>
            </div>
            <div id="athlete-page-sessions-spacer">
                <div id="athlete-page-sessions">
                    <p id="athlete-page-sessions-title">Økter: </p>
                    <div id="athlete-page-sessions-filters">
                    </div>
                    <table id="athlete-page-sessions-table">
                        <tr>
                            <th>Dato</th>
                            <th>Navn</th>
                            <th>Type</th>
                            <th>Tags</th>
                            <th>Status</th>
                            <th>Rapporter</th>
                            <th>Last ned</th>
                            <th>Dupliser</th>
                            <th>Edit</th>
                            <th>Slett</th>
                        </tr>
                        {athlete?.sessions?.map((session) => (
                            <Session athleteId={params.id} session={session}></Session>
                        ))}
                    </table>
                </div>
            </div>
            {athlete && (
                <EditAthlete isEditOpen={isEditOpen} toggleEdit={toggleEdit} editingAthlete={athlete}></EditAthlete>
            )}
            <EditCompetition isEditCompetitionOpen={isEditCompetitionOpen} toggleEditCompetition={toggleEditCompetition} editingCompetition={editingCompetition}></EditCompetition>
            <EditGoal isEditGoalOpen={isEditGoalOpen} toggleEditGoal={toggleEditGoal} editingGoal={editingGoal}></EditGoal>
        </div>
    )
}