import express from 'express'
import reviewController from '../controller/review.controller.js'
import authGuard from '../middleware/authGuard.middleware.js'
import adminGuard from '../middleware/adminGuard.middleware.js'
const router = express.Router();

router.post('/add',authGuard, reviewController.addReviews);
router.get('/getAll',authGuard,adminGuard,reviewController.getAllReviews)
router.delete('/delete/:id', authGuard,adminGuard,reviewController.deleteReviewById);



export default router;