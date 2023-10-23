import { auth, createUser } from "../repository/user.js";

export const registration = async (req, res) => {
  const data = await createUser(req);
  res.status(data.status).json(data)
};

export const login = async (req, res) => {
  const data = await auth(req);
  res.status(data.status).json(data)
};
