const { request, response } = require("express");

const esAdminRole = (req = request, res = response, next) => {
  if (!req.usuarioAuth) {
    return res.status(500).json({
      msg: "No se ha validado token..",
    });
  }

  const { role, nombre } = req.usuarioAuth;

  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${nombre}, no tiene privilegios para realizar ésta operación`,
    });
  }

  next();
};

module.exports = esAdminRole;
