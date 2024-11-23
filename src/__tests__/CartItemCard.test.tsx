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

  it("calls handleQtyChange when quantity is changed", async () => {
    const handleRemoveFromCart = vi.fn();
    const handleQtyChange = vi.fn();

    render(
      <CartItemCard
        item={mockProduct}
        handleRemoveFromCart={handleRemoveFromCart}
        handleQtyChange={handleQtyChange}
      />
    );

    const quantitySelect = screen.getByRole("combobox");
    await userEvent.click(quantitySelect);

    const option = screen.getByRole("option", { name: "2" });
    await userEvent.click(option);

    expect(handleQtyChange).toHaveBeenCalledWith(1, 2); // Ensure the correct item id and qty are passed
    expect(handleQtyChange).toHaveBeenCalledTimes(1);
  });
});
