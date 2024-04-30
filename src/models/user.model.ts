import { Schema, model } from "mongoose";
import { IUser } from "../typings/user.type";
import bcrypt from "bcrypt";
const schema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile_pic: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["SUPER_ADMIN", "ADMIN" , 'USER'],
      default: "USER",
    },
    isAcceptEmail: {
      type: Boolean,
      default: false
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// * Hash password
schema.pre("save", function (next) {
  try {
    this.password = bcrypt.hashSync(this.password, 12);
    next();
  } catch (error: any) {
    next(error);
  }
});

export default model("user", schema);
