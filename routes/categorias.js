const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoriaPorId,
  actualizarCategoria,
  eliminarCategoria,
} = require("../controllers/categorias");
const { existeCategoriaPorId } = require("../helpers/db-validators");

const { validarCampos } = require("../middlewares/validar-campos");
const validarJWT = require("../middlewares/validar-JWT");
const { esAdminRole } = require("../middlewares/validar-roles");

const router = Router();

//Obtener todas las categorias - publico
router.get("/", obtenerCategorias);

//Obtener categoria por id - publico
router.get(
  "/:id",
  [
    check("id", "No es un Id Válido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  obtenerCategoriaPorId
);

//Crear categoria - privado - cualquier role con token
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre no es válido").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

//Actualizar categoria - privado - cualquier role con token
router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un Id válido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  actualizarCategoria
);

//Borrar una categoria - Admin
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un Id válido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  eliminarCategoria
);

module.exports = router;
