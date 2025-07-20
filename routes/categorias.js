import express from 'express';
import { connect } from '../db/database.js';

const router = express.Router();

// get todos os categorias
router.get('/', async (req, res) => {
    const db = await connect();
    const categorias = await db.all('SELECT * FROM categorias');
    res.json(categorias);
});

// metodo get para buscar um categoria pelo id
router.get('/:id', async (req, res) => {
    const db = await connect();
    const categorias = await db.get('SELECT * FROM categorias WHERE id =?', [req.params.id]);
    if (categoria) res.json(categoria);
    else res.status(404).json({ erro: 'Usuario nao encontrado'});
})

// post criar um categoria
router.post('/', async (req, res) => {
    const { nome, descricao } = req.body;
    const db = await connect();
    const result = await db.run('INSERT INTO categorias (nome, descricao) VALUES (?, ?)', [nome, descricao]);
    res.status(201).json({ id: result.lastID, nome, descricao });
});

// put atualizar categoria
router.put('/:id', async (req, res) => {
    const { nome, descricao } = req.body;
    const db = await connect();
    await db.run('UPDATE categorias SET nome = ?, descricao = ? WHERE id = ?', [nome, descricao, req.params.id]);
    res.json({ id: req.params.id, nome, descricao });
});

// deletar categoria
router.delete('/:id', async (req, res) => {
    const db = await connect();
    await db.run('DELETE FROM categorias WHERE id = ?', [req.params.id]);
    res.json({ mensagem: 'Usuario deletado com sucesso'});
});

export default router;