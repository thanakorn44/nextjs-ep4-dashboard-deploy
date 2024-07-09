/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useState, useEffect } from 'react'
import Container from '../components/Container'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import DeleteBtn from './DeleteBtn'

function WelcomePage() {

    const { data: session } = useSession();
    if (!session) redirect('/login')

    if(session?.user?.role === "admin") redirect("/admin") 
   

    const [postData, setPostData] = useState([]);

    const baseUrl = process.env.NEXTPUBLIC_URL;

    const userEmail = session?.user?.email;

    const getPosts = async () => {
        try {

            const res = await fetch(`${baseUrl}/api/posts?email=${userEmail}`, {
                cache: "no-store"
            })

            if (!res.ok) {
                throw new Error("Failed to fetch posts.")
            }

            const data = await res.json();
            console.log(data)
            setPostData(data.posts);

        } catch (error) {
            console.log("Error loading posts: ", error)
        }
    }

    useEffect(() => {
        getPosts();
    }, [])

    return (
        <Container>
            <Navbar session={session} />
            <div className="flex-grow">
                <div className="container mx-auto shadow-xl my-10 p-10 rounded-xl">
                    <div className="flex justify-between">
                        <div>
                            <h3 className='text-3xl'>Profile</h3>
                            <p>Welcomm, {session?.user.name} </p>
                            <p>Email: {session?.user.email} </p>
                        </div>
                        <div>
                            <Link href={"/create"} className='bg-green-500 text-white border py-2 px-3 rounded-md text-lg my-2'>Create Post</Link>
                        </div>
                    </div>

                    {/* User Posts Data */}
                    <div>
                        {postData && postData.length > 0 ? (
                            postData.map(val => (
                                <div key={val._id} className="shadow-xl my-10 p-10 rounded-xl">
                                    <h4 className='text-2xl'>{val.title}</h4>
                                    <Image
                                        className="my-3 rounded-md"
                                        src={val.img}
                                        width={300}
                                        height={0}
                                        alt={val.title} />
                                    <p>{val.content}</p>
                                    <div className="mt-5">
                                        <Link className='bg-gray-500 text-white text-center border py-2 px-3 rounded-md text-lg my-2' href={`/edit/${val._id}`}>Edit</Link>
                                        <DeleteBtn id={val._id}/>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className='bg-gray-300 p-3 my-3'>
                                You do not have any posts yet.
                            </p>
                        )}

                    </div>
                </div>
            </div>
            <Footer />
        </Container>
    )
}

export default WelcomePage