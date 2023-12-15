import mongoose from "mongoose";
export const db_connection = async()=>{
   await mongoose.connect(process.env.CONNECTION_URL_LOCAL)
   .then((res)=>console.log('Database Connected'))
   .catch((err)=>console.log(err))
}
 