type editAthleteProps = {
    id: string,
    isEditOpen: boolean,
    toggleEdit: any
}

export default function EditAthlete(params: editAthleteProps) {
    const {id, isEditOpen, toggleEdit} = params

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
                        <td><input className="athlete-page-edit-point-input"/></td>
                    </tr>
                    <tr className="athlete-page-edit-point">
                        <td className="athlete-page-edit-point-title">Sport: </td>
                        <td><input className="athlete-page-edit-point-input"/></td>
                    </tr>
                    <tr className="athlete-page-edit-point">
                        <td className="athlete-page-edit-point-title">Maks puls: </td>
                        <td><input className="athlete-page-edit-point-input"/></td>
                    </tr>
                    <tr className="athlete-page-edit-point">
                        <td className="athlete-page-edit-point-title">Terskel watt: </td>
                        <td><input className="athlete-page-edit-point-input"/></td>
                    </tr>
                    <tr className="athlete-page-edit-point">
                        <td className="athlete-page-edit-point-title">Terskel fart: </td>
                        <td><input className="athlete-page-edit-point-input"/></td>
                    </tr>
                </table>
                <article id="athlete-page-edit-footer">
                    <button id="athlete-page-edit-footer-save">Save</button>
                </article>
            </section>
        </>
    )
}