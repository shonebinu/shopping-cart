import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Product } from "../types";
import StoreItemCard from "@/components/StoreItemCard";

describe("StoreItemCard", () => {
  const mockProduct: Product = {
    id: 1,
    title: "Test Product",
    price: 99.99,
    image: "/test-image.jpg",
    qty: 1,
    category: "test",
  };

  it("renders product details correctly", () => {
    render(<StoreItemCard product={mockProduct} handleAddToCart={vi.fn()} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
  });

  it("calls handleAddToCart when button is clicked", async () => {
    const handleAddToCart = vi.fn();

    render(
      <StoreItemCard product={mockProduct} handleAddToCart={handleAddToCart} />
    );

    const addToCartButton = screen.getByRole("button", { name: "Add to Cart" });
    await userEvent.click(addToCartButton);
    expect(handleAddToCart).toHaveBeenCalledWith(mockProduct, 1);
  });

  it("defaults the quantity to 1", () => {
    render(<StoreItemCard product={mockProduct} handleAddToCart={vi.fn()} />);
    const quantitySelect = screen.getByRole("combobox");
    expect(quantitySelect).toHaveTextContent("1");
  });

  it("calls handleAddToCart with correct quantity when quantity is changed", async () => {
    const handleAddToCart = vi.fn();
    const mockQuantity = 7;

    render(
      <StoreItemCard product={mockProduct} handleAddToCart={handleAddToCart} />
    );

    const quantitySelect = screen.getByRole("combobox");
    await userEvent.click(quantitySelect);

    const option = screen.getByRole("option", {
      name: mockQuantity.toString(),
    });
    await userEvent.click(option);

    const addToCartButton = screen.getByRole("button", { name: "Add to Cart" });
    await userEvent.click(addToCartButton);
    expect(handleAddToCart).toHaveBeenCalledWith(mockProduct, mockQuantity);
  });

  it("renders the product image", () => {
    render(<StoreItemCard product={mockProduct} handleAddToCart={vi.fn()} />);
    const productImage = screen.getByAltText(mockProduct.title);
    expect(productImage).toHaveAttribute("src", mockProduct.image);
  });
});
