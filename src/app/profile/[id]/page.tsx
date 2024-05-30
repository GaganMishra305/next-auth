import React from 'react';

const Page = ({params}:any) => {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1>Profile page</h1>
            <h2 className='p3 bg-green-400 rounded text-black'>{params.id}</h2>
        </div>
    );
}

export default Page;
