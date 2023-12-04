import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';


export async function GET(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === "GET") {
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
