import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ItemsCountSelect from "../components/ItemsCountSelect";

describe("ItemsCountSelect", () => {
  it("renders the select trigger with the correct default value", () => {
    render(<ItemsCountSelect value="1" onChange={vi.fn()} />);

    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveTextContent("1");
  });

  it("renders the correct quantity options", async () => {
    render(<ItemsCountSelect value="1" onChange={vi.fn()} />);

    const trigger = screen.getByRole("combobox");
    await userEvent.click(trigger);

    for (let i = 1; i <= 9; i++) {
      expect(
        screen.getByRole("option", { name: i.toString() })
      ).toBeInTheDocument();
    }
  });

  it("calls onChange with the correct value when an option is selected", async () => {
    const handleChange = vi.fn();
    render(<ItemsCountSelect value="1" onChange={handleChange} />);

    const trigger = screen.getByRole("combobox");
    await userEvent.click(trigger);

    const option = screen.getByRole("option", { name: "5" });
    await userEvent.click(option);

    expect(handleChange).toHaveBeenCalledWith("5");
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
