// Middleware tests
const jwt = require("jsonwebtoken");
const { authenticate, authorize, JWT_SECRET } = require("../src/middlewares/auth.middleware");

describe("Auth Middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  describe("authenticate", () => {
    it("should return 401 if no token provided", () => {
      authenticate(req, res, next);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 401 for invalid token", () => {
      req.headers.authorization = "Bearer invalidtoken";
      authenticate(req, res, next);
      expect(res.status).toHaveBeenCalledWith(401);
    });

    it("should call next() for valid token", () => {
      const token = jwt.sign({ id: "1", email: "test@test.com", role: "buyer" }, JWT_SECRET);
      req.headers.authorization = `Bearer ${token}`;
      authenticate(req, res, next);
      expect(next).toHaveBeenCalled();
      expect(req.user).toHaveProperty("id", "1");
    });
  });

  describe("authorize", () => {
    it("should return 403 if user role not allowed", () => {
      req.user = { id: "1", role: "buyer" };
      const middleware = authorize("admin");
      middleware(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
    });

    it("should call next() if user role is allowed", () => {
      req.user = { id: "1", role: "admin" };
      const middleware = authorize("admin");
      middleware(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it("should allow multiple roles", () => {
      req.user = { id: "1", role: "seller" };
      const middleware = authorize("seller", "admin");
      middleware(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
