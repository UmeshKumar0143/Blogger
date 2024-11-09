import { NextResponse } from "next/server";

export function GET(){
    const response = NextResponse.json(
        {message: "Logged Out"},
       { status: 200 }
    )
     response.cookies.delete('token'); 
     return response; 

}