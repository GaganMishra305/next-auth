import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGODB_URI!)
        const connection = mongoose.connection

        connection.on('connected', ()=>{
            console.log("Connected to MongoDB");
        })
        connection.on('error', (err)=>{
            console.log("Error connecting to MongoDB");
            console.log(err);
            process.exit();
        })
        connection.on('disconnected', ()=>{
            console.log("Disconnected from MongoDB");
        })
        connection.on('reconnected', ()=>{
            console.log("Reconnected to MongoDB");
        })
        connection.on('close', ()=>{
            console.log("Connection closed to MongoDB");
        })
    }catch(err){
        console.log("Cant connect to MongoDB");
        console.log(err);
    }
}