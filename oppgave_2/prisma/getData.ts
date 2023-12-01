import prisma from "@/lib/db"
import { Athlete, Competition } from "@/types"
import { Activity } from "lucide-react"

<<<<<<< HEAD
=======
import { Athlete , ApiProps} from "@/types"

const prisma = new PrismaClient()
>>>>>>> origin/jacob_holth_oppgave2

//const fetchAthletesFromAPI = async (url: string): Promise<Athlete[]> => {
async function fetchAthletesFromAPI(): Promise<Athlete[]> {
  let hasMore = true
  let page = 1
  let allAthletes : Athlete[] = []

  while (hasMore){
    const response = await fetch(`https://webapp-api.vercel.app/api/users?page=${page}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch data from API: ${response.statusText}`)
    }
    const pageData = await response.json() as ApiProps
    allAthletes = [...allAthletes, ...pageData.data]
    hasMore = pageData.hasMore
    page++
  }
  return allAthletes

<<<<<<< HEAD
  const apiData = await response.json()

  return apiData.map(fromAPIToAthlete)
=======

 // return response.json() as Promise<Athlete[]>
>>>>>>> origin/jacob_holth_oppgave2

  //return response.json() as Promise<Athlete[]>
  
}

function fromAPIToAthlete(apiAthlete: any): Athlete {
    return {
        id: apiAthlete.id,
        gender: apiAthlete.gender,
          sport: apiAthlete.sport,
          maxHeartRate: apiAthlete.maxHeartRate,
          thresholdWattrate: apiAthlete.thresholdWattage,
          thresholdSpeed: apiAthlete.thresholdSpeed,
          competitions: {
            create: apiAthlete.activities.map((activity: Competition) => ({
                id: activity.id,
                title: activity.title || "",
                date: new Date(activity.date),
                location: activity.location,
                goal: activity.goal,
                type: activity.type,
                priority: activity.priority,
                comment: activity.comment,

            }))
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
        }
}

<<<<<<< HEAD
const loadData = async () => {
  await prisma.athlete.deleteMany()

  //const jsonURL = "https://webapp-api.vercel.app/api/users"
  //const athleteData = await fetchAthletesFromAPI(jsonURL)

  const athleteData = await fetchAthletesFromAPI()

  for (const athlete of athleteData) {
    await prisma.athlete.create({
        data: athlete,
    });

  }

  /*
    for (let athlete of athleteData) {
      await prisma.athlete.createMany({
        //data: athlete,
        data: {
          id: athlete.id,
          gender: athlete.gender,
          sport: athlete.sport,
          maxHeartRate: athlete.maxHeartRate,
          thresholdWattrate: athlete.thresholdWattage,
          thresholdSpeed: athlete.thresholdSpeed,
        competitions: {
            create: (athlete.competitions || []).map((competition) => (
                {
                    id: athlete.competitions?.id || undefined,
                    title: athlete.competitions?.title || "",
                    date: athlete.competitions?.[0]?.date || "",
                    location: athlete.competitions?.[0]?.location || "",
                    goal: athlete.competitions?.[0]?.goal || "",
                    type: athlete.competitions?.[0]?.type || "",
                    priority: athlete.competitions?.[0]?.priority || "",
                    comment: athlete.competitions?.[0]?.comment || "",
                })),
        },
        goals: {
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
      },
    }),

      console.log(`Created athlete with id: ${athlete.id}`)
    }
  }
  */
=======
async function insertAthleteData (athlete : Athlete) {
  await prisma.athlete.create({
    data: {
      id: athlete.id,
      gender: athlete.gender,
      sport: athlete.sport,
      //
      maxHeartRate: athlete.meta?.heartrate,
      thresholdWattage: athlete.meta?.watt,
      thresholdSpeed: athlete.meta?.speed
    }
  })
>>>>>>> origin/jacob_holth_oppgave2

  console.log(`Created athlete with id: ${athlete.id}`);
}

async function insertAthleteAndRelatedData(athleteData : Athlete){

 }

export { fetchAthletesFromAPI , insertAthleteData}

//module.exports = { loadData }
