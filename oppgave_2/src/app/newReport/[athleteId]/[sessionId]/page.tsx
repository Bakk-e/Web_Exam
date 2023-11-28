"use client"

import Notifications from "@/components/Notifications";
import Link from "next/link";
import "@/styles/NewReportPageStyle.css"
import { useEffect, useState } from "react";
import { Athlete, Session } from "@/types";
import AnswerQuestion from "@/components/AnswerQuestion";
import AnswerInterval from "@/components/AnswerInterval";

export default function NewReport({params}: {params: {athleteId: string, sessionId: string}}) {
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
        <div id="new-report-page">
            <header id="new-report-page-header">
                <Link legacyBehavior href="/"><a id="new-report-page-logo">Logo</a></Link>
                <nav id="new-report-page-nav">
                    <Link legacyBehavior href="/"><a id="new-report-page-back">Tilbake</a></Link>
                    <Notifications></Notifications>
                </nav>
            </header>
            <div id="new-report-page-content">
                <p id="new-report-page-title">Rapport: {session?.title}</p>
                <p id="new-report-page-id">Id: {session?.id}</p>
                <div id="new-report-page-status-section">
                    <p>Status: </p>
                    <select>
                        <option>No</option>
                        <option>Low</option>
                        <option>Normal</option>
                        <option>High</option>
                    </select>
                </div>
                <div id="new-report-page-intervals-section">
                    {session.intervals?.map((interval) => (
                        <AnswerInterval interval={interval}></AnswerInterval>
                    ))}
                </div>
                <div id="new-report-page-questions-section">
                    {session.questions?.map((question) => (
                        <AnswerQuestion question={question}></AnswerQuestion>
                    ))}
                </div>
                <div id="new-report-page-comment-section">
                    <p>Kommentar: </p>
                    <textarea></textarea>
                </div>
            </div>
        </div>
    )
}