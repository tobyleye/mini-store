require("dotenv").config(); //load env files
const express = require("express");
const cors = require("cors");
const auth = require("./auth");
const middleware = require("./middleware");

const port = process.env.PORT || 4000;
const app = express();

app.use(cors()); // enable cors
app.use(express.json()); // parse application/json

app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});
app.post("/login", auth.login);
app.post("/register", auth.register);

app.use(middleware.notFound);
app.use(middleware.handleError);

app.listen(port, () => console.log(`app is running on port ${port}`));
