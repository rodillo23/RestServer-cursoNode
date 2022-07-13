const { request, response } = require("express");

const Producto = require("../models/producto");

const obtenerProductos = async (req, res) => {
  const { desde = 0, limite = 10 } = req.query;
  const [total, productos] = await Promise.all([
    Producto.countDocuments({ estado: true }),
    Producto.find()
      .populate("categoria", "nombre")
      .populate("usuario", "nombre")
      .skip(desde)
      .limit(limite),
  ]);

  res.status(200).json({
    total,
    productos,
  });
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
  res.status(201).json({
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
