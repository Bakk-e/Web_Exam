import { QuestionData } from "@/types";
import { useState } from "react";

type questionProps = {
    index: number,
    data: QuestionData,
    handleDataUpdate: any
}

export default function Question(props: questionProps) {
    const {index, data, handleDataUpdate} = props;
    const [text, setText] = useState("");
    const [type, setType] = useState("");

    function handleTextChange(e: any) {
        const temp: string = e.target.value;
        setText(temp);

        data.text = temp;

        handleDataUpdate(index, data);
    }

    function handleTypeChange(e: any) {
        const temp: string = e.target.value;
        setType(temp);
    
        data.type = temp;
    
        handleDataUpdate(index, data);
    }

    return (
        <div id="session-question">
            <div id="session-question-table">
                <div className="session-question-table-point">
                    <p className="session-question-table-title">Tekst: </p>
                    <input className="session-question-table-input"
                    type="text"
                    placeholder="Spørsmål tekst"
                    value={text}
                    onChange={handleTextChange}/>
                </div>
                <div className="session-question-table-point">
                    <p className="session-question-table-title">Type: </p>
                    <select className="session-question-table-dropdown"
                    value={type}
                    onChange={handleTypeChange}>
                        <option value="tekst">Tekst</option>
                        <option value="radio">Radio</option>
                        <option value="emoji">Emoji</option>
                    </select>
                </div>
            </div>
        </div>
    )
}