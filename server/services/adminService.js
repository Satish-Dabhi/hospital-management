const schema = require('../database/schema');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'my_secret_key';

const getAllAdmins = async () => {
  return await schema.adminSchema
    .find({}, function (err, result) {
      if (err) {
        throw err;
      } else {
        return result;
      }
    })
    .clone()
    .catch(function (err) {
      return err;
    });
};

const adminLogin = async (data) => {
  const findUser = await schema.adminSchema.findOne(data);
  if (findUser) {
    const secretKey = JWT_SECRET_KEY;
    const options = { expiresIn: '2d' };
    const payload = {
      name: findUser.name,
      email: findUser.email,
    };
    const token = jwt.sign(payload, secretKey, options);
    return {
      message: 'Login successfully',
      token: token,
      user: {
        id: findUser._id,
        name: findUser.name,
        email: findUser.email,
      },
      verified: true,
    };
  } else {
    return {
      verified: false,
      message: 'Invalid Credential',
    };
  }
};

module.exports = {
  adminLogin,
  getAllAdmins
};
