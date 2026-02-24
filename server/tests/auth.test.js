// Auth endpoint tests
const request = require("supertest");
const app = require("../src/app");

// Mock Prisma
jest.mock("../src/config/database", () => ({
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
}));

const prisma = require("../src/config/database");
const bcrypt = require("bcrypt");

describe("Auth Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/auth/register", () => {
    it("should register a new user with valid data", async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      prisma.user.create.mockResolvedValue({
        id: "test-id",
        name: "Test",
        email: "test@test.com",
        role: "buyer",
        createdAt: new Date(),
      });

      const res = await request(app).post("/api/auth/register").send({
        name: "Test",
        email: "test@test.com",
        password: "password123",
        role: "buyer",
      });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("user");
      expect(res.body).toHaveProperty("token");
    });

    it("should return 409 if email already exists", async () => {
      prisma.user.findUnique.mockResolvedValue({ id: "existing" });

      const res = await request(app).post("/api/auth/register").send({
        name: "Test",
        email: "existing@test.com",
        password: "password123",
      });

      expect(res.status).toBe(409);
    });

    it("should return 400 if required fields missing", async () => {
      const res = await request(app).post("/api/auth/register").send({
        email: "test@test.com",
      });

      expect(res.status).toBe(400);
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login with valid credentials", async () => {
      const hashedPassword = await bcrypt.hash("password123", 10);
      prisma.user.findUnique.mockResolvedValue({
        id: "test-id",
        name: "Test",
        email: "test@test.com",
        password: hashedPassword,
        role: "buyer",
      });

      const res = await request(app).post("/api/auth/login").send({
        email: "test@test.com",
        password: "password123",
      });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token");
    });

    it("should return 401 with wrong password", async () => {
      const hashedPassword = await bcrypt.hash("password123", 10);
      prisma.user.findUnique.mockResolvedValue({
        id: "test-id",
        email: "test@test.com",
        password: hashedPassword,
        role: "buyer",
      });

      const res = await request(app).post("/api/auth/login").send({
        email: "test@test.com",
        password: "wrongpassword",
      });

      expect(res.status).toBe(401);
    });

    it("should return 401 if user not found", async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      const res = await request(app).post("/api/auth/login").send({
        email: "notfound@test.com",
        password: "password123",
      });

      expect(res.status).toBe(401);
    });
  });
});
