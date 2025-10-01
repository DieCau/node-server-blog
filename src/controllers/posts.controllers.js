import Post from "../models/Post.js";
import { z } from "zod";

// Esquema Zod para validación
const postSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  mainImage: z.string().min(1, "La imagen principal es obligatoria"),
  secondaryImage: z.string().min(1, "La imagen secundaria es obligatoria"),
  date: z.string().min(1, "La fecha es obligatoria"),
  description: z.string().min(20, "La descripción debe tener al menos 20 caracteres"),
  author: z.string().min(1, "El autor es obligatorio")
});

// Obtener posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear post con validación Zod
export const createPost = async (req, res) => {
  try {
    // Validación
    const validatedData = postSchema.parse(req.body);

    const newPost = new Post(validatedData);
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (err) {
    if (err.name === "ZodError") {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ error: err.message });
  }
};
