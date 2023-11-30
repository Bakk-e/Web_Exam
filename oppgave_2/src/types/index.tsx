export type Competition = {
    id?: string,
    title?: string,
    location?: string,
    date?: Date,
    goal?: string,
    type?: string,
    priority?: "A" | "B" | "C",
    comment?: string
}

export type Goal = {
    id?: string,
    title?: string,
    date?: Date,
    goal?: number,
    comment?: string
}

type ReportInterval = {
    minIntensity?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
    maxIntensity?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
    avrageIntensity?: number,
    minHeartRate?: number,
    maxHeartRate?: number,
    avrageHeartRate?: number,
    minSpeed?: number,
    maxSpeed?: number,
    avrageSpeed?: number,
    minWattage?: number,
    maxWattage?: number,
    avrageWattage?: number,
    duration?: number
}

export type Question = {
    text?: string,
    type?: "text" | "radio" | "emoji",
    answer?: string
}

export type Report = {
    id?: string,
    status?: "no" | "low" | "normal" | "high",
    reportIntervals?: ReportInterval[],
    comment?: string
}

export type Interval = {
    duration?: number,
    intensityZone?: 1 | 2 | 3 | 4 | 5
}

export type Session = {
    id?: string,
    date?: Date,
    title?: string,
    type?: string,
    tags?: string[],
    questions?: Question[],
    intervals?: Interval[],
    parameters?: string[],
    report?: Report,
    connection?: Goal | Competition
}

export type Athlete = {
    id: string,
    gender: string,
    sport: string,
    maxHeartRate: number,
    thresholdWattage: number,
    thresholdSpeed: number,
    competitions?: Competition[],
    goals?: Goal[],
    sessions?: Session[]
}

export type AthleteMini = {
    id: string,
    gender: string,
    sport: string
}

export type Template = {
    id?: string,
    title?: string,
    type?: string,
    tags?: string[],
    questions?: Question[],
    intervals?: Interval[],
    parameters?: string[]
}

export type IntervalData = {
    key: number,
    duration?: number,
    intensityZone?: number
}

export type QuestionData = {
    key: number,
    text?: string,
    type?: string
}

export type ReportIntervalInfo = {
    durationExpected?: number,
    intensityZone?: 1 | 2 | 3 | 4 | 5,
    minIntensity?: 1 | 2 | 3 | 4 | 5,
    maxIntensity?: 1 | 2 | 3 | 4 | 5,
    avrageIntensity?: number,
    minHeartRate?: number,
    maxHeartRate?: number,
    avrageHeartRate?: number,
    minSpeed?: number,
    maxSpeed?: number,
    avrageSpeed?: number,
    minWattage?: number,
    maxWattage?: number,
    avrageWattage?: number,
    durationAchieved?: number
}