const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.json());
const cors = require("cors");
app.use(
  cors({
    origin: "*"
  })
);
app.use(express.urlencoded({ extended: true }));

require("dotenv").config();
const port = process.env.port;

function routeLife() {
  const routes = require("./app/route/index");
  routes.setUp(app);
}
routeLife();

app.get("/", (req, res) => {
  res.send("Shree ganeshay Namah");
});

app.listen(port, () => {
  console.log(`port running on port ${port}`);
});
