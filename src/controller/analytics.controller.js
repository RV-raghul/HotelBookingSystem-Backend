import bookingsModel from "../model/bookings.model.js";
import reviewsModel from "../model/reviews.model.js";



const bookingsPerDay = async (req, res) => {
    try {
      const result = await bookingsModel.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            Count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


  const revenuePerMonth = async (req, res) => {
    try {
      const result = await bookingsModel.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
            TotalRevenue: { $sum: "$totalPrice" },
          },
        },
        { $sort: { _id: 1 } },
      ]);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  const averageRatings = async (req, res) => {
    try {
      const result = await reviewsModel.aggregate([
        {
          $group: {
            _id: "$hotelId",
            AverageRating: { $avg: "$rating" }
          }
        },
        {
          $lookup: {
            from: "hotels",
            localField: "_id",       // This is review.hotelId
            foreignField: "id",      // This is hotel.id (not _id)
            as: "hotel"
          }
        },
        { $unwind: "$hotel" },
        {
          $project: {
            _id: "$hotel.title",      // Rename output _id to hotel name
            AverageRating: 1
          }
        }
      ]);
      res.status(200).json(result);
    } catch (err) {
      console.error("Average Rating Error", err);
      res.status(500).json({ message: err.message });
    }
  };
  
  

  export default {
    bookingsPerDay,
    revenuePerMonth,
    averageRatings,
  }