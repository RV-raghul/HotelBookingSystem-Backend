import mongoose from "mongoose";
import { generateUUID } from "../utils/helper.js";

const reviewSchema = new mongoose.Schema({
        id:{
            type: String, required: true, unique: true
            , default: generateUUID
        },
        userId:{
            type:String,
            required:[true,"UserId is required"]
        },
        username:{
            type: String, required: [true, "Username is required"]
        },
        hotelId:{
            type: String, required: [true, "HotelId is required"]

        },
        bookingId:{
            type: String, required: [true, "BookingId is required"]

        },
        rating: { 
            type: Number, 
            min: 1, max: 5, required: [true, "Rating is required"]
            },
        description: {
            type: String, required: [true, "Description is required"]
        },
        showName: {
            type: Boolean, default: true
        },
        createdAt: { type: Date, default: Date.now }

},
{
    collection:'reviews',
    versionKey:false

})


export default mongoose.model('reviews', reviewSchema)