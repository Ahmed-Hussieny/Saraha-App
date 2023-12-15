import express from 'express';
import { config } from 'dotenv';
import MessageRouter from './Modules/Messages/message.routes.js';
import userRoute from './Modules/User/user.routes.js';
import { db_connection } from '../DB/connection.js';
import { globalResponse } from './Middlewars/globalResponse.js';
config();

const app = express();
app.use(express.json());

db_connection();
app.use(userRoute);
app.use(MessageRouter);
app.use(globalResponse);

export default app;
