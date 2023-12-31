import express from "express";
import { login, registration } from "../controller/user.js";
import {
  addPost,
  getAllPost,
  getPostById,
  getPostByUser,
  like,
  rating,
  views,
} from "../controller/post.js";
import { addComment, getByPostId } from "../controller/comment.js";
const routes = express.Router();

// User Authentication
routes.post("/user-registration", registration);
routes.post("/user-login", login);

// Post
routes.post("/add-post", addPost);
routes.get("/get-all-post", getAllPost);
routes.get("/get-all-post/:userId", getPostByUser);
routes.get("/get-post/:postId", getPostById);
routes.post("/like-post/:postId", like);
routes.post("/view-post/:postId", views);
routes.post("/rate-post/:postId", rating);

// Comment
routes.post("/add-comment/:postId", addComment);
routes.get("/get-comment/:postId", getByPostId);

export default routes;
