import moment from "moment";
import { massege, statusCodes } from "../helper/constents/message.js";
import { postModel } from "../model/post.js";

export const isPostAlreadyExist = async (postId) => {
  const where = {
    _id: postId,
  };
  const count = await postModel
    .countDocuments(where)
    .select({ _id: 1 })
    .limit(1);

  return count > 0;
};
export const createPost = async (req, res) => {
  try {
    const postData = {
      user_id: req.body.userId,
      title: req.body.title,
      story: req.body.story,
      tags: req.body.tags,
    };

    let dataToSave = new postModel(postData);
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

export const allPost = async () => {
  try {
    const count = await postModel.countDocuments();
    const response = await postModel.find();

    const mydata = postModel.aggregate([{
      
    }])

    const data = response.map((item) => {
      return {
        title: item.title,
        story: item.story,
        story20: item.story.slice(0, 200),
        tags: item.tags.split(","),
        created_at: moment(item.created_at).format("l"),
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

export const getById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const where = {
      user_id: userId,
    };
    const count = await postModel.countDocuments(where);
    const response = await postModel.find(where);
    return {
      status: statusCodes.OK,
      massege: massege.FETCHED_SUCCESSFULLY,
      data: response,
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

export const addLike = async (req, res) => {
  try {
    const postId = req.params.postId;

    const isExist = await isPostAlreadyExist(postId);
    if (!isExist) {
      return {
        message: massege.POST_NOT_FOUND,
        status: statusCodes.BAD_REQUEST,
      };
    }
    const where = {
      _id: postId,
    };
    const updatedPost = await postModel.findOneAndUpdate(
      where,
      { $inc: { like: 1 } },
      { new: true }
    );
    return {
      status: statusCodes.CREATED,
      massege: massege.LIKED_SUCCESSFULLY,
      data: updatedPost,
    };
  } catch (error) {
    console.log(error);
    return {
      status: statusCodes.INTERNAL_SERVER_ERROR,
      massee: massege.INTERNAL_SERVER_ERROR,
    };
  }
};

export const addView = async (req, res) => {
  try {
    const postId = req.params.postId;

    const isExist = await isPostAlreadyExist(postId);
    if (!isExist) {
      return {
        message: massege.POST_NOT_FOUND,
        status: statusCodes.BAD_REQUEST,
      };
    }
    const where = {
      _id: postId,
    };
    const updatedPost = await postModel.findOneAndUpdate(
      where,
      { $inc: { views: 1 } },
      { new: true }
    );
    return {
      status: statusCodes.CREATED,
      massege: massege.VIEWED_SUCCESSFULLY,
      data: updatedPost,
    };
  } catch (error) {
    console.log(error);
    return {
      status: statusCodes.INTERNAL_SERVER_ERROR,
      massee: massege.INTERNAL_SERVER_ERROR,
    };
  }
};

export const addRating = async (req, res) => {
  try {
    const postId = req.params.postId;
    const rating = req.body.rating;

    const isExist = await isPostAlreadyExist(postId);
    if (!isExist) {
      return {
        message: massege.POST_NOT_FOUND,
        status: statusCodes.BAD_REQUEST,
      };
    }
    const where = {
      _id: postId,
    };
    const updatedPost = await postModel.findOneAndUpdate(
      where,
      { $inc: { rating_count: 1 } },
      { new: true }
    );

    const totalRating =
      (updatedPost.rating_count - 1) * updatedPost.rating_avg + rating;
    const averageRating = totalRating / updatedPost.rating_count;
    updatedPost.rating_avg = averageRating.toFixed(1);
    await updatedPost.save();

    return {
      status: statusCodes.CREATED,
      massege: massege.RATED_SUCCESSFULLY,
    };
  } catch (error) {
    console.log(error);
    return {
      status: statusCodes.INTERNAL_SERVER_ERROR,
      massee: massege.INTERNAL_SERVER_ERROR,
    };
  }
};
