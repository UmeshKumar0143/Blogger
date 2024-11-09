import { NextRequest, NextResponse } from "next/server";
import PrimsaClient from '@/app/lib/prisma'
import jwt  from "jsonwebtoken";
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
                const token = jwt.sign({id:FoundUser.id},process.env.JWT_SECRET as string );
        
                const response =  NextResponse.json({
                    message: "Logged IN  ",
                    status: 200, 
                    FoundUser
                }) 
                response.cookies.set({
                    name:"token",
                    value:token,
                    httpOnly: true
                })
                return response ; 
            }
        } 
        return NextResponse.json({
            message: "User not found",
            status :400
        })
    } catch (e:any) {
        return NextResponse.json({
            message: "User not found / error",
            status: 400
        })
    }
}