import PrismaClient from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export default function GET(){
    return NextResponse.json({
        message: "Hello world"
    });
}