import prisma from "@/lib/db"
import { Competition } from "@/types"
import { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server"


export async function POST(request: NextApiRequest, context: any) {
  try {
    const { userId } = context.params
    const competitionData: Competition = request.body
    //const { id, title, date, location, goal, type, priority, comment } = request.body;

    const athleteComp = await prisma.athlete.findFirst({
      where: {
        userId: String(userId),
      },
    })

    if (!athleteComp) {
      throw new Error("Athlete not found")
    }

    const newComp = await prisma.competition.create({
      data: {
        title: competitionData.title,
        date: competitionData.date,
        location: competitionData.location,
        goal: competitionData.goal,
        type: competitionData.type,
        priority: competitionData.priority,
        comment: competitionData.comment,

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
