const { response, request } = require("express");

const usuariosGet = (req, res = response) => {
  const params = req.query;
  console.log(params);
  res.json({
    ok: true,
    message: "get API -> Controller",
  });
};

const usuariosPost = (req = request, res = response) => {
  const { nombre, edad } = req.body;

  res.status(201).json({
    ok: true,
    message: "post API -> Controller",
    nombre,
    edad,
  });
};

const usuariosPut = (req, res = response) => {
  const id = req.params.id;
  res.status(400).json({
    ok: true,
    message: "put API -> Controller",
    id,
  });
};

const usuariosDelete = (req, res = response) => {
  res.json({
    ok: true,
    message: "delete API -> Controller",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
};
