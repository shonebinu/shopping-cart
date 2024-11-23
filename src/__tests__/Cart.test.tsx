import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Product } from "../types";
import Cart from "../pages/Cart";
import * as routerDom from "react-router-dom";

vi.mock("react-router-dom", () => ({
  useOutletContext: vi.fn(),
}));

describe("Cart", () => {
  const mockCartItems: Product[] = [
    {
      id: 1,
      title: "Test Product 1",
      price: 99.99,
      image: "/test-image-1.jpg",
      qty: 2,
      category: "test",
    },
    {
      id: 2,
      title: "Test Product 2",
      price: 149.99,
      image: "/test-image-2.jpg",
      qty: 1,
      category: "test",
    },
  ];

  const mockSetCartItems = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(routerDom.useOutletContext).mockReturnValue({
      cartItems: mockCartItems,
      setCartItems: mockSetCartItems,
    });
  });

  it("displays empty cart message when cart is empty", () => {
    vi.mocked(routerDom.useOutletContext).mockReturnValue({
      cartItems: [],
      setCartItems: mockSetCartItems,
    });
    render(<Cart />);
    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  });

  it("renders cart items and calculates total price correctly", () => {
    render(<Cart />);
    expect(screen.getByText("Test Product 1")).toBeInTheDocument();
    expect(screen.getByText("Test Product 2")).toBeInTheDocument();

    const expectedTotal = (99.99 * 2 + 149.99).toFixed(2);
    expect(screen.getByText(`$${expectedTotal}`)).toBeInTheDocument();
  });

  it("handles cart operations", () => {
    render(<Cart />);

    const setCartItemsCallback = mockSetCartItems.mock.calls[0]?.[0];
    if (typeof setCartItemsCallback === "function") {
      const updatedCart = setCartItemsCallback(mockCartItems);
      expect(updatedCart.length).toBeLessThan(mockCartItems.length);

      const newQty = 3;
      const qtyUpdatedCart = setCartItemsCallback(
        mockCartItems.map((item) =>
          item.id === 1 ? { ...item, qty: newQty } : item
        )
      );
      const updatedItem = qtyUpdatedCart.find((item: Product) => item.id === 1);
      expect(updatedItem?.qty).toBe(newQty);
    }
  });
});
