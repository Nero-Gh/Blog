import express from "express";
import { addPost } from "../controllers/postsController.js";

const router = express.Router();

router.get("/", addPost);

export default router;
