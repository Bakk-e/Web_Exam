"use client"

import Notifications from "@/components/Notifications"
import ReportComponent from "@/components/ReportComponent"
import "@/styles/ReportsPageStyle.css"
import { Athlete, Activity } from "@/types"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ReportsPage({params}: {params: {athleteId: string}}) {
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        const getSessions = async () => {
            const response = await fetch(`/api/athletes/${params.athleteId}`, {
                method: "get",
            });
            const result = (await response.json()) as {data: Athlete};
            let sessionsTemp: Activity[] = [];
            if (result.data.activities) {
                for (const session of result.data.activities) {
                    if (session.report && session.report.status != "no") {
                        sessionsTemp.push(session);
                    };
                };
            };
            setActivities(sessionsTemp);
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
                    <table id="reports-page-reports-table">
                        <thead>
                            <tr className="reports-page-reports-point">
                                <th className="reports-page-reports-titel">Dato</th>
                                <th className="reports-page-reports-titel">Navn</th>
                                <th className="reports-page-reports-titel">Type</th>
                                <th className="reports-page-reports-titel">Status</th>
                                <th className="reports-page-reports-titel">Åpne</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activities.map((session) => (
                                <ReportComponent key={session.id} session={session} athleteId={params.athleteId}></ReportComponent>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}