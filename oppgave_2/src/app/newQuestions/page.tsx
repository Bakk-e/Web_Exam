"use client"

import Notifications from "@/components/Notifications"
import "@/styles/NewQuestionsPageStyle.css"
import { QuestionData } from "@/types"
import Link from "next/link"
import {useState} from "react";

export default function NewQuestionsPage() {
    const [question,setQuestion] = useState({
        text : "",
        type : "Text",
        answer: "",
    })


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target //as HTMLInputElement | HTMLSelectElement;
        setQuestion({ ...question, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submitting question:", question);
        try {
            const response = await fetch('/api/question', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(question),
            });
            console.log(response)

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);
        }catch (error) {
            console.error('Failed to submit question', error);
        }
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
            <form className="form" onSubmit={handleSubmit}>
                <div className="new-questions-page-create-point">
                    <label className="new-questions-page-create-point-title">Text:</label>
                    <input
                        name="text"
                        value={question.text}
                        onChange={handleChange}
                        className="new-questions-page-create-point-input"
                    />
                </div>
                <div className="new-questions-page-create-point">
                    <label className="new-questions-page-create-point-title">Answer Type:</label>
                    <select
                        name="type"
                        value={question.type}
                        onChange={handleChange}
                        className="new-questions-page-create-point-dropdown">
                        <option value="text">Text</option>
                        <option value="radio">Radio 1-10</option>
                        <option value="emoji">Emoji</option>
                    </select>
                </div>
                <div className="new-questions-page-create-point">
                    <label className="new-questions-page-create-point-title">Answer:</label>
                    <input
                        name="answer"
                        value={question.answer}
                        onChange={handleChange}
                        className="new-questions-page-create-point-input"
                    />
                </div>
                <div className="new-questions-page-save-section">
                    <button type="submit" className="new-questions-page-save-button">Save</button>
                </div>
            </form>
        </div>
    )
}