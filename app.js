const express = require('express');
const app = express();
const path = require('path');

const os = require('os');
const ifaces = os.networkInterfaces();

// Procura o primeiro endereço IPv4 não interno
let ipAddress = null;
Object.keys(ifaces).forEach((ifname) => {
  ifaces[ifname].forEach((iface) => {
    if (iface.family === 'IPv4' && !iface.internal) {
      ipAddress = iface.address;
      return;
    }
  });
  if (ipAddress) {
    return;
  }
});

// Libera o acesso à pasta public
app.use(express.static('public'));

const indexRouter = require('./routes/indexRoute');

// Configurando o EJS como view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Rotas
app.use('/', indexRouter);

// Inicializando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${ipAddress}:${PORT}`));
