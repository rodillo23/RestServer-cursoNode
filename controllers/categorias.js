const { request, response } = require("express");

const Categoria = require("../models/categoria");

const crearCategoria = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  const existeCategoria = await Categoria.findOne({ nombre });
  if (existeCategoria) {
    res.status(400).json({
      msg: `La categoria ${existeCategoria.nombre} ya existe en la Base de Datos`,
    });
  }

  const data = {
    nombre,
    usuario: req.usuarioAuth._id,
  };

  const categoria = new Categoria(data);
  await categoria.save();

  res.status(201).json({
    msg: "Categoria creada existosamente",
    categoria,
  });
};

module.exports = {
  crearCategoria,
};
