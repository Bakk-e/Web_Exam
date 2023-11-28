import { Athlete } from "@/types"

type editAthleteProps = {
    isEditOpen: boolean,
    toggleEdit: any,
    editingAthlete: Athlete
}

export default function EditAthlete(params: editAthleteProps) {
    const {isEditOpen, toggleEdit, editingAthlete} = params

    return (
        <>
            <div className={`athlete-page-edit-overlay ${isEditOpen ? 'open' : ''}`} onClick={toggleEdit}></div>
            <section className={`athlete-page-edit ${isEditOpen ? 'open' : ''}`}>
                <article id="athlete-page-edit-header">
                    <button id="athlete-page-edit-header-exit" onClick={toggleEdit}>X</button>
                </article>
                <table id="athlete-page-edit-list">
                    <tr className="athlete-page-edit-point">
                        <td className="athlete-page-edit-point-title">Kjønn: </td>
                        <td><input className="athlete-page-edit-point-input"
                        value={editingAthlete.gender}/></td>
                    </tr>
                    <tr className="athlete-page-edit-point">
                        <td className="athlete-page-edit-point-title">Sport: </td>
                        <td><input className="athlete-page-edit-point-input"
                        value={editingAthlete.sport}/></td>
                    </tr>
                    <tr className="athlete-page-edit-point">
                        <td className="athlete-page-edit-point-title">Maks puls: </td>
                        <td><input className="athlete-page-edit-point-input"
                        value={editingAthlete.maxHeartRate}/></td>
                    </tr>
                    <tr className="athlete-page-edit-point">
                        <td className="athlete-page-edit-point-title">Terskel watt: </td>
                        <td><input className="athlete-page-edit-point-input"
                        value={editingAthlete.thresholdWattage}/></td>
                    </tr>
                    <tr className="athlete-page-edit-point">
                        <td className="athlete-page-edit-point-title">Terskel fart: </td>
                        <td><input className="athlete-page-edit-point-input"
                        value={editingAthlete.thresholdSpeed}/></td>
                    </tr>
                </table>
                <article id="athlete-page-edit-footer">
                    <button id="athlete-page-edit-footer-save">Save</button>
                </article>
            </section>
        </>
    )
}