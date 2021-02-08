const bcrypt = require('bcrypt');
const { SALT_ROUNDS,SECRET } = require('../config/config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async ({username,password}) => {

    let salt = await bcrypt.genSalt(SALT_ROUNDS);
    let hash = await bcrypt.hash(password,salt);

    const user = new User({username,password: hash});

    return user.save();
};

const login = async ({username,password}) => {
   let user = await User.findOne({username});

   if(!user) throw { message: 'User not found!'}

   let isMatch = await bcrypt.compare(password,user.password);
   if(!isMatch) throw { message: 'Password does not match!'}

   let token =jwt.sign({ _id: user._id, roles: ['admin']},SECRET);

   return token;
};

module.exports = {
    register,
    login
}