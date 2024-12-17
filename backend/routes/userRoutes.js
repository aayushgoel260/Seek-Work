import express from "express";
import { login, register, logout, getUser,getAllUsers,deleteUser,profile ,updateUserProfile} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/all",getAllUsers)
router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);
router.delete("/delete/:userId", deleteUser);
router.get("/profile",isAuthenticated ,profile); 
router.put('/updateuser', isAuthenticated ,updateUserProfile);



export default router;
