import mongoose from "mongoose";
import { generateUUID } from "../utils/helper.js";
import { STATUS } from "../common/constants.js";

let hotelsSchema = new mongoose.Schema({
    id:{
        type:String,
        default:generateUUID
    },
    userId:{
        type:String,
        required:[true,"UserId is required"]
    },
    title:{
        type:String,
        required:[true,"Title is required"]
    },
    description:{
        type:String,
        required:[true,"Description is required"]
    },
    guest:{
        type:Number,
        required:[true,"Guest is required"]
    },
    price:{
        type:Number,
        required:[true,"Price is required"]
        },
    image:{
            type:String,
            default:""
    },
    location:{
        type:String,
        required:[true,"Location is required"]
    },
    type:{
        type:String,
        required:[true,"Type is required"]
    },
    wifi:{
        type:Boolean,
        default:false
    },
    ac:{
        type:Boolean,
        default:false
    },
    tv:{
        type:Boolean,
        default:false
    },
    pet:{
        type:Boolean,
        default:false
    },
    bar:{
        type:Boolean,
        default:false
    },
    status:{
        type:String,
        default:STATUS.ACTIVE
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
},{
    collection:'hotels',
    versionKey:false
})

export default mongoose.model('hotels',hotelsSchema)