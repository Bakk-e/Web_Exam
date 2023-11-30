
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from "next/server";

import prisma from '@/lib/db';


export function GET(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "GET") {
    try {
      const { athleteId } = request.query
      const athlete = prisma.athlete.findUnique({
        where: { id: athleteId as string },
      })
      //const { athleteId } = context.params;
      //const athlet = athlets.find(({ id }) => id === athleteId);

      return NextResponse.json({ data: athlete }, { status: 200 })
    } catch (error) {
      console.error(error)
      response.status(500).json({ error: "Internal Server Error" })
    }
  }
}

/*
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from "next/server";

import { Athlete } from "@/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {

    // Fetch data from your SQLite database
    const athlet = await prisma.user.findMany()

    // Respond with the data in the desired format
    res.status(200).json({
      data: athlet,
      status: 200,
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
*/