import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

describe("ProtectedRoute", () => {
  it("redirects to login when not authenticated", () => {
    localStorage.clear();
    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <AuthProvider>
          <ProtectedRoute allowedRoles={["admin"]}>
            <div>Admin Content</div>
          </ProtectedRoute>
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.queryByText("Admin Content")).not.toBeInTheDocument();
  });

  it("renders children when authenticated with correct role", () => {
    localStorage.setItem(
      "collectify_user",
      JSON.stringify({ id: "1", email: "admin@test.com", name: "Admin", role: "admin" })
    );
    render(
      <MemoryRouter>
        <AuthProvider>
          <ProtectedRoute allowedRoles={["admin"]}>
            <div>Admin Content</div>
          </ProtectedRoute>
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText("Admin Content")).toBeInTheDocument();
    localStorage.clear();
  });
});
