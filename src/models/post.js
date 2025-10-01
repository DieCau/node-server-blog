import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  mainImage: { 
    type: String, 
    required: true 
  },
  secondaryImage: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  description: { 
    type: String, 
    required: true, 
    minlength: 20 
  },
  author: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});


// ✅ Getter para formatear la fecha antes de enviarla al frontend
postSchema.set("toJSON", {
  transform: (doc, ret) => {
    if (ret.date) {
      const opciones = { day: "numeric", month: "long", year: "numeric" };
      ret.date = new Date(ret.date).toLocaleDateString("es-ES", opciones);
    }
    return ret;
  }
});

const Post = mongoose.model("Post", postSchema);

export default Post;
