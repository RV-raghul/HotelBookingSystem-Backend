import mongoose from "mongoose";
import { generateUUID } from "../utils/helper.js";
import { ROLE } from '../common/constants.js'
import { validateRole } from "../validator/common.validator.js";

let usersSchema = new mongoose.Schema({
    id:{
        type: String,
        default:generateUUID
    },
    username:{
        type:String,
        required:[true,"Username is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
    },
    password:{
        type:String,
        required:[true,"Password is required"],
    },
    role:{
        type:String,
        default:ROLE.USER,
        validate:{
            validator:validateRole,
            message: props => `${props.value} is not a valid Role`
        }
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},
{
    collection:'users',
    versionKey:false
}
)


export default mongoose.model('users', usersSchema)