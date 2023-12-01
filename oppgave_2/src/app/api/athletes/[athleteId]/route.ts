import prisma from "@/lib/db";
import {NextRequest, NextResponse} from "next/server";
import {ApiProps} from "@/types/index"
import {NextApiRequest, NextApiResponse} from "next";


async function POST(req : NextApiRequest, res : NextApiResponse){
  const apiUrl = "https://webapp-api.vercel.app/api/users";
  const response = await fetch(apiUrl)
  if (!response.ok){
    throw new Error("Error fetching from api")
  }
  const apiResponse = (await response.json()) as ApiProps
}

async function handler(req : NextRequest, res : NextResponse){
  try {
    const apiUrl = "https://webapp-api.vercel.app/api/users"
    const response = await fetch(apiUrl)

    if (!response.ok){
      throw new Error(
          "Error Fetching from api"
      )
    }
    const apiResponese = await response.json() as ApiProps

    for (const user of apiResponese.data) {
      const competitionsToCreate = user.competitions?.map(comp => ({
        id: comp.id,
        title: comp.title,
        date: comp.date,
        location: comp.location,
        goal: comp.goal,
        type: comp.type,
        priority: comp.priority,
        comment: comp.comment,
      })) ?? [];

      const goalsToCreate = user.goals?.map(goal => ({
        id: goal.id,
        title: goal.title,
        date: goal.date,
        goal: goal.goal,
        comment: goal.comment,
      })) ?? [];

      const sessionTocreate = user.sessions?.map(session => ({
        id : session.id,
        date: session.date,
        title: session.title,
        type: session.type,
        tags: session.tags,
        questions : {
          create : session.questions?.map(question => ({
            id: question.id,
            text: question.text,
            type: question.type,
            answer: question.answer,
          })) ?? [],
        },
        intervals : {
          create : session.intervals?.map(interval => ({
            id : interval.id,
            duration : interval.duration,
            intensityZone : interval.intensityZone
          })) ?? [],
        },
        report : {
          create : {
            id : session.report?.id,
            status : session.report?.status,
            intervalReport : {
              create : session.intervals?.map(intervalReport => ({
                id: intervalReport.id,
                intensityZone: intervalReport.intensityZone,
                duration: intervalReport.duration,
              })) ??[]
            }
          }
        }
      }))
      await prisma.athlete.create({
        data: {
          id: user.id,
          userId : user.userId,
          gender: user.gender,
          sport: user.sport,
          maxHeartRate: user.maxHeartRate,
          thresholdWattage: user.thresholdWattage,
          thresholdSpeed: user.thresholdSpeed,
          competitions: {
            create: competitionsToCreate
          },
          goals: {
            create: goalsToCreate
          },
          sessions: {
            create: sessionTocreate
          },
        },
      })
    }
  }
  catch (error){
    console.error(error)
   // res.status(500).json({ error: 'Internal Server Error' })
  }finally {
    await prisma.$disconnect()
  }
}
export default POST

