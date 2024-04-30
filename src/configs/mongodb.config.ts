import mongoose from "mongoose";

export default (async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Mongodb database connected successfully");
  } catch (error: any) {
    console.log("Mongodb connection error", error);
  }
})();
