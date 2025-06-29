import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";

vi.mock("~/assets/LoadingSpinner", () => ({
  LoadingSpinner: () => <div data-testid='loading-spinner'>Loading...</div>,
}));

describe("Button", () => {
  it("renders with text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders as disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled button</Button>);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("does not call onClick when disabled", () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Disabled button
      </Button>
    );

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("forwards additional props to button element", () => {
    render(
      <Button data-testid='custom-button' aria-label='Custom label'>
        Test
      </Button>
    );

    const button = screen.getByTestId("custom-button");
    expect(button).toHaveAttribute("aria-label", "Custom label");
  });

  it("shows loading spinner when loading", () => {
    render(<Button loading>Loading button</Button>);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("renders with icon", () => {
    const icon = <span data-testid='icon'>🚀</span>;
    render(<Button icon={icon}>With icon</Button>);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders different variants", () => {
    render(<Button variant='outlined'>Outlined</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("border", "border-amber-300");
  });
});
