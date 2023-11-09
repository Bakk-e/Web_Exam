"use client"

import Link from "next/link"
import "@/styles/NewSessionTemplatePageStyle.css"

export default function NewSessionTemplatePage() {
    return (
        <div id="new-session-page">
            <header id="new-session-page-header">
                <Link legacyBehavior href="/"><a id="new-session-page-logo">Logo</a></Link>
                <p id="new-session-page-title">Ny økt mal</p>
                <Link legacyBehavior href="/"><a id="new-session-page-back">Tilbake</a></Link>
            </header>
        </div>
    )
}