"use client"

import Notifications from "@/components/Notifications";
import { Athlete, Session } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import "@/styles/AnalyzeSessionsPageStyle.css"

export default function analyzeSessions({params}: {params: {athleteId: string, sessionsIds: string}}) {
    const [sessions, setSessions] = useState<Session[]>([]);
    
    useEffect(() => {
        const getSessions = async () => {
            const response = await fetch(`/api/athletes/${params.athleteId}`, {
                method: "get",
            });
            const result = (await response.json()) as {data: Athlete};
            const sessionIdsList = params.sessionsIds.split("%2B");
            const sessions = result.data.sessions?.filter(session => session.id !== undefined && sessionIdsList.includes(session.id));
            if (sessions) {
                setSessions(sessions);
            };
        };
        getSessions();
    }, []);

    return (
        <div id="analyze-sesions-page">
            <header id="analyze-sesions-page-header">
                <Link legacyBehavior href="/"><a id="analyze-sesions-page-logo">Logo</a></Link>
                <nav id="analyze-sesions-page-nav">
                    <Link legacyBehavior href="/athlete/[athleteId]" as={`/athlete/${params.athleteId}`}><a id="analyze-sesions-page-back">Tilbake</a></Link>
                    <Notifications></Notifications>
                </nav>
            </header>
            <div id="analyze-sesions-page-content">
            </div>
        </div>
    )
}