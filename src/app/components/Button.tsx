"use client"
import { useRouter } from "next/navigation"
interface propdata {
    text: string | null
}

export  default function Button({text}:propdata){
    const router = useRouter(); 
   const HandleClick = () =>{
    if(text=="Register"){
        router.push('/api/auth/signup') 
    }else if(text=="Log In"){
        router.push('/api/auth/signin')
    }
    }
    return <button onClick={HandleClick} className="text-gray-300 hover:text-white  bg-black rounded-full px-7 py-3 font-semibold sm:text-xl   ">{text}</button>
}