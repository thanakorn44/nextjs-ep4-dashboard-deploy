"use client"

import React, { useState, useEffect } from 'react'
import AdminNav from '../components/AdminNav'
import Footer from '../components/Footer'
import SideNav from '../components/SideNav'
import Container from '../components/Container'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import DeleteBtn from './deleteBtn'
import { BASE_API_URL } from '@/app/utils/constants'

function AdminUserManagePage() {

    const { data: session } = useSession();

    if (!session) redirect("/login");
    if (!session?.user?.role === "admin") redirect("/welcome");

    const [allUserData, setAllUserData] = useState([]);

    console.log("allUserData: ", allUserData)

   

    const getAlldata = async () => {
        try {

            const res = await fetch(`${BASE_API_URL}/api/totalUsers`, {
                cache: "no-store"
            })

            if (!res.ok) {
                throw new Error("Failed to fetch user")
            }

            const data = await res.json();
            setAllUserData(data.totalUsers)

        } catch (error) {
            console.log("Error loading users: ", error)
        }
    }

    useEffect(() => {
        getAlldata();
    }, [])



    return (
        <Container>
            <AdminNav session={session} />
            <div className="flex-grow">
                <div className='container mx-auto'>
                    <div className='flex mt-10'>
                        <SideNav />
                        <div className='p-10'>
                            <h3 className='text-3xl'>Manage User</h3>
                            <p>A list of user retrieved from MongoDB database</p>

                            <div className='shadow-lg overflow-x-auto'>
                                <table className='text-left rounded-md mt-3 table-fixed w-full'>
                                    <thead>
                                        <tr className='bg-gray-400'>
                                            <th className='p-5'>ID</th>
                                            <th className='p-5'>Username</th>
                                            <th className='p-5'>Email</th>
                                            <th className='p-5'>Role</th>
                                            <th className='p-5'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allUserData?.map(val => (
                                            <tr key={val._id}>
                                                <td className='p-5'>{val._id}</td>
                                                <td className='p-5'>{val.name}</td>
                                                <td className='p-5'>{val.email}</td>
                                                <td className='p-5'>{val.role}</td>
                                                <td className='p-5'>
                                                    <Link className='bg-gray-500 text-white border py-2 px-3 text-xl my-2' href={`/admin/users/edit/${val._id}`}>Edit</Link>
                                                    <DeleteBtn id={val._id} />
                                                </td>
                                            </tr>

                                        )

                                        )}

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