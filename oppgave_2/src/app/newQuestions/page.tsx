"use client"

import "@/styles/NewQuestionsPageStyle.css"
import Link from "next/link"

export default function NewQuestionsPage() {
    return (
        <div id="new-questions-page">
            <header id="new-questions-page-header">
                <Link legacyBehavior href="/"><a id="new-questions-page-logo">Logo</a></Link>
                <p id="new-questions-page-title">Opprett spørsmål</p>
                <Link legacyBehavior href="/"><a id="new-questions-page-back">Tilbake</a></Link>
            </header>
        </div>
    )
}