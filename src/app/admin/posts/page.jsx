"use client"

import React, { useState, useEffect } from 'react'
import AdminNav from '../components/AdminNav'
import Footer from '../components/Footer'
import SideNav from '../components/SideNav'
import Container from '../components/Container'
import Link from 'next/link'
import Image from 'next/image'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

import DeleteBtn from './DeleteBtn'


function AdminUserManagePage() {

    const { data: session } = useSession();

    if (!session) redirect("/login");
    if (!session?.user?.role === "admin") redirect("/welcome");

    const [allPostsData, setAllPostsData] = useState([]);

    const baseUrl = process.env.NEXT_PUBLIC_NAME;

    console.log("allPostsData:", allPostsData)

    const getAllPostsData = async () => {
        try {
            const res = await fetch(`${baseUrl}/api/totalPosts`, {
                cache: "no-store"
            })

            if (!res.ok) {
                throw new Error("failed to fetch post")
            }

            const data = await res.json();
            setAllPostsData(data.totalPosts)

        } catch (error) {
            console.log("Error loading posts: ", error)
        }


    }

    useEffect(() => {
        getAllPostsData();
    }, [])

    return (
        <Container>
            <AdminNav session={session} />
            <div className="flex-grow ">
                <div className='container mx-auto'>
                    <div className='flex mt-10'>
                        <SideNav />
                        <div className='p-10'>
                            <h3 className='text-3xl'>Manage Posts</h3>
                            <p>A list of Posts retrieved from MongoDB database</p>

                            <div className='shadow-lg overflow-x-auto'>
                                <table className='text-left rounded-md mt-3 table-fixed w-full'>
                                    <thead>
                                        <tr className='bg-gray-400'>
                                            <th className='p-5'>Post ID</th>
                                            <th className='p-5'>Post Title</th>
                                            <th className='p-5'>Post Img</th>
                                            <th className='p-5'>Post Content</th>
                                            <th className='p-5'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allPostsData?.map(val => (
                                            <tr key={val._id}>
                                                <td className='p-5'>{val._id}</td>
                                                <td className='p-5'>{val.title}</td>
                                                <td className='p-5'>
                                                    <Image
                                                        className='my-3 rounded-md'
                                                        src={val.img}
                                                        width={100}
                                                        height={100}
                                                        alt='post image'
                                                    />
                                                </td>
                                                <td className='p-5'>{val.content}</td>
                                                <td className='p-5'>
                                                    <Link className='bg-gray-500 text-white border py-2 px-3 text-xl my-2' href={`/admin/posts/edit/${val._id}`}>Edit</Link>
                                                    <DeleteBtn id={val._id}/>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Container>
    )
}

export default AdminUserManagePage