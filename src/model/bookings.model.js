import mongoose from "mongoose";
import { generateUUID } from "../utils/helper.js";

const bookingsSchema = new mongoose.Schema({
  id: {
    type: String,
    default:generateUUID
  },
  hotelId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  guests: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["BOOKED", "CANCELLED"],
    default: "BOOKED"
  },
  totalPrice:{
    type:Number,
    required:true

  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { 
    collection:"bookings",
    versionKey:false
});

export default mongoose.model('bookings', bookingsSchema);
