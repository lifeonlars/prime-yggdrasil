import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormField } from '../blocks/FormField'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'

const meta = {
  title: 'Blocks/FormField',
  component: FormField,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Email Address',
    htmlFor: 'email',
    children: <InputText id="email" type="email" placeholder="user@example.com" />,
  },
}

export const WithDropdown: Story = {
  args: {
    label: 'Select Country',
    htmlFor: 'country',
    children: (
      <Dropdown
        id="country"
        options={[
          { label: 'United States', value: 'us' },
          { label: 'Canada', value: 'ca' },
          { label: 'United Kingdom', value: 'uk' },
        ]}
        placeholder="Choose a country"
      />
    ),
  },
}

export const Required: Story = {
  args: {
    label: 'Full Name *',
    htmlFor: 'name',
    children: <InputText id="name" placeholder="Enter your name" />,
  },
}
