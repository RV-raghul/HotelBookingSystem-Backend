import express from 'express'
import userRoutes from './users.routes.js'
import hotelRoutes from './hotel.routes.js'
import bookingsRoutes from './bookings.routes.js'
import reviewRoutes from './review.routes.js'
import profileRoutes from './profile.routes.js'
import analyticsRoutes from './analytics.controller.js'
const router = express.Router()

router.use('/user',userRoutes)
router.use('/hotel',hotelRoutes)
router.use('/booking',bookingsRoutes)
router.use('/review', reviewRoutes)
router.use('/profile',profileRoutes)
router.use('/dashboard',analyticsRoutes)


export default router