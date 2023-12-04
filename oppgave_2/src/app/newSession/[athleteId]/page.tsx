"use client"

import Link from "next/link"
import "@/styles/NewSessionPageStyle.css"
import { useEffect, useState } from "react"
import CreateInterval from "@/components/CreateInterval";
import { Activity, Competition, Goal, Interval, IntervalData, Question, QuestionData, parameter } from "@/types";
import CreateQuestion from "@/components/CreateQuestion";
import AddExistingQuestion from "@/components/AddExistingQuestion";
import Notifications from "@/components/Notifications";
import { randomUUID } from "crypto";
import { useRouter } from "next/navigation";

export default function NewSessionPage({params}: {params: {athleteId: string}}) {
    const availableParameters: parameter[] = [{eng: "intensity", no: "Intensitet"}, {eng: "heartbeat", no: "Puls"}, {eng: "speed", no: "Fart"}, {eng: "wattage", no: "Watt"}];  
    const [intervals, setIntervals] = useState<IntervalData[]>([{key: 0}]);
    const [intervalCount, setIntervalCount] = useState(1);
    const [questions, setQuestions] = useState<QuestionData[]>([{id: "0"}]);
    const [questionCount, setQuestionCount] = useState(1);
    const [tagTemp, setTagTemp] = useState("");
    const [chosenTags, setChosenTags] = useState<string[]>([]);
    const [chosenParameters, setChosenParameters] = useState<string[]>([]);
    const [template, setTempalte] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);
    const [goalCompetion, setGoalCompetion] = useState<string>("");
    const [intervalsSession, setIntervalsSession] = useState<Interval[]>([]);
    const [questionsSession, setQuestionsSession] = useState<Question[]>([]);

    const router = useRouter()

    const tempList = ["Rough", "Uphill"];
    const tempList2 = ["none", "Template 3"];
    const exampleQuestions: QuestionData[] = [
        {id: "0", text: "Hvordan føltes du det gikk?", type: "emoji"},
        {id: "1", text: "Hvordan har du det?", type: "tekst"}
    ]


    const setActivity =async (activity: Activity) => {
        try {
            const response = await fetch (`/api/session/${params.athleteId}`, {
                method: "post",
                headers: {'Content-Type': 'application/json',
            },
            body: JSON.stringify(activity)
            })
            if (!response.ok) throw new Error("Network response failed")
        } catch (error) {
            console.error("Failed to create activity", error)
        }
    }

    
    

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
            {id: `${questionCount}`},
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
            data.id = `${questionCount}`;
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
        };
    };

    function handleParameterRemove(parameter: string) {
        const updatedParameter = chosenParameters.filter((p) => p !== parameter);
        setChosenParameters(updatedParameter);
    };

    function handleTemplateChange(e: any) {
        const update: string = e.target.value;
        setTempalte(update);
    }

    function handleDateChange(e: any) {
        const update: string = e.target.value;
        setDate(update);
    }

    function handleTitleChange(e: any) {
        const update: string = e.target.value;
        setTitle(update);
    }

    function handleTypeChange(e: any) {
        const update: string = e.target.value;
        setType(update);
    }

    function handleGoalCompetitionChange(e: any) {
        const update: string = e.target.value;
        setGoalCompetion(update);
    }

    function handleItervalsChange() {
        const tempIntervals: Interval[] = [];
        for (var item of intervals) {
            if (item.intensityZone == 1 || item.intensityZone == 2  || item.intensityZone == 3  || item.intensityZone == 4 || item.intensityZone == 5) {
                tempIntervals.push({
                duration: item.duration,
                intensityZone: item.intensityZone
                })
            }
        }
        setIntervalsSession(tempIntervals);
    }

    function handleQuestionsChange() {
        const tempQuestions: Question[] = [];
        for (var item of questions) {
            if (item.type == "text" || item.type == "radio" || item.type == "emoji")
            tempQuestions.push({
                text: item.text,
                type: item.type
            })
        }
        setQuestionsSession(tempQuestions);
    }
    
    function handleSaveButton(e: any) {
        e.preventDefault();
        handleItervalsChange();
        handleQuestionsChange();
        const newSession: Activity = {
            date: new Date(date), name: title,
            tags: [type, ...chosenTags].join(","),
            intervals: intervalsSession,
            questions: questionsSession,
            parameters: chosenParameters
        }
        setActivity(newSession);
        router.push(`/athlete/${params.athleteId}`)
    }

    return (
        <div id="new-session-page">
            <header id="new-session-page-header">
                <Link legacyBehavior href="/"><a id="new-session-page-logo">Logo</a></Link>
                <nav id="new-session-page-nav">
                    <Link legacyBehavior href="/athlete/[athleteId]" as={`/athlete/${params.athleteId}`}><a id="new-session-page-back">Tilbake</a></Link>
                    <Notifications></Notifications>
                </nav>
            </header>
            <div id="new-session-page-create">
                <p id="new-session-page-title">Ny økt</p>
                <div id="new-session-page-table">
                    <div className="new-session-page-create-point">
                        <p className="new-session-page-create-point-title">Mal: </p>
                        <select className="new-session-page-create-point-dropdown"
                        onChange={handleTemplateChange}>
                            {tempList2.map((template) => (
                                <option key={template} value={template}>{template}</option>
                            ))}
                        </select>
                    </div>
                    <div className="new-session-page-create-point">
                        <p className="new-session-page-create-point-title">Dato: </p>
                        <input className="new-session-page-create-point-input"
                        type="text"
                        onChange={handleDateChange}/>
                    </div>
                    <div className="new-session-page-create-point">
                        <p className="new-session-page-create-point-title">Titel: </p>
                        <input className="new-session-page-create-point-input"
                        type="text"
                        onChange={handleTitleChange}/>
                    </div>
                    <div className="new-session-page-create-point">
                        <p className="new-session-page-create-point-title">Type: </p>
                        <input className="new-session-page-create-point-input"
                        type="text"
                        onChange={handleTypeChange}/>
                    </div>
                    <div className="new-session-page-create-point">
                        <p className="new-session-page-create-point-title">Tags: </p>
                        <input className="new-session-page-create-point-input"  onChange={(e) => handleTagsChange(e)}/>
                        <button className="new-session-page-create-point-button" onClick={handleTagAdd}>Legg til</button>
                    </div>
                    <div id="new-session-page-tags-chosen">
                        <ul>
                            {chosenTags.map((tag) => (
                                <li key={tag}>
                                    {tag} <button onClick={() => handleTagRemove(tag)}>x</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="new-session-page-create-point">
                        <p className="new-session-page-create-point-title">Mål/konkuranse: </p>
                        <select className="new-session-page-create-point-dropdown"
                        onChange={handleGoalCompetitionChange}>
                            {tempList.map((goalCompetion) => (
                                <option key={goalCompetion} value={goalCompetion}>{goalCompetion}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div id="new-session-page-parameters">
                    <select id="new-session-page-parameters-dropdown" onChange={handleParameterSelect} value="">
                        <option value="" disabled>Velg måleparameter</option>
                        {availableParameters.map((parameter) => (
                            !chosenParameters.includes(parameter.eng) && (
                                <option key={parameter.eng} value={parameter.eng}>{parameter.no}</option>
                            )
                        ))}
                    </select>
                    <div id="new-session-page-selected-parameters">
                        <ul id="new-session-page-selected-parameters-list">
                            {chosenParameters.map((parameter) => (
                                <li key={parameter}>
                                    {parameter} <button onClick={() => handleParameterRemove(parameter)}>x</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div id="new-session-page-interval-and-question">
                    <div id="new-session-page-intervals">
                        <p id="new-session-page-intervals-title">Intervals: </p>
                        {intervals.map((interval, index) => (
                            <CreateInterval index={index} handleDataUpdate={handleIntervalDataUpdate} data={interval} key={interval.key}></CreateInterval>
                        ))}
                        <div id="new-session-page-intervals-buttons">
                            <button id="new-session-page-intervals-add" onClick={addInterval}>Add interval</button>
                            <button id="new-session-page-intervals-remove" onClick={removeInterval}>Fjern interval</button>
                        </div>
                    </div>
                    <div id="new-session-page-questions">
                        <p id="new-session-page-questions-title">Questions: </p>
                        <AddExistingQuestion existingQuestions={exampleQuestions} handleAddExistingQuestion={handleAddExistingQuestion}></AddExistingQuestion>
                        {questions.map((question, index) => (
                            <CreateQuestion index={index} handleDataUpdate={handleQuestionDataUpdate} data={question} key={question.id}></CreateQuestion>
                        ))}
                        <div id="new-session-page-questions-buttons">
                            <button id="new-session-page-questions-add" onClick={addQuestion}>Add spørsmål</button>
                            <button id="new-session-page-questions-remove" onClick={removeQuestion}>Fjern spørsmål</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="new-session-page-save">
                <button id="new-session-page-save-button" onClick={handleSaveButton}>Lagre</button>
                <button id="new-session-page-save-template-button">Lagre som mal</button>
            </div>
        </div>
    )
}