const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

// Health check do ALB (na raiz, sem prefixo e sem consultar o banco)
app.get('/health', (req, res) => res.sendStatus(200));

// Todas as rotas da API ficam sob /api (ex.: GET /api/book)
app.use('/api', routes);

const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => {
  console.log(`API rodando na porta ${port}`);
});