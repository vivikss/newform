const express = require('express');
const app = express();
const userRoute = require('./user.route');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { authenticate, login } = require('./controllers/authController');


app.use(express.json());
app.use('/api/usuarios', userRoute);

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});

router.post('/login', login);
router.get('/protected', authenticate, (req, res) => {

});