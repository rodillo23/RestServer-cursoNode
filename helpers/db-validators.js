const Categoria = require("../models/categoria");
const Producto = require("../models/producto");
const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRoleValido = async (role = "") => {
  const existeRole = await Role.findOne({ role });
  if (!existeRole) {
    throw new Error(`${role} no es un role valido`);
  }
};

//USUARIO

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

//CATEGORIA

const existeCategoriaPorId = async (id) => {
  const existe = await Categoria.findById(id);
  if (!existe) {
    throw new Error("La categoria no existe en la Base de Datos");
  }
};

//PRODUCTO
const existeProducto = async (nombre) => {
  const producto = await Producto.findOne({ nombre });
  if (producto) {
    throw new Error(
      `El producto ${nombre} ya se encuentra registrado en la Base de Datos`
    );
  }
};

const existeProductoPorId = async (id) => {
  const producto = await Producto.findById(id);
  if (!producto) {
    throw new Error(`El Producto no existe en la Base de Datos`);
  }
};

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
  existeCategoriaPorId,
  existeProducto,
  existeProductoPorId,
};
