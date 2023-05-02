const express = require("express");
const router = express.Router();
const { User } = require("../models");
const { success, error } = require("../helper/jsonFormater");

// get all user
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(success(200, "Data get Successfully", users));
  } catch (error) {
    console.log(error);
    return res.status(500).json(error(500, "Server Error"));
  }
});
// get user by id
router.get("/:id", async (req, res) => {
  try {
    const users = await User.findByPk(req.params.id);
    if (!users) {
      return res.status(404).json(error(404, "Data Not Found"));
    }
    return res
      .status(200)
      .json(success(200, "Data get by id Successfully", users));
  } catch (error) {
    console.log(error);
    return res.status(500).json(error(500, "Server Error"));
  }
});
// create data user
router.post("/", async (req, res) => {
  try {
    const users = await User.create(req.body);
    res.status(200).json(success(201, "Data created Successfully", users));
  } catch (error) {
    console.log(error);
    res.status(500).json(error(500, "Server Error"));
  }
});
// update user by id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  try {
    const users = await User.findByPk(id);
    if (!users) {
      return res.status(404).json(error(404, "Data Not Found"));
    }
    await users.update({ name, email, phone });
    return res
      .status(200)
      .json(success(200, "Data Updated Successfully", users));
  } catch (error) {
    console.log(error);
    return res.status(500).json(error(500, "Server Error"));
  }
});
// delete user by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const users = await User.findByPk(id);
    if (!users) {
      return res.status(404).json(error(404, "Data Not Found"));
    }
    await users.destroy();
    return res
      .status(200)
      .json(success(200, "Data Deleted Successfully", users));
  } catch (error) {
    console.log(error);
    return res.status(500).json(error(500, "Server Error"));
  }
});

module.exports = router;
