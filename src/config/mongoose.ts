import { connect, connection } from "mongoose";
import logger from "./logger";

const connectToMongoDB = async () => {
    try{
        connection.on("error", (err) => {
            logger.error(err.message)
            process.exit(1)
        })
    
        connection.on("connected", () => {
            logger.info("Connected to DB")
        })
    
        connection.on("disconnected", ()=> {
            logger.info("Disconnected from Mongo DB")
        })
    
        await connect(String(process.env.MONGO_URI))
    }
    catch(err) {
        logger.error(err)
        process.exit(1)
    }
}

export default connectToMongoDB