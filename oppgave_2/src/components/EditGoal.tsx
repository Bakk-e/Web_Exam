type editGoalProps = {
    goalId: string,
    isEditGoalOpen: boolean,
    toggleEditGoal: any
}

export default function EditGoal(params: editGoalProps) {
    const {goalId, isEditGoalOpen, toggleEditGoal} = params

    return (
        <>
            <div className={`athlete-page-edit-goal-overlay ${isEditGoalOpen ? 'open' : ''}`} onClick={toggleEditGoal}></div>
            <section className={`athlete-page-edit-goal ${isEditGoalOpen ? 'open' : ''}`}>
                <article id="athlete-page-edit-goal-header">
                    <button id="athlete-page-edit-goal-header-exit" onClick={toggleEditGoal}>X</button>
                </article>
                <table id="athlete-page-edit-goal-list">
                    <tr className="athlete-page-edit-goal-point">
                        <td className="athlete-page-edit-goal-point-title">Navn: </td>
                        <td><input className="athlete-page-edit-goal-point-input"/></td>
                    </tr>
                    <tr className="athlete-page-edit-goal-point">
                        <td className="athlete-page-edit-goal-point-title">Dato: </td>
                        <td><input className="athlete-page-edit-goal-point-input"/></td>
                    </tr>
                    <tr className="athlete-page-edit-goal-point">
                        <td className="athlete-page-edit-goal-point-title">Mål: </td>
                        <td><input className="athlete-page-edit-goal-point-input"/></td>
                    </tr>
                    <tr className="athlete-page-edit-goal-point">
                        <td className="athlete-page-edit-goal-point-title">Kommentar: </td>
                        <td><textarea className="athlete-page-edit-goal-point-textarea"></textarea></td>
                    </tr>
                </table>
                <article id="athlete-page-edit-goal-footer">
                    <button id="athlete-page-edit-goal-footer-save">Save</button>
                </article>
            </section>
        </>
    )
}