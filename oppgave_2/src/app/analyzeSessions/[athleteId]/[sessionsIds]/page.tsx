"use client"

import Notifications from "@/components/Notifications";
import { Athlete, Session, Template } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import "@/styles/AnalyzeSessionsPageStyle.css"

export default function analyzeSessions({params}: {params: {athleteId: string, sessionsIds: string}}) {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [templates, setTemplates] = useState<Template[]>([]);
    
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
            let templatesTemp: Template[] = [];
            if (result.data.sessions) {
                for (const session of result.data.sessions) {
                    if (session.template) {
                        if (!templatesTemp.includes(session.template)) {
                            templatesTemp.push(session.template);
                        };
                    };
                };
            };
            setTemplates(templatesTemp);
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
                <p>Analyse</p>
                <div id="analyze-sesions-page-template-dropdown">
                    <select>
                            {templates.map((template) => (
                                <option key={template.id} value={template.id}>{template.title}</option>
                            ))}
                    </select>
                </div>
                <div>
                    <table>
                        <thead>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    )
}