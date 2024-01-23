import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
import { v4 as uuid } from "uuid";

// TODO: Add API tests
const app = express();
// TODO: Install/Use CORS pakcage
// https://expressjs.com/en/resources/middleware/cors.html

// TODO: Implement real DB (Postgress, MongoDB, Subabase, etc.)
app.use(bodyParser.json());

// TODO: Isolate into dbService
const readData = () => {
  try {
    const data = fs.readFileSync("./todoDb.json");
    return JSON.parse(data);
  } catch {
    console.log(error);
  }
};
// TODO: Isolate into dbService
const writeData = (data) => {
  try {
    fs.writeFileSync("./todoDb.json", JSON.stringify(data));
  } catch {
    console.log(error);
  }
};

app.get("/", (req, res) => {
  res.send("API Todos CRUD");
});

app.get("/todos", (req, res) => {
  const data = readData();
  res.json(data.Todos);
});

app.get("/todos/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const todo = data.Todos.find((todo) => todo.id === id);
  res.json(todo);
});

app.post("/todos", (req, res) => {
  const data = readData();
  const body = req.body;
  if (body.dueDate) {
    const date = new Date(body.dueDate);
    body.dueDate = date.toISOString().slice(0, 10);
  }
  const newTodo = {
    id: uuid(),
    ...body,
  };
  data.Todos.push(newTodo);
  writeData(data);
  res.json(newTodo);
});

app.put("/todos/:id", (req, res) => {
  const data = readData();
  const body = req.body;
  const id = req.params.id;
  const todoIndex = data.Todos.findIndex((todo) => todo.id === id);
  if (todoIndex !== -1) {
    data.Todos[todoIndex] = {
      ...data.Todos[todoIndex],
      ...body,
    };
    writeData(data);
    res.json({ message: "Todo updated succesfully" });
  } else {
    res.json({ message: "Todo not found" });
  }
});

app.delete("/todos/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id).toString();
  const todoIndex = data.Todos.findIndex((todo) => todo.id === id);
  if (todoIndex !== -1) {
    data.Todos.splice(todoIndex, 1);
    writeData(data);
    res.json({ message: "Todo deleted" });
  } else {
    res.json({ message: "Todo not found" });
  }
});

app.listen(3000, () => {
  console.log("Server listening in port 3000");
});
