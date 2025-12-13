const express = require("express");
const router = express.Router();
const {
  createSweet,
  getAllSweets,
  deleteSweet,
} = require("../controllers/sweet.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

router.post("/", authMiddleware, createSweet);
router.get("/", authMiddleware, getAllSweets);
router.delete("/:id", authMiddleware, deleteSweet);

module.exports = router;
