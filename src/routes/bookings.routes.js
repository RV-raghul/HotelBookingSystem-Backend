import express from 'express'
import bookingsController from "../controller/bookings.controller.js";
import authGuard from '../middleware/authGuard.middleware.js'

const router = express.Router()

router.post('/payment',authGuard,bookingsController.payment)
router.post('/create',authGuard,bookingsController.addBooking)
router.get('/getBookingByUser/:id',authGuard,bookingsController.getBookingsByUser)
router.put('/cancel/:id',authGuard,bookingsController.cancelBooking)
router.get('/getAllBookings',authGuard,bookingsController.getAllBookings)
export default router