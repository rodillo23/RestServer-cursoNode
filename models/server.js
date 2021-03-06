const express = require("express");
const cors = require("cors");

const users = require("../routes/usuarios");
const auth = require("../routes/auth");
const categories = require("../routes/categorias");
const productos = require("../routes/productos");

const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //conectar BD
    this.conectarDB();
    //Middlewares
    this.middlewares();
    //Rutas de mi app
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.static("public"));
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/api/auth", auth);
    this.app.use("/api/usuarios", users);
    this.app.use("/api/categorias", categories);
    this.app.use("/api/productos", productos);
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`Server escuchando en el puerto ${this.port}`)
    );
  }
}

module.exports = Server;
