import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './db/db.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 6500;

// Start the server
const startServer = () => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`.underline.brightRed);
    });
};

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is Running on port ${port}`);
    });
}).catch(error => {
    console.error('Error connecting to the database:', error);
    process.exit(1);
});
