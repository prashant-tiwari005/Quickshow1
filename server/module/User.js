import mongoose from "mongoose";

const userScheme = new mongoose.scheme({

    _id:{type: string,required: true},
    name:{type: string, required: true}, 
    email:{type: string, required: true},
    image:{type: string, required: true},

})

const User = mongoose.model("user",userSchema)
export default User;