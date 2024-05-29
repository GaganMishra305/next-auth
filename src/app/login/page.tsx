'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Page = () => {
    const router = useRouter()

    const [user, setUser] =useState({
        email:"",
        password:"",
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onLogin = async() =>{
        try{
            setLoading(true);
            const response = await axios.post("/api/users/login", user)
            console.log("Signup success", response.data);
            if(response.data.status === 400){
                alert("Invalid credential"  );
                throw new Error(response.data.message)
            }

            router.push('/profile')
        }catch(err : any){
            console.log(err+" Login faield");
            toast.error(err.message)
        }
    }

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <h1 className='text-2xl underline my-5'>{loading ? "Processing" : "Log In"}</h1>
            <hr />

            <label htmlFor="Email">Email</label>
            <input 
            className='text-black font-mono rounded-md border-none p-2 mb-4'
            id='Email'
            value={user.email}
            onChange={(e)=>{setUser({...user, email:e.target.value})}}
            placeholder='Email'
            type="text" />

            <label htmlFor="password">password</label>
            <input 
            className='text-black font-mono rounded-md border-none p-2 mb-4'
            id='password'
            value={user.password}
            onChange={(e)=>{setUser({...user, password:e.target.value})}}
            placeholder='password'
            type="password" />

            <button
            onClick={!buttonDisabled?onLogin:()=>alert("Fill data first")}
            className='p-2 border border-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-700'
            >
                {buttonDisabled ? "No Login":"Login"}
            </button>
            <Link href="/signup">Go to Signup Page.</Link>
        </div>
    );
}

export default Page;
