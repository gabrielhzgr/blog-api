import "dotenv/config";
import { configDotenv } from "dotenv";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hola");
});

const port = process.env.PORT;
app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`App listening on port ${port}`);
});
