import { createServer } from "http";
import  dotenv  from "dotenv";
import { connectDB } from "./Infrastructure/database/monogdb.js";
import { app } from "./Infrastructure/express/express.js";
import logger from "./Infrastructure/logger/logger.js";
import "reflect-metadata";




dotenv.config();

connectDB();
const server = createServer(app);


const port = process.env.PORT || 5000 ;

server.listen(port,()=>{
    logger.info(` server is running, http://localhost:${port}`);
});


// https://medium.com/@deivisonisidoro_94304/revolutionizing-software-development-unveiling-the-power-of-clean-architecture-with-typescript-5ee968357d35
// https://blog.logrocket.com/applying-solid-principles-typescript

// https://dotnettutorials.net/lesson/clean-architecture-in-asp-net-core-web-api/