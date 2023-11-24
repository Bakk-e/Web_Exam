import { AthleteMini } from "@/types";
import { NextResponse } from "next/server";

const athleteInfos: AthleteMini[] = [
    { id: "ola-nor-123", gender: "Hankjønn", sport: "Sykling"},
    { id: "ale-bar-432", gender: "Hankjønn", sport: "Løping"},
    { id: "nor-hem-465", gender: "Hunkjønn", sport: "Svømming"},
    { id: "noa-ble-783", gender: "Hankjønn", sport: "Løping"},
    { id: "tur-kle-546", gender: "Hunkjønn", sport: "Roing"}
]

export function GET() {
    return NextResponse.json(
        {data: Array.from(athleteInfos.values())},
        {status: 200});
}

export async function POST(request: NextResponse) {
    const data = await request.json()
    return NextResponse.json({ status: 200 })
}