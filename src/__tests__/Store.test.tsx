import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as routerDom from "react-router-dom";
import Store from "../pages/Store";
import { Product } from "../types";

vi.mock("react-router-dom", () => ({
  useOutletContext: vi.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("Store", () => {
  const mockProducts: Product[] = [
    {
      id: 1,
      title: "Test Product 1",
      price: 99.99,
      image: "/test-image-1.jpg",
      category: "test",
      qty: 1,
    },
    {
      id: 2,
      title: "Test Product 2",
      price: 149.99,
      image: "/test-image-2.jpg",
      category: "test",
      qty: 1,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(routerDom.useOutletContext).mockReturnValue({
      setCartItems: vi.fn(),
    });
    global.fetch = vi.fn();
  });

  it("shows loading state", () => {
    vi.mocked(global.fetch).mockImplementationOnce(() => new Promise(() => {}));

    render(<Store />, { wrapper: createWrapper() });
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows error message when fetch fails", async () => {
    vi.mocked(global.fetch).mockRejectedValueOnce(new Error("Failed to fetch"));

    render(<Store />, { wrapper: createWrapper() });
    expect(
      await screen.findByText(/an error has occured/i)
    ).toBeInTheDocument();
  });

  it("renders products when fetch succeeds", async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      json: () => Promise.resolve(mockProducts),
    } as Response);

    render(<Store />, { wrapper: createWrapper() });

    expect(await screen.findByText("Test Product 1")).toBeInTheDocument();
    expect(screen.getByText("Test Product 2")).toBeInTheDocument();
  });
});
