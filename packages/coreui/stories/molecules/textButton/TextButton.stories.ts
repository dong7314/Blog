import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { TextButton } from "../../../components/molecules/textButton/TextButton";

const meta = {
  title: "Molecules/TextButton",
  component: TextButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof TextButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Default",
  },
};

export const Size: Story = {
  args: {
    children: "Size",
    size: "xl",
  },
};

export const Color: Story = {
  args: {
    children: "Color",
    color: "red",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};

export const onClick: Story = {
  args: {
    children: "OnClick",
    onClick: fn(() => {
      alert("click!");
    }),
  },
};
