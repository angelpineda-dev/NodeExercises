const express = require("express");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Middlewares
    this.middlewares();
    // Rutas de mi aplicacion
    this.routes();
  }

  middlewares() {
    // directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.get("/api", (req, res) => {
      res.send("Hello World");
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Corriendo en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;