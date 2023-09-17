import Bookings from "../models/Bookings.js";

export const newBooking = async (req, res, next) => {
  const { movie, date, seatNumber, user } = req.body;

  let booking;

  try {
    booking = new Bookings({
      movie,
      date: new Date(`${date}`),
      seatNumber,
      user,
    });

    booking = await booking.save();
  } catch (error) {
    return console.log(error);
  }

  if (!booking) {
    return res.status(500).json({ message: "unable to create booking" });
  }

  return res.status(200).json({ booking });
};
