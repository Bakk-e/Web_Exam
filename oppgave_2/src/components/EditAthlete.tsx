import { Athlete } from "@/types"
import { useState } from "react";

type editAthleteProps = {
    isEditOpen: boolean,
    toggleEdit: any,
    editingAthlete: Athlete
}

export default function EditAthlete(params: editAthleteProps) {
    const {isEditOpen, toggleEdit, editingAthlete} = params;
    const [gender, setGender] = useState("");
    const [sport, setSport] = useState("");
    const [heartrate, setHeartrate] = useState(0);
    const [wattage, setWattage] = useState(0);
    const [speed, setSpeed] = useState(0);

    const putAthlete = async (athlete: Athlete) => {
    }

    function handleGenderChange(e: any) {
        const update: string = e.target.value;
        setGender(update);
    }

    function handleSportChange(e: any) {
        const update: string = e.target.value;
        setSport(update);
    }

    function handleHeartrateChange(e: any) {
        const update: number = e.target.value;
        setHeartrate(update);
    }

    function handleWattageChange(e: any) {
        const update: number = e.target.value;
        setWattage(update);
    }

    function handleSpeedChange(e: any) {
        const update: number = e.target.value;
        setSpeed(update);
    }

    function handleSaveButton(e: any) {
        e.preventDefault();
        const updatedAthlete: Athlete = {
            id: editingAthlete.id, gender: gender,
            sport: sport, maxHeartRate: heartrate,
            thresholdWattage: wattage, thresholdSpeed: speed
        }
        putAthlete(updatedAthlete);
    }

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
                        type="text"
                        defaultValue={editingAthlete.gender}
                        onChange={handleGenderChange}/></td>
                    </tr>
                    <tr className="athlete-page-edit-point">
                        <td className="athlete-page-edit-point-title">Sport: </td>
                        <td><input className="athlete-page-edit-point-input"
                        type="text"
                        defaultValue={editingAthlete.sport}
                        onChange={handleSportChange}/></td>
                    </tr>
                    <tr className="athlete-page-edit-point">
                        <td className="athlete-page-edit-point-title">Maks puls: </td>
                        <td><input className="athlete-page-edit-point-input"
                        type="number"
                        defaultValue={editingAthlete.maxHeartRate}
                        onChange={handleHeartrateChange}/></td>
                    </tr>
                    <tr className="athlete-page-edit-point">
                        <td className="athlete-page-edit-point-title">Terskel watt: </td>
                        <td><input className="athlete-page-edit-point-input"
                        type="number"
                        defaultValue={editingAthlete.thresholdWattage}
                        onChange={handleWattageChange}/></td>
                    </tr>
                    <tr className="athlete-page-edit-point">
                        <td className="athlete-page-edit-point-title">Terskel fart: </td>
                        <td><input className="athlete-page-edit-point-input"
                        type="number"
                        defaultValue={editingAthlete.thresholdSpeed}
                        onChange={handleSpeedChange}/></td>
                    </tr>
                </table>
                <article id="athlete-page-edit-footer">
                    <button id="athlete-page-edit-footer-save" onClick={(e) => handleSaveButton(e)}>Save</button>
                </article>
            </section>
        </>
    )
}