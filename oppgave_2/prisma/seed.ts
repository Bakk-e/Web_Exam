import { PrismaClient } from "@prisma/client"
import { url } from "inspector"

const prisma = new PrismaClient()

const fetchAthletesFromAPI = async (url: string) => {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}`)
  }

  return response.json()
}

const main = async () => {
  try {
    await prisma.

    const jsonURL = "https://webapp-api.vercel.app/api/users"
    const athleteData = await fetchAthletesFromAPI(jsonURL)

    await Promise.all(
      athleteData.map(async (data) = {
        await prisma.athlete.create({ data })
      })
    ) 
  }

}

main()
.then(async() => {
  await prisma.$disconnect()
})
.catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)

})