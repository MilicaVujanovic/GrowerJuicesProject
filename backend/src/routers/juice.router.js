import { Router } from "express";
import { sample_juices, sample_tags } from "../data.js";
import asyncHandler from "express-async-handler";
import { JuiceModel } from "../models/juice.model.js";

const router = Router();

router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const juicesCount = await JuiceModel.countDocuments();
    if (juicesCount > 0) {
      res.send("Seed is already done!");
      return;
    }
    await JuiceModel.create(sample_juices);
    res.send("Seed is DONE!");
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const juices = await JuiceModel.find();
    res.send(juices);
  })
);

router.get(
  "/search/:searchTerm",
  asyncHandler(async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, "i");
    const juices = await JuiceModel.find({ name: { $regex: searchRegex } });
    res.send(juices);
  })
);

router.get(
  "/tags",
  asyncHandler(async (req, res) => {
    const tags = await JuiceModel.aggregate([
      { $unwind: "$tags" },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: "$count",
        },
      },
    ]).sort({ count: -1 });

    const all = {
      name: "All",
      count: await JuiceModel.countDocuments(),
    };
    tags.unshift(all);
    res.send(tags);
  })
);

router.get(
  "/tag/:tagName",
  asyncHandler(async (req, res) => {
    const juices = await JuiceModel.find({ tags: req.params.tagName });
    res.send(juices);
  })
);

router.get(
  "/:juiceId",
  asyncHandler(async (req, res) => {
    const juice = await JuiceModel.findById(req.params.juiceId);
    res.send(juice);
  })
);

router.post(
  "/add",
  asyncHandler(async (req, res) => {
    const { name, price, tags, imageUrl, favorite, origins, prepareTime } = req.body;

    try {
      const newJuice = new JuiceModel({
        name,
        price,
        tags,
        favorite,
        origins,
        prepareTime,
        imageUrl,
      });
      const savedProduct = await newJuice.save();
      res.status(201).json({ juice: savedProduct });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Unable to add juice" });
    }
  })
);

router.delete(
  "/delete/:juiceId",
  asyncHandler(async (req, res) => {
    const juiceId = req.params.juiceId;
    try {
      await JuiceModel.findByIdAndDelete(juiceId);
      res.status(200).json({ message: "Juice successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Unable to delete product" });
    }
  })
);

export default router;
