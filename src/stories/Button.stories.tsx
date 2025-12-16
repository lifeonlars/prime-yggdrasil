import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from 'primereact/button'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'help', 'contrast'],
    },
    size: {
      control: 'select',
      options: ['small', 'large'],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    label: 'Primary Button',
  },
}

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    severity: 'secondary',
  },
}

export const Success: Story = {
  args: {
    label: 'Success Button',
    severity: 'success',
  },
}

export const WithIcon: Story = {
  args: {
    label: 'With Icon',
    icon: 'pi pi-check',
  },
}

export const IconOnly: Story = {
  args: {
    icon: 'pi pi-check',
    rounded: true,
  },
}

export const Outlined: Story = {
  args: {
    label: 'Outlined',
    outlined: true,
  },
}

export const Text: Story = {
  args: {
    label: 'Text',
    text: true,
  },
}
