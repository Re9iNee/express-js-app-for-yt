import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World whatever, something else");
});

const usersList = [
  {
    name: "John Doe",
    age: 26,
  },
  {
    name: "Jane",
    age: 64,
  },
];

app.get("/user", (req, res) => {
  res.status(200);
  res.send(usersList);
});

app.post("/user", async (req, res) => {
  const user = await req.body;

  usersList.push(user);

  res.status(200);
  res.send({ user, message: "OK", list: usersList });
});

app.put("/user", async (req, res) => {
  const requestUser = await req.body;

  const foundUser = usersList.find((u) => u.name === requestUser.name);
  if (!foundUser) {
    res.status(400);
    return res.send({ message: "The user doesn't exist", requestUser });
  }

  foundUser.age = requestUser.age;

  res.status(200);
  return res.send({ usersList, message: "OK", requestUser });
});

app.delete("/user/:name", (req, res) => {
  const name = req.params.name;
  try {
    const index = usersList.findIndex((u) => u.name === name);
    usersList.splice(index, 1);

    res.status(200);
    return res.send({ message: "Success", usersList });
  } catch (e) {
    console.info("Something gone wrong");
    res.status(400);
    res.send({
      usersList,
      deletionNameRequest: name,
      message: "Something's not working",
    });
  }
});

app.listen(6969, () => console.log("Server is running on port 6969"));
