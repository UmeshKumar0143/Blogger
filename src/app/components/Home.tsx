"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, LogIn, UserPlus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import {format} from 'date-fns'
interface Blog {
  id: number;
  title: string;
  desc: string | null;
  img: string | null;
  createdAt: Date;
  user: {id:number, name: string, email:string}
}

export default function BlogHome() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/blogs/allblogs");
        setBlogs(response.data.blogs);
      } catch (error) {
        console.log('Error fetching blogs:', error);
      }
    };
  
    const getUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/user");
        setUsername(response.data.realUser.name);
        setIsLoggedIn(true);
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    };
  
    getBlog();
    getUser();
  }, []);
  

  const handleLogout = async () => {
    const response = await axios.get("http://localhost:3000/api/users/logout");
    if (response.status === 200) {
      setIsLoggedIn(false);
    }
  };
console.log(blogs)
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold">Blogify</h1>
            </div>
            <div className="flex items-center">
              {isLoggedIn ? (
                <>
                  <Button
                    variant="outline"
                    className="mr-4"
                    onClick={() => {
                      router.push("/addblog");
                    }}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Blog
                  </Button>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center mr-2">
                      {username.charAt(0).toUpperCase()}
                    </div>
                    <span className="mr-4">{username}</span>
                    <Button variant="outline" onClick={handleLogout}>
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="mr-2"
                    onClick={() => router.push("/auth/signin")}
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                  <Button
                    onClick={() => router.push("/auth/signup")}
                    variant="outline"
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Latest Blog Posts</h2>
        <div className="space-y-6">
          {blogs
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((blog: Blog, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row border border-gray-200 rounded-lg overflow-hidden"
              >
                <div className="sm:w-1/3 relative h-48 sm:h-56">
                  <Image
                    src={blog.img || ""}
                    alt={`Cover image for ${blog.title}`}
                    width={200}
                    height={200}
                    layout="responsive"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </div>
                <div className="sm:w-2/3 p-4 sm:p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-[poppins] font-semibold mb-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 font-[poppins] mb-4">
                      {blog.desc}
                    </p>
                  </div>
                  <div className="flex  items-center gap-6">
                    <Button
                      onClick={() => router.push(`/readblog/${blog.id}`)}
                      variant="outline"
                      className="self-start"
                    >
                      Read More
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Posted on {blog?.createdAt.toString().split("T")[0]} at{" "}
                
                    {format(new Date(blog?.createdAt), "hh:mm a")}

                    </p>
                    <p className="font-[poppins] font-bold text-sm">Author : {blog?.user.name}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}
