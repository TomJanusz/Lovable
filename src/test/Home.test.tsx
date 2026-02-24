import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "@/pages/Index";

const renderHome = () =>
  render(
    <BrowserRouter>
      <AuthProvider>
        <Index />
      </AuthProvider>
    </BrowserRouter>
  );

describe("Home Page", () => {
  it("renders hero section", () => {
    renderHome();
    expect(screen.getByText(/trésors/i)).toBeInTheDocument();
  });

  it("renders item cards", () => {
    renderHome();
    expect(screen.getByText("Objets en vente")).toBeInTheDocument();
    // Mock items should be visible
    expect(screen.getAllByText(/Dracaufeu/i).length).toBeGreaterThan(0);
  });

  it("shows register CTA when not authenticated", () => {
    renderHome();
    expect(screen.getByText("Commencer maintenant")).toBeInTheDocument();
  });
});
