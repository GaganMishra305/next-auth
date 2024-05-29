import { connect } from "@/dbConfig/dbConfig";  
import User from "@/models/UserModel"
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken'

connect()

export async function POST(request: NextRequest){
    try{
        const response = NextResponse.json({message:"Log out succesfully",success:true})
        response.cookies.set('token','',{
            httpOnly: true,
            expires: new Date(0)
        })

        return response
    }catch(e){
        console.log(e)
        return NextResponse.json({message: "Something went wrong",status:500})
    }
}