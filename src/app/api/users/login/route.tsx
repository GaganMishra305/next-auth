import { connect } from "@/dbConfig/dbConfig";  
import User from "@/models/UserModel"
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken'

connect()

export async function POST(request: NextRequest){
    try{
        const reqBody = request.json()
        const {email, password} = await reqBody
        const user = await User.findOne({ email: email, password: password})

        if(!user){
            return NextResponse.json({
                message: "Invalid Credentials",
                success: false,
                status: 400
            })
        }

        console.log("User Exists");
        
        // checking passwird validitiy
        const validPass = await bcryptjs.compare(password, user.password);
        if(!validPass){
            return NextResponse.json({
                message: "Invalid Credentials",
                success: false,
                status: 400
            })
        }

        // making jwt token
        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email
        }

        const token =  await   jwt.sign(tokenData, process.env.TOKEN_SECRET! , {expiresIn: '1d'})

        const response = NextResponse.json({
            message:"Logged in success",
            success:true
        })

        response.cookies.set("token",token,{
            httpOnly:true,
        })

        return response
    }
    catch(err){
        return NextResponse.json(err)
    }
}