import {PrismaClient} from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";


export type QuestionProps = {
    text? : string
    type? : string
    answer?: string
}


const prisma = new PrismaClient();

export async function POST(req : NextRequest, res : NextResponse) {
    const body = await req.json() as QuestionProps;
    const { text, type, answer } = body;
    console.log("BODY:" ,body)
    console.log('Received data:', { text, type, answer })
    try {
        const question = await prisma.question.create({
            data: {
                text : text,
                type : type,
                answer: answer,
            }
        });
        console.log(question)

        return NextResponse.json({success : true ,status : 200 , message : "Created new question"})
    } catch (error) {
        return NextResponse.json({success : false ,status : 500 , error: 'Failed to create question'})
    }
}


