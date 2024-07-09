"use client"

import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Container from '../../components/Container'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'

function EditPage({ params }) {

    const { data: session } = useSession();
    if (!session) redirect("/login");

    const { id } = params;
    console.log(id)

    const [postData, setPostData] = useState("");

    // new data of post
    const [newTitle, setNewTiltle] = useState("");
    const [newImg, setNewImg] = useState("");
    const [newContent, setNewContent] = useState("");



    const router = useRouter();

    const getPostById = async (id) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`, {
                method: "GET",
                cache: "no-store"
            })

            if (!res.ok) {
                throw new Error("Failed to fetch post.")
            }

            const data = await res.json();
            setPostData(data);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPostById(id);
    }, [id])

    const handlerSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ newTitle, newImg, newContent })
            })



            if (!res.ok) {
                throw new Error("Failed to update post");
            }

            router.refresh();
            router.push("/welcome")

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container>
            <Navbar />
            <div className='flex-grow'>
                <div className="container mx-auto shadow-xl my-10  p-10 rounded-xl">
                    <Link href={"/welcome"} className='bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2'>Go back</Link>
                    <hr className='my-3' />
                    <h3 className='text-xl'>Edit Post</h3>
                    <form onSubmit={handlerSubmit} >
                        <input type="text" className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2'
                            placeholder={postData.post?.title} onChange={(e) => setNewTiltle(e.target.value)} value={newTitle} />
                        <input type="text" className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2'
                            placeholder={postData.post?.img} onChange={(e) => setNewImg(e.target.value)} value={newImg} />
                        <textarea name="" id="" cols={30} rows={10} className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2'
                            placeholder={postData.post?.content} onChange={(e) => setNewContent(e.target.value)} value={newContent}>

                        </textarea>
                        <button type='submit' name='update' className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2'>Update Post</button>
                    </form>
                </div>
            </div>
            <Footer />
        </Container>
    )
}

export default EditPage