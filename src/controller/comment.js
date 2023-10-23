import {  createComment, getById } from "../repository/comment.js";

export const addComment = async (req, res) => {
    const data = await createComment(req);
    res.status(data.status).json(data);
  };

  export const getByPostId = async (req, res) => {
    const data = await getById(req);
    res.status(data.status).json(data);
  };