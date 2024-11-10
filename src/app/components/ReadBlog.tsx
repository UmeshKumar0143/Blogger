'use client'

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { LogIn, UserPlus } from "lucide-react"
import { useRouter } from "next/navigation"

export default function BlogPostPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({ name: "", email: "" })
  const router = useRouter();
  const post = {
    title: "Understanding the Basics of React Hooks",
    coverImage: "/placeholder.svg",
    content: `
      React Hooks are a powerful feature introduced in React 16.8. They allow you to use state and other React features
      without writing a class. This means you can use React without classes.

      The most commonly used hooks are:

      1. useState: Allows you to add state to your functional components.
      2. useEffect: Lets you perform side effects in function components.
      3. useContext: Subscribes to React Context without introducing nesting.

      Hooks solve many problems that developers faced with the class-based approach, such as the complexity of
      sharing stateful logic between components, the confusion around the 'this' keyword, and the need to
      understand different lifecycle methods.

      By using Hooks, you can extract stateful logic from a component so it can be tested independently and
      reused. This makes your code easier to understand and maintain.
    `,
    author: {
      name: "Jane Doe",
      avatar: "/placeholder.svg",
    },
    createdAt: "May 15, 2023",
    comments: [
      { id: 1, author: "John Smith", content: "Great article! Very informative.", createdAt: "May 16, 2023" },
      { id: 2, author: "Alice Johnson", content: "Thanks for explaining this so clearly!", createdAt: "May 17, 2023" },
    ],
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser({ name: "", email: "" })
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
    setUser({ name: "John Doe", email: "john@example.com" })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white text-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/home" className="text-xl font-bold">
              Blogify
            </Link>
            <Button variant="ghost" asChild>
              <Link href="/home">Home</Link>
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <span>{user.name}</span>
                </div>
                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="mr-2" onClick={()=> router.push('/auth/signin')}>
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                  <Button onClick={()=>router.push('/auth/signup')} variant="outline">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Register
                  </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {isLoggedIn ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  width={1200}
                  height={600}
                  className="rounded-lg object-cover w-full h-[300px] mb-8"
                />
                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                <div className="prose max-w-none">
                  {post.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Author</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} alt={post.author.name} />
                        <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{post.author.name}</p>
                        <p className="text-sm text-muted-foreground">Posted on {post.createdAt}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Comments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="border-b pb-4 last:border-b-0">
                          <p className="font-semibold">{comment.author}</p>
                          <p className="text-sm text-muted-foreground mb-2">{comment.createdAt}</p>
                          <p>{comment.content}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <Textarea placeholder="Add a comment..." className="mb-2" />
                      <Button>Post Comment</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold mb-4">Log in first to see the blog</h2>
              <Button onClick={handleLogin}>Log In</Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}