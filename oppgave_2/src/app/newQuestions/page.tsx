"use client"

import Notifications from "@/components/Notifications"
import "@/styles/NewQuestionsPageStyle.css"
import Link from "next/link"

export default function NewQuestionsPage() {
    return (
        <div id="new-questions-page">
            <header id="new-questions-page-header">
                <Link legacyBehavior href="/"><a id="new-questions-page-logo">Logo</a></Link>
                <nav id="new-questions-page-nav">
                    <Link legacyBehavior href="/"><a id="new-questions-page-back">Tilbake</a></Link>
                    <Notifications></Notifications>
                </nav>
            </header>
            <div id="new-questions-page-create">
                <p id="new-questions-page-title">Opprett spørsmål</p>
                <table id="new-questions-page-create-table">
                    <tr className="new-questions-page-create-point">
                        <td className="new-questions-page-create-point-title">Text: </td>
                        <td><input className="new-questions-page-create-point-input"/></td>
                    </tr>
                    <tr className="new-questions-page-create-point">
                        <td className="new-questions-page-create-point-title">Svar type: </td>
                        <td>
                            <select id="new-questions-page-create-point-dropdown">
                                <option value="text">Tekst</option>
                                <option value="radio">Radio 1-10</option>
                                <option value="emoji">Emoji</option>
                            </select>
                        </td>
                    </tr>
                </table>
            </div>
            <div id="new-questions-page-save-section">
                <button id="new-questions-page-save-button">Save</button>
            </div>
        </div>
    )
}