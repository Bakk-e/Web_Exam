import prisma from "@/lib/db"
import { Athlete, Competition } from "@/types"
import { Activity } from "lucide-react"

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


 // return response.json() as Promise<Athlete[]>

  //return response.json() as Promise<Athlete[]>
  
}

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

  console.log(`Created athlete with id: ${athlete.id}`);
}

async function insertAthleteAndRelatedData(athleteData : Athlete){

 }

export { fetchAthletesFromAPI , insertAthleteData}

//module.exports = { loadData }
