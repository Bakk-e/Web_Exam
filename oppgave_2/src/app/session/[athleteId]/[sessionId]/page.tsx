"use client"

import Notifications from "@/components/Notifications"
import Link from "next/link"
import "@/styles/SessionPageStyle.css"
import { useEffect, useState } from "react";
import { Athlete, Activity } from "@/types";
import { DateToString } from "@/components/Functions";
import ViewInterval from "@/components/ViewInterval";

export default function Session({params}: {params: {athleteId: string, activityId: string}}) {
    const [activity, setActivity] = useState<Activity>({});

    useEffect(() => {
        const getSession = async () => {
            const response = await fetch(`/api/athletes/${params.athleteId}`, {
                method: "get",
            });
            const result = (await response.json()) as {data: Athlete};
            const sessionTemp = result.data.activities?.find(activity => activity.id === params.activityId);
            if (sessionTemp) {
                setActivity(sessionTemp);
            };
        };
        getSession();
    }, []);

    return (
        <div id="session-page">
            <header id="session-page-header">
                <Link legacyBehavior href="/"><a id="session-page-logo">Logo</a></Link>
                <nav id="session-page-nav">
                    <Link legacyBehavior href="/athlete/[athleteId]" as={`/athlete/${params.athleteId}`}><a id="session-page-back">Tilbake</a></Link>
                    <Notifications></Notifications>
                </nav>
            </header>
            <div id="session-page-content">
                <p id="session-page-title">Økt: {activity.title}</p>
                <table id="session-page-table">
                    <tbody>
                        <tr className="session-page-table-point">
                            <th>Titel: </th>
                            <td>{session.title}</td>
                        </tr>
                        <tr className="session-page-table-point">
                            <th>Dato: </th>
                            {session.date ? (
                                <td>Dato: {DateToString(session.date?.toString())}</td>
                            ) : (
                                <td>Dato: Null</td>
                            )}
                        </tr>
                        <tr className="session-page-table-point">
                            <th>Type: </th>
                            <td>{session.type}</td>
                        </tr>
                        <tr className="session-page-table-point">
                            <th>Tags: </th>
                            <td>{session.tags?.join(", ")}</td>
                        </tr>
                        <tr className="session-page-table-point">
                            <th>Rapport status: </th>
                            <td>{session.report?.status}</td>
                        </tr>
                    </tbody>
                </table>
                <div id="session-page-intervals">
                    <p id="session-page-intervals-title">Intervaller: </p>
                    <table id="session-page-intervals-table">
                        <tbody>
                            {session.intervals?.map((interval, index) => (
                                <ViewInterval key={index} interval={interval}></ViewInterval>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}