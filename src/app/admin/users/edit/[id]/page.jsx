"use client"

import React, { useState, useEffect } from 'react'
import AdminNav from '@/app/admin/components/AdminNav'
import Footer from '@/app/admin/components/Footer'
import Container from '@/app/admin/components/Container'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { BASE_API_URL } from '@/app/utils/constants'

function AdminEditUserPage({ params }) {

    const { data: session } = useSession();
    if (!session) redirect("/login");
    if (!session?.user?.role === "admin") redirect("/welcome");

    const { id } = params;

    const [userOldData, setUserOldData] = useState();
    const router = useRouter();

    // New user data
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const getUserById = async (id) => {
        try {
            const res = await fetch(`${BASE_API_URL}/api/totalUsers/${id}`, {
                method: "GET",
                cache: "no-store"
            })

            if (!res.ok) {
                throw new Error("Failed to fetch users ")
            }

            const data = await res.json();
            setUserOldData(data.user)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUserById(id);
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await fetch(`${BASE_API_URL}/api/totalUsers/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ newName, newEmail, newPassword })
            })

            if (!res.ok) {
                throw new Error("Failed to update user")
            }

            router.refresh();
            router.push("/admin/users")

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container>
            <AdminNav session={session} />
            <div className='flex-grow'>
                <div className="container mx-auto shadow-xl my-10  p-10 rounded-xl">
                    <Link href={"/admin/users"} className='bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2'>Go back</Link>
                    <hr className='my-3' />
                    <h3 className='text-xl'>Admin Edit User Page</h3>
                    <form onSubmit={handleSubmit} >
                        <input on type="text" className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder={userOldData?.name} onChange={(e) => setNewName(e.target.value)} value={newName} />
                        <input type="email" className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder={userOldData?.email} onChange={(e) => setNewEmail(e.target.value)} value={newEmail} />
                        <input type="password" className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder={userOldData?.password} onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />

                        <button type='submit' name='update' className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2'>Update User</button>
                    </form>
                </div>
            </div>
            <Footer />
        </Container>
    )
}

export default AdminEditUserPage