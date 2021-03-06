const express = require("express");
const con = require("./db/sql");
const app = express();
const userRouter = require("./router/user");
var cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const bodyparser = require("body-parser");

const port = process.env.PORT || 3003;
app.use(bodyparser.json());
app.use(userRouter);
app.listen(port, () => {
  console.log("server is open on port" + port);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
