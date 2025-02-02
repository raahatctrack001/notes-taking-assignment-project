import mongoose from "mongoose";

export const databaseConnection = async ()=>{
    try {        
        // console.log(process.env.MONGODB_CONNECTION_STRING)
        const connectionInstance = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        return connectionInstance;
    } catch (error) {
        console.log("mongodb connection error ", error);
        setTimeout(databaseConnection, 5000);
    }
}