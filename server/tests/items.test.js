// Item endpoint tests
const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../src/app");
const { JWT_SECRET } = require("../src/middlewares/auth.middleware");

jest.mock("../src/config/database", () => ({
  item: {
    findMany: jest.fn(),
    create: jest.fn(),
    findUnique: jest.fn(),
  },
}));

const prisma = require("../src/config/database");

const sellerToken = jwt.sign({ id: "seller-1", email: "seller@test.com", role: "seller" }, JWT_SECRET);
const buyerToken = jwt.sign({ id: "buyer-1", email: "buyer@test.com", role: "buyer" }, JWT_SECRET);

describe("Item Controller", () => {
  afterEach(() => jest.clearAllMocks());

  describe("GET /api/items", () => {
    it("should return all items (public)", async () => {
      prisma.item.findMany.mockResolvedValue([
        { id: "1", name: "Test Item", price: 100 },
      ]);

      const res = await request(app).get("/api/items");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("POST /api/items", () => {
    it("should create item as seller", async () => {
      prisma.item.create.mockResolvedValue({
        id: "new-item",
        name: "New Item",
        description: "Test",
        price: 50,
        sellerId: "seller-1",
      });

      const res = await request(app)
        .post("/api/items")
        .set("Authorization", `Bearer ${sellerToken}`)
        .send({ name: "New Item", description: "Test", price: 50 });

      expect(res.status).toBe(201);
    });

    it("should return 403 for buyer", async () => {
      const res = await request(app)
        .post("/api/items")
        .set("Authorization", `Bearer ${buyerToken}`)
        .send({ name: "New Item", description: "Test", price: 50 });

      expect(res.status).toBe(403);
    });

    it("should return 401 without token", async () => {
      const res = await request(app)
        .post("/api/items")
        .send({ name: "New Item", description: "Test", price: 50 });

      expect(res.status).toBe(401);
    });
  });
});
