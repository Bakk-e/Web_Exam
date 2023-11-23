import { PrismaClient } from '@prisma/client';
/*
const athlets: Athlete[] = [
  {
    id: "ola-nor-123",
    gender: "Hankjønn",
    sport: "Sykling",
    maxHeartRate: 44,
    thresholdWattage: 44,
    thresholdSpeed: 44,
    competitions: [
      {
        id: "wasd",
        title: "Tour de france",
        date: new Date("2023-12-05"),
        location: "Halden",
        goal: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit tristique tortor, vel hendrerit urna. Quisque fermentum turpis quis massa convallis, vel consectetur odio tincidunt.",
        type: "Sykkling",
        priority: "A",
        comment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit tristique tortor, vel hendrerit urna.",
      },
    ],
    goals: [
      {
        id: "dsaw",
        title: "Ny maks fart",
        date: new Date("2023-12-05"),
        goal: "23kmh",
        comment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit tristique tortor, vel hendrerit urna.",
      },
    ],
    sessions: [
      {
        id: "plple",
        date: new Date("2024-05-23"),
        title: "Legs",
        type: "Sykling",
        tags: [
          "Uphill", 
          "Rough"
        ],
        reportStatus: { id: "njan-tras-5321", status: "no" },
      },
      {
        id: "plple",
        date: new Date("2024-05-23"),
        title: "Legs",
        type: "Sykling",
        tags: ["Uphill", "Rough"],
        reportStatus: { id: "njan-tras-5321", status: "no" },
      },
    ],
  },
  {
    id: "ale-bar-432",
    gender: "Hankjønn",
    sport: "Sykling",
    maxHeartRate: 44,
    thresholdWattage: 44,
    thresholdSpeed: 44,
    competitions: [
      {
        id: "wasd",
        title: "Tour de france",
        date: new Date("2023-12-05"),
        location: "Halden",
        goal: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit tristique tortor, vel hendrerit urna. Quisque fermentum turpis quis massa convallis, vel consectetur odio tincidunt.",
        type: "Sykkling",
        priority: "A",
        comment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit tristique tortor, vel hendrerit urna.",
      },
      {
        id: "dsaw",
        title: "Tour de france",
        date: new Date("2023-12-05"),
        location: "Halden",
        goal: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit tristique tortor, vel hendrerit urna. Quisque fermentum turpis quis massa convallis, vel consectetur odio tincidunt.",
        type: "Sykkling",
        priority: "A",
        comment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit tristique tortor, vel hendrerit urna.",
      },
      {
        id: "plple",
        title: "Tour de france",
        date: new Date("2023-12-05"),
        location: "Halden",
        goal: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit tristique tortor, vel hendrerit urna. Quisque fermentum turpis quis massa convallis, vel consectetur odio tincidunt.",
        type: "Sykkling",
        priority: "A",
        comment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit tristique tortor, vel hendrerit urna.",
      },
    ],
    goals: [
      {
        id: "plple",
        title: "Ny maks fart",
        date: new Date("2023-12-05"),
        goal: "23kmh",
        comment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit tristique tortor, vel hendrerit urna.",
      },
    ],
    sessions: [
      {
        id: "plple",
        date: new Date("2024-05-23"),
        title: "Legs",
        type: "Sykling",
        tags: ["Uphill", "Rough"],
        reportStatus: { id: "njan-tras-5321", status: "no" },
      },
    ],
  },
  {
    id: "nor-hem-465",
    gender: "Hankjønn",
    sport: "Sykling",
    maxHeartRate: 44,
    thresholdWattage: 44,
    thresholdSpeed: 44,
    competitions: [
      {
        id: "wasd",
        title: "Tour de france",
        date: new Date("2023-12-05"),
        location: "Halden",
        goal: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit tristique tortor, vel hendrerit urna. Quisque fermentum turpis quis massa convallis, vel consectetur odio tincidunt.",
        type: "Sykkling",
        priority: "A",
        comment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit tristique tortor, vel hendrerit urna.",
      },
      {
        id: "dsaw",
        title: "Tour de france",
        date: new Date("2023-12-05"),
        location: "Halden",
        goal: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit tristique tortor, vel hendrerit urna. Quisque fermentum turpis quis massa convallis, vel consectetur odio tincidunt.",
        type: "Sykkling",
        priority: "A",
        comment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit tristique tortor, vel hendrerit urna.",
      },
    ],
    goals: [
      {
        id: "plple",
        title: "Ny maks fart",
        date: new Date("2023-12-05"),
        goal: "23kmh",
        comment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit tristique tortor, vel hendrerit urna.",
      },
      {
        id: "plple",
        title: "Ny maks fart",
        date: new Date("2023-12-05"),
        goal: "23kmh",
        comment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit tristique tortor, vel hendrerit urna.",
      },
    ],
    sessions: [
      {
        id: "plple",
        date: new Date("2024-05-23"),
        title: "Legs",
        type: "Sykling",
        tags: ["Uphill", "Rough"],
        reportStatus: { id: "njan-tras-5321", status: "no" },
      },
    ],
  },
  {
    id: "noa-ble-783",
    gender: "Hankjønn",
    sport: "Sykling",
    maxHeartRate: 44,
    thresholdWattage: 44,
    thresholdSpeed: 44,
    competitions: [
      {
        id: "wasd",
        title: "Tour de france",
        date: new Date("2023-12-05"),
        location: "Halden",
        goal: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit tristique tortor, vel hendrerit urna. Quisque fermentum turpis quis massa convallis, vel consectetur odio tincidunt.",
        type: "Sykkling",
        priority: "A",
        comment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit tristique tortor, vel hendrerit urna.",
      },
    ],
    goals: [
      {
        id: "dsaw",
        title: "Ny maks fart",
        date: new Date("2023-12-05"),
        goal: "23kmh",
        comment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit tristique tortor, vel hendrerit urna.",
      },
      {
        id: "sawd",
        title: "Ny maks fart",
        date: new Date("2023-12-05"),
        goal: "23kmh",
        comment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit tristique tortor, vel hendrerit urna.",
      },
      {
        id: "plple",
        title: "Ny maks fart",
        date: new Date("2023-12-05"),
        goal: "23kmh",
        comment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit tristique tortor, vel hendrerit urna.",
      },
    ],
    sessions: [
      {
        id: "plple",
        date: new Date("2024-05-23"),
        title: "Legs",
        type: "Sykling",
        tags: ["Uphill", "Rough"],
        reportStatus: { id: "njan-tras-5321", status: "no" },
      },
      {
        id: "plple",
        date: new Date("2024-05-23"),
        title: "Legs",
        type: "Sykling",
        tags: ["Uphill", "Rough"],
        reportStatus: { id: "njan-tras-5321", status: "no" },
      },
    ],
  },
  {
    id: "tur-kle-546",
    gender: "Hankjønn",
    sport: "Sykling",
    maxHeartRate: 44,
    thresholdWattage: 44,
    thresholdSpeed: 44,
    competitions: [
      {
        id: "wasd",
        title: "Tour de france",
        date: new Date("2023-12-05"),
        location: "Halden",
        goal: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit tristique tortor, vel hendrerit urna. Quisque fermentum turpis quis massa convallis, vel consectetur odio tincidunt.",
        type: "Sykkling",
        priority: "A",
        comment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit tristique tortor, vel hendrerit urna.",
      },
    ],
    goals: [
      {
        id: "dsaw",
        title: "Ny maks fart",
        date: new Date("2023-12-05"),
        goal: "23kmh",
        comment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit tristique tortor, vel hendrerit urna.",
      },
    ],
    sessions: [
      {
        id: "plple",
        date: new Date("2024-05-23"),
        title: "Legs",
        type: "Sykling",
        tags: ["Uphill", "Rough"],
        reportStatus: { id: "njan-tras-5321", status: "no" },
      },
    ],
  },
]

export function GET(request: NextRequest, context: any) {
    const { athleteId } = context.params;
    const athlet = athlets.find(({ id }) => id === athleteId);

    return NextResponse.json(
        {data: athlet},
        {status: 200});
}
*/

import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from "next/server";



import { Athlete } from "@/types";


const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fetch data from external API
    const apiUrl = 'https://webapp-api.vercel.app/api/users';
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error fetching data from ${apiUrl}: ${response.statusText}`);
    }

    const data = await response.json();

    // Save data to SQLite database
    for (const user of data) {
      await prisma.athlete.create({
        data: {
            id: user.id,
            gender: user.gender,
            sport: user.sport,
            meta: {
                create: {
                    id: user.meta.id,
                    heartrate: user.meta.heartrate,
                    watt: user.meta.watt,
                    speed: user.meta.speed,
                },
            },
            activities: {
                create: {
                    id: user.activities.id,
                    slug: user.activities.slug,
                    date: user.activities.date,
                    tags: {
                        create: {
                            id: user.activities.tag.id,
                            name: user.activities.tag.name,
                        }
                    },
                    questions: {
                        create: {
                            id: user.activities.questions.id,
                            question: user.activities.questions.question,
                            type: user.activities.questions.type,
                        }
                    },
                    intervals: {
                        create: {
                            id: user.activities.intervals.id,
                            duration: user.activities.intervals.duration,
                            intensity: user.activities.intervals.intensity,
                        }
                    }
                }
            },

        },
      });
    }

    // Fetch data from your SQLite database
    const athlet = await prisma.user.findMany();

    // Respond with the data in the desired format
    res.status(200).json({
      data: athlet,
      status: 200,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}