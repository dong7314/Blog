import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Textarea } from "../../../components/atom/textarea/Textarea";

const meta = {
  title: "Atomic/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Default",
  },
};

export const Label: Story = {
  args: {
    label: "Label",
  },
};

export const Resize: Story = {
  args: {
    label: "Resize",
    resize: "none",
  },
};

export const MaxLength: Story = {
  args: {
    label: "MaxLength",
    maxLength: 100,
  },
};

export const Error: Story = {
  args: {
    label: "Error",
    error: true,
    children: "에러가 발생했습니다.",
  },
};

export const Placeholder: Story = {
  args: {
    label: "Placeholder",
    placeholder: "텍스트를 입력해 주세요.",
  },
};
