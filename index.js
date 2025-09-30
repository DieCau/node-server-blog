import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from 'morgan';
import dotenv from "dotenv";
import http from "http";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { Server } from "socket.io";

import postRoutes from "./src/routes/posts.routes.js";
import commentRoutes from "./src/routes/comments.routes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(`${__dirname}/public`));

// Rutas REST
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// Conectar MongoDB
mongoose.connect(process.env.MONGO_DB)
  .then(() => console.log("✅ MongoDB Atlas conectado"))
  .catch(err => console.error("❌ Error MongoDB:", err));

// WebSockets
io.on("connection", (socket) => {
  console.log("🔗 Usuario conectado:", socket.id);

  socket.on("newComment", (comment) => {
    console.log("💬 Nuevo comentario recibido:", comment);
    // Emitir a todos los clientes
    io.emit("receiveComment", comment);
  });

  socket.on("disconnect", () => {
    console.log("❌ Usuario desconectado:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));