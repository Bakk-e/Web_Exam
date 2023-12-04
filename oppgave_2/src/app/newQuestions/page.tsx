"use client"

import Notifications from "@/components/Notifications"
import "@/styles/NewQuestionsPageStyle.css"
import { QuestionData } from "@/types"
import Link from "next/link"
import { useState } from "react"

export default function NewQuestionsPage() {
    const [text, setText] = useState<string>("");
    const [type, setType] = useState<string>("");

    const putQuestion = async (question: QuestionData) => {
    }

    function handleTextChange(e: any) {
        const update: string = e.target.value;
        setText(update);
    }

    function handleTypeChange(e: any) {
        const update: string = e.target.value;
        setType(update);
    }

    function handleSaveButton(e: any) {
        e.preventDefault();
        const updatedGoal: QuestionData = {
            id: "awda"/*id her*/, text: text, type: type
        }
        putQuestion(updatedGoal);
    }

    return (
        <div id="new-questions-page">
            <header id="new-questions-page-header">
                <Link legacyBehavior href="/"><a id="new-questions-page-logo">Logo</a></Link>
                <nav id="new-questions-page-nav">
                    <Link legacyBehavior href="/"><a id="new-questions-page-back">Tilbake</a></Link>
                    <Notifications></Notifications>
                </nav>
            </header>
            <div id="new-questions-page-create">
                <p id="new-questions-page-title">Opprett spørsmål</p>
                <div id="new-questions-page-create-table">
                    <div className="new-questions-page-create-point">
                        <p className="new-questions-page-create-point-title">Text: </p>
                        <input className="new-questions-page-create-point-input"
                        type="text"
                        onChange={handleTextChange}/>
                    </div>
                    <div className="new-questions-page-create-point">
                        <p className="new-questions-page-create-point-title">Svar type: </p>
                        <select id="new-questions-page-create-point-dropdown"
                        onChange={handleTypeChange}>
                            <option value="text">Tekst</option>
                            <option value="radio">Radio 1-10</option>
                            <option value="emoji">Emoji</option>
                        </select>
                    </div>
                </div>
            </div>
            <div id="new-questions-page-save-section">
                <button id="new-questions-page-save-button" onChange={handleSaveButton}>Save</button>
            </div>
        </div>
    )
}