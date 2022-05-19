const bcryptjs = require("bcryptjs");
const { request, response } = require("express");
const Usuario = require("../models/usuario");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    //Verificar si existe el email
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario/Password no son correctos -> correo",
      });
    }

    //Verificar si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario/Password no son correctos -> estado:false",
      });
    }

    //Verificar la contraseña
    const validPass = bcryptjs.compareSync(password, usuario.password);
    if (!validPass) {
      return res.status(400).json({
        msg: "Usuario/Pasword incorrectos -> Pass",
      });
    }

    res.json({
      msg: "Post -> login",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  login,
};
