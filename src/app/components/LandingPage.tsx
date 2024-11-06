import Button from "./Button";

export default function LandingPage(){
    return <div className="container">
        <div className="mt-28">
            <h1 className="md:text-7xl sm:text-5xl  text-4xl    text-center p-3  font-[Oswald] uppercase ">Welcome To <span className="font-bold underline leading-4">Blogify</span></h1>
            <p className="sm:text-lg  text-sm   text-center font-[poppins]">Unleash your voice, share your stories, and inspire the world <br/> <span className="font-bold ">Your blog, Your platform, Your voice</span> </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 max-w-xl justify-center mx-auto  mt-10">
            <Button text={"Register"}/>
            <Button text={"Log In"}/>
        </div>
    </div>
}