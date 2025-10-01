import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model('post', postSchema);

export default Post;
