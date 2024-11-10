"use client"
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface propsdata {
  text: string | null;
}

export default function Sign({ text }: { text: propsdata }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const router = useRouter();

  const validateFields = () => {
    if(email=="" && password==""){
      setError("Please Fill your Information")
      return false; 
    }
    else if (!email.trim()) {
      setError("Please enter your email");
      return false;
    }

   else  if (!password.trim()) {
      setError("Please enter your password");
      return false;
    }

    else  if (!text && !name.trim()) {
      setError("Please enter your name");
      return false;
    }

    else  if (!email.includes('@') || !email.includes('.')) {
      setError("Please enter a valid email");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateFields()) return;

    try {
      setLoader(true);
      const Response = await axios.post("http://localhost:3000/api/users/register", {
        name,
        email,
        password,
      });
      if (Response.data.status == 200) router.push('/home');
    } catch (e: any) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  const handleLogin = async () => {
    if (!validateFields()) return;

    try {
      setLoader(true);
      const Response = await axios.post("http://localhost:3000/api/users/login", {
        email,
        password,
      });
      if (Response.data.status == 200) router.push('/home');
    } catch (e: any) {
      setError("Invalid email or password");
    } finally {
      setLoader(false);
    }
  };

  const handleClose = () => {
    setError("");
  };

  return (
    <div className="">
      <h1 className="md:text-7xl sm:text-5xl mt-16 text-4xl text-center p-3 font-[Oswald] uppercase">
        {text ? "Welcome Back" : "Start A new journey with us"}
      </h1>

      <div className="w-full mt-4 flex flex-col justify-center items-center">
        {error && (
          <div className=" flex items-center justify-between rounded-xl py-2 mb-5 px-3 border-2 bg-red-400  border-red-900">
            <span className="text-white font-semibold text-xl tracking-wide flex items-center gap-2">
              {error}
            </span>
            <button
              className="text-white font-semibold px-2"
              onClick={handleClose}
            >
              ✕
            </button>
          </div>
        )}

        <div className="flex flex-col p-5 gap-3 border shadow-xl py-10 w-[450px] rounded-lg">
          <h1 className="text-3xl font-bold text-center">
            {text ? "Log in to your Account " : "Create New Account"}
          </h1>

          {!text && (
            <>
              <label className="text-2xl font-medium" htmlFor="name">
                Enter Your Name:
              </label>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                value={name}
                id="name"
                className="border py-2 px-4 rounded-lg font-[poppins] border-zinc-600"
                type="text"
                placeholder="Enter Your Name"
              />
            </>
          )}

          <label className="text-2xl font-medium" htmlFor="email">
            Enter Your Email:
          </label>
          <input
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            value={email}
            className="border py-2 px-4 rounded-lg font-[poppins] border-zinc-600"
            type="email"
            placeholder="Enter Your email"
          />

          <label className="text-2xl font-medium" htmlFor="pass">
            Enter Your Password:
          </label>
          <input
            id="pass"
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            value={password}
            className="border py-2 px-4 rounded-lg font-[poppins] border-zinc-600"
            type="password"
            placeholder="Enter Your Password"
          />

          <button
            disabled={loader}
            onClick={text ? handleLogin : handleRegister}
            className={`text-gray-300 hover:text-white bg-black rounded-full px-7 py-3 font-semibold sm:text-xl ${
              loader && "opacity-50"
            }`}
          >
            {loader ? (
              <span>Loading...</span>
            ) : (
              <span>{!text ? "Create Account" : "Log In"}</span>
            )}
          </button>

          <p className="text-center">
            {text ? "" : "Already Have an Account?"}{" "}
            <Link
              className="underline"
              href={`${text ? '/auth/signup' : '/auth/signin'}`}
            >
              {text ? "Create New Account" : "Sign in"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}