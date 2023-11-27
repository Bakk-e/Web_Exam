"use client"

import Notifications from "@/components/Notifications"
import Link from "next/link"

export default function NewReport() {
    return (
        <div id="new-report-page">
            <header id="report-page-header">
                <Link legacyBehavior href="/"><a id="report-page-logo">Logo</a></Link>
                <nav id="report-page-nav">
                    <Link legacyBehavior href="/"><a id="report-page-back">Tilbake</a></Link>
                    <Notifications></Notifications>
                </nav>
            </header>
        </div>
    )
}