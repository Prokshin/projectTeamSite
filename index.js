const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");
const hbs = require("hbs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const viewRouter = require("./routes/viewRoutes");
const projectRouter = require("./routes/projectsRoutes");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(con => console.log("DB connection successful"));

app.engine(
  "hbs",
  expressHbs({
    layoutsDir: "./views/layouts",
    defaultLayout: "layout",
    extname: "hbs"
  })
);

app.set("view engine", "hbs");

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use("/", viewRouter);
app.use("/api/projects", urlencodedParser, projectRouter);

app.listen(9000, function() {
  console.log("App work at 9000!");
});
