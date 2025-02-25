import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    skills: {
      type: Array,
      default: []
    }
  },
  { timestamps: true, minimize: false } 
);


const User = mongoose.models.user || mongoose.model("user", UserSchema);
export default User;
