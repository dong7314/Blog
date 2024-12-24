import type { Meta, StoryObj } from "@storybook/react";

import { Icon } from "../../../components/atom/icon/Icon";

const meta = {
  title: "Atomic/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "search",
    size: "m",
  },
};

export const Type: Story = {
  args: {
    type: "secret",
  },
};

export const Size: Story = {
  args: {
    type: "search",
    size: "xl",
  },
};

export const Color: Story = {
  args: {
    type: "search",
    color: "red",
  },
};

export const HoverColor: Story = {
  args: {
    type: "search",
    hoverColor: "red",
  },
};
