const connection = require('./database.js');

class User {
  async criarUsuario(nome, email, senha) {
    const query = `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`;
    await connection.execute(query, [nome, email, senha]);
  }

  async buscarUsuarios() {
    const query = `SELECT * FROM usuarios`;
    const [rows] = await connection.execute(query);
    return rows;
  }

  async buscarUsuarioId(id) {
    const query = `SELECT * FROM usuarios WHERE id = ?`;
    const [rows] = await connection.execute(query, [id]);
    return rows[0];
  }

  async atualizarUsuario(id, nome, email, senha) {
    const query = `UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?`;
    await connection.execute(query, [nome, email, senha, id]);
  }

  async deletarUsuario(id) {
    const query = `DELETE FROM usuarios WHERE id = ?`;
    await connection.execute(query, [id]);
  }
}

module.exports = User;