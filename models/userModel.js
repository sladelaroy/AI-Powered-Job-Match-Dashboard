import mongoose from "mongoose";

const userSchema = {
  name: "",
  email: "",
  password: "",
  skills: [], // Array of strings
};

export default userSchema;
