
import PrismaClient from '@/app/lib/prisma'
import { NextResponse } from 'next/server';

export async function GET(){
    const AllBlogs = await PrismaClient.blog.findMany({
        include:{
            user: true
        }
    });
    return NextResponse.json(
        {blogs: AllBlogs}
    ); 
}