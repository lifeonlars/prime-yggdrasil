import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'

const meta = {
  title: 'Components/IconField',
  component: IconField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof IconField>

export default meta
type Story = StoryObj<typeof meta>

export const SearchLeft: Story = {
  render: () => (
    <IconField iconPosition="left">
      <InputIcon className="pi pi-search" />
      <InputText placeholder="Search" />
    </IconField>
  ),
}

export const SearchRight: Story = {
  render: () => (
    <IconField iconPosition="right">
      <InputIcon className="pi pi-search" />
      <InputText placeholder="Search" />
    </IconField>
  ),
}

export const Calendar: Story = {
  render: () => (
    <IconField iconPosition="left">
      <InputIcon className="pi pi-calendar" />
      <InputText placeholder="Select date" />
    </IconField>
  ),
}

export const User: Story = {
  render: () => (
    <IconField iconPosition="left">
      <InputIcon className="pi pi-user" />
      <InputText placeholder="Username" />
    </IconField>
  ),
}

export const Email: Story = {
  render: () => (
    <IconField iconPosition="left">
      <InputIcon className="pi pi-envelope" />
      <InputText placeholder="Email" />
    </IconField>
  ),
}
