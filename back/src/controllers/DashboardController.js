const Spot = require('../models/Spot');

async function show(request, response) {
  const { user_id } = request.headers;
  const techs = await Spot.find({ user: user_id });
  return response.status(200).json(techs);
}

module.exports = {
  show
};
