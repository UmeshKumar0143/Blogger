import { NextRequest ,NextResponse} from "next/server";
import PrismaClient from '@/app/lib/prisma'
import jwt from 'jsonwebtoken'; 
export async function GET(req:NextRequest){
    try {
        const jwttoken = req.cookies.get('token')
        if(!jwttoken){
            return NextResponse.json({message: "No Token found"},{status:400}); 
        }
        const token = jwttoken.value;
        const verifiedUser = jwt.verify(token,process.env.JWT_SECRET as string) as {id:number}; 
        if(verifiedUser){
            const  realUser = await PrismaClient.user.findUnique({
                where:{
                    id: verifiedUser.id
                }
            })
          return NextResponse.json({
            realUser,
            status: 200 
          })
    } 
    }catch (e) {
        console.log(e); 
    }
}