import express from 'express';
import routes from './routes.js';
import path from 'path';
import cors from 'cors';
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

// acesso de arquivos estaticos, 'uploads' seria uma pasta
app.use('/uploads', express.static(path.resolve('__dirname', '..', 'uploads')));

let port = process.env.PORT;
if (port == null || port == "") {
    port = '3333';
}

app.listen(port);