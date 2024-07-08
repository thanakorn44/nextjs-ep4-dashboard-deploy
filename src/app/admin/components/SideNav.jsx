import React from 'react'
import Link from 'next/link'


function SideNav() {
  return (
    <nav className=' shadow-lg p-10 rounded-lg bg-sky-800 ml-4'>
        <ul className='text-white '>
            <li><Link className='block my-3 p-3 rounded-lg' href={"/admin"}>Dashboard</Link></li>
            <li><Link className='block my-3 p-3 rounded-lg' href={"/admin/users"}>User</Link></li>
            <li><Link className='block my-3 p-3 rounded-lg' href={"/admin/posts"}>Posts</Link></li>
        </ul>
    </nav>
  )
}

export default SideNav