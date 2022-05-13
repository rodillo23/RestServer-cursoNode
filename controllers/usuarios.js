const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const usuariosGet = (req, res = response) => {
  const params = req.query;
  console.log(params);
  res.json({
    ok: true,
    message: "get API -> Controller",
  });
};

const usuariosPost = async (req = request, res = response) => {
  const { nombre, email, password, role } = req.body;
  const usuario = new Usuario({
    nombre,
    email,
    password,
    role,
    fecha_alta: new Date().toLocaleString(),
  });

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //guardar en BD

  await usuario.save();

  res.status(201).json({
    message: "Usuario creado exitosamente!",
    usuario,
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
