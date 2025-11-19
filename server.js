const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const useragent = require('express-useragent');
app.use(useragent.express());
// Aceita JSON (FETCH POST)
app.use(express.json());

// Aceita dados de formulários HTML
app.use(express.urlencoded({ extended: true }));

// Configura o EJS (se estiver usando)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
