import mongoose from "mongoose";
import { massege, statusCodes } from "../helper/constents/message.js";
import { commentModel } from "../model/comment.js";
import { isPostAlreadyExist } from "./post.js";
import moment from "moment";

const ObjectId = mongoose.Types.ObjectId;
const objectId = new ObjectId();

export const createComment = async (req, res) => {
  try {
    const commentData = {
      post_id: req.params.postId,
      comment: req.body.comment,
    };
    commentData.post_id = commentData.post_id.toString();
    const isExist = await isPostAlreadyExist(commentData.post_id);
    if (!isExist) {
      return {
        message: massege.POST_NOT_FOUND,
        status: statusCodes.BAD_REQUEST,
      };
    }

    let dataToSave = new commentModel(commentData);
    const response = await dataToSave.save();
    return {
      status: statusCodes.CREATED,
      massege: massege.SAVED_SUCCESSFULLY,
      data: response,
    };
  } catch (error) {
    console.log(error);
    return {
      status: statusCodes.INTERNAL_SERVER_ERROR,
      massee: massege.INTERNAL_SERVER_ERROR,
    };
  }
};

export const getById = async (req, res) => {
  try {
    const postId = req.params.postId;
    const where = {
      post_id: postId,
    };
    const count = await commentModel.countDocuments(where);
    const response = await commentModel.find(where);
    const data = response.map((item) => {
      return {
        user: item.user,
        dateTime: moment(item.created_at).format("MMMM Do YYYY, h:mm:ss a"),
        comment: item.comment,
      };
    });

    return {
      status: statusCodes.OK,
      massege: massege.FETCHED_SUCCESSFULLY,
      data: data,
      count: count,
    };
  } catch (error) {
    console.log(error);
    return {
      status: statusCodes.INTERNAL_SERVER_ERROR,
      massee: massege.INTERNAL_SERVER_ERROR,
    };
  }
};
