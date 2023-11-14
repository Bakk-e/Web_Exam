type editCompetitionProps = {
    competitionId: string,
    isEditCompetitionOpen: boolean,
    toggleEditCompetition: any
}

export default function EditCompetition(params: editCompetitionProps) {
    const {competitionId, isEditCompetitionOpen, toggleEditCompetition} = params

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
                        <td><input className="athlete-page-edit-competition-point-input"/></td>
                    </tr>
                    <tr className="athlete-page-edit-competition-point">
                        <td className="athlete-page-edit-competition-point-title">Sted: </td>
                        <td><input className="athlete-page-edit-competition-point-input"/></td>
                    </tr>
                    <tr className="athlete-page-edit-competition-point">
                        <td className="athlete-page-edit-competition-point-title">Dato: </td>
                        <td><input className="athlete-page-edit-competition-point-input"/></td>
                    </tr>
                    <tr className="athlete-page-edit-competition-point">
                        <td className="athlete-page-edit-competition-point-title">Mål: </td>
                        <td><textarea className="athlete-page-edit-competition-point-textarea"></textarea></td>
                    </tr>
                    <tr className="athlete-page-edit-competition-point">
                        <td className="athlete-page-edit-competition-point-title">Type: </td>
                        <td><input className="athlete-page-edit-competition-point-input"/></td>
                    </tr>
                    <tr className="athlete-page-edit-competition-point">
                        <td className="athlete-page-edit-competition-point-title">Prioritet: </td>
                        <td><input className="athlete-page-edit-competition-point-input"/></td>
                    </tr>
                    <tr className="athlete-page-edit-competition-point">
                        <td className="athlete-page-edit-competition-point-title">Kommentar: </td>
                        <td><textarea className="athlete-page-edit-competition-point-textarea"></textarea></td>
                    </tr>
                </table>
                <article id="athlete-page-edit-competition-footer">
                    <button id="athlete-page-edit-competition-footer-save">Save</button>
                </article>
            </section>
        </>
    )
}