import express from 'express';
import { AuthRoute } from '../../Interface_Adapters/routes/auth.route.js';
import { loggerMiddleware } from '../../Interface_Adapters/middlewares/loggerMiddleware.js';
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();


export const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(loggerMiddleware);

app.use(
  cors({
    origin: [process.env.CLIENT_URL as string], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

const userRoute = new AuthRoute();
app.use('/api/user',userRoute.router);


