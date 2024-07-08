"use client"

import React, { useEffect, useState } from 'react'
import AdminNav from './components/AdminNav'
import Container from './components/Container'
import Footer from './components/Footer'
import SideNav from './components/SideNav'
import Content from './components/Content'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'


function AdminPage() {

    const { data: session } = useSession();
    if (!session) redirect('/login');
    if (!session?.user?.role === "admin") redirect("/welcome");

    const [totalUserData, setTotalUserData] = useState([]);
    const [totalPostData, setTotalPostData] = useState([]);

    // console.log(totalPostData)
    // console.log(totalUserData)

    const getTotalUser = async () => {
        try {

            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalUsers`, {
                cache: "no-store"
            })

            if (!res.ok) {
                throw new Error("Failed to fetch user");
            }

            const data = await res.json();
            setTotalUserData(data.totalUsers)

        } catch (error) {
            console.log("Error loading users: ", error)
        }
    }

    const getTotalPost = async () => {
        try {

            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalPosts`, {
                cache: "no-store"
            })

            if (!res.ok) {
                throw new Error("Failed to fetch post");
            }

            const data = await res.json();
            setTotalPostData(data.totalPosts)

        } catch (error) {
            console.log("Error loading posts: ", error)
        }
    }

    useEffect(() => {
        getTotalUser();
        getTotalPost();
    }, [])



    return (
        <Container>
            <AdminNav session={session} />
            <div className="flex-grow ">
                <div className="container mx-auto">
                    <div className="flex justify-between mt-10">
                        <SideNav />
                        <Content totalUserData={totalUserData} totalPostData={totalPostData} />
                    </div>
                </div>
            </div>
            <Footer />
        </Container>
    )
}

export default AdminPage