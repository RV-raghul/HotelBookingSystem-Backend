import Joi from 'joi'
import { ROLE } from '../common/constants.js'


const signupSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role:Joi.string().valid(...Object.values(ROLE))
})


const signinSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})



export {
    signupSchema,
    signinSchema
}