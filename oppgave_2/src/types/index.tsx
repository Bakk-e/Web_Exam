type Competition = {
    id: string,
    title: string,
    location: string,
    date: Date,
    goal: string,
    type: string,
    priority: string,
    comment: string
}

export type Goal = {
    id: string,
    title: string,
    date: Date,
    goal: string,
    comment: string
}

//Not in use yet
type ReportInterval = {
    minHeartRate: number,
    maxHeartRate: number,
    avrageHeartRate: number,
    minSpeed: number,
    maxSpeed: number,
    avrageSpeed: number,
    minWattage: number,
    maxWattage: number,
    avrageWattage: number,
    time: number
}

//Not in use yet
type Question = {
    text: string,
    answer: string
}

type ReportStatus = {
    id: string,
    status: "no" | "low" | "normal" | "high",
}

type Session = {
    id: string,
    date: Date,
    title: string,
    type: string,
    tags: string[],
    reportStatus: ReportStatus
}

export type Athlete = {
    id: string,
    gender: string,
    sport: string,
    maxHeartRate: number,
    thresholdWattage: number,
    thresholdSpeed: number,
    competitions: Competition[],
    goals: Goal[],
    sessions: Session[]
}

export type AthleteMini = {
    id: string,
    gender: string,
    sport: string
}