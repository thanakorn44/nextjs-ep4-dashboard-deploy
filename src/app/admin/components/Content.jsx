import React from 'react'
import Image from 'next/image'
import { FaUsers, FaRegNewspaper, FaCircleUser } from 'react-icons/fa6'

function Content({ totalUserData, totalPostData }) {
    return (
        <div className='px-10 rounded-lg '>
            <div className="flex">
                <div className='shadow-lg w-[300px] m-3 p-10 rounded-lg bg-sky-800 text-white'>
                    <h3 className='flex items-center'><FaUsers className='mr-2' /> Total Users</h3>
                    <p className='text-5xl mt-10'>{totalUserData?.length}</p>
                </div>
                <div className='shadow-lg w-[300px] m-3 p-10 rounded-lg bg-sky-800 text-white'>
                    <h3 className='flex items-center'><FaRegNewspaper className='mr-2' /> Total Posts</h3>
                    <p className='text-5xl mt-10'>{totalPostData?.length}</p>
                </div>
                <div className='shadow-lg w-[300px] m-3 p-10 rounded-lg bg-sky-800 text-white'>
                    <h3 className='flex items-center'><FaCircleUser className='mr-2 ' />User Online Now</h3>
                    <p className='text-5xl mt-10'>18</p>
                </div>
            </div>
            <Image
                className='rounded-lg'
                src='https://images.unsplash.com/photo-1499673610122-01c7122c5dcb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNvZGVpbmd8ZW58MHx8MHx8fDA%3D'
                width={200}
                height={200}
                alt='psot'
            />
            <p className='my-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos sapiente assumenda rem libero cumque nesciunt tempora sunt suscipit iusto quas! Alias porro temporibus laborum ipsam consectetur animi nulla impedit velit!</p>
        </div>
    )
}

export default Content