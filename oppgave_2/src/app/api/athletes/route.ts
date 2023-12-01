import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';

/*
const athleteInfos: AthleteMini[] = [
    { id: "ola-nor-123", gender: "Hankjønn", sport: "Sykling"},
    { id: "ale-bar-432", gender: "Hankjønn", sport: "Løping"},
    { id: "nor-hem-465", gender: "Hunkjønn", sport: "Svømming"},
    { id: "noa-ble-783", gender: "Hankjønn", sport: "Løping"},
    { id: "tur-kle-546", gender: "Hunkjønn", sport: "Roing"}
]
*/

export async function GET(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === "GET") {
        try {

            const athletes = prisma.athlete.findMany({
                select: {
                    userId: true,
                    sport: true,
                    gender: true,
                }
            });

            return NextResponse.json(
                { data: (await athletes).map((athlete) =>(
                    { userId: athlete.userId, sport: athlete.sport, gender: athlete.gender}
                )) }, 
                { status: 200 })
        } catch (error) {
            console.error(error)
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
        }
    }
}

/*
export async function POST(request: NextRequest) {
    if (request.method === "POST") {
        try {
            const data = await request.json()

            const createAthlete = await prisma.athlete.create({
                data: {
                    userId: data.userId,
                    gender: data.gender,
                    sport: data.sport,
                    maxHeartRate: data.maxHeartRate,
                    thresholdWattrate: data.thresholdWattrate,
                    thresholdSpeed: data.thresholdSpeed
                }
            })

            return NextResponse.json({
                { data: }
            })
            
        } catch (error) {
            
        }
    }
}

/*
export async function POST(request: NextResponse) {
    const data = await request.json()
    return NextResponse.json({ status: 200 })
}
*/