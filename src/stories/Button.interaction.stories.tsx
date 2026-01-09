import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from 'primereact/button';
import { expect, within, userEvent } from '@storybook/test';

const meta = {
  title: 'Button/Button (Interactive Tests)',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Test that button renders with correct label
 */
export const RendersCorrectly: Story = {
  args: {
    label: 'Click Me',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the button
    const button = canvas.getByRole('button');

    // Verify it has the correct label
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveTextContent('Click Me');
  },
};

/**
 * Test that button can be clicked
 */
export const Clickable: Story = {
  args: {
    label: 'Click Me',
    onClick: () => console.log('Button clicked!'),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and click the button
    const button = canvas.getByRole('button');
    await userEvent.click(button);

    // Button should still be in the document after click
    await expect(button).toBeInTheDocument();
  },
};

/**
 * Test outlined button variant
 */
export const OutlinedButton: Story = {
  args: {
    label: 'Outlined',
    outlined: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button');

    // Verify button has outlined class
    await expect(button).toHaveClass('p-button-outlined');
  },
};

/**
 * Test danger severity
 */
export const DangerButton: Story = {
  args: {
    label: 'Delete',
    severity: 'danger',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button');

    // Verify button has danger class
    await expect(button).toHaveClass('p-button-danger');
  },
};

/**
 * Test button with icon
 */
export const WithIcon: Story = {
  args: {
    label: 'Save',
    icon: 'pi pi-check',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button');

    // Verify icon is present
    const icon = button.querySelector('.pi-check');
    await expect(icon).toBeInTheDocument();
  },
};
