import express from "express";
import {createUser} from "../controllers/userController.js";
import {loginUser} from "../controllers/userController.js"
import {logoutUser} from "../controllers/userController.js"
import { authenticate,authorizeAdmin } from "../middlewares/authMiddleware.js";
import { getAllUsers,getUserProfile,updateCurrentUserProfile,deleteUserById,getUserById,updateUserById} from "../controllers/userController.js";
const router = express.Router();

router.route('/').post(createUser).get(authenticate,authorizeAdmin,getAllUsers);
router.post('/auth',loginUser);
router.post('/logout',logoutUser);
router.route('/profile').get(authenticate,getUserProfile).put(authenticate,updateCurrentUserProfile);
router.route('/:id').delete(authenticate,authorizeAdmin,deleteUserById).get(authenticate,authorizeAdmin,getUserById).put(authenticate,authorizeAdmin,updateUserById)
export default router
