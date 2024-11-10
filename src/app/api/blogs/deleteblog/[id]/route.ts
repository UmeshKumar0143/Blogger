import PrismaClient from '@/app/lib/prisma'
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req:NextRequest,{params}:{params:{id: string}}){
    try {
        const id = params.id
        const Deltedblog = await PrismaClient.blog.delete({
            where:{
                id: parseInt(id)
            }
        })
        return NextResponse.json({message: "Delteed", Deltedblog})
    } catch (error) {
        console.log(error); 
        return NextResponse.json({message: "Error occured"})
    }
}