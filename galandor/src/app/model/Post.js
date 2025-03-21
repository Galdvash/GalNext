import mongoose from "mongoose";
const { Schema } = mongoose;

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  createdByAdmin: { type: Boolean, default: true },
});

// מוודא שכל פוסט שנשמר נוצר על ידי אדמין
PostSchema.pre("save", function (next) {
  if (this.createdByAdmin !== true) {
    return next(new Error("רק אדמין יכול ליצור פוסטים"));
  }
  next();
});

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
export default Post;
