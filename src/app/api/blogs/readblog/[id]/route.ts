import PrismClient from '@/app/lib/prisma'
import {NextResponse } from 'next/server'

export async function GET(req:Request, {params}:{params: {id: string}}){
    try {
        const id =  params.id
        const blog = await PrismClient.blog.findUnique({
            where:{
                id: parseInt(id)
            },
            include: {
                user: true
            }
        })
    return NextResponse.json({message: "fouhnd",
       Blog:  blog})
    } catch (e) {
        console.log(e); 
        return NextResponse.json({message: "Error Occured"})

    }
    
}