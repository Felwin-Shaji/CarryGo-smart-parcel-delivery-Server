import "reflect-metadata";
import { createServer } from "http";
import  dotenv  from "dotenv";
import { connectDB } from "./Infrastructure/database/monogdb.js";
import { app } from "./Infrastructure/express/express.js";
import logger from "./Infrastructure/logger/logger.js";




dotenv.config();

connectDB();
const server = createServer(app);


const port = process.env.PORT || 5000 ;

server.listen(port,()=>{
    logger.info(` server is running, http://localhost:${port}`);
});

