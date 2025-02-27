import express from 'express';
import dotenv from 'dotenv';
import router from './routes/index';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI as string)
    .then(() => {
        console.log("Connected to database")

        app.use(express.json());
        app.use('/api/v1/', router);

        app.listen(Number(port), () => {
            console.log(`Listening at port ${port}`);
        });
    })
    .catch((err) => {
        console.log("Failed to connect to DB: ", err);
        process.exit(1);
    });


