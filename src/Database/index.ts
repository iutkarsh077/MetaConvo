import mongoose from "mongoose";

const DBConnect = async () =>{
     try {
        const dbConnection = process.env.MONGODB_URI as string;
        await mongoose.connect(dbConnection);
        console.log("Database is Connected!");
     } catch (error) {
        console.log("Database Connection Failed", error);
     }
}

export default DBConnect;