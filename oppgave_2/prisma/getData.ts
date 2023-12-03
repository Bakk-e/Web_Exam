import prisma from "@/lib/db";
import { ApiProps, Athlete } from "@/types";


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
}

async function insertAthleteData (athlete : Athlete) {
      const competitionsToCreate =
        athlete.competitions?.map((comp) => ({
          id: comp.id,
          title: comp.title,
          date: comp.date,
          location: comp.location,
          goal: comp.goal,
          type: comp.type,
          priority: comp.priority,
          comment: comp.comment,
        })) ?? []

      const goalsToCreate =
        athlete.goals?.map((goal) => ({
          id: goal.id,
          title: goal.title,
          date: goal.date,
          goal: goal.goal,
          comment: goal.comment,
        })) ?? []

      const sessionTocreate = athlete.sessions?.map((session) => ({
        id: session.id,
        date: session.date,
        title: session.title,
        type: session.type,
        tags: session.tags,
        questions: {
          create:
            session.questions?.map((question) => ({
              id: question.id,
              text: question.text,
              type: question.type,
              answer: question.answer,
            })) ?? [],
        },
        intervals: {
          create:
            session.intervals?.map((interval) => ({
              id: interval.id,
              duration: interval.duration,
              intensityZone: interval.intensityZone,
            })) ?? [],
        },
        report: {
          create: {
            id: session.report?.id,
            status: session.report?.status,
            intervalReport: {
              create:
                session.intervals?.map((intervalReport) => ({
                  id: intervalReport.id,
                  intensityZone: intervalReport.intensityZone,
                  duration: intervalReport.duration,
                })) ?? [],
            },
          },
        },
      })) ?? [];
      
      await prisma.athlete.create({
        data: {
          id: athlete.id,
          userId: athlete.userId,
          gender: athlete.gender,
          sport: athlete.sport,
          //
          maxHeartRate: athlete.meta?.heartrate,
          thresholdWattage: athlete.meta?.watt,
          thresholdSpeed: athlete.meta?.speed,
          //
          competitions: {
            create: competitionsToCreate,
          },
          goals: {
            create: goalsToCreate,
          },
          sessions: {
            create: sessionTocreate,
          },
        },
      })

  console.log(`Created athlete with id: ${athlete.userId}`);
  console.log(`Sessions: ${athlete.sessions?.length}`);
}

async function insertAthleteAndRelatedData(athleteData : Athlete){

 }

export { fetchAthletesFromAPI , insertAthleteData}