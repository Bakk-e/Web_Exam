import { Competition } from "@/types";
import { DateToString } from "./Functions";
import { useEffect, useState } from "react";

type competitionProps = {
    competition: Competition,
    toggleEditCompetition: any,
    setEditingCompetiion: any
}

export default function CompetitionCard(props: competitionProps) {
    const {competition, toggleEditCompetition, setEditingCompetiion} = props;

    function handleEditClick() {
        setEditingCompetiion(competition);
        toggleEditCompetition();
    };

    return (
        <div className="athlete-page-competitions-card">
            <div className="athlete-page-competitions-card-header">
                <p className="athlete-page-competitions-card-title">{competition.title}</p>
                <p className="athlete-page-competitions-card-location">{competition.location}</p>
                <p className="athlete-page-competitions-card-date">{competition.date && DateToString(competition.date.toString())}</p>
            </div>
            <p className="athlete-page-competitions-card-goal">Mål: {competition.goal}</p>
            <div className="athlete-page-competitions-card-section">
                <p className="athlete-page-competitions-card-type">Type: {competition.type}</p>
                <p className="athlete-page-competitions-card-priority">Prioritet: {competition.priority}</p>
            </div>
            <p className="athlete-page-competitions-card-comment">Kommentar: {competition.comment}</p>
            <div className="athlete-page-competitions-card-button-spacer">
                <button className="athlete-page-competitions-card-button" onClick={handleEditClick}>Edit</button>
            </div>
        </div>
    )
}