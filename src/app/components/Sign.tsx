import Button from "./Button";

interface propsdata {
    text : string | null
}

export default function Sign({text}:{text:propsdata}){
    return <div className="">
      <h1 className="md:text-7xl sm:text-5xl mt-32  text-4xl    text-center p-3  font-[Oswald] uppercase ">{text?"Welcome Back": "Start A new journy with us"}</h1>
        <div className="w-full  mt-4 flex justify-center items-center">
        <div className="flex flex-col p-5 gap-3  border shadow-xl py-10 w-[450px]  rounded-lg     ">
            <h1 className="text-3xl font-bold text-center">{text?"Log in to your Account ": "Create New Account"}</h1>
          { !text &&  <label className="text-2xl font-medium" htmlFor="name">Enter Your Name: </label>}
           {!text && <input id="name" className=" border py-2 px-4  rounded-lg font-[poppins] border-zinc-600" type="text" placeholder="Enter Your Name" />}
            <label className="text-2xl font-medium" htmlFor="name">Enter Your Email: </label>
            <input className=" border py-2 px-4  rounded-lg font-[poppins] border-zinc-600" type="email" placeholder="Enter Your email" />
            <label className="text-2xl font-medium" htmlFor="name">Enter Your Password: </label>
            <input className=" border py-2 px-4  rounded-lg font-[poppins] border-zinc-600" type="password" placeholder="Enter Your Password" />
            <Button text={text?"Log In ": "Create Account"}/>
            <p className="text-center">{text?"": "Already Have an Account?"} <a className="underline" href={`${text?'/api/auth/signup': '/api/auth/signin'}`}>{text?"Create New Account": "Sigin in"} </a></p>
        </div>
        </div>
    </div>
}