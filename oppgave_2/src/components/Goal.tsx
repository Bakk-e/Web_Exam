type goalProps = {
    goalId: string,
    toggleEditGoal: any
}

export default function Goal(props: goalProps) {
    const {goalId, toggleEditGoal} = props;

    return (
        <div className="athlete-page-goals-card">
            <div className="athlete-page-goals-card-header">
                <p className="athlete-page-goals-card-title">Ny maks fart</p>
                <p className="athlete-page-goals-card-date">23.11.2023</p>
            </div>
            <p className="athlete-page-goals-card-goal">Mål: 23kmh</p>
            <p className="athlete-page-goals-card-comment">Kommentar: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit tristique tortor, vel hendrerit urna.</p>
            <div className="athlete-page-goals-card-button-spacer">
                <button className="athlete-page-goals-card-button" onClick={toggleEditGoal}>Edit</button>
            </div>
        </div>
    )
}