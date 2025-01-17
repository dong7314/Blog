import type { Meta, StoryObj } from "@storybook/react";

import { Select } from "../../../components/atom/select/Select";

const meta = {
  title: "Atomic/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "select",
    options: [
      {
        value: "month",
        label: "이번 주",
      },
      {
        value: "day",
        label: "오늘",
      },
    ],
  },
};

export const Size: Story = {
  args: {
    name: "select",
    size: "s",
    options: [
      {
        value: "small",
        label: "small",
      },
      {
        value: "medium",
        label: "medium",
      },
      {
        value: "large",
        label: "large",
      },
    ],
  },
};

export const Placeholder: Story = {
  args: {
    name: "select",
    placeholder: "placeholder",
    options: [
      {
        value: "placeholder",
        label: "placeholder",
      },
    ],
  },
};

export const DefaultValue: Story = {
  args: {
    name: "select",
    options: [
      {
        value: "default",
        label: "default",
      },
    ],
    defaultValue: {
      value: "default",
      label: "default",
    },
  },
};

export const OnChange: Story = {
  args: {
    name: "select",
    options: [
      {
        value: "value1",
        label: "change1",
      },
      {
        value: "value2",
        label: "change2",
      },
    ],
    onChange: (value: any) => {
      alert(value);
    },
  },
};
