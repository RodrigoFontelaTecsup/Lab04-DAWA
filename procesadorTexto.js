function dividirPalabra(palabra) {
  return palabra.split('');
}

function extraerCadena(texto, inicio, fin) {
  return texto.slice(inicio, fin);
}

function eliminarEspacios(cadena) {
  return cadena.trim();
}

function capitalizar(cadena) {
  return cadena.charAt(0).toUpperCase() + cadena.slice(1);
}

function aMinusculas(cadena) {
  return cadena.toLowerCase();
}

function aMayusculas(cadena) {
  return cadena.toUpperCase();
}

function contarCaracteres(cadena) {
  return cadena.length;
}

module.exports = {
  dividirPalabra,
  extraerCadena,
  eliminarEspacios,
  capitalizar,
  aMinusculas,
  aMayusculas,
  contarCaracteres,
};
