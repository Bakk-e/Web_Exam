<<<<<<< HEAD
import prisma from "@/lib/db"
//import { loadData } from "./getData"
=======
import { PrismaClient } from "@prisma/client"
import { fetchAthletesFromAPI, insertAthleteData } from "./getData"
>>>>>>> origin/jacob_holth_oppgave2



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
<<<<<<< HEAD
    //await loadData()
=======
  //  await fetchAthletesFromAPI()
>>>>>>> origin/jacob_holth_oppgave2

   // console.log("Data loaded")
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