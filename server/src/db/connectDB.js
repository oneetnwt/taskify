import mongoose from 'mongoose'
import { getEnv } from '../utils/index.js';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(getEnv("MONGO_URI"));
        console.log(`Successfully connected to database!`);
    } catch (error) {
        console.log(`Error in connecting database: ${error}`);
        process.exit(1)
    }
}

export default connectDB