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
    render(
      <CartItemCard
        item={mockProduct}
        handleRemoveFromCart={vi.fn()}
        handleQtyChange={vi.fn()}
      />
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
  });

  it("handles remove action correctly", async () => {
    const handleRemoveFromCart = vi.fn();

    render(
      <CartItemCard
        item={mockProduct}
        handleRemoveFromCart={handleRemoveFromCart}
        handleQtyChange={vi.fn()}
      />
    );

    const deleteButton = screen.getByRole("button");
    await userEvent.click(deleteButton);
    expect(handleRemoveFromCart).toHaveBeenCalledWith(1);
  });

  it("calls handleQtyChange when quantity is changed", async () => {
    const handleQtyChange = vi.fn();

    render(
      <CartItemCard
        item={mockProduct}
        handleRemoveFromCart={vi.fn()}
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

  it("renders the product image", () => {
    render(
      <CartItemCard
        item={mockProduct}
        handleRemoveFromCart={vi.fn()}
        handleQtyChange={vi.fn()}
      />
    );

    const productImage = screen.getByAltText(mockProduct.title);
    expect(productImage).toHaveAttribute("src", mockProduct.image);
  });
});
