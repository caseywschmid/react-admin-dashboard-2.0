import express from "express";
import { getSales } from "../controllers/sales.js";


const router = express.Router();

// This one is a little more convienient because I'm going to use the same
// endpoint to build 4 different pages. 
router.get("/sales", getSales);


export default router;