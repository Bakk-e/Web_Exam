"use client"

import Notifications from "@/components/Notifications";
import Link from "next/link";
import "@/styles/ReportPageStyle.css"
import { useEffect, useState } from "react";
import { Athlete, ReportIntervalInfo, Session } from "@/types";
import { DateToString } from "@/components/Functions";
import ReportPageInterval from "@/components/ReportPageInterval";

export default function Report({params}: {params: {athleteId: string, sessionId: string}}) {
    const [session, setSession] = useState<Session>();
    const [intervals, setIntervals] = useState<ReportIntervalInfo[]>([])

    useEffect(() => {
        const getSessions = async () => {
            const response = await fetch(`/api/athletes/${params.athleteId}`, {
                method: "get",
            });
            const result = (await response.json()) as {data: Athlete};
            let sessionsTemp: Session[] = [];
            if (result.data.sessions) {
                setSession(result.data.sessions.find(session => session.id === params.sessionId));
            };
            let intervalsTemp: ReportIntervalInfo[] = [];
            if (session?.intervals && session.report?.reportIntervals) {
                for (let i = 0; i < session?.intervals?.length; i++) {
                    intervalsTemp.push({
                        durationExpected: session.intervals[i].duration,
                        intensityZone: session.intervals[i].intensityZone,
                        minIntensity: session.report.reportIntervals[i].minIntensity,
                        maxIntensity: session.report.reportIntervals[i].maxIntensity,
                        avrageIntensity: session.report.reportIntervals[i].avrageIntensity,
                        minHeartRate: session.report.reportIntervals[i].minHeartRate,
                        maxHeartRate: session.report.reportIntervals[i].maxHeartRate,
                        avrageHeartRate: session.report.reportIntervals[i].avrageHeartRate,
                        minSpeed: session.report.reportIntervals[i].minSpeed,
                        maxSpeed: session.report.reportIntervals[i].maxSpeed,
                        avrageSpeed: session.report.reportIntervals[i].avrageSpeed,
                        minWattage: session.report.reportIntervals[i].minWattage,
                        maxWattage: session.report.reportIntervals[i].maxWattage,
                        avrageWattage: session.report.reportIntervals[i].avrageWattage,
                        durationAchieved: session.report.reportIntervals[i].duration
                    });
                };
            };
            setIntervals(intervalsTemp);
        };
        getSessions();
    }, []);

    return (
        <div id="report-page">
            <header id="report-page-header">
                <Link legacyBehavior href="/"><a id="report-page-logo">Logo</a></Link>
                <nav id="report-page-nav">
                    <Link legacyBehavior href="/"><a id="report-page-back">Tilbake</a></Link>
                    <Notifications></Notifications>
                </nav>
            </header>
            <div id="report-page-info">
                <p id="report-page-id">Report</p>
                <table id="report-page-table">
                    <tr>
                        <td>Navn:</td>
                        <th>{session?.title}</th>
                    </tr>
                    <tr>
                        <td>Dato:</td>
                        {session?.date ? (
                            <th>{DateToString(session?.date?.toString())}</th>
                        ) : (
                            <th>Null</th>
                        )}
                    </tr>
                    <tr>
                        <td>Type:</td>
                        <th>{session?.type}</th>
                    </tr>
                    <tr>
                        <td>Status:</td>
                        <th>{session?.report?.status}</th>
                    </tr>
                </table>
                <div id="report-page-intervals">
                    <p>Intervaller:</p>
                    {intervals.map((interval) => (
                        <ReportPageInterval reportIntervalInfo={interval}></ReportPageInterval>
                    ))}
                </div>
                <div id="report-page-questions">
                    <p>Spørsmål:</p>
                    {session?.questions?.map((question) => (
                        <div className="report-page-question-card">
                            <p id="report-page-question-card-question">Tekst: {question.text}</p>
                            <p id="report-page-question-card-answer">Svar: {question.answer}</p>
                        </div>
                    ))}
                </div>
                <div id="report-page-comment-section">
                    <p>Kommentar:</p>
                    <p>{session?.report?.comment}</p>
                </div>
            </div>
        </div>
    )
}