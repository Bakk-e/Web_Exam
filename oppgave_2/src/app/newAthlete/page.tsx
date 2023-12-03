"use client"

import Notifications from "@/components/Notifications"
import "@/styles/NewAthletePageStyle.css"
import Link from "next/link"

export default function NewAthletePage() {
    return (
        <div id="new-athlete-page">
            <header id="new-athlete-page-header">
                <Link legacyBehavior href="/"><a id="new-athlete-page-logo">Logo</a></Link>
                <nav id="new-athlete-page-nav">
                    <Link legacyBehavior href="/"><a id="new-athlete-page-back">Tilbake</a></Link>
                    <Notifications></Notifications>
                </nav>
            </header>
            <div id="new-athlete-page-create">
                <p id="new-athlete-page-title">Ny utøver</p>
                <table id="new-athlete-page-create-table">
                    <tr className="new-athlete-page-create-point">
                        <td className="new-athlete-page-create-point-title">Fornavn: </td>
                        <td><input className="new-athlete-page-create-point-input"/></td>
                    </tr>
                    <tr className="new-athlete-page-create-point">
                        <td className="new-athlete-page-create-point-title">Etternavn: </td>
                        <td><input className="new-athlete-page-create-point-input"/></td>
                    </tr>
                    <tr className="new-athlete-page-create-point">
                        <td className="new-athlete-page-create-point-title">Kjønn: </td>
                        <td><input className="new-athlete-page-create-point-input"/></td>
                    </tr>
                    <tr className="new-athlete-page-create-point">
                        <td className="new-athlete-page-create-point-title">Sport: </td>
                        <td><input className="new-athlete-page-create-point-input"/></td>
                    </tr>
                    <tr className="new-athlete-page-create-point">
                        <td className="new-athlete-page-create-point-title">Maks puls: </td>
                        <td><input className="new-athlete-page-create-point-input"/></td>
                    </tr>
                    <tr className="new-athlete-page-create-point">
                        <td className="new-athlete-page-create-point-title">Terskel watt: </td>
                        <td><input className="new-athlete-page-create-point-input"/></td>
                    </tr>
                    <tr className="new-athlete-page-create-point">
                        <td className="new-athlete-page-create-point-title">Terskel fart: </td>
                        <td><input className="new-athlete-page-create-point-input"/></td>
                    </tr>
                </table>
            </div>
            <div id="new-athlete-page-save-section">
                <button id="new-athlete-page-save-button">Save</button>
            </div>
        </div>
    )
}