import prisma from "@/lib/db";
import { fetchAthletesFromAPI, insertAthleteData } from "./getData"

async function main() {
  try {
    await prisma.athlete.deleteMany()

    const athletesFromApi = await fetchAthletesFromAPI()

    for (const athlete of athletesFromApi) {
      await insertAthleteData(athlete)
    }
    console.log("data loaded")
  } catch (error) {
    console.error("failed to load: ", error)
    process.exit(1)
  }
} 

main()
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })