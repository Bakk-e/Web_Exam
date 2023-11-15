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
    minIntensity?: 1 | 2 | 3 | 4 | 5,
    maxIntensitySone?: 1 | 2 | 3 | 4 | 5,
    avrageIntensitySone?: number,
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

type Question = {
    text?: string,
    answer?: string
}

type Report = {
    id?: string,
    status?: "no" | "low" | "normal" | "high",
    reportIntervals?: ReportInterval[]
}

type Interval = {
    duration?: number,
    intensitySone?: 1 | 2 | 3 | 4 | 5
}

export type Session = {
    id?: string,
    date?: Date,
    title?: string,
    type?: string,
    tags?: string[],
    questions?: Question[],
    intervals?: Interval[],
    reportStatus?: Report,
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