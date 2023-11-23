import { IntervalData } from "@/types"
import { useState } from "react";

type intervalProps = {
    index: number,
    data: IntervalData,
    handleDataUpdate: any
}

export default function Interval(props: intervalProps) {
    const {index, data, handleDataUpdate} = props;
    const [duration, setDuration] = useState(0);
    const [intensityZone, setIntensityZone] = useState(0);

    function handleDurationChange(e: any, update: string) {
        e.preventDefault();
        setDuration(parseInt(update));

        data.duration = duration;

        handleDataUpdate(index, data);
    }

    function handleIntensityZoneChange(e: any, update: string) {
        e.preventDefault();
        setIntensityZone(parseInt(update));
    
        data.intensityZone = intensityZone;
    
        handleDataUpdate(index, data);
    }

    return (
        <div id="new-session-page-interval">
            <table id="new-session-page-interval-table">
                <tr>
                    <td><p className="new-session-page-interval-title">Varighet: </p></td>
                    <td><input className="new-session-page-interval-input"
                    type="number"
                    placeholder="0"
                    value={duration}
                    onChange={(e) => handleDurationChange(e, e.target.value)}/>
                    </td>
                    <td><p className="new-session-page-interval-subtitle">min</p></td>
                </tr>
                <tr>
                    <td><p className="new-session-page-interval-title">Intensitetssone: </p></td>
                    <td>
                        <select className="new-session-page-interval-dropdown"
                        value={intensityZone}
                        onChange={(e) => handleIntensityZoneChange(e, e.target.value)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </td>
                </tr>
            </table>
        </div>
    )
}