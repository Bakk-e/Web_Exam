import prisma from "@/lib/db"
//import { loadData } from "./getData"



async function main() {
//const main = async () => {
  //try {
    //await loadData()

    console.log("Data loaded")
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