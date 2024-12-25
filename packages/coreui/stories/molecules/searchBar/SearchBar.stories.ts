import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { SearchBar } from "../../../components/molecules/searchBar/SearchBar";

const meta = {
  title: "Molecules/SearchBar",
  component: SearchBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: fn(() => {
      alert("click!");
    }),
  },
};
