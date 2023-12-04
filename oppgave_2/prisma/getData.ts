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

      const activitiesToCreate =
        athlete.activities?.map((activity) => ({
          id: activity.id,
          date: activity.date,
          title: activity.name,
          type: activity.type,
          tags: activity.tags?.join(",") || null, // Convert tags array to string or set it to null if undefined
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
          /*
          report: {
            create: {
              id: activity.report?.id,
              status: activity.report?.status,
              reportIntervals: {
                create:
                  activity.intervals?.map((reportInterval) => ({
                    id: reportInterval.id,
                    intensityZone: reportInterval.intensityZone,
                    duration: reportInterval.duration,
                  })) ?? [],
              },
            },
          },
          */
        })) ?? []
      
      await prisma.athlete.create({
        data: {
          id: athlete.id,
          userId: athlete.userId,
          gender: athlete.gender,
          sport: athlete.sport,
          meta: {
            create: {
              //id: athlete.meta?.id,
              heartrate: athlete.meta?.heartrate,
              watt: athlete.meta?.watt,
              speed: athlete.meta?.speed,
            },
          },
          activities: {
            create: activitiesToCreate,
          },
          /*
          competitions: {
            create: competitionsToCreate,
          },
          goals: {
            create: goalsToCreate,
          },
          */
        },
      })

  console.log(`Created athlete with id: ${athlete.userId}`);
  console.log(`Sessions: ${athlete.activities?.length}`);
}

async function insertAthleteAndRelatedData(athleteData : Athlete){

 }

export { fetchAthletesFromAPI , insertAthleteData}