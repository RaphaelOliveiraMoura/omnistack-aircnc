const Booking = require('../models/Booking');

async function store(request, response) {
  const { user_id } = request.headers;
  const { spot_id } = request.params;
  const { date } = request.body;

  const booking = await Booking.create({
    user: user_id,
    spot: spot_id,
    date
  });

  await booking
    .populate('spot')
    .populate('user')
    .execPopulate();

  return response.status(201).json(booking);
}

module.exports = {
  store
};
