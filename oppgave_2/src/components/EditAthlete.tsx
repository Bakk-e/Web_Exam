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
        ///// api
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

        let updatedAthlete: Athlete;
        if (editingAthlete.meta) {
            updatedAthlete = {
                id: editingAthlete.id, userId: editingAthlete.userId, gender: gender,
                sport: sport, meta: {id: editingAthlete.meta.id, heartRate: heartrate, watt: wattage, speed: speed} 
            }
            putAthlete(updatedAthlete);
        }
    }

    return (
        <>
            <div className={`athlete-page-edit-overlay ${isEditOpen ? 'open' : ''}`} onClick={toggleEdit}></div>
            <div className={`athlete-page-edit ${isEditOpen ? 'open' : ''}`}>
                <div id="athlete-page-edit-header">
                    <button id="athlete-page-edit-header-exit" onClick={toggleEdit}>X</button>
                </div>
                <div id="athlete-page-edit-list">
                    <div className="athlete-page-edit-point">
                        <p className="athlete-page-edit-point-title">Kjønn: </p>
                        <input className="athlete-page-edit-point-input"
                        type="text"
                        defaultValue={editingAthlete.gender}
                        onChange={handleGenderChange}/>
                    </div>
                    <div className="athlete-page-edit-point">
                        <p className="athlete-page-edit-point-title">Sport: </p>
                        <input className="athlete-page-edit-point-input"
                        type="text"
                        defaultValue={editingAthlete.sport}
                        onChange={handleSportChange}/>
                    </div>
                    <div className="athlete-page-edit-point">
                        <p className="athlete-page-edit-point-title">Maks puls: </p>
                        <input className="athlete-page-edit-point-input"
                        type="number"
                        defaultValue={editingAthlete.meta?.heartRate}
                        onChange={handleHeartrateChange}/>
                    </div>
                    <div className="athlete-page-edit-point">
                        <p className="athlete-page-edit-point-title">Terskel watt: </p>
                        <input className="athlete-page-edit-point-input"
                        type="number"
                        defaultValue={editingAthlete.meta?.watt}
                        onChange={handleWattageChange}/>
                    </div>
                    <div className="athlete-page-edit-point">
                        <p className="athlete-page-edit-point-title">Terskel fart: </p>
                        <input className="athlete-page-edit-point-input"
                        type="number"
                        defaultValue={editingAthlete.meta?.speed}
                        onChange={handleSpeedChange}/>
                    </div>
                </div>
                <div id="athlete-page-edit-footer">
                    <button id="athlete-page-edit-footer-save" onClick={(e) => handleSaveButton(e)}>Save</button>
                </div>
            </div>
        </>
    )
}