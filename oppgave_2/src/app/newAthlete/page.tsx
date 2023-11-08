"use client"

import "@/styles/NewAthletePageStyle.css"
import Link from "next/link"

export default function NewAthletePage() {
    return (
        <div id="new-athlete-page">
            <header id="new-athlete-page-header">
                <Link legacyBehavior href="/"><a id="new-athlete-page-logo">Logo</a></Link>
                <p id="new-athlete-page-title">Ny utøver</p>
                <Link legacyBehavior href="/"><a id="new-athlete-page-back">Tilbake</a></Link>
            </header>
            <div>
                <table>
                    <tr className="new-athlete-page-edit-point">
                        <td className="new-athlete-page-edit-point-title">Fornavn: </td>
                        <td><input className="new-athlete-page-edit-point-input"/></td>
                    </tr>
                    <tr className="new-athlete-page-edit-point">
                        <td className="new-athlete-page-edit-point-title">Etternavn: </td>
                        <td><input className="new-athlete-page-edit-point-input"/></td>
                    </tr>
                    <tr className="new-athlete-page-edit-point">
                        <td className="new-athlete-page-edit-point-title">Kjønn: </td>
                        <td><input className="new-athlete-page-edit-point-input"/></td>
                    </tr>
                    <tr className="new-athlete-page-edit-point">
                        <td className="new-athlete-page-edit-point-title">Kjønn: </td>
                        <td><input className="new-athlete-page-edit-point-input"/></td>
                    </tr>
                    <tr className="new-athlete-page-edit-point">
                        <td className="new-athlete-page-edit-point-title">Sport: </td>
                        <td><input className="new-athlete-page-edit-point-input"/></td>
                    </tr>
                    <tr className="new-athlete-page-edit-point">
                        <td className="new-athlete-page-edit-point-title">Maks puls: </td>
                        <td><input className="new-athlete-page-edit-point-input"/></td>
                    </tr>
                    <tr className="new-athlete-page-edit-point">
                        <td className="new-athlete-page-edit-point-title">Terskel watt: </td>
                        <td><input className="new-athlete-page-edit-point-input"/></td>
                    </tr>
                    <tr className="new-athlete-page-edit-point">
                        <td className="new-athlete-page-edit-point-title">Terskel fart: </td>
                        <td><input className="new-athlete-page-edit-point-input"/></td>
                    </tr>
                </table>
            </div>
        </div>
    )
}