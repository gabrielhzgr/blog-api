import "dotenv/config";
import express from "express";
import routes from "./routes/index.js";

const app = express();

app.get("/api", (req, res) => {
  res.send("Hola");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/posts", routes.posts);
app.use("/api/users", routes.users);
app.use("/api/comments", routes.comments);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.errorMessage || "Internal server error";
  console.log(err);
  res.status(statusCode).json({ error: message });
});

const port = process.env.PORT;
app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`App listening on port ${port}`);
});
