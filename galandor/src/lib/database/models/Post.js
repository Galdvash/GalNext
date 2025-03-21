import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  createdByAdmin: { type: Boolean, default: true },
});

export const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

// מוודא שכל פוסט שנשמר נוצר על ידי אדמין
// PostSchema.pre("save", function (next) {
//   if (this.createdByAdmin !== true) {
//     return next(new Error("רק אדמין יכול ליצור פוסטים"));
//   }
//   next();
// });
