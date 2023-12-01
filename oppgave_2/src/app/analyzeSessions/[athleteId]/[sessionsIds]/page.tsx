"use client"

import { Athlete, Session } from "@/types";
import { useEffect, useState } from "react";

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
        </div>
    )
}