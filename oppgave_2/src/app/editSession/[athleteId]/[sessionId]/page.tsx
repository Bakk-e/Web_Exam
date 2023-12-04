"use client"

import Notifications from "@/components/Notifications";
import Link from "next/link";
import "@/styles/EditSessionPageStyle.css";
import { useEffect, useState } from "react";
import { Athlete, Competition, Goal, IntervalData, QuestionData, Activity } from "@/types";
import Interval from "@/components/Interval";
import AddExistingQuestion from "@/components/AddExistingQuestion";
import Question from "@/components/Question";
import { DateToStringAlternate } from "@/components/Functions";

export default function EditSessionPage({params}: {params: {athleteId: string, sessionId: string}}) {
    const [currentdate, setCurrentdate] = useState("");
    const [session, setSession] = useState<Activity>({});
    const [competitionsAndGoals, setCompetitionsAndGoals] = useState<(Goal | Competition)[]>([]);
    const [competitionsAndGoalsString, setCompetitionsAndGoalsString] = useState<string[]>([]);
    const [intervals, setIntervals] = useState<IntervalData[]>([]);
    const [intervalCount, setIntervalCount] = useState(0);
    const [questions, setQuestions] = useState<QuestionData[]>([]);
    const [questionCount, setQuestionCount] = useState(0);
    const [tagTemp, setTagTemp] = useState("");
    const [chosenTags, setChosenTags] = useState<string[]>([]);
    const [date, setDate] = useState("");
    const [titel, setTitel] = useState("");
    const [type, setType] = useState("");
    const [goalCompetition, setGoalCompetition] = useState<Goal | Competition>();

    const exampleQuestions: QuestionData[] = [
        {id: "0", text: "Hvordan følter du det gikk?", type: "emoji"},
        {id: "1", text: "Hvordan har du det?", type: "tekst"}
    ]

    useEffect(() => {
        setCurrentdate(new Date().toISOString().split("T")[0]);
        const getSession = async () => {
            const response = await fetch(`/api/athletes/${params.athleteId}`, {
                method: "get",
            });
            const result = (await response.json()) as {data: Athlete};
            const sessionTemp = result.data.activities?.find(session => session.id === params.sessionId);
            if (sessionTemp) {
                setSession(sessionTemp);
            };
            let tempTags: string[] = [];
            if (sessionTemp?.tags) {
                tempTags.push(...sessionTemp.tags.split(","))
            }
            const tempCopetitionsAndGoals: (Goal | Competition)[] = [];
            result.data.competitions?.map((competition) => (
                competition && (
                    tempCopetitionsAndGoals.push(competition)
                )
            ))
            result.data.goals?.map((goal) => (
                goal && (
                    tempCopetitionsAndGoals.push(goal)
                )
            ))
            const tempCopetitionsAndGoalsString: string[] = [];
            tempCopetitionsAndGoals.map((object) => (
                object.title && (
                    tempCopetitionsAndGoalsString.push(object.title)
                )
            ))
            const tempQuestions: QuestionData[] = [];
            if (sessionTemp?.questions) {
                console.log("questions")
                console.log(sessionTemp.questions)
                sessionTemp.questions.map((qustion, index) => (
                    qustion && (
                        tempQuestions.push({id: `${index}`, text: qustion.text, type: qustion.type})
                    )
                ))
            }
            setChosenTags(tempTags);
            setCompetitionsAndGoals(tempCopetitionsAndGoals);
            setCompetitionsAndGoalsString(tempCopetitionsAndGoalsString);
            setQuestions(tempQuestions);
            setQuestionCount(tempQuestions.length)
        };
        getSession();
    }, []);

    const putSession = async (activity: Activity) => {
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
        if (!chosenTags.includes(chosenTag) && chosenTag !== "") {
            setChosenTags([...chosenTags, chosenTag]);
        }
    }

    function handleTagRemove(tag: string) {
        const updatedTags = chosenTags.filter((p) => p !== tag);
        setChosenTags(updatedTags)
    }

    function handleDateChange(e: any) {
        const update: string = e.target.value;
        setDate(update);
    }

    function handleTitelChange(e: any) {
        const update: string = e.target.value;
        setTitel(update);
    }

    function handleTypeChange(e: any) {
        const update: string = e.target.value;
        setType(update);
    }

    function handleGoalCompetitionChange(e: any) {
        let update: Goal | Competition = {};
        const string: string = e.target.value;
        const temp = competitionsAndGoals.find((object) => object.title === string);
        if (temp) {
            update = temp;
        }
        setGoalCompetition(update);
    }

    function handleSaveButton(e: any) {
        e.preventDefault();
        /*
        const updatedSession: Activity = {
            title: titel, date: new Date(date),
            type: type, tags: chosenTags,
            connection: goalCompetition
        }
        putSession(updatedSession);
        */
    }

    return (
        <div id="edit-session-page">
            <header id="edit-session-page-header">
                <Link legacyBehavior href="/"><a id="edit-session-page-logo">Logo</a></Link>
                <nav id="edit-session-page-nav">
                    <Link legacyBehavior href="/athlete/[athleteId]" as={`/athlete/${params.athleteId}`}><a id="edit-session-page-back">Tilbake</a></Link>
                    <Notifications></Notifications>
                </nav>
            </header>
            <div id="edit-session-page-content">
                <p id="edit-session-page-title">Økt: {session.name}</p>
                <div id="edit-session-page-table">
                    <div className="edit-session-page-create-point">
                        <p className="edit-session-page-create-point-title">Dato: </p>
                        <input className="edit-session-page-create-point-input"
                        type="date"
                        min={currentdate}
                        onChange={handleDateChange}
                        defaultValue={session?.date && DateToStringAlternate(session.date)}/>
                    </div>
                    <div className="edit-session-page-create-point">
                        <p className="edit-session-page-create-point-title">Titel: </p>
                        <input className="edit-session-page-create-point-input"
                        onChange={handleTitelChange}
                        defaultValue={session.name}/>
                    </div>
                    <div className="edit-session-page-create-point">
                        <p className="edit-session-page-create-point-title">Type: </p>
                        <input className="edit-session-page-create-point-input"
                        onChange={handleTypeChange}
                        defaultValue={session.type}/>
                    </div>
                    <div className="edit-session-page-create-point">
                        <p className="edit-session-page-create-point-title">Tags: </p>
                        <input className="edit-session-page-create-point-input" onChange={(e) => handleTagsChange(e)}/>
                        <button className="edit-session-page-create-point-button" onClick={handleTagAdd}>Legg til</button>
                    </div>
                    <div id="edit-session-page-tags">
                        <ul>
                            {chosenTags.map((tag) => (
                                <li key={tag}>
                                    {tag} <button onClick={() => handleTagRemove(tag)}>x</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="edit-session-page-create-point">
                        <p className="edit-session-page-create-point-title">Mål/konkuranse: </p>
                        <select className="edit-session-page-create-point-dropdown"
                        onChange={handleGoalCompetitionChange}
                        defaultValue={session.connection?.title}>
                            {competitionsAndGoalsString.map((goalCompetion) => (
                                <option key={goalCompetion} value={goalCompetion}>{goalCompetion}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div id="edit-session-page-interval-and-question">
                    <div id="edit-session-page-intervals">
                        <p>Intervals: </p>
                        {intervals.map((interval, index) => (
                            <Interval key={interval.key} index={index} handleDataUpdate={handleIntervalDataUpdate} data={interval}></Interval>
                        ))}
                        <div id="edit-session-page-intervals-buttons">
                            <button id="edit-session-page-intervals-add" onClick={addInterval}>Add interval</button>
                            <button id="edit-session-page-intervals-remove" onClick={removeInterval}>Fjern interval</button>
                        </div>
                    </div>
                    <div id="edit-session-page-questions">
                        <p>Questions: </p>
                        <AddExistingQuestion existingQuestions={exampleQuestions} handleAddExistingQuestion={handleAddExistingQuestion}></AddExistingQuestion>
                        {questions.map((question, index) => (
                            <Question key={question.id} index={index} handleDataUpdate={handleQuestionDataUpdate} data={question}></Question>
                        ))}
                        <div id="edit-session-page-questions-buttons">
                            <button id="edit-session-page-questions-add" onClick={addQuestion}>Add spørsmål</button>
                            <button id="edit-session-page-questions-remove" onClick={removeQuestion}>Fjern spørsmål</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="edit-session-page-save">
                <button id="edit-session-page-save-button" onClick={(e) => handleSaveButton(e)}>Lagre</button>
            </div>
        </div>
    )
}