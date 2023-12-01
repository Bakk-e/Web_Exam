import { PrismaClient } from "@prisma/client"
import { fetchAthletesFromAPI, insertAthleteData } from "./getData"


const prisma = new PrismaClient()

async function main() {
    try {
        const athletesFromApi = await fetchAthletesFromAPI()

        for (const athlete of athletesFromApi){
            await insertAthleteData(athlete)
        }
        console.log("data loaded")
    }catch (error){
        console.error("failed to load: " , error)
        process.exit(1)
    }
    /*finally {
        prisma.$disconnect()
    }*/


//const main = async () => {
  //try {
  //  await fetchAthletesFromAPI()

   // console.log("Data loaded")
  } 
  /*
  catch (e) {
    console.error(e)
  } finally {
    await prisma.$disconnect()
  }
}
  */

main()
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })