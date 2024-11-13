import Link from "next/link";
import Button from "./Button";
import { FaArrowRightLong } from "react-icons/fa6";

export default function LandingPage() {
  return (
    <div className="container">
      <div className="mt-28">
        <h1 className="md:text-7xl sm:text-5xl text-4xl text-center p-3 font-[Oswald] uppercase">
          Welcome To <span className="font-bold underline leading-4">Blogify</span>
        </h1>
        <p className="sm:text-lg text-sm text-center font-[poppins]">
          Unleash your voice, share your stories, and inspire the world
          <br />
          <span className="font-bold">Your blog, Your platform, Your voice</span>
        </p>
      </div>
      <div className="flex flex-col items-center gap-6 max-w-xl justify-center mx-auto mt-10">
        <Link
          href="/home"
          className="flex hover:text-white hover:text-xl justify-center items-center sm:text-lg gap-3 bg-black text-zinc-200 px-5 py-3 rounded-full"
        >
          <span className="font-semibold">Explore</span>
          <FaArrowRightLong />
        </Link>
        <div className="flex gap-6 justify-center flex-col sm:flex-row">
          <Button text={"Register"} />
          <Button text={"Log In"} />
        </div>
      </div>
    </div>
  );
}
