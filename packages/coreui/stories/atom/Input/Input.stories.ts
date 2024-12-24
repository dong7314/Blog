import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Input } from "../../../components/atom/input/Input";

const meta = {
  title: "Atomic/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Default",
    type: "text",
    size: "m",
  },
};

export const Size: Story = {
  args: {
    type: "text",
    label: "Size",
    size: "l",
  },
};

export const Type: Story = {
  args: {
    type: "password",
    label: "Password",
    size: "m",
  },
};

export const Pattern: Story = {
  args: {
    type: "text",
    label: "Email",
    pattern: "[a-zA-Z0-9.]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*",
    size: "m",
  },
};

export const Error: Story = {
  args: {
    type: "text",
    label: "Email",
    pattern: "[a-zA-Z0-9.]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*",
    error: "이메일 양식으로 입력해 주세요.",
    size: "m",
  },
};

export const MinLength: Story = {
  args: {
    type: "text",
    label: "Min Length",
    minLength: 1,
    size: "m",
  },
};

export const MaxLength: Story = {
  args: {
    type: "text",
    label: "Max Length",
    maxLength: 8,
    size: "m",
  },
};

export const Placeholder: Story = {
  args: {
    type: "text",
    placeholder: "Placeholder",
    size: "m",
  },
};
