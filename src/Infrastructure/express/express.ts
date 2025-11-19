import express from 'express';
import { AuthRoute } from '../../Interface_Adapters/routes/auth.route.js';
import cookieParser from "cookie-parser";
import { loggerMiddleware } from '../../Interface_Adapters/middlewares/LoggerMiddleware/loggerMiddleware.js';
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from '../../Interface_Adapters/middlewares/ErrorHandlers/errorHandler.js';
import { AgencyRoute } from '../../Interface_Adapters/routes/agency.route.js';
import { AdminRoute } from '../../Interface_Adapters/routes/admin.route.js';
dotenv.config();


export const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(loggerMiddleware);

app.use(
  cors({
    origin: [process.env.CLIENT_URL as string], 
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    credentials: true,
  })
);


const authRoute = new AuthRoute();
app.use('/api/auth',authRoute.router);

const agencyRoute = new AgencyRoute()
app.use('/api/agency',agencyRoute.router)

const adminRoute = new AdminRoute();
app.use('/api/admin',adminRoute.router)

app.use(errorHandler)


