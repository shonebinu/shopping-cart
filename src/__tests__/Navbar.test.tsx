import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/Navbar";

describe("Navbar", () => {
  it("renders the Navbar with the correct cart count", () => {
    render(
      <MemoryRouter>
        <Navbar cartItemsCount={5} />
      </MemoryRouter>
    );

    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
