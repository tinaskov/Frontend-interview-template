import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { InputField } from "./InputField";

describe("InputField Component", () => {
  it("renders the input field with a placeholder", () => {
    render(<InputField value='' placeholder='Enter text...' disabled={false} onChange={() => {}} />);
    const input = screen.getByPlaceholderText("Enter text...");
    expect(input).toBeInTheDocument();
  });

  it("displays the correct value", () => {
    render(<InputField value='Sample text' placeholder='Enter text...' disabled={false} onChange={() => {}} />);
    const input = screen.getByDisplayValue("Sample text");
    expect(input).toBeInTheDocument();
  });

  it("calls onChange when typing", () => {
    const handleChange = vi.fn();
    render(<InputField value='' placeholder='Enter text...' disabled={false} onChange={handleChange} />);
    const input = screen.getByPlaceholderText("Enter text...");
    fireEvent.change(input, { target: { value: "New text" } });
    expect(handleChange).toHaveBeenCalledWith(expect.anything());
  });

  it("disables the input field when disabled is true", () => {
    render(<InputField value='' placeholder='Enter text...' disabled={true} onChange={() => {}} />);
    const input = screen.getByPlaceholderText("Enter text...");
    expect(input).toBeDisabled();
  });
});
