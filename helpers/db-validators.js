const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRoleValido = async (role = "") => {
  const existeRole = await Role.findOne({ role });
  if (!existeRole) {
    throw new Error(`${role} no es un role valido`);
  }
};

const emailExiste = async (email) => {
  const existeEmail = await Usuario.findOne({ email });
  if (existeEmail) {
    throw new Error("El correo ya esta registrado en la BD");
  }
};

const existeUsuarioPorId = async (id) => {
  const existe = await Usuario.findById(id);
  if (!existe) {
    throw new Error("El usuario no existe en la BD");
  }
};

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
};
