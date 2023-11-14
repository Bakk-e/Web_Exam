type competitionProps = {
    competitionId: string,
    toggleEditCompetition: any
}

export default function Competition(props: competitionProps) {
    const {competitionId, toggleEditCompetition} = props;

    return (
        <div className="athlete-page-competitions-card">
            <div className="athlete-page-competitions-card-header">
                <p className="athlete-page-competitions-card-title">Tour de france</p>
                <p className="athlete-page-competitions-card-location">Halden</p>
                <p className="athlete-page-competitions-card-date">23.11.2023</p>
            </div>
            <p className="athlete-page-competitions-card-goal">Mål: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit tristique tortor, vel hendrerit urna. Quisque fermentum turpis quis massa convallis, vel consectetur odio tincidunt.</p>
            <div className="athlete-page-competitions-card-section">
                <p className="athlete-page-competitions-card-type">Type: Sykkling</p>
                <p className="athlete-page-competitions-card-priority">Prioritet: A</p>
            </div>
            <p className="athlete-page-competitions-card-comment">Kommentar: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit tristique tortor, vel hendrerit urna.</p>
            <div className="athlete-page-competitions-card-button-spacer">
                <button className="athlete-page-competitions-card-button" onClick={toggleEditCompetition}>Edit</button>
            </div>
        </div>
    )
}