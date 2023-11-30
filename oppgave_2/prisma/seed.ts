import { PrismaClient } from "@prisma/client"
import { loadData } from "./getData"


const prisma = new PrismaClient()

async function main() {
//const main = async () => {
  //try {
    await loadData()

    console.log("Data loaded")
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