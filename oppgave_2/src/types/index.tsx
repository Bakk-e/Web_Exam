
export type Athlete = {
    id: string,
    userId: string;
    gender: string,
    sport: string,
    meta?: Meta,
    activities?: Activity[],
    competitions?: Competition[],
    goals?: Goal[],
}

export type Meta = {
    id: number,
    heartrate?: number,
    watt?: number,
    speed?: number,
}

export type Activity = {
    id?: string,
    date?: Date,
    name?: string,
    type?: string,
    tags?: string,
    questions?: Question[],
    intervals?: Interval[],
    parameters?: string[],
    report?: Report,
    connection?: Goal | Competition
}

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
    id?: number,
    minIntensity?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
    maxIntensity?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
    avrageIntensity?: number,
    minHeartRate?: number,
    maxHeartRate?: number,
    averageHeartRate?: number,
    minSpeed?: number,
    maxSpeed?: number,
    averageSpeed?: number,
    minWattage?: number,
    maxWattage?: number,
    averageWattage?: number,
    duration?: number
}

export type Question = {
    id? : string,
    text?: string,
    type?: "text" | "radio" | "emoji",
    answer?: string
}

export type Report = {
    id?: string,
    status?: "ingen" | "no" | "low" | "normal" | "high",
    reportIntervals?: ReportInterval[],
    comment?: string
}

export type Interval = {
    id? : string,
    duration?: number,
    intensityZone?: 1 | 2 | 3 | 4 | 5
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
    id: string,
    text?: string,
    type?: string
}

export type ReportIntervalInfo = {
    durationExpected?: number,
    intensityZone?: 1 | 2 | 3 | 4 | 5,
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
    durationAchieved?: number
}

export type parameter = {
    eng: string,
    no: string
}

export type ApiProps = {
    pages : number
    success : boolean
    hasMore : boolean
    page : number
    data : Athlete[]
}

export type ArchivedMeta = {
    id: string,
    heartRate: number,
    watt: number,
    speed: number, //Need to be a float o.O
}