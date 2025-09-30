import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import "../db/config.js";

export default class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 5000;
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

    listen() {
        this.app.listen(this.port, () => {
            console.log(`El server ejecutandose en: http://localhost:${this.port}`)
        })
    }
}
