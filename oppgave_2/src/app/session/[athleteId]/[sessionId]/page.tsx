"use client"

import Notifications from "@/components/Notifications"
import Link from "next/link"
import "@/styles/SessionPageStyle.css"
import { useEffect, useState } from "react";
import { Athlete, Session } from "@/types";
import { DateToString } from "@/components/Functions";
import ViewInterval from "@/components/ViewInterval";

export default function Session({params}: {params: {athleteId: string, sessionId: string}}) {
    const [session, setSession] = useState<Session>({});

    useEffect(() => {
        const getSession = async () => {
            const response = await fetch(`/api/athletes/${params.athleteId}`, {
                method: "get",
            });
            const result = (await response.json()) as {data: Athlete};
            const sessionTemp = result.data.sessions?.find(session => session.id === params.sessionId);
            if (sessionTemp) {
                setSession(sessionTemp);
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
                <p id="session-page-title">Økt: {session.title}</p>
                <table>
                    <tr>
                        <th>Titel: </th>
                        <td>{session.title}</td>
                    </tr>
                    <tr>
                        <th>Dato: </th>
                        {session.date ? (
                            <td>Dato: {DateToString(session.date?.toString())}</td>
                        ) : (
                            <td>Dato: Null</td>
                        )}
                    </tr>
                    <tr>
                        <th>Type: </th>
                        <td>{session.type}</td>
                    </tr>
                    <tr>
                        <th>Tags: </th>
                        <td>{session.tags?.join(", ")}</td>
                    </tr>
                    <tr>
                        <th>Rapport status: </th>
                        <td>{session.report?.status}</td>
                    </tr>
                </table>
                <div id="intervals">
                    <p>Intervaller: </p>
                    {session.intervals?.map((interval) => (
                        <ViewInterval interval={interval}></ViewInterval>
                    ))}
                </div>
            </div>
        </div>
    )
}