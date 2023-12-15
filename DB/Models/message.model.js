import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
        
    },
    sendTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    
    },
    isViewed:{
        type: Boolean,
        default: false
    },
},{
    timestamps: true
})

const Message = mongoose.model('Message',MessageSchema);
export default Message;