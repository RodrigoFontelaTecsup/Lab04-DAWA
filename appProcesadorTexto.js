const http = require('http');
const fs = require('fs');
const procesadorTexto = require('./procesadorTexto');

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/procesar') {
    if (req.method === 'GET') {
      fs.readFile('procesadorTexto.html', 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error interno del servidor');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data);
        }
      });
    } else if (req.method === 'POST' && req.url === '/procesar') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const parametros = new URLSearchParams(body);
        const texto = parametros.get('texto');
        const operacion = parametros.get('operacion');
        let resultado = '';

        switch (operacion) {
          case 'dividir':
            resultado = procesadorTexto.dividirPalabra(texto).join(' ');
            break;
          case 'extraer':
            break;
          case 'eliminarEspacios':
            resultado = procesadorTexto.eliminarEspacios(texto);
            break;
          case 'capitalizar':
            resultado = procesadorTexto.capitalizar(texto);
            break;
          case 'minusculas':
            resultado = procesadorTexto.aMinusculas(texto);
            break;
          case 'mayusculas':
            resultado = procesadorTexto.aMayusculas(texto);
            break;
          case 'contarCaracteres':
            resultado = procesadorTexto.contarCaracteres(texto).toString();
            break;
          default:
            resultado = 'Operación no válida';
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Resultado:</h1>');
        res.write(`<p>${resultado}</p>`);
        res.end();
      });
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Página no encontrada');
  }
});

server.listen(8080, () => {
  console.log('Servidor escuchando en el puerto 8080');
});
