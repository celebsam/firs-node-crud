const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: true,
      },
      description: {
         type: String,
         required: true,
      },
      mark: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
