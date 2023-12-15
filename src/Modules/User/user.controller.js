import User from "../../../DB/Models/user.model.js";
import bcrypt from "bcryptjs";


//============================== Add user API ======Create Methods================

export const addUser =async (req,res,next)=>{
    const {username,email,password}=req.body;
    console.log(req.body)
    // create => badif bs OR save => badif w b3ml save w update  OR insertMany => badif array mn el objects
    const isUserNameFound = await User.findOne({username})
    if(isUserNameFound){
        return res.status(409).json({
            message:"User Name Already Exists",
        })
    }
    const isEmailFound = await User.findOne({email})
    if(isEmailFound){
        return res.status(409).json({
            message:"Email Already Exists",
        })
    }
    // salt rounds => 10
    console.log(password)
    const hashedpassword = bcrypt.hashSync(password,+process.env.SALT_ROUNDS);// 10 => level encryption
    console.log(hashedpassword)
    const CreateUser =  await User.create({username,email,password:hashedpassword})
    if(CreateUser){
        return res.status(200).json({
            message:"User Created",
            CreateUser
        })
    }else{
        return res.status(409).json({
            message:"Failed To Create User",
        })
    }
}


//============================== Login user API ======Create Methods================

export const signIn = async (req,res,next)=>{
    const {username,email,password}=req.body;
    const user =await User.findOne({
        $or:[
            {username:username},
            {email:email},
        ]
    })
    if(!user){
        return res.json({
            message:"Invalid Credentials",
            status:404
        })
    }

    // password (1) => hashedpassword (2)
    const isMatched = bcrypt.compareSync(password,user.password);
    console.log(isMatched)
    if(!isMatched){
        return res.json({
            message:"Invalid Credentials",
            status:404
        })
    }else{
        return res.json({
            message:"Logged In",
            status:200,
            user
        })
    }
}

// ===========================update user===================

export const updateUser = async (req,res,next)=>{
    const{username,email}=req.body;
    const {_id,logedInUserId}=req.query;
    // username is not exist in the database
  
    if(_id !== logedInUserId){
        return res.json({
            message:"Not Allowed",
        })
    }
    let updateObject = {}
    if(username){
        const isUserNameFound = await User.findOne({username})
        if(isUserNameFound){
            return res.json({
                message:"User Name Already Exists",
                status:409
            })
        }
        updateObject.username=username
    }
    if(email){
        const isEmailFound = await User.findOne({email})
    if(isEmailFound){
        return res.json({
            message:"Email Already Exists",
            status:409
        })
    }
    updateObject.email=email
    }
    console.log(updateObject)

    const updateUser = await User.updateOne({_id},updateObject)
    if(updateUser.modifiedCount){
        return res.json({
            message:"User Updated",
            status:200,
            updateUser
        })
    }else{
        return res.json({
            message:"Failed To Update User",
            status:409
        })
    }
}


// ===========================delete user===================

export const deleteuser = async (req,res,next)=>{
    const {_id,logedInUserId} = req.query;

if(_id !== logedInUserId){
    return res.json({
        message:"Not Allowed",
    })
}
const user = await User.findByIdAndDelete({_id});
if(!user){
    return res.json({
        message:"Failed To Delete",
    })
}else{
    
        return res.json({
            message:"Delete",
            user
        })
    
}
}

// ===========================get user data===================

export const getUserData = async (req,res,next)=>{
    const {_id}=req.params;
    const user = await User.findById(_id,'username');
    if(!user){
        return res.json({
            message:"user not found"
        })
    }
    res.json({
        message:"user data",
        user
    })
}



/**
 * 200 => OK
 * 201 => Created
 * 204 => No Content
 * 
 * 304 => Not Modified
 * 
 * 400 => Bad Request
 * 401 => Unauthorized
 * 409 => Conflict
 * 404 => Not Found
 * 403 => Forbidden
 * 
 * 500 => Internal Server Error
 * 502 => Bad Gateway
 */