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
router.put("/:id", actualizarProducto);
router.delete("/:id", eliminarProducto);

module.exports = router;
