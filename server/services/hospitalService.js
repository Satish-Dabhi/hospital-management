const schema = require('../database/schema');
const jwt = require('jsonwebtoken');
const { generateOTP, isWithinMinutes } = require('../helper/util');
const { sendVerificationMail } = require('../helper/email');
const JWT_SECRET_KEY = 'my_secret_key';

const getAllHospitals = async () => {
  return await schema.hospitalSchema
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

const hospitalSignUp = async (data) => {
  try {
    const verifiedHospital = await schema.hospitalSchema.findOne({ email: data.email, verified: true });

    if (verifiedHospital) {
      return { status: 'exist' };
    } else {
      const otp = generateOTP();

      const doesExist = await schema.hospitalSchema.findOne({ email: data.email });
      if (doesExist) {
        const newData = { ...data, otp: otp, otpCreateTime: new Date() };
        return await schema.hospitalSchema
          .updateOne({ email: data.email }, { $set: newData })
          .then((result) => {
            if (result) {
              sendVerificationMail(data.email, otp);
              return { message: 'OTP sent successfully.', status: 'created' };
            } else {
              return { message: 'Something went wrong', status: 'unDone' };
            }
          })
          .catch((err) => console.warn(err));
      } else {
        const hospitalData = { ...data, otp: otp, otpCreateTime: new Date(), verified: false };

        const hospital = new schema.hospitalSchema(hospitalData);
        return await hospital.save().then((result) => {
          if (result) {
            sendVerificationMail(data.email, otp);
            return { message: 'OTP sent successfully.', status: 'created' };
          } else {
            return { message: 'Something went wrong', status: 'unDone' };
          }
        })
          .catch((err) => console.warn(err));
      }
    }
  } catch (error) {
    throw new Error('Failed to create a user', error);
  }
};

const hospitalSignIn = async (data) => {
  const hospitalBody = {
    email: data.email,
    password: data.password
  }
  const findHospital = await schema.hospitalSchema.findOne(hospitalBody);
  if (findHospital && findHospital.verified) {
    const secretKey = JWT_SECRET_KEY;
    const options = { expiresIn: '2d' };
    const payload = {
      name: findHospital.name,
      email: findHospital.email,
    };
    const token = jwt.sign(payload, secretKey, options);
    return {
      message: 'Login successfully',
      token: token,
      user: {
        id: findHospital._id,
        name: findHospital.name,
        email: findHospital.email,
      },
      verified: findHospital.verified,
    };
  } else {
    return {
      verified: false,
      message: 'Invalid Credential',
    };
  }
};

const updateHospitalByEmail = async (data) => {
  return await schema.hospitalSchema
    .updateOne({ email: data.email }, { $set: data })
    .then((result) => {
      if (result) {
        return { status: 'done' };
      } else {
        return { status: 'unDone' };
      }
    })
    .catch((err) => console.warn(err));
};

const verifyOtp = async (data) => {
  const { email, otp, name } = data;
  const existUser = await schema.hospitalSchema.findOne({ email: email, otp: otp });
  if (existUser) {
    if (isWithinMinutes(existUser.otpCreateTime, 5)) {
      const verifiedUserData = {
        email: email,
        verified: true,
      };
      const verifiedUser = await updateHospitalByEmail(verifiedUserData);
      if (verifiedUser?.status === 'done') {
        const secretKey = JWT_SECRET_KEY;
        const options = { expiresIn: '2d' };
        const payload = {
          name: name,
          email: email,
        };
        const token = jwt.sign(payload, secretKey, options);
        return {
          token: token,
          user: {
            id: existUser._id,
            name: existUser.name,
            email: existUser.email,
          },
        };
      } else {
        return null;
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = {
  hospitalSignUp,
  hospitalSignIn,
  getAllHospitals,
  verifyOtp
};
