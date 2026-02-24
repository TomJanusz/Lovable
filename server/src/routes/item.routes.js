// Item routes
const express = require("express");
const { getAllItems, getMyItems, createItem, getItemById } = require("../controllers/item.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();

// GET /api/items - Public: list all items
router.get("/", getAllItems);

// GET /api/items/my-items - Seller: get own items
router.get("/my-items", authenticate, authorize("seller"), getMyItems);

// POST /api/items - Seller: create item
router.post("/", authenticate, authorize("seller"), createItem);

// GET /api/items/:id - Public: get single item
router.get("/:id", getItemById);

module.exports = router;
