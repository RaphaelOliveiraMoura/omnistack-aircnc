const User = require('../models/User');

async function store(request, response) {
  const { email } = request.body;

  const user = await User.findOne({ email });

  if (!user) {
    const createdUser = await User.create({ email });
    return response.status(201).json(createdUser);
  }

  return response.status(200).json(user);
}

module.exports = {
  store
};
