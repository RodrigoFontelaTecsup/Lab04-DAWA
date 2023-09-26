const http = require('http');
const fs = require('fs');
const calculadora = require('./calculadora');

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/calcular') {
    if (req.method === 'GET') {
      fs.readFile('calculadora.html', 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error interno del servidor');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data);
        }
      });
    } else if (req.method === 'POST' && req.url === '/calcular') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const parametros = new URLSearchParams(body);
        const num1 = parseFloat(parametros.get('num1'));
        const num2 = parseFloat(parametros.get('num2'));
        const operacion = parametros.get('operacion');
        let resultado;
        switch (operacion) {
          case 'sumar':
            resultado = calculadora.sumar(num1, num2);
            break;
          case 'restar':
            resultado = calculadora.restar(num1, num2);
            break;
          case 'multiplicar':
            resultado = calculadora.multiplicar(num1, num2);
            break;
          case 'dividir':
            resultado = calculadora.dividir(num1, num2);
            break;
          default:
            resultado = 'Operación no válida';
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Resultado:</h1>');
        res.write(`<p>${num1} ${operacion} ${num2} = ${resultado}</p>`);
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
