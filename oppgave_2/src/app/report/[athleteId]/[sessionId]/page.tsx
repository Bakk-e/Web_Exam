"use client"

import Notifications from "@/components/Notifications";
import Link from "next/link";
import "@/styles/ReportPageStyle.css"
import { useEffect, useState } from "react";
import { Athlete, ReportIntervalInfo, Activity } from "@/types";
import { DateToString } from "@/components/Functions";
import ReportPageInterval from "@/components/ReportPageInterval";

export default function Report({params}: {params: {athleteId: string, sessionId: string}}) {
    const [session, setSession] = useState<Activity>();
    const [intervals, setIntervals] = useState<ReportIntervalInfo[]>([])

    useEffect(() => {
        const getSessions = async () => {
            const response = await fetch(`/api/athletes/${params.athleteId}`, {
                method: "get",
            });
            const result = (await response.json()) as {data: Athlete};
            if (result.data.activities) {
                setSession(result.data.activities.find(session => session.id === params.sessionId));
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
                        avrageHeartRate: session.report.reportIntervals[i].averageHeartRate,
                        minSpeed: session.report.reportIntervals[i].minSpeed,
                        maxSpeed: session.report.reportIntervals[i].maxSpeed,
                        avrageSpeed: session.report.reportIntervals[i].averageSpeed,
                        minWattage: session.report.reportIntervals[i].minWattage,
                        maxWattage: session.report.reportIntervals[i].maxWattage,
                        avrageWattage: session.report.reportIntervals[i].averageWattage,
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
                <div id="report-page-table">
                    <div className="report-page-create-point">
                        <p className="report-page-create-point-titel">Navn:</p>
                        <p className="report-page-create-point-text">{session?.title}</p>
                    </div>
                    <div className="report-page-create-point">
                        <p className="report-page-create-point-titel">Dato:</p>
                        {session?.date ? (
                            <p className="report-page-create-point-text">{DateToString(session?.date?.toString())}</p>
                        ) : (
                            <p className="report-page-create-point-text">Null</p>
                        )}
                    </div>
                    <div className="report-page-create-point">
                        <p className="report-page-create-point-titel">Type:</p>
                        <p className="report-page-create-point-text">{session?.type}</p>
                    </div>
                    <div className="report-page-create-point">
                        <p className="report-page-create-point-titel">Status:</p>
                        <p className="report-page-create-point-text">{session?.report?.status}</p>
                    </div>
                </div>
                <div id="report-page-intervals">
                    <p id="report-page-intervals-titel">Intervaller:</p>
                    {intervals.map((interval) => (
                        <ReportPageInterval reportIntervalInfo={interval}></ReportPageInterval>
                    ))}
                </div>
                <div id="report-page-questions">
                    <p id="report-page-questions-titel">Spørsmål:</p>
                    {session?.questions?.map((question) => (
                        <div className="report-page-question-card">
                            <p className="report-page-question-card-question">Tekst: {question.text}</p>
                            <p className="report-page-question-card-answer">Svar: {question.answer}</p>
                        </div>
                    ))}
                </div>
                <div id="report-page-comment-section">
                    <p id="report-page-comment-section-titel">Kommentar:</p>
                    <p id="report-page-comment-section-text">{session?.report?.comment}</p>
                </div>
            </div>
        </div>
    )
}