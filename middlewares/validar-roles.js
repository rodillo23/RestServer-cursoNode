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

const tieneRole = (...roles) => {
  return (req = request, res = response, next) => {
    const usuario = req.usuarioAuth.role;
    console.log(usuario);
    if (!req.usuarioAuth) {
      return res.status(500).json({
        msg: "No se ha validado token..",
      });
    }

    if (!roles.includes(req.usuarioAuth.role)) {
      return res.status(401).json({
        msg: "El usuario no tiene permiso para realizar la eliminacion -> No tiene role válido",
      });
    }
    next();
  };
};

module.exports = {
  esAdminRole,
  tieneRole,
};
