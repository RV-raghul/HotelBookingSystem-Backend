import express from 'express'
import analyticsController from '../controller/analytics.controller.js'
import authGuard from '../middleware/authGuard.middleware.js'
import adminGuard from '../middleware/adminGuard.middleware.js'
const router = express.Router();


router.get("/bookings-per-day",authGuard,adminGuard, analyticsController.bookingsPerDay);
router.get("/revenue-per-month",authGuard,adminGuard,analyticsController.revenuePerMonth);
router.get("/average-ratings", authGuard,adminGuard,analyticsController.averageRatings);


export default router