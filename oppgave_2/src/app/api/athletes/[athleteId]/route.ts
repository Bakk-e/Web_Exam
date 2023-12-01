import { PrismaClient, } from '@prisma/client';
import {NextRequest, NextResponse} from "next/server";
import {ApiProps} from "@/types/index"
import {NextApiRequest, NextApiResponse} from "next";


const prisma = new PrismaClient()

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




/*
export function GET(request: NextRequest, context: any) {
    const { athleteId } = context.params;
    const athlet = athlets.find(({ id }) => id === athleteId);

    return NextResponse.json(
        {data: athlet},
        {status: 200});
}


>>>>>>> origin/jacob_holth_oppgave2
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from "next/server";

import { Athlete } from "@/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
<<<<<<< HEAD
=======
    // Fetch data from external API
    //const apiUrl = "https://webapp-api.vercel.app/api/users"
    //const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error(
        `Error fetching data from ${apiUrl}: ${response.statusText}`,
      )
    }*/
/*
    const data = await response.json()

    // Save data to SQLite database
    for (const user of data) {
      await prisma.athlete.create({
        data: {
          id: user.id,
          gender: user.gender,
          sport: user.sport,
          maxHeartRate: user.maxHeartRate,
          thresholdWattrate: user.thresholdWattage,
          thresholdSpeed: user.thresholdSpeed,
          competitions: {
            create: [
              {
                id: user.competitions.id,
                title: user.competitions.title,
                date: user.competitions.date,
                location: user.competitions.location,
                goal: user.competitions.goal,
                type: user.competitions.type,
                priority: user.competitions.priority,
                comment: user.competitions.comment,
              },
            ],
          },
          goals: {
            create: [
              {
                id: user.goals.id,
                title: user.goals.title,
                date: user.goals.date,
                goal: user.goals.goal,
                comment: user.goals.comment,
              },
            ],
          },
          session: {
            create: [
              {
                id: user.sessions.id,
                date: user.sessions.date,
                title: user.sessions.title,
                type: user.sessions.type,
                tags: user.sessions.tags,
                questions: {
                  create: [
                    {
                      id: user.sessions.questions.id,
                      text: user.sessions.questions.question,
                      type: user.sessions.questions.type,
                      answer: user.sessions.questions.answer,
                    },
                  ],
                },
                intervals: {
                  create: [
                    {
                      id: user.sessions.intervals.id,
                      duration: user.sessions.intervals.duration,
                      intensity: user.sessions.intervals.intensity,
                    },
                  ],
                },
                report: {
                  create: {
                    id: user.sessions.report.id,
                    status: user.sessions.report.status,
                    intervalReport: {
                      create: {
                        id: user.sessions.report.intervalReport.id,
                        intervalNumber:
                          user.sessions.report.intervalReport.intervalNumber,
                        averageIntesitySone:
                          user.sessions.report.intervalReport
                            .averageIntesitySone,
                        minHeartRate:
                          user.sessions.report.intervalReport.minHeartRate,
                        maxHeartRate:
                          user.sessions.report.intervalReport.maxHeartRate,
                        averageHeartRate:
                          user.sessions.report.intervalReport.averageHeartRate,
                        minSpeed: user.sessions.report.intervalReport.minSpeed,
                        maxSpeed: user.sessions.report.intervalReport.maxSpeed,
                        averageSpeed:
                          user.sessions.report.intervalReport.averageSpeed,
                        minWattage:
                          user.sessions.report.intervalReport.minWattage,
                        maxWattage:
                          user.sessions.report.intervalReport.maxWattage,
                        averageWattage:
                          user.sessions.report.intervalReport.averageWattage,
                        duration: user.sessions.report.intervalReport.duration,
                      },
                    },
                    comments: user.sessions.report.comments,
                  },
                },
                connection: {
                  create: {
                    goal: {
                      connect: {
                        id: user.sessions.connection.goalId,
                      },
                    },
                    competition: {
                      connect: {
                        id: user.sessions.connection.competitionId,
                      },
                    },
                  },
                },
              },
            ],
          },
        },
      })
    }
>>>>>>> origin/jacob_holth_oppgave2

    // Fetch data from your SQLite database
    const athlet = await prisma.user.findMany()

    // Respond with the data in the desired format
    res.status(200).json({
      data: athlet,
      status: 200,
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}*/