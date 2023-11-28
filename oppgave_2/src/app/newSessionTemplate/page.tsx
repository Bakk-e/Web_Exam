"use client"

import Link from "next/link"
import "@/styles/NewSessionTemplatePageStyle.css"
import Notifications from "@/components/Notifications"

export default function NewSessionTemplatePage() {
    return (
        <div id="new-session-template-page">
            <header id="new-session-template-page-header">
                <Link legacyBehavior href="/"><a id="new-session-template-page-logo">Logo</a></Link>
                <nav id="new-session-template-page-nav">
                    <Link legacyBehavior href="/"><a id="new-session-template-page-back">Tilbake</a></Link>
                    <Notifications></Notifications>
                </nav>
            </header>
            <div id="new-session-template-page-create">
                <p id="new-session-template-page-title">Ny økt mal</p>
            </div>
        </div>
    )
}