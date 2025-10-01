import ServerBlog from "./server/config.js"
import { Server } from "socket.io";

import postRoutes from "./src/routes/posts.routes.js";
import commentRoutes from "./src/routes/comments.routes.js";

const serverBlog = new ServerBlog();
const app = serverBlog.getApp();
const httpServer = serverBlog.getHttpServer();

const io = new Server(httpServer, {
  cors: { origin: "*" }
});

// Rutas REST
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);


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

serverBlog.listen();