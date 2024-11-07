import PrismaClient from '@/app/lib/prisma'
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'; 

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
        const token = jwt.sign({id:user.id},process.env.JWT_SECRET as string );
        
        const response =  NextResponse.json({
            message: "Created User ",
            status: 200, 
        }) 
        response.cookies.set({
            name:"token",
            value:token,
            httpOnly: true
        })

        return response
        
        
    } catch (error: any) { 
        return NextResponse.json({
            message: "Error occured",
            status: 400 
        })
    }
} 