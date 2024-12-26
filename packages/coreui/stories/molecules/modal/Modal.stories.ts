import type { Meta, StoryObj } from "@storybook/react";

import { Modal } from "../../../components/molecules/modal/Modal";

const meta = {
  title: "Molecules/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: "300px",
    height: "400px",
    children: "hi",
  },
};
