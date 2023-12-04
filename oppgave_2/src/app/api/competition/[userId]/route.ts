import prisma from "@/lib/db"
import { Competition } from "@/types"
import { NextRequest } from "next/server";
import { NextResponse } from "next/server"


export async function POST(request: NextRequest, {params}: {params: {userId: string}}) {
  const body = await request.json() as Competition
  try {
    const {title, date, location, goal, type, priority, comment} = body;

    const athleteComp = await prisma.athlete.findFirst({
      where: {
        userId: params.userId,
      },
    })

    if (!athleteComp) {
      throw new Error("Athlete not found")
    }

    const newComp = await prisma.competition.create({
      data: {
        title: title,
        date: date,
        location: location,
        goal: goal,
        type: type,
        priority: priority,
        comment: comment,

        Athlete: {
            connect: {
                userId: athleteComp.userId,
            },
        }
      },
    })

    return NextResponse.json({ success: true, data: { newComp }, message: "Created new competition" })
    //return response.status(200).json({ data: newComp })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, message: "Internal Server Error" })
  }
}
