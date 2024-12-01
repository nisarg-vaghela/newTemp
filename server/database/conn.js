// import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export default async function connect(){
    // const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(process.env.MONGOURL  , { dbName: "testingDb"});
    console.log(`MongoDB successfully connected`);
}
 