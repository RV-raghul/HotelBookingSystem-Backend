import express from 'express'
import profileController from '../controller/profile.controller.js'
import authGuard from '../middleware/authGuard.middleware.js'
const router = express.Router()

router.get('/getprofile',authGuard,profileController.getProfile)
router.post('/createprofile',authGuard,profileController.createProfile)
router.post('/updateprofile',authGuard,profileController.updateProfile)

export default router