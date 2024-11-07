"use client"
import { useRouter } from "next/navigation"
interface propdata {
    text: string | null
}

export  default function Button({text}:propdata){
    const router = useRouter(); 
   const HandleClick = () =>{
   text=="Register"? router.push('/auth/signup') : router.push('/auth/signin')
    }
    return <button onClick={HandleClick}  className="text-gray-300 hover:text-xl hover:text-white  bg-black rounded-full px-7 py-3 font-semibold sm:text-lg   ">{text}</button>
}