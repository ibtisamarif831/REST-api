const express = require("express");
const router = express.Router();
const postModel = require("../models/postModel");

//getting all the data

router.get("/", async (req, res) => {
  try {
    const posts = await postModel.find();
    res.json(posts);
  } catch (error) {
    res.json({ message: error });
  }
});

// inserting all the data

router.post("/", async (req, res) => {
  console.log(req.body);

  const post = new postModel({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});
//searching by id

router.get("/:postId", async (req, res) => {
  console.log(req.params.postId);
  try {
    const post = await postModel.findById(req.params.postId);
    res.json(post);
  } catch (error) {
    res.json({ message: error });
  }
});

//delete
router.delete("/:postId", async (req, res) => {
  console.log(req.params.postId);
  try {
    const removePost = await postModel.remove({ _id: req.params.postId });
    res.json(removePost);
  } catch (error) {
    res.json({ message: error });
  }
});

//update
router.patch("/:postId", async (req, res) => {
  console.log(req.params.postId);
  try {
    const update = await postModel.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.json(update);
  } catch (error) {
    res.json({ message: error });
  }
});
module.exports = router;
