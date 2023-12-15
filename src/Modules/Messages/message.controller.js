
import Message from "../../../DB/Models/message.model.js";
import User from "../../../DB/Models/user.model.js";
import { CraeteDocument, findDocument } from "../../../DB/dbMethods.js";

//  ===================== send Message =================

export const sendMessage = async (req,res,next)=>{
    const {content} = req.body;
    const {sendTo} = req.params;

    const IsUserExist =await findDocument(User,{_id:sendTo});

    console.log(IsUserExist);
    if(IsUserExist.success === false){
        return res.status(IsUserExist.status).json({
            message:IsUserExist.msg
        })
    }

    const CreateDocument = await CraeteDocument(Message,{content,sendTo});
    if(CreateDocument.success === false){
        return res.status(CreateDocument.status).json({
            message:CreateDocument.msg
        })
    }else{
         res.status(200).json({
        message:"message sent",
        CreateDocument
    })
    }
}


// ===================== delete message =================

export const deleteMessage = async (req,res,next)=>{
    const {messageId,logedInUserId} = req.query;

    const DeletedMessage = await Message.findOneAndDelete({_id:messageId,sendTo:logedInUserId});
    if(!DeletedMessage){
        return res.status(400).json({
            message:"Can not delete message"
        })
    }else{
        return res.status(200).json({
            message:"message deleted"
        })
    }
}


// ===================== mark message as viewed =================

export const markMessageAsViewed = async (req,res,next)=>{
    const {messageId,logedInUserId} = req.query;
    const IsUserExist =await findDocument(Message,{_id:messageId});

    console.log(IsUserExist);
    if(IsUserExist.success === false){
        return res.status(IsUserExist.status).json({
            message:IsUserExist.msg
        })
    }
    const updatedMessage = await Message.findOneAndUpdate({_id:messageId,sendTo:logedInUserId,isViewed:false},{isViewed:true,$inc:{__v:1}},{new:true});
    if(!updatedMessage){
        return next(new Error("Can not update message",{cause:400}))
        
    }
    else{
        return res.status(200).json({
            message:"message updated",
            updatedMessage
        })
    }
}

// ===================== get User messages =================

export const ListUserMessages = async (req,res,next)=>{
    const {logedInUserId,isViewed} = req.query;
    const messages = await Message.find({sendTo:logedInUserId,isViewed}).sort({createdAt:-1});
    if(!messages.length){
        return res.status(200).json({
            message:"no messages"
        })
    }
    res.status(200).json({
        message:"Your Messages",
        messages
    })

}