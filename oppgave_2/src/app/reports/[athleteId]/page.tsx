"use client"

import Notifications from "@/components/Notifications"
import ReportComponent from "@/components/ReportComponent"
import "@/styles/ReportsPageStyle.css"
import { Athlete, Session } from "@/types"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ReportsPage({params}: {params: {athleteId: string}}) {
    const [sessions, setSessions] = useState<Session[]>([]);

    useEffect(() => {
        const getSessions = async () => {
            const response = await fetch(`/api/athletes/${params.athleteId}`, {
                method: "get",
            });
            const result = (await response.json()) as {data: Athlete};
            let sessionsTemp: Session[] = [];
            if (result.data.sessions) {
                for (const session of result.data.sessions) {
                    if (session.report && session.report.status != "no") {
                        sessionsTemp.push(session);
                    };
                };
            };
            setSessions(sessionsTemp);
        };
        getSessions();
    }, []);

    return (
        <div id="reports-page">
            <header id="reports-page-header">
                <Link legacyBehavior href="/"><a id="reports-page-logo">Logo</a></Link>
                <nav id="reports-page-nav">
                    <Link legacyBehavior href="/"><a id="reports-page-back">Tilbake</a></Link>
                    <Notifications></Notifications>
                </nav>
            </header>
            <div id="reports-page-info">
                <p id="reports-page-title">Rapporter</p>
                <div id="reports-page-reports">
                    <table>
                        <tr>
                            <th>Dato</th>
                            <th>Navn</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Åpne</th>
                        </tr>
                        {sessions.map((session) => (
                            <ReportComponent session={session} athleteId={params.athleteId}></ReportComponent>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    )
}