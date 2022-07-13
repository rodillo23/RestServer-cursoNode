const { request, response } = require("express");

const Producto = require("../models/producto");

const obtenerProductos = (req, res) => {
  res.send("Obtener Productos");
};

const obtenerProducto = (req, res) => {
  res.send("Obtener Producto");
};

const crearProducto = async (req, res) => {
  const { nombre, descripcion, precio, categoria } = req.body;

  const producto = new Producto({
    nombre,
    descripcion,
    precio,
    categoria,
    usuario: req.usuarioAuth._id,
  });

  await producto.save();
  res.status(200).json({
    msg: "Producto creado con Exito",
    producto,
  });
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
