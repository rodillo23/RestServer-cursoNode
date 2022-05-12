const Role = require("../models/role");

const esRoleValido = async (role = "") => {
  const existeRole = await Role.findOne({ role });
  if (!existeRole) {
    throw new Error(`${role} no es un role valido`);
  }
};

module.exports = {
  esRoleValido,
};
