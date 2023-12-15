import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true, //btmsah el spaces elly f el awl w el akher
    },
    password:{
        type:String,
        required:true,
    },
    isConformed:{
        type:Boolean,
        default:false,
    },
    profilePicture:{
        type:String,
    
    },

},{
    timestamps:true
})

const User=mongoose.model('user',userSchema);
export default User