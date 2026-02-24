// Mock auth context for frontend - in production, connect to backend API
import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type UserRole = "buyer" | "seller" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const MOCK_USERS: (User & { password: string })[] = [
  { id: "1", email: "admin@collectify.com", name: "Admin", role: "admin", password: "admin123" },
  { id: "2", email: "seller@collectify.com", name: "Seller Demo", role: "seller", password: "seller123" },
  { id: "3", email: "buyer@collectify.com", name: "Buyer Demo", role: "buyer", password: "buyer123" },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("collectify_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback(async (email: string, password: string) => {
    // Mock: in production, call POST /api/auth/login
    const found = MOCK_USERS.find((u) => u.email === email && u.password === password);
    if (!found) throw new Error("Invalid credentials");
    const { password: _, ...userData } = found;
    setUser(userData);
    localStorage.setItem("collectify_user", JSON.stringify(userData));
  }, []);

  const register = useCallback(async (name: string, email: string, password: string, role: UserRole) => {
    // Mock: in production, call POST /api/auth/register
    if (MOCK_USERS.find((u) => u.email === email)) {
      throw new Error("Email already exists");
    }
    const newUser: User = { id: Date.now().toString(), email, name, role };
    setUser(newUser);
    localStorage.setItem("collectify_user", JSON.stringify(newUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("collectify_user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
