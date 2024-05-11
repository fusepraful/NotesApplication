import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './db/db.js';
import userRoute from './router/user-route.js'
import {notFound, errorHandler} from './middleware/error-middleware.js'
import cors from 'cors'
dotenv.config();
const app = express();
const port = process.env.PORT || 6500;
app.use(express.json())
app.use(cors())
//Routes
app.use("/api/v1/user", userRoute);

app.use(notFound, errorHandler)

//connect DB
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is Running on port ${port}`.yellow);
    });
}).catch(error => {
    console.error('Error connecting to the database:'.red, error);
    process.exit(1);
});
