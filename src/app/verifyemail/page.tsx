'use client'

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Page = () => {


    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [err, setErr] = useState(false)

    const verifyUserEmail = async()=>{
        try {
            await axios.post("/api/users/verifyemail",{token})
            .then((res)=>{
                console.log(res.data)
                if(res.data.status === 400){
                    throw new Error(res.data.message)
                } 
            })
            // console.log(response)
            // console.log(token)
            setVerified(true)
            setErr(false)
        } catch (error) {
            console.log(error)
            setErr(true)
        }
    }

    useEffect(()=>{
        setErr(false)
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    },[])

    useEffect(()=>{
        setErr(false)
        if(token.length > 0){
            verifyUserEmail()
        }
    },[token])

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className='text-3xl'>Verify Email</h1>
            <h2 className='p-2'>
                {token ? `${token}` : 'no token'}
            </h2>

            {verified && (
                <div>
                    <h2>VERIFIED</h2>
                    <Link href="/login">Login</Link>
                </div>
            )}

            {err && (
                <div>
                    <h2>Error</h2>
                </div>
            )}  
        </div>
    );
}

export default Page;
