import type { Meta, StoryObj } from '@storybook/react-vite'
import { Password } from 'primereact/password'
import { useState } from 'react'

const meta = {
  title: 'Form/Password',
  component: Password,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
    },
    feedback: {
      control: 'boolean',
    },
    toggleMask: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Password>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('')
    return <Password {...args} value={value} onChange={(e) => setValue(e.target.value)} />
  },
  args: {
    placeholder: 'Enter password',
  },
}

export const WithToggleMask: Story = {
  render: (args) => {
    const [value, setValue] = useState('')
    return <Password {...args} value={value} onChange={(e) => setValue(e.target.value)} />
  },
  args: {
    placeholder: 'Enter password',
    toggleMask: true,
  },
}

export const WithStrengthMeter: Story = {
  render: (args) => {
    const [value, setValue] = useState('')
    return <Password {...args} value={value} onChange={(e) => setValue(e.target.value)} />
  },
  args: {
    placeholder: 'Enter password',
    feedback: true,
    toggleMask: true,
  },
}

export const WithValue: Story = {
  render: (args) => {
    const [value, setValue] = useState('mypassword123')
    return <Password {...args} value={value} onChange={(e) => setValue(e.target.value)} />
  },
  args: {
    placeholder: 'Enter password',
    toggleMask: true,
    feedback: true,
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled',
    disabled: true,
    value: 'disabled123',
  },
}

export const Invalid: Story = {
  render: (args) => {
    const [value, setValue] = useState('weak')
    return <Password {...args} value={value} onChange={(e) => setValue(e.target.value)} />
  },
  args: {
    placeholder: 'Enter password',
    toggleMask: true,
    feedback: true,
    invalid: true,
  },
}
