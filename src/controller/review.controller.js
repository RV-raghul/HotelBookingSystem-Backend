import reviewsModel from "../model/reviews.model.js";

const addReviews = async (req, res) => {
    try{
        const { userId,hotelId, bookingId, username, rating, description, showName} = req.body
        
        const newReview = await reviewsModel.create({
            userId,
            hotelId,
            bookingId,
            rating,
            description,
            showName,
            username
        })
        res.status(201).send({
            message: "Review created successfully"
        })
    }catch(error){
        res.status(500).send({ message: "Error creating review", error: error.message });
        console.error("Error details:", error);
    }
}


const getAllReviews = async (req, res) => {
    try {
      const reviews = await reviewsModel.aggregate([
        {
          $lookup: {
            from: "hotels",           // collection name in MongoDB
            localField: "hotelId",    // field in review
            foreignField: "id",       // field in hotel
            as: "hotelDetails"
          }
        },
        {
          $unwind: "$hotelDetails"    // flatten the hotelDetails array
        },
        {
          $project: {
            _id: 0,
            id:1,
            username: 1,
            showName: 1,
            rating: 1,
            description: 1,
            createdAt: 1,
            hotelName: "$hotelDetails.title",
            hotelImage: "$hotelDetails.image",
            hotelLocation: "$hotelDetails.location", // assuming 'title' is the hotel name
          }
        },
        {
          $sort: { createdAt: -1 } // optional: sort by newest first
        }
      ]);
  
      res.status(200).send({
        data:reviews,
        message: "Reviews fetched successfully",
      });
    } catch (err) {
      console.error("Failed to get reviews:", err);
      res.status(500).json({ message: "Something went wrong while fetching reviews." });
    }
  };


  const deleteReviewById = async(req,res) => {
    const  reviewId  = req.params.id;
    try {
      await reviewsModel.deleteOne({ id: reviewId });
      res.status(200).json({ message: "Review deleted successfully." });
      } catch (err) {
        console.error("Failed to delete review:", err);
        res.status(500).json({ message: "Something went wrong while deleting the review." });
        };

  }
  


export default {
    addReviews,
    getAllReviews,
    deleteReviewById

}