import { afterAll, beforeAll, expect, expectTypeOf, test } from "vitest";
import request from "supertest";
import server from "./index.js";
import { v4 as uuid } from "uuid";

async function connectToDatabase() {
  const MongoClient = require("mongodb").MongoClient;

  const url = "mongodb://localhost:27017";
  const dbName = "todo-app";

  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db(dbName);

  return db;
}

test("GET /", async ({}) => {
  const response = await request(server).get("/");
  expect(response.status).toBe(200);
  expect(response.text).toBe("API Todos CRUD");
});

test("GET /todos", async ({}) => {
  const response = await request(server).get("/todos");
  expect(response.status).toBe(200);
  expectTypeOf(response).toBeArray();
});

beforeAll(async () => {
  const db = await connectToDatabase();
  await db.collection("todobds").insertOne({
    _id: uuid(),
    title: "PruebaTest",
    description: "",
    dueDate: "",
    complete: false,
  });
});

test("GET /todos/:id", async ({}) => {
  const db = await connectToDatabase();
  const insertedObject = await db
    .collection("todobds")
    .findOne({ title: "PruebaTest" });
  const uuid = insertedObject._id;

  const response = await request(server).get(`/todos/${uuid}`);
  expect(response.status).toBe(200);

  const responseErr = await request(server).get("/todos/5");
  expect(responseErr.status).toBe(500);
});

test("POST /todos", async ({}) => {
  const response = await request(server).post("/todos").send({
    title: "PruebaPost",
    description: "",
    dueDate: "",
    complete: false,
  });
  expect(response.status).toBe(200);
});

test("PUT /todos/:id", async ({}) => {
  const db = await connectToDatabase();
  const insertedObject = await db
    .collection("todobds")
    .findOne({ title: "PruebaPost" });
  const uuid = insertedObject._id;

  const response = await request(server).put(`/todos/${uuid}`).send({
    title: "PruebaPut",
    description: "",
    dueDate: "",
    complete: true,
  });
  expect(response.status).toBe(200);
});

test("DELETE /todos/:id", async ({}) => {
  const db = await connectToDatabase();
  const insertedObject = await db
    .collection("todobds")
    .findOne({ title: "PruebaPut" });
  const uuid = insertedObject._id;

  const response = await request(server).delete(`/todos/${uuid}`);
  expect(response.status).toBe(200);
});

afterAll(async () => {
  const db = await connectToDatabase();
  await db.collection("todobds").deleteOne({ title: "PruebaTest" });
});
