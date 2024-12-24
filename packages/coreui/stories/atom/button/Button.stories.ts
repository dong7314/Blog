import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Button } from '../../../components/atom/button/Button';

const meta = {
  title: 'Atomic/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'primary',
    size: 'm',
    children: 'Button',
  },
};

export const Size: Story = {
  args: {
    type: 'primary',
    size: 'm',
    children: 'Medium',
  },
};

export const Type: Story = {
  args: {
    type: 'tertiary',
    children: 'Button',
  },
};

export const Disabled: Story = {
  args: {
    type: 'primary',
    disabled: true,
    children: 'Button',
  },
};

export const onClick: Story = {
  args: {
    type: 'primary',
    onClick: fn(() => { alert('click!'); }),
    children: 'Button',
  },
};

