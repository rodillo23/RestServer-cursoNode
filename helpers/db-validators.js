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

module.exports = {
  esRoleValido,
  emailExiste,
};
