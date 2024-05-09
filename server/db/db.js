import mongoose from 'mongoose';

const connectDb = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected Successfully".cyan);
    } catch (error) {
        console.log("Error While Connecting to MongoDB", error);
    }
};

export default connectDb;
