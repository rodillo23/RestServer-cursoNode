const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const usuariosGet = async (req, res = response) => {
  const { desde = 0, limite = 10 } = req.query;

  const [count, usuarios] = await Promise.all([
    Usuario.countDocuments({ estado: true }),
    Usuario.find({ estado: true }).limit(limite).skip(desde),
  ]);

  res.json({
    count,
    usuarios,
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

const usuariosPut = async (req, res = response) => {
  const id = req.params.id;
  const { _id, password, google, email, ...data } = req.body;

  //validar BD
  if (password) {
    const salt = bcrypt.genSaltSync();
    data.password = bcrypt.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, data, { new: true });

  res.status(200).json({
    msg: "Actualizado con éxito",
    usuario,
  });
};

const usuariosDelete = async (req, res = response) => {
  const id = req.params.id;

  const usuario = await Usuario.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json(usuario);
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
};
