"use client"

import Link from "next/link"
import "@/styles/NewSessionTemplatePageStyle.css"

export default function NewSessionTemplatePage() {
    return (
        <div id="new-session-template-page">
            <header id="new-session-template-page-header">
                <Link legacyBehavior href="/"><a id="new-session-template-page-logo">Logo</a></Link>
                <p id="new-session-template-page-title">Ny økt mal</p>
                <Link legacyBehavior href="/"><a id="new-session-template-page-back">Tilbake</a></Link>
            </header>
        </div>
    )
}