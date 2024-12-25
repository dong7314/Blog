import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { IconButton } from "../../../components/molecules/iconButton/IconButton";

const meta = {
  title: "Molecules/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof IconButton>;

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

export const Disabled: Story = {
  args: {
    type: "search",
    disabled: true,
  },
};

export const onClick: Story = {
  args: {
    type: "search",
    onClick: fn(() => {
      alert("click!");
    }),
  },
};
