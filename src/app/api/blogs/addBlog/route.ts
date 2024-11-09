import PrismaClient from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
export async function POST(req:NextRequest){
    try {
        const jwttoken = req.cookies.get('token')
    if(!jwttoken){
        return NextResponse.json({message: "No Token found"},{status: 400}); 
    }
    const token = jwttoken.value;
    const verifiedUser = jwt.verify(token,process.env.JWT_SECRET as string) as {id:number}; 
    if(verifiedUser){
        const  realUser = await PrismaClient.user.findUnique({
            where:{
                id: verifiedUser.id
            }
        })
        if(realUser){
           const {blogTitle,blogDescription,blogImage} = await req.json(); 
           const Blog = await  PrismaClient.blog.create({
            data:{
                title: blogTitle,
                desc: blogDescription,
                img: blogImage, 
                userId: realUser.id
            }
           }) 
        
           return NextResponse.json({
            message: "Blog Created",
            Blog
           })

        }else{
            return NextResponse.json({
                message: "User not found", 
            }) 
        }
    }else{
        return NextResponse.json({message: "Not verified user"}); 
    }
    } catch (e) {
        return NextResponse.json({
            message: "Error Occured",
            status: 400, 
        })
    }
}