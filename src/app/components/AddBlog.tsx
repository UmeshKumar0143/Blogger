'use client'

import { useState, ChangeEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, LogIn, UserPlus, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'

export default function AddBlog() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [username, setUsername] = useState('John Doe')
  const [blogTitle, setBlogTitle] = useState('')
  const [blogDescription, setBlogDescription] = useState('')
  const [blogImage, setBlogImage] = useState<File | null>(null)

  const handleLogin = () => setIsLoggedIn(true)
  const handleLogout = () => setIsLoggedIn(false)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBlogImage(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the blog data to your backend
    console.log('Blog submitted:', { blogTitle, blogDescription, blogImage })
    // Reset form fields
    setBlogTitle('')
    setBlogDescription('')
    setBlogImage(null)
    alert('Blog post submitted successfully!')
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link href={'/home'} className="text-xl font-bold">Blog Website</Link>
            </div>
            <div className="flex items-center">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center mr-2">
                      {username.charAt(0).toUpperCase()}
                    </div>
                    <span className="mr-4">{username}</span>
                    <Button variant="outline" onClick={handleLogout}>Logout</Button>
                  </div>
                </>
              ) : (
                <>
                  <Button variant="outline" className="mr-2" onClick={handleLogin}>
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

      <main className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Add New Blog Post</h2>
        {isLoggedIn ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="blogTitle" className="block text-sm font-medium text-gray-700">
                Blog Title
              </label>
              <Input
                id="blogTitle"
                type="text"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="blogDescription" className="block text-sm font-medium text-gray-700">
                Blog Description
              </label>
              <Textarea
                id="blogDescription"
                value={blogDescription}
                onChange={(e) => setBlogDescription(e.target.value)}
                required
                className="mt-1"
                rows={4}
              />
            </div>
            <div>
              <label htmlFor="blogImage" className="block text-sm font-medium text-gray-700">
                Blog Image
              </label>
              <div className="mt-1 flex items-center">
                <Input
                  id="blogImage"
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('blogImage')?.click()}
                >
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Choose Image
                </Button>
                {blogImage && <span className="ml-3">{blogImage.name}</span>}
              </div>
            </div>
            <Button type="submit">Submit Blog Post</Button>
          </form>
        ) : (
          <p className="text-center text-gray-600">Please log in to add a new blog post.</p>
        )}
      </main>
    </div>
  )
}