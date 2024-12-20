import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Input } from "../../../components/atomic/input/Input";

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
    label: "Label",
    type: "text",
    size: "m",
  },
};

export const Size: Story = {
  args: {
    type: "text",
    size: "m",
  },
};

export const Type: Story = {
  args: {
    type: "text",
    size: "m",
  },
};
