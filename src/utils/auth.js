import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from '../common/config.js'


export const hashValue = async(value) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(value,salt)
}


export const hashCompare = async( value, hashValue) => {
    return await bcrypt.compare(value, hashValue)
}


export const createToken = async(payload) => {
    let token = jwt.sign(
        payload, config.JWT_SECRET,{
            expiresIn: config.JWT_EXPIRY
        }
    )
    return token
}


export const decodeToken = (token) => {
    return jwt.decode(token)
}