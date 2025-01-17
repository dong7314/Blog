import type { Meta, StoryObj } from "@storybook/react";

import { Loading } from "../../../components/atom/loading/Loading";

const meta = {
  title: "Atomic/Loading",
  component: Loading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "m",
  },
};

export const Size: Story = {
  args: {
    size: "xl",
  },
};

export const Message: Story = {
  args: {
    size: "m",
    message: "로딩 메세지입니다.",
  },
};
