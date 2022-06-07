const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  //verificar que se recibio jwt
  if (!token) {
    return res.status(401).json({
      msg: "No se recibio token en la peticion",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const usuario = await Usuario.findById(uid);
    //validar que exista el usuario
    if (!usuario) {
      return res.status(401).json({
        msg: "Token no válido -> usuario no existe en DB",
      });
    }
    //verificar si tiene estado true
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token no válido -> usuario con estado false",
      });
    }
    req.usuarioAuth = usuario;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

module.exports = validarJWT;
