import bcrypt from "bcrypt";
import moment from "moment";
import { statusCodes } from "../helper/constents/message.js";
import { massege } from "../helper/constents/message.js";
import { userModel } from "../model/user.js";
import "dotenv/config.js";

const isUserAlreadyExist = async (email) => {
  const where = {
    email: email,
  };
  const count = await userModel
    .countDocuments(where)
    .select({ _id: 1 })
    .limit(1);

  return count > 0;
};

export const createUser = async (req, res) => {
  try {
    const userData = {
      name: req.body.name,
      age: req.body?.age,
      gender: req.body?.gender,
      email: req.body.email,
      password: req.body.password,
    };

    const isExist = await isUserAlreadyExist(userData.email);
    if (isExist) {
      return {
        message: massege.ALREADY_EXIST,
        status: statusCodes.BAD_REQUEST,
      };
    }

    const salt = bcrypt.genSaltSync(Number(process.env.SALT));
    userData.password = await bcrypt.hashSync(userData.password, salt);

    const dataToSave = new userModel(userData);
    await dataToSave.save();

    return {
      message: massege.REGISTRATION_SUCCESSFULL,
      status: statusCodes.CREATED,
    };
  } catch (error) {
    console.error(error);
    return {
      status: statusCodes.INTERNAL_SERVER_ERROR,
      message: massege.INTERNAL_SERVER_ERROR,
    };
  }
};

export const auth = async (req, res) => {
  try {
    const authData = {
      email: req.body.email,
      password: req.body.password,
    };
    const isExist = await isUserAlreadyExist(authData.email);
    if (!isExist) {
      return {
        message: massege.WRONG_EMAIL,
        status: statusCodes.OK,
      };
    }

    const where = {
      email: req.body.email,
    };
    const response = await userModel.find(where);
    if (await bcrypt.compare(authData.password, response[0].password)) {
      let responseToSend = response.map((item) => {
        return {
          _id: item._id,
          name: item.name,
          age: item.age,
          gender: item.gender,
          email: item.email,
          registrationDate: moment(item.created_at).format("l"),
        };
      });
      return {
        message: massege.LOGIN_SUCCESSFULLY,
        status: statusCodes.OK,
        data: responseToSend,
      };
    } else {
      return {
        message: massege.WRONG_PASSWORD,
        status: statusCodes.OK,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: statusCodes.INTERNAL_SERVER_ERROR,
      message: massege.INTERNAL_SERVER_ERROR,
    };
  }
};
