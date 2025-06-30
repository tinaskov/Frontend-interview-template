import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "./InputField";
import type { ChangeEvent } from "react";

const meta: Meta<typeof InputField> = {
  title: "UI/InputField",
  component: InputField,
  argTypes: {
    value: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    onChange: (event: ChangeEvent<HTMLInputElement>) => console.log("Input changed:", event.target.value),
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    value: "",
    placeholder: "Enter text...",
    disabled: false,
    onChange: (event: ChangeEvent<HTMLInputElement>) => console.log("Input changed:", event.target.value),
  },
};

export const Disabled: Story = {
  args: {
    value: "",
    placeholder: "Cannot type here",
    disabled: true,
  },
};

export const WithText: Story = {
  args: {
    value: "Sample text",
    placeholder: "Enter text...",
    disabled: false,
    onChange: (event: ChangeEvent<HTMLInputElement>) => console.log("Input changed:", event.target.value),
  },
};
