const express = require("express");
const articleModel = require("../models/article");

const router = express.Router();

router.get("/", (req, res) => {
   res.render("article");
});

router.post("/", (req, res) => {
   const article = new articleModel({
      title: req.body.title,
      description: req.body.description,
      mark: req.body.mark,
   });

   article
      .save()
      .then((result) => {
         res.redirect(`/article/${result._id}`);
      })
      .catch((err) => {
         console.log(err);
      });
});

router.delete("/delete/:id", (req, res) => {
   const remove = articleModel
      .findByIdAndDelete(req.params.id)
      .then((result) => {
         res.redirect("/");
      })
      .catch((err) => {
         console.log(err);
      });
});

router.put("/:id", (req, res) => {
   articleModel.findByIdAndUpdate(
      req.params.id,
      {
         title: req.body.title,
         description: req.body.description,
         mark: req.body.mark,
      },
      (err, result) => {
         if (err) {
            console.log(err);
         } else {
            res.redirect("/");
         }
      }
   );
});

router.get("/edit/:id", (req, res) => {
   const article = articleModel.findById(req.params.id, (err, result) => {
      if (err) {
         console.log(err);
      } else {
         res.render("edit", { article: result });
      }
   });
});

router.get("/:id", (req, res) => {
   const article = articleModel
      .findById(req.params.id)
      .then((result) => {
         if (result == null) {
            res.redirect("/");
         }
         res.render("show", { article: result });
      })
      .catch((err) => {
         console.log(err);
      });
});

module.exports = router;
