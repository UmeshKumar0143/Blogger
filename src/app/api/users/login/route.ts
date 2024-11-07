import { NextRequest, NextResponse } from "next/server";
import PrimsaClient from '@/app/lib/prisma'
import bcrypt from 'bcrypt'
export async function POST(req:NextRequest) {
    try {
        const {email,password}  = await req.json(); 
        const FoundUser = await PrimsaClient.user.findUnique({
            where:{
                email: email
            }
        })
        if(FoundUser){
            const RealPass = await bcrypt.compare(password,FoundUser.password); 
            if(RealPass){
                return NextResponse.json({
                    message: "logged In"
                })
            }
        } 
        return NextResponse.json({
            message: "User not found"
        })
    } catch (e:any) {
        return NextResponse.json({
            message: "Error Occured"
        })
    }
}