const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const models = require("./models");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const session = require("express-session");

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use("/", express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "Bigbang Blackpink Gfriend",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 800000
    }
  })
);

app.get("/", function(req, res) {
  res.render("index");
});

// LISTEN
app.listen(port, function() {
  console.log(`You are on the PORT: ${port}`);
});
