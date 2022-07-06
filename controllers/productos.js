const { request, response } = require("express");

const obtenerProductos = (req, res) => {
  res.send("Obtener Productos");
};

const obtenerProducto = (req, res) => {
  res.send("Obtener Producto");
};

const crearProducto = (req, res) => {
  res.send("Crear Producto");
};

const actualizarProducto = (req, res) => {
  res.send("Actualizar Producto");
};

const eliminarProducto = (req, res) => {
  res.send("Eliminar Producto");
};

module.exports = {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};
