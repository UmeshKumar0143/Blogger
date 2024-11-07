import PrismaClient from '@/app/lib/prisma'
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt'
export async function POST(req:NextRequest){
    try {
        const {name,email,password} = await req.json(); 
        const hashedPass =await bcrypt.hash(password,5);  
        const user = await  PrismaClient.user.create({
            data:{
                name:name,
                email: email,
                password: hashedPass
            }
        })
        console.log(user); 
        return NextResponse.json({
            message: "Succesfull",
            user
        })
    } catch (error: any) { 
        return NextResponse.json({
            message: "Error occured" 
        })
    }
} 