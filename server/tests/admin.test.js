// Admin endpoint tests
const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../src/app");
const { JWT_SECRET } = require("../src/middlewares/auth.middleware");

jest.mock("../src/config/database", () => ({
  user: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    delete: jest.fn(),
  },
  item: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    delete: jest.fn(),
  },
}));

const prisma = require("../src/config/database");

const adminToken = jwt.sign({ id: "admin-1", email: "admin@test.com", role: "admin" }, JWT_SECRET);
const buyerToken = jwt.sign({ id: "buyer-1", email: "buyer@test.com", role: "buyer" }, JWT_SECRET);

describe("Admin Controller", () => {
  afterEach(() => jest.clearAllMocks());

  describe("GET /api/admin/users", () => {
    it("should return users for admin", async () => {
      prisma.user.findMany.mockResolvedValue([{ id: "1", name: "Test" }]);

      const res = await request(app)
        .get("/api/admin/users")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it("should return 403 for non-admin", async () => {
      const res = await request(app)
        .get("/api/admin/users")
        .set("Authorization", `Bearer ${buyerToken}`);

      expect(res.status).toBe(403);
    });
  });

  describe("DELETE /api/admin/users/:id", () => {
    it("should delete non-admin user", async () => {
      prisma.user.findUnique.mockResolvedValue({ id: "user-1", role: "buyer" });
      prisma.user.delete.mockResolvedValue({});

      const res = await request(app)
        .delete("/api/admin/users/user-1")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
    });

    it("should prevent deleting admin user", async () => {
      prisma.user.findUnique.mockResolvedValue({ id: "admin-2", role: "admin" });

      const res = await request(app)
        .delete("/api/admin/users/admin-2")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(res.status).toBe(403);
    });
  });

  describe("DELETE /api/admin/items/:id", () => {
    it("should delete item as admin", async () => {
      prisma.item.findUnique.mockResolvedValue({ id: "item-1" });
      prisma.item.delete.mockResolvedValue({});

      const res = await request(app)
        .delete("/api/admin/items/item-1")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
    });
  });
});
