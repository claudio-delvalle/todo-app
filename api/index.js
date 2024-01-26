import express from "express";
import bodyParser from "body-parser";
import { v4 as uuid } from "uuid";
import http from "http";
import * as socketIO from "socket.io";
import mongoose from "mongoose";
import cors from "cors";

//Me conecto a MongoDB
mongoose.connect("mongodb://localhost:27017/todo-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
  console.error("Error en la conexion a MOngoDB", err.message);
});
//Creo la aplicacion express
const app = express();
//Creo un servidor http a partir de la aplicacion de express
const server = http.createServer(app);
//Creo un servidor Socket.IO a partir del servidor http
const io = new socketIO.Server(server);
const PORT = 3000;

//Inicio el servidor
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//Importo el modelo del TodoBd
import { TodoBd } from "./models/todo.js";

//escucho las conexiones de los clientes
io.on("connection", (socket) => {
  console.log("User connected", socket.id);
});

//BodyParser para parsear el cuerpo de las peticiones
app.use(cors(), bodyParser.json());

// TODO: Add API tests

// TODO: Install/Use CORS pakcage
// https://expressjs.com/en/resources/middleware/cors.html

// TODO: Implement real DB (Postgress, MongoDB, Subabase, etc.) DONE

//Metodo get en ruta vacia
app.get("/", (req, res) => {
  res.send("API Todos CRUD");
});
//Metodo get para obterner los todo de la bd
app.get("/todos", (req, res) => {
  TodoBd.find()
    .then((todosBd) => {
      res.json(todosBd);
    })
    .catch((err) => {
      console.error("Error getting todos from database: ", err);
      res.status(500).send();
    });
});

//Metodo Get para obtener todos por id
app.get("/todos/:id", (req, res) => {
  TodoBd.findById(req.params.id)
    .then((todoBd) => {
      if (todoBd == null) {
        res.status(500).send();
      } else {
        res.json(todoBd);
      }
    })
    .catch((err) => {
      console.log("Error getting todo by id from database: ", err);
      res.status(500).send();
    });
});

//Metodo Post para crear el todo y emitir el evento para su transmision,deberia tener validacines de que el body trae datos correctos para no almacenar basura en la BD
app.post("/todos", (req, res) => {
  const newTodoBd = new TodoBd({
    _id: uuid(),
    ...req.body,
  });
  newTodoBd
    .save()
    .then(() => {
      io.emit("new todo", newTodoBd);
      res.status(200).send();
    })
    .catch((err) => {
      console.error("Error saving new todo on database", err);
      res.status(500).send();
    });
});

//Metodo put para actualizar un todo
app.put("/todos/:id", (req, res) => {
  TodoBd.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      console.log("Error updating todo in database: ", err);
      res.status(500).send();
    });
});

//Metodo delete para eliminar un todo
app.delete("/todos/:id", (req, res) => {
  TodoBd.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).send();
    })
    .catch((error) => {
      console.error("Error deleting todo from database: ", err);
      res.status(500).send();
    });
});
export default server;
