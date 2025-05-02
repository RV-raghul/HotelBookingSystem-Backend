import Stripe from "stripe";
import bookingsModel from "../model/bookings.model.js";
import usersModel from '../model/users.model.js'
import sendReceiptEmail from "../utils/sendReceiptEmail.js"; 
import config from "../common/config.js";
const stripe = new Stripe(config.STRIPE_KEY)


const payment = async(req,res) => {
  const { hotelID , userId, price, hotelName, startDate,endDate,guests } = req.body;
  try{
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode:'payment',
      line_items: [
        {
          price_data: {
            currency: 'inr',
            unit_amount: price * 100 ,
            product_data:{
              name: hotelName ,
              description: `Booking from ${startDate} to ${endDate}`,
            }
        },
        quantity: 1,
      }
      ],
      success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}&hotelId=${hotelID}&hotelName=${hotelName}&userId=${userId}&startDate=${startDate}&endDate=${endDate}&guests=${guests}&price=${price}`,
      cancel_url: 'http://localhost:5173/cancel',
      metadata:{
        hotelID,
        userId,
        price,
        hotelName,
        startDate,
        endDate,
        guests
      }
    })
    res.json({ sessionId: session.id})
  }
  catch(err){
    res.status(500).json({
      message: err.message
    })
  }
}


const addBooking = async (req, res) => {
  try {
    const { hotelId, hotelName, userId, startDate, endDate, guests, totalPrice } = req.body;

    const newBooking = await bookingsModel.create({
      hotelId,
      userId,
      startDate,
      endDate,
      guests,
      totalPrice, // ⬅️ Store price
      createdAt: new Date(),
    });

    const user = await usersModel.findOne({id:userId});
    if (user && user.email) {
      // ✉️ Send receipt email

     try {
        await sendReceiptEmail(user.email,hotelName, newBooking);
      } catch (emailError) {
        console.error("Failed to send receipt email:", emailError);
      }
    }

    res.status(200).json({
      message: "Booking added successfully",
      data: newBooking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong",
    });
  }
};

const getAllBookings = async(req,res) => {
  try{
    const bookings = await bookingsModel.aggregate([
      {
        $lookup: {
          from: "hotels",
          localField: "hotelId",
          foreignField: "id",
          as: "hotelDetails"
        }
      },
      { $unwind: "$hotelDetails" },
      { $sort: { startDate: -1 } }
    ]);
    res.status(200).send( {data:bookings});
  }catch(error){
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}



const getBookingsByUser = async(req,res) => {
  try {

    const userId = req.params.id
    if (!userId) return res.status(400).json({ message: "User ID is required" });

    const bookings = await bookingsModel.aggregate([
      { $match: { userId } },
      {
        $lookup: {
          from: "hotels",
          localField: "hotelId",
          foreignField: "id",
          as: "hotelDetails"
        }
      },
      { $unwind: "$hotelDetails" },
      { $sort: { startDate: -1 } }
    ]);
    res.status(200).send( {data:bookings});
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }

}


const cancelBooking = async (req, res) => {
  const bookingId = req.params.id;

  try {
    const booking = await bookingsModel.findOne({id:bookingId});

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status === "CANCELLED") {
      return res.status(400).json({ message: "Booking already cancelled" });
    }

    booking.status = "CANCELLED";
    await booking.save();

    res.status(200).json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    console.error("Cancel booking error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};








export default {
  payment,
  addBooking,
  getBookingsByUser,
  cancelBooking,
  getAllBookings
}