import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag } from 'primereact/tag'

const meta = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: 'select',
      options: ['success', 'info', 'warning', 'danger', 'secondary', 'contrast'],
    },
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    value: 'Primary',
  },
}

export const Success: Story = {
  args: {
    value: 'Success',
    severity: 'success',
  },
}

export const Info: Story = {
  args: {
    value: 'Info',
    severity: 'info',
  },
}

export const Warning: Story = {
  args: {
    value: 'Warning',
    severity: 'warning',
  },
}

export const Danger: Story = {
  args: {
    value: 'Danger',
    severity: 'danger',
  },
}

export const WithIcon: Story = {
  args: {
    value: 'With Icon',
    icon: 'pi pi-check',
  },
}

export const Rounded: Story = {
  args: {
    value: 'Rounded',
    rounded: true,
  },
}
