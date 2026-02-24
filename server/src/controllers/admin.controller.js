// Admin controller - admin-only operations
const prisma = require("../config/database");

/**
 * GET /api/admin/users
 * List all users (admin only)
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(users);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * GET /api/admin/items
 * List all items with seller info (admin only)
 */
const getAllItemsAdmin = async (req, res) => {
  try {
    const items = await prisma.item.findMany({
      include: { seller: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    });
    res.json(items);
  } catch (error) {
    console.error("Admin get items error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * DELETE /api/admin/users/:id
 * Delete a user (admin only)
 */
const deleteUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.role === "admin") {
      return res.status(403).json({ error: "Cannot delete admin users" });
    }

    await prisma.user.delete({ where: { id: req.params.id } });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * DELETE /api/admin/items/:id
 * Delete an item (admin only)
 */
const deleteItem = async (req, res) => {
  try {
    const item = await prisma.item.findUnique({ where: { id: req.params.id } });

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    await prisma.item.delete({ where: { id: req.params.id } });
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Delete item error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getAllUsers, getAllItemsAdmin, deleteUser, deleteItem };
