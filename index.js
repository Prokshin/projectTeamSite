const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");
const hbs = require("hbs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const viewRouter = require("./routes/viewRoutes");
const projectRouter = require("./routes/projectsRoutes");
const teamRouter = require("./routes/userRoutes");
const newsRouter = require("./routes/newsRoutes");
const multer = require("multer");

dotenv.config({ path: "./config.env" });

app.use(bodyParser.json());
app.use(cookieParser());

const DB = process.env.DATABASE;
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/uploads/vacancy"));
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
app.use("/api/team", urlencodedParser, teamRouter);
app.use("/api/news", urlencodedParser, newsRouter);
app.listen(9000, function() {
  console.log("App work at 9000!");
});
