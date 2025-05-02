import { ROLE } from '../common/constants.js'
import hotelsModel from '../model/hotel.model.js'
import reviewsModel from "../model/reviews.model.js";

const addHotel = async(req,res) => {
    try {
        const {userId,title="",description="",guest="",price,image,location,type, wifi, ac, tv,bar} = req.body
        

        let hotelEntry = new hotelsModel()
        hotelEntry.title = title
        hotelEntry.description = description
        hotelEntry.guest = guest
        hotelEntry.price = price
        hotelEntry.image = image
        hotelEntry.location = location
        hotelEntry.type = type
        hotelEntry.wifi = wifi
        hotelEntry.ac = ac
        hotelEntry.tv = tv
        hotelEntry.bar = bar
        hotelEntry.userId = userId
        await hotelEntry.save()

        res.status(200).send({
            message: "Hotel added successfully",
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Error adding hotel",
            })
    }
}


const getAvailableHotels = async (req, res) => {
    try {
      const { location, guest, startDate, endDate } = req.query;
      if (!location || !guest || !startDate || !endDate) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      const hotelPipeline = [
        {
          $match: {
            location: { $regex: location, $options: "i" },
            guest: { $gte: parseInt(guest) },
            status: "ACTIVE"
          }
        },
        {
          $lookup: {
            from: 'bookings',
            let: { hotelId: "$id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$hotelId", "$$hotelId"] },
                      {
                        $or: [
                          {
                            $and: [
                              { $lte: ["$startDate", new Date(endDate)] },
                              { $gte: ["$endDate", new Date(startDate)] }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            ],
            as: 'bookingsData'
          }
        },
        {
          $match: {
            bookingsData: { $eq: [] }
          }
        },
        {
          $project: {
            id: 1,
            title: 1,
            description: 1,
            location: 1,
            guest: 1,
            price: 1,
            image: 1,
            type: 1,
            wifi: 1,
            ac: 1,
            tv: 1,
            pet: 1,
            bar: 1,
          }
        }
      ]

      
    const hotels = await hotelsModel.aggregate(hotelPipeline);
      
    return res.status(200).json({
      message: "Hotels fetched successfully",
      data: hotels
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}



const getHotelById = async (req, res) => {
  try {
    const hotelId = req.params.id;

    const result = await hotelsModel.aggregate([
      {
        $match: { id: hotelId }
      },
      {
        $lookup: {
          from: "reviews", // reviews collection
          localField: "id",
          foreignField: "hotelId",
          as: "reviews"
        }
      },
      {
        $project: {
          _id: 0,
          id: 1,
          name: 1,
          location: 1,
          title: 1,
          description: 1,
          price: 1,
          guest: 1,
          type:1,
          image: 1,
          wifi: 1,
          ac: 1,
          tv: 1,
          bar:1,
          pet:1,
          reviews: 1
        }
      }
    ]);

    if (!result.length) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    return res.status(200).json({
      message: "Hotel fetched successfully",
      data: result[0] // sending only one hotel object with reviews
    });
  } catch (err) {
    console.error("Error fetching hotel with reviews:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};




export default {
    addHotel,
    getAvailableHotels,
    getHotelById
}
