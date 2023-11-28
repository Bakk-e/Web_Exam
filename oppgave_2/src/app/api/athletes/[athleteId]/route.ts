import { PrismaClient } from '@prisma/client';

/*
export function GET(request: NextRequest, context: any) {
    const { athleteId } = context.params;
    const athlet = athlets.find(({ id }) => id === athleteId);

    return NextResponse.json(
        {data: athlet},
        {status: 200});
}
*/

import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from "next/server";

import { Athlete } from "@/types";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fetch data from external API
    //const apiUrl = "https://webapp-api.vercel.app/api/users"
    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error(
        `Error fetching data from ${apiUrl}: ${response.statusText}`,
      )
    }

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
}