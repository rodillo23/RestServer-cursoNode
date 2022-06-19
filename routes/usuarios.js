const { Router } = require("express");
const { check } = require("express-validator");

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuarioPorId,
  usuarioPorNombre,
} = require("../controllers/usuarios");

const {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
} = require("../helpers/db-validators");

const { validarCampos } = require("../middlewares/validar-campos");
const validarJWT = require("../middlewares/validar-JWT");
const { esAdminRole, tieneRole } = require("../middlewares/validar-roles");

const router = Router();

router.get("/", usuariosGet);

router.get(
  "/:id",
  [check("id", "No es un id válido").isMongoId(), validarCampos],
  usuarioPorId
);

//router.get("/:coleccion/:termino", usuarioPorNombre);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe tener minimo 6 caracteres").isLength({
      min: 6,
    }),
    check("email", "El email no es válido").isEmail(),
    check("email").custom(emailExiste),
    check("role").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPost
);

router.put(
  "/:id",
  [
    check("id", "No es un Id válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("role").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPut
);

router.delete(
  "/:id",
  [
    validarJWT,
    tieneRole("ADMIN_ROLE", "USER_ROLE"),
    //esAdminRole,
    check("id", "No es un Id válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
