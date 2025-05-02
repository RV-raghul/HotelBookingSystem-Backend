import mongoose from "mongoose";
import { generateUUID } from '../utils/helper.js'



let profileSchema = new mongoose.Schema({
    id:{
        type:String,
        default:generateUUID
    },
    userId:{
        type:String,
        required:[true, "UserID required"]
    },
    firstName:{
        type:String,
        required:[true, "First Name required"]
    },
    lastName:{
        type:String,
        required:[true, "Last Name required"]
    },
    phone:{
        type:Number,
        required:[true,"Phone Number required"]
    },
    addressLine1:{
        type:String,
        required:[true, "Address Line 1 required"]
    },
    addressLine2:{
        type:String,
        required:[true, "Address Line 2 required"]
    },
    city:{
        type:String,
        required:[true, "City required"]
    },
    state:{
        type:String,
        required:[true, "State required"]
    },
    zipCode:{
        type:String,
        required:[true, "Zip Code required"]
    }
},{
    collection:'profiles',
    versionKey:'false'
})


export default mongoose.model('profiles',profileSchema)