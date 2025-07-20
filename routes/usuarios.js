import express from 'express';
import { connect } from '../db/database.js';

const router = express.Router();

// get todos os usuarios
router.get('/', async (req, res) => {
    const db = await connect();
    const usuarios = await db.all('SELECT * FROM usuarios');
    res.json(usuarios);
});

// metodo get para buscar um usuario pelo id
router.get('/:id', async (req, res) => {
    const db = await connect();
    const usuario = await db.get('SELECT * FROM usuarios WHERE id =?', [req.params.id]);
    if (usuario) res.json(usuario);
    else res.status(404).json({ erro: 'Usuario nao encontrado'});
})

// post criar um usuario
router.post('/', async (req, res) => {
    const { nome, email, senha, role } = req.body;
    const db = await connect();
    const result = await db.run('INSERT INTO usuarios (nome, email, senha, role) VALUES (?, ?, ?, ?)', [nome, email, senha, role]);
    res.status(201).json({ id: result.lastID, nome, email, senha, role });
});

// put atualizar usuario
router.put('/:id', async (req, res) => {
    const { nome, email, senha } = req.body;
    const db = await connect();
    await db.run('UPDATE usuarios SET nome = ?, email = ?, senha = ?, role = ? WHERE id = ?', [nome, email, senha, role, req.params.id]);
    res.json({ id: req.params.id, nome, email, senha, role });
});

// deletar usuario
router.delete('/:id', async (req, res) => {
    const db = await connect();
    await db.run('DELETE FROM usuarios WHERE id = ?', [req.params.id]);
    res.json({ mensagem: 'Usuario deletado com sucesso'});
});

export default router;