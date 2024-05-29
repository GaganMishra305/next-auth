import { connect } from "@/dbConfig/dbConfig";  
import User from "@/models/UserModel"
import { NextRequest, NextResponse } from 'next/server'
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect()

export async function POST(request: NextRequest){
    const userid = await getDataFromToken(request)
    const user = await User.findById(userid).select("-password")

    if(!user){
        return NextResponse.json({
            message: "User not found",
            success: false
        })
    }else{
        return NextResponse.json({
            message: "User found",
            success: true,
            data: user
        })
    }
}