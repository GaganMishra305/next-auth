import { connect } from "@/dbConfig/dbConfig";  
import User from "@/models/UserModel"
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token)
        
        if(token){
            const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})

            if(!user){
                return NextResponse.json({error:"Invalid token", status:400});
            }

            console.log(user);

            user.isVerified = true;
            user.verifyToken = undefined;
            user.verifyTokenExpiry = undefined;
            
            await user.save();
            
            return NextResponse.json({message:"User verified successfully", status:200,success:true});
        }
    }catch(err : any){
        return NextResponse.json({error:err.message, status:500});
    }
}