import express from "express";
import { newBooking } from "../controllers/booking-controller.js";

const bookingsRouter = express.Router();

bookingsRouter.post("/",newBooking);


export default bookingsRouter;
