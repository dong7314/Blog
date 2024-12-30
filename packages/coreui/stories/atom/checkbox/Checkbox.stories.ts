import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Checkbox } from "../../../components/atom/checkbox/Checkbox";

const meta = {
  title: "Atomic/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "m",
    children: "Label",
  },
};

export const Size: Story = {
  args: {
    size: "l",
    children: "Size",
  },
};

export const Value: Story = {
  args: {
    value: true,
    children: "Value",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
};
