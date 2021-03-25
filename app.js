const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const articleRouter = require("./routes/article");
const articleModel = require("./models/article");
const methodOverride = require("method-override");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

mongoose
   .connect("mongodb://localhost/testing", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
   })
   .then((result) => {
      console.log("Connected to the database");
   })
   .catch((err) => {
      console.log(err);
   });

app.use("/article", articleRouter);

app.get("/", (req, res) => {
   const article = articleModel
      .find()
      .sort({ createdAt: "desc" })
      .then((result) => {
         res.render("index", { article: result });
      })
      .catch((err) => {
         console.log(err);
      });
});

app.listen(4000, () => {
   console.log("Now listening on port 4000");
});
