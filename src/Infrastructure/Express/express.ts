import "reflect-metadata";
import express from 'express';
import { AuthRoute } from '../../InterfaceAdapters/Routes/AuthRoute';
import cookieParser from "cookie-parser";
import { loggerMiddleware } from '../../InterfaceAdapters/Middlewares/LoggerMiddleware/loggerMiddleware';
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from '../../InterfaceAdapters/Middlewares/ErrorHandlers/errorHandler';
import { AgencyRoute } from '../../InterfaceAdapters/Routes/AgencyRoute';
import { AdminRoute } from '../../InterfaceAdapters/Routes/Admin/AdminRoute';
import { HubRoute } from "../../InterfaceAdapters/Routes/HubRoute";
import { UserRoute } from "../../InterfaceAdapters/Routes/UserRoute";
import { PaymentRoute } from "../../InterfaceAdapters/Routes/PaymentRoute";
import { WrokerRoute } from "../../InterfaceAdapters/Routes/WorkerRoute";
import { ChatRoute } from "../../InterfaceAdapters/Routes/Chat/ChatRoute";
dotenv.config();


export const app = express();

app.set("trust proxy", 1);

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://carry-go-smart-parcel-delivery-client-cafoyp5mn.vercel.app",
    "https://carry-go-smart-parcel-delivery-clie.vercel.app",

    //CLOUDFRONT_URL
    "https://d3sd8vqja88xcy.cloudfront.net",
    "https://www.carrygo.co.in"
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.options(/.*/, (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

app.use(cookieParser());
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));

app.use(loggerMiddleware);


const authRoute = new AuthRoute();
app.use('/api/auth', authRoute.router);

const userRoute = new UserRoute();
app.use('/api/user', userRoute.router)

const agencyRoute = new AgencyRoute()
app.use('/api/agency', agencyRoute.router)

const adminRoute = new AdminRoute();
app.use('/api/admin', adminRoute.router)

const hubRoute = new HubRoute();
app.use("/api/hub", hubRoute.router);

const wrokerRoute = new WrokerRoute();
app.use("/api/worker", wrokerRoute.router)

const paymentRoute = new PaymentRoute();
app.use("/api/webhooks", paymentRoute.router)

const chatRoute = new ChatRoute()
app.use("/api/chat", chatRoute.router)

app.use(errorHandler)


