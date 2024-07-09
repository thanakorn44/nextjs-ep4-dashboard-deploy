"use client"

import React, { useState, useEffect } from 'react'
import AdminNav from '../../../components/AdminNav'
import Container from '../../../components/Container'
import Footer from '../../../components/Footer'
import Link from 'next/link'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'





function AdminEditPostPage({ params }) {

    const { data: session } = useSession();
    if (!session) redirect("/login");
    if (!session?.user?.role === "admin") redirect("/welcome");

    const { id } = params;

    const [oldPostData, setOldPostData] = useState([]);

    console.log("oldPostData: ", oldPostData)

    const router = useRouter();


    // New post data
    const [newTitle, setNewTitle] = useState("");
    const [newImg, setNewImg] = useState("");
    const [newContent, setNewContent] = useState("");


    const baseUrl = process.env.NEXT_PUBLIC_NAME;


    const getPostById = async (id) => {
        try {

            const res = await fetch(`${baseUrl}/api/totalPosts/${id}`, {
                method: "GET",
                cache: "no-store"
            })

            if (!res.ok) {
                throw new Error("Failed to fetch post")
            }

            const data = await res.json();

            setOldPostData(data.post)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPostById(id)
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await fetch(`${baseUrl}/api/totalPosts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ newTitle, newImg, newContent })
            })

            if (!res.ok) {
                throw new Error("Failed to fetch post")
            }

            router.refresh();
            router.push("/admin/posts")

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Container>
            <AdminNav session={session} />
            <div className='flex-grow'>
                <div className="container mx-auto shadow-xl my-10  p-10 rounded-xl">
                    <Link href={"/admin/posts"} className='bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2'>Go back</Link>
                    <hr className='my-3' />
                    <h3 className='text-xl'>Admin Edit User Post Page</h3>
                    <form onSubmit={handleSubmit} >
                        <input type="text" className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder={oldPostData.title} onChange={(e) => setNewTitle(e.target.value)} />
                        <input type="text" className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder={oldPostData.img} onChange={(e) => setNewImg(e.target.value)} />
                        <textarea name="" id="" cols={30} rows={10} placeholder={oldPostData.content} className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' onChange={(e) => setNewContent(e.target.value)}>

                        </textarea>
                        <button type='submit' name='update' className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2'>Update Post</button>
                    </form>
                </div>
            </div>
            <Footer />
        </Container>
    )
}

export default AdminEditPostPage