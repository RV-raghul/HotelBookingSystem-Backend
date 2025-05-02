import express from 'express'
import hotelscontroller from '../controller/hotels.controller.js'
import authGuard from '../middleware/authGuard.middleware.js'
import adminGuard from '../middleware/adminGuard.middleware.js'
const router = express.Router()

router.post('/create',authGuard,adminGuard,hotelscontroller.addHotel)
router.get('/getHotels',hotelscontroller.getAvailableHotels)
router.get('/getHotels/:id',authGuard,hotelscontroller.getHotelById)



export default router