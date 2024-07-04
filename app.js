import { getDb, connectionToDb } from "./db.js";
import express from "express";
const app = express();
app.use(express.json());
let db;
const startDb = async () => {
  try {
    await connectionToDb();
    app.listen(5000, () => {
      console.log("app is listening on port 5000");
    });
    db = getDb();
  } catch (err) {
    console.log("server is not loading");
    throw err;
  }
};
app.post("/books", async (req, res) => {
  try {
    const reqData = req.body;
    const book = await db.collection("books").insertOne(reqData);
    res.status(201).json(book);
  } catch (err) {
    res.status(500);
  }
});

app.put("/books/:id", async (req, res) => {
  try {
    const reqData = req.body;
    const reqId = parseInt(req.params.id);
    const book = await db
      .collection("books")
      .updateOne({ id: reqId }, { $set: reqData });
    res.status(200).json(book);
  } catch (err) {
    res
      .status(404)
      .json({ message: `book with id: ${req.params.id} was not found` });
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const reqId = parseInt(req.params.id);
    const book = await db.collection("books").findOne({ id: reqId });
    if (book == null) {
      throw err;
    }
    res.status(201).json(book);
  } catch (err) {
    res
      .status(404)
      .json({ message: `book with id: ${req.params.id} was not found` });
  }
});

app.get("/books", async (req, res) => {
  try {
    const book = await db.collection("books").find().sort({ id: 1 }).toArray();

    res.status(201).json({ books: book });
  } catch (err) {
    res.status(404);
  }
});

startDb();
