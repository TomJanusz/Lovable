import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ItemCard from "@/components/ItemCard";
import type { Item } from "@/stores/itemsStore";

const mockItem: Item = {
  id: "1",
  name: "Test Collectible",
  description: "A rare test item",
  price: 99.99,
  image: "https://example.com/image.jpg",
  sellerId: "seller-1",
  sellerName: "Test Seller",
  createdAt: "2025-01-01T00:00:00Z",
};

describe("ItemCard", () => {
  it("renders item name and price", () => {
    render(<ItemCard item={mockItem} />);
    expect(screen.getByText("Test Collectible")).toBeInTheDocument();
    expect(screen.getByText(/99,99/)).toBeInTheDocument();
  });

  it("renders seller name", () => {
    render(<ItemCard item={mockItem} />);
    expect(screen.getByText(/Test Seller/)).toBeInTheDocument();
  });

  it("renders image with alt text", () => {
    render(<ItemCard item={mockItem} />);
    const img = screen.getByAltText("Test Collectible");
    expect(img).toBeInTheDocument();
  });
});
