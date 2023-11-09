"use client"

import "@/styles/ReportsPageStyle.css"
import Link from "next/link"

export default function ReportsPage() {
    return (
        <div id="reports-page">
            <header id="reports-page-header">
                <Link legacyBehavior href="/"><a id="reports-page-logo">Logo</a></Link>
                <p id="reports-page-title">Rapporter</p>
                <Link legacyBehavior href="/"><a id="reports-page-back">Tilbake</a></Link>
            </header>
        </div>
    )
}