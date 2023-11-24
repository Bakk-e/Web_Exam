"use client"

import Link from "next/link"
import "@/styles/NewSessionPageStyle.css"
import { useState } from "react"
import Interval from "@/components/Interval";
import { IntervalData, QuestionData } from "@/types";
import Question from "@/components/Question";
import AddExistingQuestion from "@/components/AddExistingQuestion";

export default function NewSessionPage({params}: {params: {athleteId: string}}) {
    const [intervals, setIntervals] = useState<IntervalData[]>([{key: 0}]);
    const [intervalCount, setIntervalCount] = useState(1);
    const [questions, setQuestions] = useState<QuestionData[]>([{key: 0}]);
    const [questionCount, setQuestionCount] = useState(1);

    const tempList = ["Rough", "Uphill"];
    const tempList2 = ["none", "Template 3"];
    const exampleQuestions: QuestionData[] = [
        {key: 0, text: "Hvordan føltes du det gikk?", type: "emoji"},
        {key: 1, text: "Hvordan har du det?", type: "tekst"}
    ]

    function addInterval() {
        setIntervals((prevIntervals) => [
            ...prevIntervals,
            {key: intervalCount},
        ]);
        setIntervalCount(intervalCount + 1)
    };

    function removeInterval() {
        setIntervals((prevIntervals) => {
            const updatedList = [...prevIntervals];
            updatedList.pop();
            return updatedList;
        });
        setIntervalCount(intervalCount - 1)
    }

    function handleIntervalDataUpdate(index: number, updatedData: IntervalData) {
        setIntervals((prevIntervals) => {
            const updatedList = [...prevIntervals];
            updatedList[index] = updatedData;
            return updatedList;
        });
    };

    function addQuestion() {
        setQuestions((prevQuestion) => [
            ...prevQuestion,
            {key: questionCount},
        ]);
        setQuestionCount(questionCount + 1)
    };

    function removeQuestion() {
        setQuestions((prevQuestion) => {
            const updatedList = [...prevQuestion];
            updatedList.pop();
            return updatedList;
        });
        setQuestionCount(questionCount - 1)
    };

    function handleQuestionDataUpdate(index: number, updatedData: QuestionData) {
        setQuestions((prevQuestion) => {
            const updatedList = [...prevQuestion];
            updatedList[index] = updatedData;
            return updatedList;
        });
    };

    function handleAddExistingQuestion(data: QuestionData) {
        setQuestions((prevQuestion) => {
            const updatedList = [...prevQuestion];
            data.key = questionCount;
            updatedList[questionCount] = data;
            setQuestionCount(questionCount + 1);
            return updatedList;
        })
    };

    return (
        <div id="new-session-page">
            <header id="new-session-page-header">
                <Link legacyBehavior href="/"><a id="new-session-page-logo">Logo</a></Link>
                <p id="new-session-page-title">Ny økt</p>
                <Link legacyBehavior href="/athlete/[athleteId]" as={`/athlete/${params.athleteId}`}><a id="new-session-page-back">Tilbake</a></Link>
            </header>
            <div id="new-session-page-create">
                <table id="new-session-page-table">
                <tr className="new-session-page-create-point">
                        <td className="new-session-page-create-point-title">Template: </td>
                        <td>
                            <select className="new-session-page-create-point-dropdown">
                                {tempList2.map((template) => (
                                    <option value={template}>{template}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr className="new-session-page-create-point">
                        <td className="new-session-page-create-point-title">Dato: </td>
                        <td><input className="new-session-page-create-point-input"/></td>
                    </tr>
                    <tr className="new-session-page-create-point">
                        <td className="new-session-page-create-point-title">Titel: </td>
                        <td><input className="new-session-page-create-point-input"/></td>
                    </tr>
                    <tr className="new-session-page-create-point">
                        <td className="new-session-page-create-point-title">Tags: </td>
                        <td><input className="new-session-page-create-point-input"/></td>
                    </tr>
                    <tr className="new-session-page-create-point">
                        <td className="new-session-page-create-point-title">Type: </td>
                        <td><input className="new-session-page-create-point-input"/></td>
                    </tr>
                    <tr className="new-session-page-create-point">
                        <td className="new-session-page-create-point-title">Mål/konkuranse: </td>
                        <td>
                            <select className="new-session-page-create-point-dropdown">
                                {tempList.map((goalCompetion) => (
                                    <option value={goalCompetion}>{goalCompetion}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                </table>
            </div>
            <div id="new-session-page-interval-and-question">
                <div id="new-session-page-intervals">
                    <p>Intervals: </p>
                    {intervals.map((interval, index) => (
                        <Interval index={index} handleDataUpdate={handleIntervalDataUpdate} data={interval}></Interval>
                    ))}
                    <div>
                        <button id="new-session-page-intervals-add" onClick={addInterval}>Add interval</button>
                        <button id="new-session-page-intervals-remove" onClick={removeInterval}>Fjern interval</button>
                    </div>
                </div>
                <div id="new-session-page-questions">
                    <p>Questions: </p>
                    <AddExistingQuestion existingQuestions={exampleQuestions} handleAddExistingQuestion={handleAddExistingQuestion}></AddExistingQuestion>
                    {questions.map((question, index) => (
                        <Question index={index} handleDataUpdate={handleQuestionDataUpdate} data={question}></Question>
                    ))}
                    <div>
                        <button id="new-session-page-intervals-add" onClick={addQuestion}>Add spørsmål</button>
                        <button id="new-session-page-intervals-remove" onClick={removeQuestion}>Fjern spørsmål</button>
                    </div>
                </div>
            </div>
            <div>
                <button>Save</button>
                <button>Save mal</button>
            </div>
        </div>
    )
}