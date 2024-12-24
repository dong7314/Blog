import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "../../../components/atom/text/Text";

const meta = {
  title: "Atomic/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Text",
  },
};

export const Size: Story = {
  args: {
    size: "l",
    children: "Large",
  },
};

export const Color: Story = {
  args: {
    color: "red",
    children: "Red",
  },
};

export const Weight: Story = {
  args: {
    weight: "bold",
    children: "Bold",
  },
};
