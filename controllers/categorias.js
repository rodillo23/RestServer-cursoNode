const { request, response } = require("express");

const Categoria = require("../models/categoria");

//Obtener categorias - paginado - total - populate
const obtenerCategorias = async (req, res) => {
  const { desde, limite } = req.query;

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments({ estado: true }),
    Categoria.find({ estado: true })
      .skip(desde)
      .limit(limite)
      .populate("usuario", "nombre"),
  ]);

  res.status(200).json({
    total,
    categorias,
  });
};

//Obtener categoria - populate
const obtenerCategoriaPorId = async (req = request, res = response) => {
  const { id } = req.params;

  const categoria = await Categoria.findById(id).populate("usuario", "nombre");

  res.status(200).json({
    categoria,
  });
};

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

//actualizar categoria
const actualizarCategoria = async (req, res = response) => {
  const { id } = req.params;

  const nombre = req.body.nombre.toUpperCase();
  const categoria = await Categoria.findOne({ nombre });

  if (categoria) {
    return res.status(400).json({
      msg: `La categoria ${categoria.nombre} ya se encuentra registrada en la Base de Datos`,
    });
  }

  const categoriaActualizada = await Categoria.findByIdAndUpdate(
    id,
    { nombre },
    { new: true }
  ).populate("usuario", "nombre");

  res.status(200).json({
    msg: "Categoria actualizada con éxito",
    data: categoriaActualizada,
  });
};

//Borrar categoria - estado:false
const eliminarCategoria = async (req = request, res = response) => {
  const { id } = req.params;

  const deletedCat = await Categoria.findByIdAndUpdate(id, { estado: false });

  res.status(200).json({
    msg: `La categoria ${deletedCat.nombre} se ha eliminado con éxito`,
    data: deletedCat,
  });
};

module.exports = {
  obtenerCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
};
