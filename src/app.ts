import "dotenv/config";
import Express from "express";
import { connectDatabase } from "./config/mongo.database.ts";

const express = Express;
const app = express();
const port = 3000;

connectDatabase();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});