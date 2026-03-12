import "reflect-metadata";
import express from 'express';
import { AuthRoute } from '../../Interface_Adapters/routes/auth.route';
import cookieParser from "cookie-parser";
import { loggerMiddleware } from '../../Interface_Adapters/middlewares/LoggerMiddleware/loggerMiddleware';
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from '../../Interface_Adapters/middlewares/ErrorHandlers/errorHandler';
import { AgencyRoute } from '../../Interface_Adapters/routes/agency.route';
import { AdminRoute } from '../../Interface_Adapters/routes/admin.route';
import { HubRoute } from "../../Interface_Adapters/routes/hub.route";
import { UserRoute } from "../../Interface_Adapters/routes/user.route";
import { PaymentRoute } from "../../Interface_Adapters/routes/payment.routes";
import { WrokerRoute } from "../../Interface_Adapters/routes/worker.route";
dotenv.config();


export const app = express();

app.use(cookieParser());
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));

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

const userRoute = new UserRoute();
app.use('/api/user',userRoute.router)

const agencyRoute = new AgencyRoute()
app.use('/api/agency',agencyRoute.router)

const adminRoute = new AdminRoute();
app.use('/api/admin',adminRoute.router)

const hubRoute = new HubRoute();
app.use("/api/hub",hubRoute.router);

const wrokerRoute = new WrokerRoute();
app.use("/api/worker",wrokerRoute.router)

const paymentRoute = new PaymentRoute();
app.use("/api/webhooks",paymentRoute.router)

app.use(errorHandler)


