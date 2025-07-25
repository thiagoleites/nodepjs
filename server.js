import express from 'express';
import usuariosRouter from './routes/usuarios.js';
import categoriasRouter from './routes/categorias.js';
import { connect } from './db/database.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/usuarios', usuariosRouter);
app.use('/categorias', categoriasRouter);


app.listen(PORT, async () => {

    const db = await connect();

    // await db.exec(`
    //     DROP TABLE IF EXISTS usuarios;
    //     DROP TABLE IF EXISTS categorias;
    // `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            senha TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'user',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT usuarios_email_unique UNIQUE (email)
        )
    `);
    await db.exec(`
        CREATE TABLE IF NOT EXISTS categorias (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            descricao TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
    console.log('Banco de dados conectado com sucesso');
})