"use client"
import { useRouter } from "next/navigation"
interface propdata {
    text: string | null
    func?: ()=>void
}

export  default function Button({text,func}:propdata){
    const router = useRouter(); 
   const HandleClick = () =>{
    if(text=="Register"){
        router.push('/auth/signup') 
    }else if(text=="Log In"){
        router.push('/auth/signin')
    }else if(text=="Create Account" && func){
        func(); 
    }else if(text=="Sign In" && func){
        func(); 
    }
    }
    return <button onClick={HandleClick} className="text-gray-300 hover:text-white  bg-black rounded-full px-7 py-3 font-semibold sm:text-xl   ">{text}</button>
}