import prisma from "@/lib/db";
import { Goal } from "@/types";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse, context: any) {
    const body = await request.json() as Goal
    try {
        const { title, date, goal, comment } = body;

        const { userId } = context.params;

        const athleteGoal = await prisma.athlete.findFirst({
            where: {
                userId: String(userId),
            },
        })

        if (!athleteGoal) {
            throw new Error("Athlete not found")
        }

        const newGoal = await prisma.goal.create({
            data: {
                id: randomUUID(),
                title: title,
                date: date,
                goal: goal,
                comment: comment,

                Athlete: {
                    connect: {
                        userId: athleteGoal.userId
                    }
                }
            }
        })

        return NextResponse.json({success: true, data: {newGoal}, message: "Created new goal"})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, message: "Internal Server Error"})
    }
}