// import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from 'mongoose';

export default async function connect(){
    // const mongoServer = await MongoMemoryServer.create();
    const mongoUri = "mongodb+srv://admin:admin@cluster0.o47io.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

    await mongoose.connect(mongoUri, { dbName: "testingDb"});
    console.log(`MongoDB successfully connected to ${mongoUri}`);
}
 