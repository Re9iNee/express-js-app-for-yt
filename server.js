import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World whatever, something else");
});

// get, post, put delete patch head options...
// CRUD
// Create, Read, Update, Delete

app.listen(6969, () => console.log("Server is running on port 6969"));
