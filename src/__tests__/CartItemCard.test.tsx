import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Product } from "../types";
import CartItemCard from "../components/CartItemCard";

describe("CartItemCard", () => {
  const mockProduct: Product = {
    id: 1,
    title: "Test Product",
    price: 99.99,
    image: "/test-image.jpg",
    qty: 1,
    category: "test",
  };

  it("renders product details correctly", () => {
    const handleRemoveFromCart = vi.fn();
    const handleQtyChange = vi.fn();

    render(
      <CartItemCard
        item={mockProduct}
        handleRemoveFromCart={handleRemoveFromCart}
        handleQtyChange={handleQtyChange}
      />
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
  });

  it("handles remove action correctly", async () => {
    const handleRemoveFromCart = vi.fn();
    const handleQtyChange = vi.fn();

    render(
      <CartItemCard
        item={mockProduct}
        handleRemoveFromCart={handleRemoveFromCart}
        handleQtyChange={handleQtyChange}
      />
    );

    const deleteButton = screen.getByRole("button");
    await userEvent.click(deleteButton);
    expect(handleRemoveFromCart).toHaveBeenCalledWith(1);
  });
});
