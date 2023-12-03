"use client"

import Link from "next/link"
import "@/styles/NewSessionTemplatePageStyle.css"
import Notifications from "@/components/Notifications"
import { useState } from "react";
import { IntervalData, QuestionData, parameter } from "@/types";
import AddExistingQuestion from "@/components/AddExistingQuestion";
import Question from "@/components/Question";
import Interval from "@/components/Interval";

export default function NewSessionTemplatePage() {
    const availableParameters: parameter[] = [{eng: "intensity", no: "Intensitet"}, {eng: "heartbeat", no: "Puls"}, {eng: "speed", no: "Fart"}, {eng: "wattage", no: "Watt"}];
    const [intervals, setIntervals] = useState<IntervalData[]>([{key: 0}]);
    const [intervalCount, setIntervalCount] = useState(1);
    const [questions, setQuestions] = useState<QuestionData[]>([{key: 0}]);
    const [questionCount, setQuestionCount] = useState(1);
    const [tagTemp, setTagTemp] = useState("");
    const [chosenTags, setChosenTags] = useState<string[]>([]);
    const [chosenParameters, setChosenParameters] = useState<string[]>([]);

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

    function handleTagsChange(e: any) {
        const chosenTag: string = e.target.value;
        setTagTemp(chosenTag);
    }

    function handleTagAdd() {
        const chosenTag: string = tagTemp;
        chosenTag.replace(/\s{2,}/g, ' ').trim();
        if (!chosenTags.includes(chosenTag)) {
            setChosenTags([...chosenTags, chosenTag]);
        }
    }

    function handleTagRemove(tag: string) {
        const updatedTags = chosenTags.filter((p) => p !== tag);
        setChosenTags(updatedTags)
    }

    function handleParameterSelect(e: any) {
        const selectedParameter: string = e.target.value;
        if (!chosenParameters.includes(selectedParameter)) {
            setChosenParameters([...chosenParameters, selectedParameter]);
        }
    }

    function handleParameterRemove(parameter: string) {
        const updatedParameter = chosenParameters.filter((p) => p !== parameter);
        setChosenParameters(updatedParameter)
    }

    return (
        <div id="new-session-template-page">
            <header id="new-session-template-page-header">
                <Link legacyBehavior href="/"><a id="new-session-template-page-logo">Logo</a></Link>
                <nav id="new-session-template-page-nav">
                    <Link legacyBehavior href="/"><a id="new-session-template-page-back">Tilbake</a></Link>
                    <Notifications></Notifications>
                </nav>
            </header>
            <div id="new-session-template-page-create">
                <p id="new-session-template-page-title">Ny økt</p>
                <table id="new-session-template-page-table">
                    <tr className="new-session-template-page-create-point">
                        <td className="new-session-template-page-create-point-title">Titel: </td>
                        <td><input className="new-session-template-page-create-point-input"/></td>
                    </tr>
                    <tr className="new-session-template-page-create-point">
                        <td className="new-session-template-page-create-point-title">Type: </td>
                        <td><input className="new-session-template-page-create-point-input"/></td>
                    </tr>
                    <tr className="new-session-template-page-create-point">
                        <td className="new-session-template-page-create-point-title">Tags: </td>
                        <td><input className="new-session-template-page-create-point-input" onChange={(e) => handleTagsChange(e)}/></td>
                        <td><button className="new-session-template-page-create-point-button" onClick={handleTagAdd}>Legg til</button></td>
                    </tr>
                </table>
                <div id="new-session-template-page-types">
                    <ul>
                        {chosenTags.map((tag) => (
                            <li key={tag}>
                                {tag} <button onClick={() => handleTagRemove(tag)}>x</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div id="new-session-template-page-parameters">
                    <select id="new-session-template-page-parameters-select" onChange={handleParameterSelect} value="">
                        <option value="" disabled>Velg måleparameter</option>
                        {availableParameters.map((parameter) => (
                            !chosenParameters.includes(parameter.eng) && (
                                <option key={parameter.eng} value={parameter.eng}>{parameter.no}</option>
                            )
                        ))}
                    </select>
                    <div id="new-session-template-page-parameters-selected">
                        <ul>
                            {chosenParameters.map((parameter) => (
                                <li key={parameter}>
                                    {parameter} <button onClick={() => handleParameterRemove(parameter)}>x</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div id="new-session-template-page-interval-and-question">
                    <div id="new-session-template-page-intervals">
                        <p id="new-session-template-page-intervals-title">Intervals: </p>
                        {intervals.map((interval, index) => (
                            <Interval index={index} handleDataUpdate={handleIntervalDataUpdate} data={interval}></Interval>
                        ))}
                        <div id="new-session-template-page-intervals-title-buttons">
                            <button id="new-session-template-page-intervals-add" onClick={addInterval}>Add interval</button>
                            <button id="new-session-template-page-intervals-remove" onClick={removeInterval}>Fjern interval</button>
                        </div>
                    </div>
                    <div id="new-session-template-page-questions">
                        <p>Questions: </p>
                        <AddExistingQuestion existingQuestions={exampleQuestions} handleAddExistingQuestion={handleAddExistingQuestion}></AddExistingQuestion>
                        {questions.map((question, index) => (
                            <Question index={index} handleDataUpdate={handleQuestionDataUpdate} data={question}></Question>
                        ))}
                        <div id="new-session-template-page-questions-title-buttons">
                            <button id="new-session-template-page-questions-add" onClick={addQuestion}>Add spørsmål</button>
                            <button id="new-session-template-page-questions-remove" onClick={removeQuestion}>Fjern spørsmål</button>
                        </div>
                    </div>
                    <div id="new-session-template-page-save">
                        <button id="new-session-template-page-save-button">Save</button>
                    </div>
                </div>
            
            </div>
            
        </div>
    )
}