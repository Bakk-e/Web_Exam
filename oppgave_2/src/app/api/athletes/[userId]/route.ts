import prisma from "@/lib/db"
import { NextApiRequest, NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server"

import { ApiProps } from "@/types/index"

export async function GET(request: NextApiRequest, context: any) {
  try {
    const { userId } = context.params
    console.log("userId in API: ", userId)

    const athleteDetails = await prisma.athlete.findFirst({
      where: {
        userId: userId,
      },
      include: {
        meta: true,
        activities: true,
        competitions: true,
        goals: true,
      }
    })

    console.log("Athlete recieved from the db: ", athleteDetails)
    if (!athleteDetails) {
      throw new Error("Athlete not found")
    }

    return NextResponse.json({ data: athleteDetails }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    )
  }
}


export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const apiUrl = "https://webapp-api.vercel.app/api/users"
  const response = await fetch(apiUrl)
  if (!response.ok) {
    throw new Error("Error fetching from api")
  }
  const apiResponse = (await response.json()) as ApiProps
}
/*
async function handler(req: NextRequest, res: NextResponse) {
  try {
    const apiUrl = "https://webapp-api.vercel.app/api/users"
    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error("Error Fetching from api")
    }
    const apiResponese = (await response.json()) as ApiProps

    for (const user of apiResponese.data) {
      const competitionsToCreate =
        user.competitions?.map((comp) => ({
          id: comp.id,
          title: comp.title,
          location: comp.location,
          date: comp.date,
          goal: comp.goal,
          type: comp.type,
          priority: comp.priority,
          comment: comp.comment,
        })) ?? []

      const goalsToCreate =
        user.goals?.map((goal) => ({
          id: goal.id,
          title: goal.title,
          date: goal.date,
          goal: goal.goal,
          comment: goal.comment,
        })) ?? []

      const activityTocreate = user.activities?.map((activity) => ({
        id: activity.id,
        date: activity.date,
        title: activity.title,
        type: activity.type,
        tags: activity.tags,
        questions: {
          create:
            activity.questions?.map((question) => ({
              id: question.id,
              text: question.text,
              type: question.type,
              answer: question.answer,
            })) ?? [],
        },
        intervals: {
          create:
            activity.intervals?.map((interval) => ({
              id: interval.id,
              duration: interval.duration,
              intensityZone: interval.intensityZone,
            })) ?? [],
        },
        report: {
          create: {
            id: activity.report?.id,
            status: activity.report?.status,
            intervalReport: {
              create:
                activity.intervals?.map((intervalReport) => ({
                  id: intervalReport.id,
                  intensityZone: intervalReport.intensityZone,
                  duration: intervalReport.duration,
                })) ?? [],
            },
          },
        },
      }))
      await prisma.athlete.create({
        data: {
          id: user.id,
          userId: user.userId,
          gender: user.gender,
          sport: user.sport,
          meta: {
            create: {
              id: user.meta.heartRate,
              heartRate: user.meta.heartRate,
              speed: user.meta.speed,
            }
          },
          activities: {
            create: activityTocreate,
          },
          competitions: {
            create: competitionsToCreate,
          },
          goals: {
            create: goalsToCreate,
          },
        },
      })
    }
  } catch (error) {
    console.error(error)
    // res.status(500).json({ error: 'Internal Server Error' })
  } finally {
    await prisma.$disconnect()
  }
}
*/
