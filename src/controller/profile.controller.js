import profileModel from "../model/profile.model.js";
import { decodeToken} from '../utils/auth.js'
const getProfile = async(req, res) => {
    try{
        const userId = req.headers.id
        const profile = await profileModel.findOne({ userId})

        if(!profile) {
            return res.status(404).send({
                message:'Profile not Found'
            })
        }
        return res.status(200).send({
            data:profile,
            message:'Profile Fetched Successfully'
        })
    }
    catch(err) {
        return res.status(500).send({
            message:'Internal Server Error'
        })
    }
}


const createProfile = async(req,res) => {
    try {
      let userId = req.headers.id
        const existing = await profileModel.findOne({userId})
        if (existing) {
            return res.status(400).json({ message: 'Profile already exists' });
          }
      
          const newProfile = new profileModel({
            userId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            addressLine1: req.body.addressLine1,
            addressLine2: req.body.addressLine2,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode
          });
          const saved = await newProfile.save();
          return res.status(201).send({
            message:"Profile Created Successfully!"
          });
        } catch (err) {
          console.error('Error creating profile:', err);
          return res.status(500).json({ message: 'Server error' });
        }
      
    }

    const updateProfile = async (req, res) => {
        try {
          const userId = req.headers.id;
      
          const updated = await profileModel.findOneAndUpdate(
            { userId },
            {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              phone: req.body.phone,
              addressLine1: req.body.addressLine1,
              addressLine2: req.body.addressLine2,
              city: req.body.city,
              state: req.body.state,
              zipCode: req.body.zipCode
            },
            { new: true } // return the updated document
          );
      
          if (!updated) {
            return res.status(404).json({ message: 'Profile not found' });
          }
      
          return res.status(200).send({
            message:'Profile Updated Successfully!'
          });
        } catch (err) {
          console.error('Error updating profile:', err);
          return res.status(500).json({ message: 'Server error' });
        }
      };



export default {
    getProfile,
    createProfile,
    updateProfile
}