const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const User = require('./user.model');
const user = new User();

router.post('/criar', async (req, res) => {
  const { nome, email, senha } = req.body;
  await user.criarUsuario(nome, email, senha);
  res.send({ mensagem: 'Usuário criado com sucesso!' });
});

router.get('/buscar', async (req, res) => {
  const usuarios = await user.buscarUsuarios();
  res.send(usuarios);
});

router.get('/buscar/:id', async (req, res) => {
  const id = req.params.id;
  const usuario = await user.buscarUsuarioId(id);
  res.send(usuario);
});

router.put('/atualizar/:id', async (req, res) => {
  const id = req.params.id;
  const { nome, email, senha } = req.body;
  await user.atualizarUsuario(id, nome, email, senha);
  res.send({ mensagem: 'Usuário atualizado com sucesso!' });
});

router.delete('/deletar/:id', async (req, res) => {
  const id = req.params.id;
  await user.deletarUsuario(id);
  res.send({ mensagem: 'Usuário deletado com sucesso!' });
});
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const usuario = await user.buscarUsuarioEmail(email);

  if (!usuario) {
    return res.status(401).send({ mensagem: 'Usuário não encontrado' });
  }

  const isValid = await user.verificarSenha(senha, usuario.senha);

  if (!isValid) {
    return res.status(401).send({ mensagem: 'Senha inválida' });
  }

  const token = jwt.sign({ id: usuario.id }, process.env.SECRET_KEY="AMItaf2024", {
    expiresIn: '1h',
  });

  res.send({ token });
});


module.exports = router;
