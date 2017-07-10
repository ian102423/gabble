const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const session = require("express-session");
const models = require("./models");
const welcomeRoutes = require("./routes/welcomeRoutes");
const homeRoutes = require("./routes/homeRoutes");
const authRoutes = require("./routes/authRoutes");
const likeRoutes = require("./routes/likeRoutes");
const gabRoutes = require("./routes/gabRoutes");
const port = process.env.PORT || 8080;

// SET VIEW ENGINE
app.engine("mustache", mustacheExpress());
app.set("views", "./public");
app.set("view engine", "mustache");
app.use("/", express.static("./public"));
app.use((req, res, next) => {
  try {
    console.log(req.session.user);
  } catch (err) {}
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "Bigbang Blackpink Gfriend",
    resave: true,
    saveUninitialized: true,
    cookies: {
      maxAge: 900000
    }
  })
);
app.use("/welcome", welcomeRoutes);
app.use("/", homeRoutes);
app.use("/auth", authRoutes);
app.use("/likes", likeRoutes);
app.use("/gabs", gabRoutes);

// LISTEN
app.listen(port, function() {
  console.log(`You are on the PORT: ${port}.`);
});
