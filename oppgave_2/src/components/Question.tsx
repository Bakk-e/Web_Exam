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

    function handleTextChange(e: any, update: string) {
        e.preventDefault();
        setText(update);

        data.text = text;

        handleDataUpdate(index, data);
    }

    function handleTypeChange(e: any, update: string) {
        e.preventDefault();
        setType(update);
    
        data.type = type;
    
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
                    value={data.text}
                    onChange={(e) => handleTextChange(e, e.target.value)}/>
                </div>
                <div className="session-question-table-point">
                    <p className="session-question-table-title">Type: </p>
                    <select className="session-question-table-dropdown"
                    value={data.type}
                    onChange={(e) => handleTypeChange(e, e.target.value)}>
                        <option value="tekst">Tekst</option>
                        <option value="radio">Radio</option>
                        <option value="emoji">Emoji</option>
                    </select>
                </div>
            </div>
        </div>
    )
}