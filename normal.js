const path = require("path");
const debug = require("debug");
const log = debug("myApp");
const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieSession({ secret: "aaaa", httpOnly: false, name: "aaaa" }));

app.use(
  "/static",
  express.static(path.join(__dirname, "./static"), { extensions: "html" })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", (req, res) => {
  const { username = "", password = "" } = req.body || {};
  if (username === "aaa" && password === "zzz") {
    req.session.isLogin = true;
    req.session.time = new Date().getTime();
    req.session.count = 100;
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.post("/is-login", (req, res) => {
  res.json({
    isLogin: !!req.session.isLogin,
    count: req.session.count || 0,
    time: req.session.time,
  });
});

app.post("/transfer", (req, res) => {
  const { amount = 1 } = req.body || {};
  const isLogin = !!req.session.isLogin;
  const count = (req.session.count || 0) * 1;
  if (isLogin && count >= amount * 1) {
    const aaa = count - amount * 1;
    req.session.count = aaa;
    res.json({
      time: req.session.time,
      count: aaa,
      success: true,
    });
  } else {
    res.json({ success: false });
  }
});

app.listen(8080, () => {
  log(`listening on http://localhost:8080`);
});
