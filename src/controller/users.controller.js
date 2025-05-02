import { ROLE } from '../common/constants.js'
import usersModel from '../model/users.model.js'
import { hashValue, hashCompare, createToken } from '../utils/auth.js'



const signup = async( req,res) => {
    try {
        let { username = "", email="" , password = "", role = ROLE.USER} = req.body
        let user = await usersModel.findOne({email})

        if(user){
            return res.status(400).json({message: "Email already exists"})
        }
        else{
            let newUser = new usersModel()

            newUser.username = username
            newUser.email = email
            newUser.password = await hashValue(password)
            newUser.role = role

            await newUser.save()

            res.status(201).send({
                message: "Signup successfull",
            })
        }
    
    }catch(error){
        console.log(error)
        res.status(500).send({
            message: error.message || "Internal server error",
    })
}
    
}

const signin = async (req, res) => {
    try{
        let { email="", password="" } = req.body
        let user = await usersModel.findOne({email})
        if(user){
            if( await hashCompare(password, user.password)){
                let token = await createToken({
                    id: user.id,
                    role: user.role,
                    username: user.username
                })

                res.status(200).send({
                    message: "Login successfull",
                    token: token,
                    data:{
                        id: user.id,
                        role: user.role,
                        username: user.username
                    }
                })
            }
            else{
                res.status(400).send({
                    message: "Invalid password"
                })
            }
        }
        else{
            res.status(400).send({
                message: "Invalid email"
            })
        }
    }catch(error){
        res.status(500).send({
            message: error.message || "Internal server error"
        })
    }
}





export default {
    signup,
    signin
}