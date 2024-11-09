"use client"

import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface propsdata {
    text : string | null
}

export default function Sign({text}:{text:propsdata}){
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loader,setLoader] = useState(false); 
    const router = useRouter(); 
  const handleRegister = async () =>{
    try {
        setLoader(true)
        const Response =  await axios.post("http://localhost:3000/api/users/register",{
            name,
            email,
            password,
        })
        if(Response.data.status==200) router.push('/home')
        
    } catch (e: any) {
        console.log(e); 
    }finally{
        setLoader(false); 
    }
  }

  const handleLogin = async () =>{
    try {
        setLoader(true); 
        const Response =  await axios.post("http://localhost:3000/api/users/login",{
            email,
            password,
        })
        if(Response.data.status==200) router.push('/home')
    } catch (e) {
        console.log("User not found"); 
    }finally{
        setLoader(false) ;
    }
  }
    return <div className="">
      <h1 className="md:text-7xl sm:text-5xl mt-16  text-4xl    text-center p-3  font-[Oswald] uppercase ">{text?"Welcome Back": "Start A new journy with us"}</h1>
        <div className="w-full  mt-4 flex justify-center items-center">
        <div className="flex flex-col p-5 gap-3  border shadow-xl py-10 w-[450px]  rounded-lg     ">
            <h1 className="text-3xl font-bold text-center">{text?"Log in to your Account ": "Create New Account"}</h1>


          { !text &&  <label className="text-2xl font-medium" htmlFor="name">Enter Your Name: </label>}
           {!text && <input onChange={(e)=>setName(e.target.value)} value={name}  id="name" className=" border py-2 px-4  rounded-lg font-[poppins] border-zinc-600" type="text" placeholder="Enter Your Name" />}


            <label className="text-2xl font-medium" htmlFor="email">Enter Your Email: </label>
            <input id="email" onChange={(e)=>setEmail(e.target.value)} value={email} className=" border py-2 px-4  rounded-lg font-[poppins] border-zinc-600" type="email" placeholder="Enter Your email" />


            <label   className="text-2xl font-medium" htmlFor="pass">Enter Your Password: </label>
            <input id="pass" onChange={(e)=>setPassword(e.target.value)} value={password} className=" border py-2 px-4  rounded-lg font-[poppins] border-zinc-600" type="password" placeholder="Enter Your Password" />

            <button
      disabled={loader}
      onClick={text ? handleLogin : handleRegister}
      className={`text-gray-300 hover:text-white bg-black rounded-full px-7 py-3 font-semibold sm:text-xl ${loader && "opacity-50"}`}
    >
      {loader ? (
        <span>Loading...</span>
      ) : (
        <span>{!text ? "Create Account" : "Log In"}</span>
      )}
    </button>


            <p className="text-center">{text?"": "Already Have an Account?"} <Link className="underline" href={`${text?'/auth/signup': '/auth/signin'}`}>{text?"Create New Account": "Sigin in"} </Link></p>
        </div>
        </div>
    </div>
}