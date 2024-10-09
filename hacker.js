const path = require("path");
const debug = require("debug");
const log = debug("myApp");
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World! I'm hacker.");
});

app.use(
  "/public",
  express.static(path.join(__dirname, "./public"), { extensions: "html" })
);

app.post("/is-login", async (req, res) => {
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:8080/is-login",
      headers: {
        cookie: req.headers["cookie"],
        referer: req.headers["referer"],
      },
    });
    res.status(response.status).send(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.post("/transfer", async (req, res) => {
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:8080/transfer",
      headers: {
        cookie: req.headers["cookie"],
        referer: req.headers["referer"],
      },
      data: req.body,
    });
    res.setHeader("set-cookie", response.headers["set-cookie"]).status(response.status).send(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.listen(8081, () => {
  log(`listening on http://localhost:8081`);
});
