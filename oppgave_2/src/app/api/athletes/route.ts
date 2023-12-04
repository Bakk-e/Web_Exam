import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';
import {randomUUID} from "crypto";
import {Athlete} from "@/types"

export type MetaProps = {
    maxHeartRate: string;
    thresholdWattage: string;
    thresholdSpeed: string;
};

export type AthleteProps = {
    firstName: string;
    lastName: string;
    gender: string;
    sport: string;
    meta: MetaProps;
};

function generateRandomStringFromName(firstName : string, lastName : string){
    const combinedString = firstName + lastName
    console.log(typeof firstName, typeof lastName)
    const characters = combinedString.split('');

    for (let i = characters.length - 1 ; i > 0 ; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [characters[i], characters[j]] = [characters[j], characters[i]]
    }
    return characters.slice(0,8).join("")
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {

            const athletes = prisma.athlete.findMany({
                select: {
                    userId: true,
                    gender: true,
                    sport: true,
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

export async function POST (req: NextRequest, res: NextResponse) {
    const body = await req.json() as AthleteProps
    try {
        const { firstName, lastName, gender, sport, meta } = body;
        console.log({ gender, sport, meta});
        const newAthlete = await prisma.athlete.create({
            data : {
                id : randomUUID(),
                userId : generateRandomStringFromName(firstName,lastName),
                gender : gender,
                sport : sport,
            }
        })

        const newMeta = await prisma.meta.create({
            data: {
                heartrate: meta.maxHeartRate ? parseInt(meta.maxHeartRate, 10) : null,
                watt: meta.thresholdWattage ? parseInt(meta.thresholdWattage, 10) : null,
                speed: meta.thresholdSpeed ? parseInt(meta.thresholdSpeed, 10) : null,
                athleteId: newAthlete.id,
            }
        });
        return NextResponse.json({success : true ,data : {newAthlete, meta : newMeta}, message : "Created new athlete"})
        //res.status(200).json(newAthlete)
    }catch (e){
        console.error("Failed to create athlete", e)
        // res.status(500).json({ error: "Internal Server Error" });
        return NextResponse.json({success : false , message : "Internal Server Error"})
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
