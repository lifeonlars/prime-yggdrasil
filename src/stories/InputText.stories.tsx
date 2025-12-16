import type { Meta, StoryObj } from '@storybook/react-vite'
import { InputText } from 'primereact/inputtext'
import { useState } from 'react'

const meta = {
  title: 'Components/InputText',
  component: InputText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
    },
  },
} satisfies Meta<typeof InputText>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text',
  },
}

export const WithValue: Story = {
  render: (args) => {
    const [value, setValue] = useState('Sample text')
    return <InputText {...args} value={value} onChange={(e) => setValue(e.target.value)} />
  },
  args: {
    placeholder: 'Enter text',
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled',
    disabled: true,
    value: 'Cannot edit',
  },
}

export const Invalid: Story = {
  args: {
    placeholder: 'Invalid',
    invalid: true,
    value: 'Invalid input',
  },
}
