"use client"

import React from 'react'

function DeleteBtn({ id }) {

    const handlerDelete = async () => {
        const confirmed = confirm("Are you sure?")

        const baseUrl = process.env.NEXT_PUBLIC_NAME;

        if (confirmed) {
            const res = await fetch(`${baseUrl}/api/totalPosts?id=${id}`, {
                method: "DELETE"
            })

            if (res.ok) {
                window.location.reload();
            }
        }
    }

    return (
        <a onClick={handlerDelete} className='bg-red-500 text-center text-white border py-2 px-3 rounded-md text-lg my-2' >
            Delete
        </a>
    )
}

export default DeleteBtn