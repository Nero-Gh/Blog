import express from "express";
import { addUsers } from "../controllers/usersController.js";

const router = express.Router();

router.get("/", addUsers);

export default router;
