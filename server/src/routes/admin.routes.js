// Admin routes
const express = require("express");
const { getAllUsers, getAllItemsAdmin, deleteUser, deleteItem } = require("../controllers/admin.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();

// All admin routes require authentication + admin role
router.use(authenticate, authorize("admin"));

// GET /api/admin/users
router.get("/users", getAllUsers);

// GET /api/admin/items
router.get("/items", getAllItemsAdmin);

// DELETE /api/admin/users/:id
router.delete("/users/:id", deleteUser);

// DELETE /api/admin/items/:id
router.delete("/items/:id", deleteItem);

module.exports = router;
