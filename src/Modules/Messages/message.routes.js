

import { Router } from "express";
import * as MessageController from "./message.controller.js";

import expressAsyncHandler from "express-async-handler";
const MessageRouter = Router();

MessageRouter.post("/sendMessage/:sendTo", expressAsyncHandler(MessageController.sendMessage));
MessageRouter.delete("/deleteMessage",expressAsyncHandler( MessageController.deleteMessage));
MessageRouter.put("/markMessageAsViewed", expressAsyncHandler(MessageController.markMessageAsViewed));
MessageRouter.get("/ListUserMessages",expressAsyncHandler( MessageController.ListUserMessages));
export default MessageRouter;