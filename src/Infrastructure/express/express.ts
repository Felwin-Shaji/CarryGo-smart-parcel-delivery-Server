import express from 'express';
import { AuthRoute } from '../../Interface_Adapters/routes/auth.route.js';
import { loggerMiddleware } from '../../Interface_Adapters/middlewares/loggerMiddleware.js';
// import { UserRoute } from '../routes/userRoute.js';


export const app = express();
app.use(loggerMiddleware)

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const userRoute = new AuthRoute();
app.use('/api/user',userRoute.router);


