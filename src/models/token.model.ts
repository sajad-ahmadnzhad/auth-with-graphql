import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    userId: {
      type: Schema.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
    token: { type: String, required: true },
    createdAt: { type: Date, expires: "10m", default: Date.now },
  },
  { versionKey: false }
);

export default model("token", schema);
