const express = require("express");
const cors = require("cors");

const user = require("../routes/usuarios");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Middlewares
    this.middlewares();
    //Rutas de mi app
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.static("public"));
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/api/usuarios", user);
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`Server escuchando en el puerto ${this.port}`)
    );
  }
}

module.exports = Server;
