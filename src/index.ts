import express from 'express';
import dotenv from 'dotenv';
import router from './routes/main';
import connectToMongoDB from './config/mongoose';
import logger from './config/logger';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectToMongoDB();

app.use(express.json());
app.use('/api/v1/', router);

app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
});
