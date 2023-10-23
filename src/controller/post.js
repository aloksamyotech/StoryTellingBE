import {
  addLike,
  addRating,
  addView,
  allPost,
  createPost,
  getById,
} from "../repository/post.js";

export const addPost = async (req, res) => {
  const data = await createPost(req);
  res.status(data.status).json(data);
};

export const getAllPost = async (req, res) => {
  const data = await allPost(req);
  res.status(data.status).json(data);
};

export const getByUserId = async (req, res) => {
  const data = await getById(req);
  res.status(data.status).json(data);
};

export const like = async (req, res) => {
  const data = await addLike(req);
  res.status(data.status).json(data);
};

export const views = async (req, res) => {
  const data = await addView(req);
  res.status(data.status).json(data);
};

export const rating = async (req, res) => {
  const data = await addRating(req);
  res.status(data.status).json(data);
};
