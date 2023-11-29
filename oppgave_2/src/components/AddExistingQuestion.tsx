import { QuestionData } from "@/types"
import { useState } from "react";

type addExistingQuestionProps = {
    existingQuestions: QuestionData[],
    handleAddExistingQuestion: any
}

export default function AddExistingQuestion(props: addExistingQuestionProps) {
    const {existingQuestions, handleAddExistingQuestion} = props;
    const [currentIndex, setCurrentIndex] = useState(0);

    function handleQuestionChange(e: any, index: number) {
        e.preventDefault();

        setCurrentIndex(index);
    }

    function handleAddQuestionClick() {
        handleAddExistingQuestion(existingQuestions[currentIndex])
    }

    return (
        <div id="session-questions-existing">
            <select id="session-questions-existing-select" onChange={(e) => handleQuestionChange(e, parseInt(e.target.value))}>
                {existingQuestions.map((question) => (
                    <option key={question.key} value={question.key}>{question.text}</option>
                ))}
            </select>
            <button id="session-questions-existing-button" onClick={handleAddQuestionClick}>Legg til</button>
        </div>
    );
}