const { Router } = require("express");
const { check } = require("express-validator");
const {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} = require("../controllers/productos");
const {
  existeCategoriaPorId,
  existeProducto,
  existeProductoPorId,
} = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const validarJWT = require("../middlewares/validar-JWT");
const { esAdminRole } = require("../middlewares/validar-roles");
const router = Router();

router.get("/", obtenerProductos);

router.get(
  "/:id",
  [
    check("id", "El Id no es válido").isMongoId(),
    validarCampos,
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  obtenerProducto
);
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("nombre").custom(existeProducto),
    check("categoria", "La categoria no es válida").isMongoId(),
    validarCampos,
    check("categoria").custom(existeCategoriaPorId),
    validarCampos,
  ],
  crearProducto
);
router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un Id válido").isMongoId(),
    validarCampos,
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  actualizarProducto
);
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un Id válido").isMongoId(),
    validarCampos,
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  eliminarProducto
);

module.exports = router;
