const express = require("express");
const cors = require("cors");
require("dotenv").config(); //load env files

app.use(cors()); // enable cors

const port = process.env.PORT || 4000;
const app = express();

app.use(express.json()); // parse application/json

app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

app.listen(port, () => console.log(`app is running on port ${port}`));
