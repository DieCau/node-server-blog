import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import '../db/config.js';

export default class ServerBlog {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5000;
    this.httpServer = createServer(this.app);

    this.middlewares();
  }

  // middlewares
  middlewares() {
    this.app.use(cors()); // conexiones remotas
    this.app.use(express.json()); // interpreta datos json llegan en la solicitud
    this.app.use(morgan('dev'));

    const __dirname = dirname(fileURLToPath(import.meta.url));
    this.app.use(express.static(`${__dirname}/../public`));
  }

  getApp() {
    return this.app;
  }

  getHttpServer() {
    return this.httpServer;
  }

  listen(callback) {
    this.httpServer.listen(this.port, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${this.port}`);
      if (callback) callback();
    });
  }
}
