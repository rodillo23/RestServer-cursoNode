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

const obtenerProducto = async (req, res) => {
  const { id } = req.params;

  const producto = await Producto.findById(id).populate("categoria", "nombre");

  res.status(200).json({
    producto,
  });
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

const actualizarProducto = async (req, res) => {
  const { id } = req.params;

  const { nombre, categoria, descripcion, precio } = req.body;

  const newProduct = await Producto.findByIdAndUpdate(
    id,
    { nombre, categoria, descripcion, precio, usuario: req.usuarioAuth._id },
    { new: true }
  ).populate("categoria", "nombre");

  res.status(200).json({
    msg: "Producto actualizado exitosamente!",
    newProduct,
  });
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
