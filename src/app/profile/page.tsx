'use client'


import React, { useState } from 'react';
import axios from 'axios';  
import Link from 'next/link'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation';

const Page = () => {    
    const router = useRouter()
    const [data, setdata] = useState("nothing");

    const getUserDetails = async() =>{
        try {
            const response = await axios.post("/api/users/me")
            
            console.log("Profile success", response.data);
            if(response.data.success){
                setdata(response.data.data._id)
            }else{
                toast.error(response.data.message)
            }
        } catch (error:any) {
            console.log("Profile error", error);
            toast.error(error.message)
        }
    }

    const logout = async() => {
        try {
            const response = await axios.get("/api/users/logout")
            console.log("Logout success", response.data);
            toast.success('Logout success!')
            if(response.data.success){
                router.push('/login')
            }else{
                toast.error(response.data.message)
            }
        } catch (error:any) {
            console.log("Logout error", error);
            toast.error(error.message)
        }
    }

    // console.log(data);
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1>Profile Page</h1>
            <hr />
            {/* <h2>{data}</h2> */}
            <h2>{data==='nothing'?"Nothing": <Link href={`/profile/${data}`}>{data}</Link>}</h2>

            <button
                className='bg-blue-500 my-5 hover:bg-blue-200 text-white py-2 px-4 rounded-md'
                onClick={logout}
            >
                Logout
            </button>

            <button
                className='bg-green-500 my-5 hover:bg-green-200 text-white py-2 px-4 rounded-md'
                onClick={getUserDetails}
            >
                Get User Details
            </button>
        </div>
    );
}

export default Page;
