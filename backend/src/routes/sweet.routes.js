const express = require("express");
const router = express.Router();
const {
  createSweet,
  getAllSweets,
  deleteSweet,
} = require("../controllers/sweet.controller");

router.post("/", createSweet);
router.get("/", getAllSweets);
router.delete("/:id", deleteSweet);

module.exports = router;
