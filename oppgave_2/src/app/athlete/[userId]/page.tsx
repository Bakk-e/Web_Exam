"use client"

import CompetitionCard from "@/components/CompetitionCard";
import EditAthlete from "@/components/EditAthlete";
import EditCompetition from "@/components/EditCompetition";
import EditGoal from "@/components/EditGoal";
import { DateToNumber, NumbersToLetters } from "@/components/Functions";
import GoalCard from "@/components/GoalCard";
import Notifications from "@/components/Notifications";
import ViewSession from "@/components/ViewSession";
import "@/styles/AthletePageStyle.css"
import { Athlete, Competition, Goal, Activity } from "@/types";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

const initialState = {open: false};

export default function AthletePage({ params }: { params: { userId: string }}) {
    const availableReportFilters: string[] = ["ingen (WIP)", "no", "low", "normal", "high"];
    const [isEditOpen, setIsEditOpen] = useState(initialState.open);
    const [isEditCompetitionOpen, setIsCompetitionOpen] = useState(initialState.open);
    const [isEditGoalOpen, setIsEditGoalOpen] = useState(initialState.open);
    const [editingCompetition, setEditingCompetition] = useState<Competition>({});
    const [editingGoal, setEditingGoal] = useState<Goal>({});
    const [athlete, setAthlete] = useState<Athlete>();
    const [searchedSessions, setSearchedSessions] = useState<Activity[]>([{}]);
    const [chosenTypes, setChosenTypes] = useState<string[]>([]);
    const [chosenTags, setChosenTags] = useState<string[]>([]);
    const [reportFilters, setReportFilters] = useState<string[]>([]);
    const [sessionTypes, setSessionTypes] = useState<string[]>([]);
    const [sessionTags, setSessionTags] = useState<string[]>([]);
    const [sortOrder, setSortOrder] = useState<string>("ascending");
    const [acendButton, setAcendButton] = useState<boolean>(true);
    const [dcendButton, setDcendButton] = useState<boolean>(false);
    const [selectedSessions, setSelectedSessions] = useState<Activity[]>([]);
    const [selectedSessionType, setSelectedSessionType] = useState<string>("");

    const router = useRouter()

    useEffect(() => {
        const getAthlete = async () => {
            
            console.log("Fetching athlete with userId: ", params.userId);
            const response = await fetch(`/api/athletes/${params.userId}`, {
                method: "GET",
            });
            const result = (await response.json()) as {data: Athlete};

            console.log("API response: ", result.data.meta)
            
            setAthlete(result.data);
            let typesTemp: string[] = [];
            let tagsTemp: string[] = [];
            if (result.data.activities) {
                for (const activity of result.data.activities) {
                    if (activity.tags) {
                        if (!typesTemp.includes(activity.tags.split(",")[0])) {
                            typesTemp.push(activity.tags.split(",")[0]);
                        };
                    };
                    if (activity.tags) {
                        if (!tagsTemp.includes(activity.tags.split(",")[1])) {
                            tagsTemp.push(activity.tags.split(",")[1]);
                        }
                        if (!tagsTemp.includes(activity.tags.split(",")[2])) {
                            tagsTemp.push(activity.tags.split(",")[2]);
                        }
                    };
                };
            };
            setSessionTypes(typesTemp);
            setSessionTags(tagsTemp);
            let tempSortedSessions: Activity[] = [];
            if (result.data.activities) {
                tempSortedSessions = [...result.data.activities];

                if (chosenTypes.length > 0) {
                    tempSortedSessions = tempSortedSessions.filter((session) => (
                        session.tags && (
                            chosenTypes.includes(session.tags.split(",")[0])
                        )
                    ));
                };
                if (selectedSessionType !== "") {
                    tempSortedSessions = tempSortedSessions.filter((session) => session.tags?.split(",")[0] === selectedSessionType)
                }
                if (chosenTags.length > 0) {
                    tempSortedSessions = tempSortedSessions.filter((session) => (
                        chosenTags.every((tag) => session.tags?.includes(tag))
                    ));
                };
                if (reportFilters.length > 0) {
                    tempSortedSessions = tempSortedSessions.filter((session) => (
                        session.report && session.report?.status && (
                            reportFilters.includes(session.report.status)
                        )
                    ));
                };
                if (sortOrder === "ascending") {
                    tempSortedSessions.sort((a, b) => {
                        if (a.date && b.date) {
                            return  DateToNumber(a.date) - DateToNumber(b.date);
                        }
                        return 0;
                    });
                } else if (sortOrder === "descending") {
                    tempSortedSessions.sort((a, b) => {
                        if (a.date && b.date) {
                            return DateToNumber(b.date) - DateToNumber(a.date);
                        }
                        return 0;
                    });
                };
            };
            setSearchedSessions(tempSortedSessions);
        };
        getAthlete();
    }, [sortOrder, chosenTypes, chosenTags, reportFilters, selectedSessionType]);

    function toggleEdit() {
        setIsEditOpen(!isEditOpen);
    };

    function toggleEditCompetition() {
        setIsCompetitionOpen(!isEditCompetitionOpen);
    };

    function toggleEditGoal() {
        setIsEditGoalOpen(!isEditGoalOpen);
    };

    function displayClearAll() {
        return (chosenTypes.length > 0 || chosenTags.length > 0 || reportFilters.length > 0);
    }

    function handleClearAllButton() {
        setChosenTypes([]);
        setChosenTags([]);
        setReportFilters([]);
    }

    function handleTypeChange(e: any) {
        const selectedType: string = e.target.value;
        if (!chosenTypes.includes(selectedType)) {
            setChosenTypes([...chosenTypes, selectedType]);
        };
    };

    function handleTypeRemove(type: string) {
        const updatedParameter = chosenTypes.filter((t) => t !== type);
        setChosenTypes(updatedParameter);
    };

    function handleTagChange(e: any) {
        const selectedTag: string = e.target.value;
        if (!chosenTags.includes(selectedTag)) {
            setChosenTags([...chosenTags, selectedTag]);
        };
    };

    function handleTagRemove(tag: string) {
        const updatedParameter = chosenTags.filter((t) => t !== tag);
        setChosenTags(updatedParameter);
    };

    function handleReportChange(e: any) {
        const selectedReportStatus: string = e.target.value;
        if (!reportFilters.includes(selectedReportStatus)) {
            setReportFilters([...reportFilters, selectedReportStatus]);
        };
    };

    function handleReportRemove(status: string) {
        const updatedParameter = reportFilters.filter((s) => s !== status);
        setReportFilters(updatedParameter);
    };

    function handleButtonSort(e: any, order: string) {
        e.preventDefault();

        if (order === "ascending") {
            setAcendButton(true);
            setDcendButton(false);
            setSortOrder(order);
        } else if (order === "descending") {
            setAcendButton(false);
            setDcendButton(true);
            setSortOrder(order);
        }
    }

    function toggleSession(activity: Activity) {
        const isSelected = selectedSessions.some(item => item.id === activity.id);
        if (activity.report) {
            if (isSelected) {
                if (selectedSessions.length == 1) {
                    setSelectedSessionType("");
                }
                setSelectedSessions(selectedSessions.filter((item) => item.id !== activity.id));
            } else {
                if (selectedSessions.length == 0 && activity.type) {
                    setSelectedSessionType(activity.type);
                }
                setSelectedSessions([...selectedSessions, activity]);
            }
        }
        
    }

    function handleIsDisabled(activity: Activity) {
        if (selectedSessionType == "") {
            return false;
        } else {
            return selectedSessionType !== activity.type
        }
    }

    function handleAnalyzeButton() {
        const sessionsIds = selectedSessions.map((session) => session.id);
        const sessionsString = sessionsIds.join("+");
        router.push(`/analyzeSessions/${athlete?.id}/${sessionsString}`);
    }

    return (
        <div id="athlete-page">
            <header id="athlete-page-header">
                <Link legacyBehavior href="/"><a id="athlete-page-logo">Logo</a></Link>
                <nav id="athlete-page-nav">
                    <Link legacyBehavior href="/newSession/[athleteId]" as={`/newSession/${params.userId}`}><a id="athlete-page-new-session">Ny Økt</a></Link>
                    <Link legacyBehavior href="/"><a id="athlete-page-back">Tilbake</a></Link>
                    <Notifications></Notifications>
                </nav>
            </header>
            <div id="athlete-page-info">
                <p id="athlete-page-id">{params.userId}</p>
                <p id="athlete-page-info-gender">Kjønn: {athlete?.gender}</p>
                <p id="athlete-page-info-sport">Sport: {athlete?.sport}</p>
                <p id="athlete-page-info-heartrate">Maks puls: {athlete?.meta?.heartrate}</p>
                <p id="athlete-page-info-wattage">Terskel watt: {athlete?.meta?.watt}W</p>
                <p id="athlete-page-info-speed">Terskel fart: {athlete?.meta?.speed} km/h</p>
                <div id="athlete-page-inteval-zones">
                    <p id="athlete-page-inteval-zones-title">Intervall soner:</p>
                    <table id="athlete-page-inteval-zones-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>50%</th>
                                <th>60%</th>
                                <th>70%</th>
                                <th>80%</th>
                                <th>90%</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Puls</th>
                                {athlete && athlete.meta?.heartrate !== undefined && (
                                    <>
                                        <td>{((athlete.meta?.heartrate * 0.5).toFixed(0))}</td>
                                        <td>{((athlete.meta?.heartrate * 0.6).toFixed(0))}</td>
                                        <td>{((athlete.meta?.heartrate * 0.7).toFixed(0))}</td>
                                        <td>{((athlete.meta?.heartrate * 0.8).toFixed(0))}</td>
                                        <td>{((athlete.meta?.heartrate * 0.9).toFixed(0))}</td>
                                    </>
                                )}
                            </tr>
                            <tr>
                                <th>Watt</th>
                                {athlete && athlete.meta?.watt !== undefined && (
                                    <>
                                        <td>{((athlete.meta?.watt * 0.5).toFixed(0))}</td>
                                        <td>{((athlete.meta?.watt * 0.6).toFixed(0))}</td>
                                        <td>{((athlete.meta?.watt * 0.7).toFixed(0))}</td>
                                        <td>{((athlete.meta?.watt * 0.8).toFixed(0))}</td>
                                        <td>{((athlete.meta?.watt * 0.9).toFixed(0))}</td>
                                    </>
                                )}
                            </tr>
                            <tr>
                                <th>Fart</th>
                                {athlete && athlete.meta?.speed !== undefined && (
                                    <>
                                        <td>{((athlete.meta?.speed * 0.5).toFixed(1))}</td>
                                        <td>{((athlete.meta?.speed * 0.6).toFixed(1))}</td>
                                        <td>{((athlete.meta?.speed * 0.7).toFixed(1))}</td>
                                        <td>{((athlete.meta?.speed * 0.8).toFixed(1))}</td>
                                        <td>{((athlete.meta?.speed * 0.9).toFixed(1))}</td>
                                    </>
                                )}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div id="athlete-page-edit-section">
                <button id="athlete-page-edit-button" onClick={toggleEdit}>Edit</button>
            </div>
            <div id="athlete-page-competitions-and-goals">
                <p id="athlete-page-competitions-title">Konkuranser: </p>
                <div className={`athlete-page-competitions ${athlete?.competitions && athlete.competitions.length !== 0 ? NumbersToLetters(athlete.competitions.length) : ""}`}>
                    {athlete?.competitions?.map((competition) => (
                        <CompetitionCard competition={competition} toggleEditCompetition={toggleEditCompetition} setEditingCompetiion={setEditingCompetition}></CompetitionCard>
                    ))}
                    {(athlete && athlete.competitions) ? (
                        athlete.competitions.length < 3 && (
                        <div id="athlete-page-competitions-card-add">
                            <Link legacyBehavior href="/newCompetition/[athleteId]" as={`/newCompetition/${params.userId}`}><a id="athlete-page-competitions-card-add-button">Legg til</a></Link>
                        </div>
                        )
                    ) : (
                        <div id="athlete-page-competitions-card-add">
                            <Link legacyBehavior href="/newCompetition/[athleteId]" as={`/newCompetition/${params.userId}`}><a id="athlete-page-competitions-card-add-button">Legg til</a></Link>
                        </div>
                    )}
                </div>
                <p id="athlete-page-goals-title">Mål: </p>
                <div className={`athlete-page-goals ${athlete?.goals && athlete.goals.length !== 0 ? NumbersToLetters(athlete.goals.length) : ""}`}>
                    {athlete?.goals?.map((goal) => (
                        <GoalCard goal={goal} toggleEditGoal={toggleEditGoal} setEditingGoal={setEditingGoal}></GoalCard>
                    ))}
                    {(athlete && athlete.goals) ? (
                        athlete.goals.length < 3 && (
                            <div id="athlete-page-goals-card-add">
                                <Link legacyBehavior href="/newGoal/[athleteId]" as={`/newGoal/${params.userId}`}><a id="athlete-page-goals-card-add-button">Legg til</a></Link>
                            </div>
                        )
                    ) : (
                        <div id="athlete-page-goals-card-add">
                            <Link legacyBehavior href="/newGoal/[athleteId]" as={`/newGoal/${params.userId}`}><a id="athlete-page-goals-card-add-button">Legg til</a></Link>
                        </div>
                    )}
                </div>
            </div>
            <div id="athlete-page-sessions-spacer">
                <div id="athlete-page-sessions">
                    <p id="athlete-page-sessions-title">Økter: </p>
                    <div id="athlete-page-sessions-filters">
                        <p id="athlete-page-sessions-filters-title">Filter</p>
                        <div id="athlete-page-sessions-filters-section">
                            <div id="athlete-page-sessions-filters-date">
                                <p id="athlete-page-sessions-filters-date-title">Dato:</p>
                                <button className={`athlete-page-sessions-filters-date-acend ${acendButton ? "pressed" : ""}`} onClick={(e) => handleButtonSort(e, "ascending")}>Stig</button>
                                <button className={`athlete-page-sessions-filters-date-dcend ${dcendButton ? "pressed" : ""}`} onClick={(e) => handleButtonSort(e, "descending")}>Synk</button>
                            </div>
                            <div id="athlete-page-sessions-filters-dropdowns">
                                {selectedSessionType === "" && (
                                    <div id="athlete-page-sessions-filters-dropdowns-type">
                                        <p id="athlete-page-sessions-filters-dropdowns-type-title">Type</p>
                                        <select id="athlete-page-sessions-filters-dropdowns-type-select" onChange={handleTypeChange} value="">
                                            <option value="" disabled>Any</option>
                                            {sessionTypes.map((type) => (
                                                !chosenTypes.includes(type) && (
                                                    <option key={type} value={type}>{type}</option>
                                                )
                                            ))}
                                        </select>
                                    </div>
                                )}
                                <div id="athlete-page-sessions-filters-dropdowns-tags"> 
                                    <p id="athlete-page-sessions-filters-dropdowns-tags-title">Tags</p>
                                    <select id="athlete-page-sessions-filters-dropdowns-tags-select" onChange={handleTagChange} value="">
                                    <option value="" disabled>Any</option>
                                        {sessionTags.map((tag) => (
                                            !chosenTags.includes(tag) && (
                                                <option key={tag} value={tag}>{tag}</option>
                                            )
                                        ))}
                                    </select>
                                </div>
                                <div id="athlete-page-sessions-filters-dropdowns-report">
                                    <p id="athlete-page-sessions-filters-dropdowns-report-title">Rapport</p>
                                    <select id="athlete-page-sessions-filters-dropdowns-report-select" onChange={handleReportChange} value="">
                                        <option value="" disabled>Any</option>
                                        {availableReportFilters.map((status) => (
                                            !reportFilters.includes(status) && (
                                                <option key={status} value={status}>{status}</option>
                                            )
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div id="athlete-page-sessions-selected-type">
                            {selectedSessionType !== "" && (
                                <p>Type: {selectedSessionType}</p>
                            )}
                        </div>
                        <div id="athlete-page-sessions-filters-dropdowns-clear-all">
                            {displayClearAll() && (
                                <button id="athlete-page-sessions-filters-dropdowns-clear-all-button" onClick={handleClearAllButton}>Clear all</button>
                            )}
                        </div>
                        <div id="athlete-page-sessions-filters-dropdowns-chosen">
                            <ul>
                                {chosenTypes.map((type) => (
                                    <li key={type}>
                                        {type} <button onClick={() => handleTypeRemove(type)}>x</button>
                                    </li>
                                ))}
                                {chosenTags.map((tag) => (
                                    <li key={tag}>
                                        {tag} <button onClick={() => handleTagRemove(tag)}>x</button>
                                    </li>
                                ))}
                                {reportFilters.map((status) => (
                                    <li key={status}>
                                        {status} <button onClick={() => handleReportRemove(status)}>x</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <table id="athlete-page-sessions-table">
                        <thead>
                            <tr>
                                <th>Dato</th>
                                <th>Navn</th>
                                <th>Type</th>
                                <th>Tags</th>
                                <th>Åpne</th>
                                <th>Status</th>
                                <th>Rapporter</th>
                                <th>Last ned</th>
                                <th>Dupliser</th>
                                <th>Edit</th>
                                <th>Slett</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchedSessions.map((session) => (
                                <ViewSession key={params.userId + session.id} athleteId={params.userId} session={session} toggleSession={toggleSession} isChecked={selectedSessions.some(item => item.id === session.id)} disabled={handleIsDisabled(session)}></ViewSession>
                            ))}
                        </tbody>
                    </table>
                    <div id="athlete-page-sessions-analyze">
                        {selectedSessions.length > 1 ? (
                            <button id="athlete-page-sessions-analyze-button" onClick={handleAnalyzeButton}>Analyser: {selectedSessions.length}</button>
                        ) : (
                            <button id="athlete-page-sessions-analyze-button-disabled" disabled>Analyser: {selectedSessions.length}</button>
                        )}
                    </div>
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