const { Router } = require("express");
const { check } = require("express-validator");
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);

router.post(
  "/",
  [check("email", "El email no es válido").isEmail()],
  usuariosPost
);

router.put("/:id", usuariosPut);

router.delete("/", usuariosDelete);

module.exports = router;
