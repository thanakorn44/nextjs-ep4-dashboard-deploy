import React from 'react'
import Link from 'next/link'
import Logo from "../../../../public/next.svg"
import Image from 'next/image'
import { signOut } from 'next-auth/react'


function AdminNav({ session }) {
    return (
        <nav className='shadow-xl bg-sky-950'>
            <div className='container mx-auto'>
                <div className="flex justify-between items-center p-4">
                    <div>
                        <Link href={"/"}>
                            <h3 className='text-white text-3xl font-serif font-medium'>Thanakorn</h3>
                        </Link>
                    </div>
                    <ul className='flex'>
                        {!session ? (
                            <>
                                <li className='mx-3'><Link href={"/login"}>login</Link></li>
                                <li className='mx-3'><Link href={"/register"}>register</Link></li>
                            </>
                        ) : (
                            <li className='mx-3'>
                                <a onClick={() => signOut()} className='bg-red-500 text-white border py-2 px-3 rounded-md text-lg my-2 hover:opacity-90'>logout</a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default AdminNav