import express from "express";
import { registerAdmin, loginAdmin, logoutAdmin, getAdmin } from "../controllers/AdminController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerAdmin);


router.post("/login", loginAdmin);
router.get("/logout", logoutAdmin);
router.get("/getadmin", isAuthenticated, getAdmin);

export default router;
