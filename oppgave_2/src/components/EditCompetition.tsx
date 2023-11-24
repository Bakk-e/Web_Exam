import { Competition } from "@/types";
import { useEffect, useState } from "react";
import { DateToStringAlternate } from "./Functions";

type editCompetitionProps = {
    isEditCompetitionOpen: boolean,
    toggleEditCompetition: any,
    editingCompetition: Competition
}

export default function EditCompetition(params: editCompetitionProps) {
    const {isEditCompetitionOpen, toggleEditCompetition, editingCompetition} = params
    const [currentdate, setCurrentdate] = useState("");

    useEffect(() => {
        setCurrentdate(new Date().toISOString().split("T")[0]);
    })

    return (
        <>
            <div className={`athlete-page-edit-competition-overlay ${isEditCompetitionOpen ? 'open' : ''}`} onClick={toggleEditCompetition}></div>
            <section className={`athlete-page-edit-competition ${isEditCompetitionOpen ? 'open' : ''}`}>
                <article id="athlete-page-edit-competition-header">
                    <button id="athlete-page-edit-competition-header-exit" onClick={toggleEditCompetition}>X</button>
                </article>
                <table id="athlete-page-edit-competition-list">
                    <tr className="athlete-page-edit-competition-point">
                        <td className="athlete-page-edit-competition-point-title">Navn: </td>
                        <td><input className="athlete-page-edit-competition-point-input"
                        type="text"
                        value={editingCompetition?.title}/></td>
                    </tr>
                    <tr className="athlete-page-edit-competition-point">
                        <td className="athlete-page-edit-competition-point-title">Sted: </td>
                        <td><input className="athlete-page-edit-competition-point-input"
                        type="text"
                        value={editingCompetition?.location}/></td>
                    </tr>
                    <tr className="athlete-page-edit-competition-point">
                        <td className="athlete-page-edit-competition-point-title">Dato: </td>
                        <td><input className="athlete-page-edit-competition-point-input"
                        type="date"
                        min={currentdate}
                        value={editingCompetition?.date && DateToStringAlternate(editingCompetition?.date)}/></td>
                    </tr>
                    <tr className="athlete-page-edit-competition-point">
                        <td className="athlete-page-edit-competition-point-title">Mål: </td>
                        <td><textarea className="athlete-page-edit-competition-point-textarea"
                        typeof="text"
                        value={editingCompetition?.goal}></textarea></td>
                    </tr>
                    <tr className="athlete-page-edit-competition-point">
                        <td className="athlete-page-edit-competition-point-title">Type: </td>
                        <td><input className="athlete-page-edit-competition-point-input"
                        type="text"
                        value={editingCompetition?.type}/></td>
                    </tr>
                    <tr className="athlete-page-edit-competition-point">
                        <td className="athlete-page-edit-competition-point-title">Prioritet: </td>
                        <select className="athlete-page-edit-competition-point-select"
                        value={editingCompetition?.priority}>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </select>
                    </tr>
                    <tr className="athlete-page-edit-competition-point">
                        <td className="athlete-page-edit-competition-point-title">Kommentar: </td>
                        <td><textarea className="athlete-page-edit-competition-point-textarea"
                        typeof="text"
                        value={editingCompetition?.comment}></textarea></td>
                    </tr>
                </table>
                <article id="athlete-page-edit-competition-footer">
                    <button id="athlete-page-edit-competition-footer-save">Save</button>
                </article>
            </section>
        </>
    )
}