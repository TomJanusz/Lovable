// Item controller - CRUD operations for items
const prisma = require("../config/database");

/**
 * GET /api/items
 * List all items (public)
 */
const getAllItems = async (req, res) => {
  try {
    const items = await prisma.item.findMany({
      include: { seller: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
    });
    res.json(items);
  } catch (error) {
    console.error("Get items error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * GET /api/items/my-items
 * Get items of the authenticated seller
 */
const getMyItems = async (req, res) => {
  try {
    const items = await prisma.item.findMany({
      where: { sellerId: req.user.id },
      orderBy: { createdAt: "desc" },
    });
    res.json(items);
  } catch (error) {
    console.error("Get my items error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * POST /api/items
 * Create a new item (seller only)
 */
const createItem = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;

    if (!name || !description || price === undefined) {
      return res.status(400).json({ error: "Name, description and price are required" });
    }

    if (price <= 0) {
      return res.status(400).json({ error: "Price must be greater than 0" });
    }

    const item = await prisma.item.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        image: image || null,
        sellerId: req.user.id,
      },
      include: { seller: { select: { id: true, name: true } } },
    });

    res.status(201).json(item);
  } catch (error) {
    console.error("Create item error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * GET /api/items/:id
 * Get a single item by ID
 */
const getItemById = async (req, res) => {
  try {
    const item = await prisma.item.findUnique({
      where: { id: req.params.id },
      include: { seller: { select: { id: true, name: true } } },
    });

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    console.error("Get item error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getAllItems, getMyItems, createItem, getItemById };
