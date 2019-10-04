const Spot = require('../models/Spot');
const User = require('../models/User');

async function index(request, response) {
  const { tech } = request.query;
  const techs = await Spot.find({ techs: tech });
  return response.status(200).json(techs);
}

async function store(request, response) {
  const { filename } = request.file;
  const { company, techs, price } = request.body;
  const { user_id } = request.headers;

  try {
    const userExists = await User.findById(user_id);

    if (!userExists) {
      return response.status(400).json({ message: 'User does not exists' });
    }
  } catch (error) {
    return response.status(400).json({ message: 'Id de usuário inválido' });
  }

  const spot = await Spot.create({
    user: user_id,
    thumbnail: filename,
    company,
    techs: techs.split(',').map(tech => tech.trim()),
    price
  });

  return response.status(200).json(spot);
}

module.exports = {
  index,
  store
};
