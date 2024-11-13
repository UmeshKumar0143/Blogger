'use client'

import { useState,  useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { LogIn, UserPlus, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function AddBlog() {

  


  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [username, setUsername] = useState('')
  const [blogTitle, setBlogTitle] = useState('')
  const [blogDescription, setBlogDescription] = useState('')
  const [blogImage, setBlogImage] = useState('')
  const [loader, setLoader] = useState(false) ; 
  const router = useRouter(); 
 

  const handleLogout = async() =>{
    const response = await axios.get("http://localhost:3000/api/users/logout"); 
    if(response.status === 200){
     setIsLoggedIn(false); 
    }
 }

 useEffect(() => {
  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/user');
      setUsername(response.data.realUser.name);
      setIsLoggedIn(true);
    } catch (error) {
      console.log('Error fetching user:', error);
    }
  };

  if (typeof window !== 'undefined') {
    getUser();
  }
}, []);


 

  const handleSubmit =  async (e: React.FormEvent) => {
    setLoader(true); 
    e.preventDefault()
    const response = await  axios.post('http://localhost:3000/api/blogs/addBlog',{
      blogTitle,
      blogDescription,
      blogImage
    })
    setLoader(false)
    setBlogTitle('')
    setBlogDescription('')
    setBlogImage('')
    router.push('/home')
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 gap-6 flex items-center">
              <Link href={'/home'} className="text-xl font-bold">Blog Website</Link>
              <Link href={'/home'} className="text-lg font-bold">Home</Link>
              
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
                  <Button variant="outline" className="mr-2" onClick={()=>router.push('/auth/signin')}>
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
              Enter Image URL 
              </label>
              <div className="mt-2 flex items-center">
                <ImageIcon className="mr-2 h-8 w-6" />
                <Input
                  id="blogImage"
                  type="url"
                  value={blogImage}
                  onChange={(e)=>setBlogImage(e.target.value)}
                />
                {blogImage && <span className="ml-3">{blogImage.name}</span>}
              </div>
            </div>
            <Button disabled= {loader}  type="submit">{loader? "Submiting...." : "Submit Blog Post"}</Button>
          </form>
        ) : (
          <p className="text-center text-gray-600">Please log in to add a new blog post.</p>
        )}
      </main>
    </div>
  )
}