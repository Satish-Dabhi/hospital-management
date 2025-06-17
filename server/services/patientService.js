const schema = require("../database/schema");

const getAllPatients = async () => {
  try {
    const result = await schema.patientSchema.find({}).sort({ _id: -1 }).exec();

    return result;
  } catch (err) {
    throw err;
  }
};

const createNewPatient = async (data) => {
  try {
    const totalPatients = await schema.patientSchema.countDocuments();

    // Set the index field based on the total count
    data.index = totalPatients + 1;

    const user = new schema.patientSchema(data);
    const savedUser = await user.save();
    if (savedUser) {
      return {
        message: "Patient Created successfully",
        status: "done",
      };
    } else {
      return { message: "Something went wrong", status: "unDone" };
    }
  } catch (error) {
    throw new Error("Failed to create a user: " + error.message);
  }
};

const getPatientById = async (patientId) => {
  return await schema.patientSchema
    .findOne({ _id: patientId }, function (err, result) {
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

const updatePatientById = async (data) => {
  return await schema.patientSchema
    .updateOne({ _id: data._id }, { $set: data })
    .then((result) => {
      if (result) {
        return {
          message: "Patient Updated successfully",
          status: "done",
        };
      } else {
        return { message: "Something went wrong", status: "unDone" };
      }
    })
    .catch((err) => console.warn(err));
};

module.exports = {
  createNewPatient,
  getAllPatients,
  getPatientById,
  updatePatientById,
};
