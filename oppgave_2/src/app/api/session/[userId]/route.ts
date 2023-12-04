
import prisma from "@/lib/db";
import { Activity } from "@/types";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, {params}: {params: {userId: string}}) {
    const body = await request.json() as Activity
    try {
        const { date, name, type, tags, questions, intervals, parameters, report, connection} = body;

        const athleteActivity = await prisma.athlete.findFirst({
            where: {
                userId: params.userId,
            },
        })

        if (!athleteActivity) {
            throw new Error("Athlete not found")
        }

        const newActivity = await prisma.activity.create({
            data: {
                id: randomUUID(),
                name: name,
                type: type,
                tags: tags,
                
                //questions: questions,
                //intervals: intervals,
                //parameters: parameters,
                connection: connection,

                Athlete: {
                    connect: {
                        userId: athleteActivity.userId
                    }
                }
            }
        })

        return NextResponse.json({success: true, data: {newActivity}, message: "Created new goal"})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, message: "Internal Server Error"})
    }
}