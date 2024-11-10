"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, UserPlus,Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function BlogPostPage() {
  interface Blog {
    id: number;
    title: string;
    desc: string;
    img: string;
    createdAt: Date;
    user: { id: number; name: string; email: string };
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState();
  const [userId, setUserId] = useState<number>(); 
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const params = useParams();

  const id = params?.id;

  const handleLogout = async () => {
    const response = await axios.get("http://localhost:3000/api/users/logout");
    if (response.status === 200) {
      setIsLoggedIn(false);
    }
  };
  const   handleDelete = async () =>{
    const response = await axios.delete(`http://localhost:3000/api/blogs/deleteblog/${id}`);
    router.push('/home'); 
  }
  useEffect(() => {
    try {
      if (id) {
        const getBlog = async () => {
          const response = await axios.get(
            `http://localhost:3000/api/blogs/readblog/${id}`
          );
          setBlog(response.data.Blog);
        };
        getBlog();
      }
      const getUser = async () => {
        const response = await axios.get("http://localhost:3000/api/user");
        setUsername(response.data.realUser.name);
        setUserId(response.data.realUser.id); 
        setIsLoggedIn(true);
      };
      getUser();
    } catch (error) {
      console.log(error); 
    }
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 gap-6 flex items-center">
              <Link href={"/home"} className="text-xl font-bold">
                Blog Website
              </Link>
              <Link href={"/home"} className="text-lg font-bold">
                Home
              </Link>
            </div>

            <div className="flex items-center">
              {isLoggedIn ? (
                <>
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
                  <Button variant="outline">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {isLoggedIn ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Image
                  src={blog?.img}
                  alt={blog?.title}
                  width={1200}
                  height={600}
                  className="rounded-lg object-cover w-full h-[300px] mb-8"
                />
                <h1 className="text-3xl font-bold mb-4">{blog?.title}</h1>
                <div className="prose max-w-none">
                  {blog?.desc.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <Card className="mb-8">
                  <CardHeader>
                  <div className="flex items-center gap-5">
                    <CardTitle>Author</CardTitle>
                {blog?.user.id === userId &&     <button onClick={handleDelete} className="text-sm bg-red-400 px-3 py-2 rounded-lg inline-flex items-center  text-white font-bold">Delete Post <Trash2 className="h-4 ml-2"/> </button>}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center mr-2">
                          {blog?.user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <span className="mr-4">{blog?.user.name}</span>
                          <p className="text-sm text-muted-foreground">
                            Posted on {blog?.createdAt.toString().split("T")[0]}{" "}
                            at{" "}
                            {new Date(blog?.createdAt).toLocaleTimeString(
                              "en-US",
                              {
                                timeZone: "Asia/Kolkata",
                                hour12: true,
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold mb-4">
                Log in first to see the blog
              </h2>
              <Button onClick={() => router.push("/auth/signin")}>
                Log In
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
